const API_URL = 'https://api.github.com/users/';

const form = document.getElementById('form');
const search = document.getElementById('search');
const searchHistoryEl = document.getElementById('search-history');
const main = document.getElementById('main');
const spinner = document.getElementById('spinner');
const themeToggle = document.getElementById('theme-toggle');

let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
let currentPage = 1;
let isLoadingRepos = false;
let isAllReposLoaded = false;
let reposPage = 1;
const reposPerPage = 10;


async function getUser(username) {
  showSpinner();
  try {
    const { data } = await axios.get(API_URL + username);
    createUserCard(data);
    getRepos(username);
    updateSearchHistory(username);
  } catch (err) {
    if (err.response && err.response.status == 404) {
      createErrorCard('No profile with this username');
    } else {
      createErrorCard('Error fetching the user');
    }
  } finally {
    hideSpinner();
  }
}

async function getRepos(username) {
    if (isLoadingRepos || isAllReposLoaded) return;
  
    isLoadingRepos = true;
  
    try {
      const { data } = await axios.get(`${API_URL}${username}/repos`, {
        params: {
          sort: 'created',
          per_page: reposPerPage,
          page: reposPage,
        },
      });
  
      addReposToCard(data);
  
      if (data.length < reposPerPage) {
        isAllReposLoaded = true;
      } else {
        reposPage++;
      }
    } catch (err) {
      createErrorCard('Problem fetching repos');
    } finally {
      isLoadingRepos = false;
    }
  }

function createUserCard(user) {
    currentUserLogin = user.login;
    reposPage = 1;
    isAllReposLoaded = false;
  
    const userID = user.name || user.login;
    const userBio = user.bio ? `<p>${user.bio}</p>` : '';
    const userLocation = user.location ? `<p><strong>Location:</strong> ${user.location}</p>` : '';
    const userCompany = user.company ? `<p><strong>Company:</strong> ${user.company}</p>` : '';
    const userBlog = user.blog
      ? `<p><strong>Blog:</strong> <a href="${user.blog}" target="_blank">${user.blog}</a></p>`
      : '';
  
    const cardHTML = `
      <div class="card">
        <div class="card-header">
          <img src="${user.avatar_url}" alt="${userID}" />
          <div>
            <h2>${userID}</h2>
            ${userBio}
            ${userLocation}
            ${userCompany}
            ${userBlog}
          </div>
        </div>
        <div class="card-body">
          <ul>
            <li><strong>${user.followers}</strong> Followers</li>
            <li><strong>${user.following}</strong> Following</li>
            <li><strong>${user.public_repos}</strong> Repos</li>
          </ul>
          <div id="calendar" class="calendar"></div>
          <div id="repos" class="repos"></div>
        </div>
      </div>
    `;
    main.innerHTML = cardHTML;
  
    // Initialize the GitHub Calendar
    GitHubCalendar('#calendar', user.login, { responsive: true });
}
  

function createErrorCard(message) {
  const cardHTML = `
    <div class="card">
      <h2>${message}</h2>
    </div>
  `;
  main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
    const reposEl = document.getElementById('repos');
  
    repos.forEach((repo) => {
      const repoEl = document.createElement('a');
      repoEl.classList.add('repo');
      repoEl.href = repo.html_url;
      repoEl.target = '_blank';
      repoEl.innerText = repo.name;
      reposEl.appendChild(repoEl);
    });
  }

function addPagination(username) {
  const paginationEl = document.getElementById('pagination');
  paginationEl.innerHTML = `
    <button onclick="changePage('${username}', ${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>Prev</button>
    <span>Page ${currentPage}</span>
    <button onclick="changePage('${username}', ${currentPage + 1})">Next</button>
  `;
}

function changePage(username, page) {
  if (page < 1) return;
  currentPage = page;
  getRepos(username, currentPage);
}

function updateSearchHistory(username) {
  if (!searchHistory.includes(username)) {
    searchHistory.unshift(username);
    if (searchHistory.length > 5) searchHistory.pop();
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }
  renderSearchHistory();
}

function renderSearchHistory() {
  searchHistoryEl.innerHTML = '';
  searchHistory.forEach(user => {
    const item = document.createElement('div');
    item.classList.add('search-history-item');
    item.innerText = user;
    item.addEventListener('click', () => {
      search.value = user;
      getUser(user);
      searchHistoryEl.classList.remove('visible');
    });
    searchHistoryEl.appendChild(item);
  });
}

function showSpinner() {
  spinner.classList.remove('hidden');
}

function hideSpinner() {
  spinner.classList.add('hidden');
}

function toggleTheme() {
  document.body.classList.toggle('dark-mode');
}

window.addEventListener('scroll', () => {
    if (isAllReposLoaded || isLoadingRepos || !currentUserLogin) return;
  
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      getRepos(currentUserLogin);
    }
});
  
search.addEventListener('input', () => {
  if (search.value) {
    searchHistoryEl.classList.add('visible');
  } else {
    searchHistoryEl.classList.remove('visible');
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const user = search.value.trim();
  if (user) {
    currentPage = 1;
    getUser(user);
    search.value = '';
    searchHistoryEl.classList.remove('visible');
  }
});

themeToggle.addEventListener('click', toggleTheme);

// Initialize
renderSearchHistory();
