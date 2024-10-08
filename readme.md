# GitHub User Finder

A web application that allows users to search for GitHub profiles and displays user information in a card format. The application fetches data from the GitHub API and presents it with an enhanced user interface.

## Features

- **User Search**: Search for GitHub users by username.
- **Responsive Design**: Mobile-friendly and adaptable layout for various screen sizes.
- **Modern Styling**: Clean and modern UI with dark mode support.
- **User Information**: Displays user details including avatar, bio, location, company, blog, followers, following, and public repositories.
- **Contribution Graph**: Shows the user's GitHub contribution graph.
- **Repositories List**: Displays the user's repositories with infinite scroll.
- **Search History**: Keeps track of recent searches for quick access.
- **Loading Indicator**: Shows a spinner while fetching data.
- **Error Handling**: Provides informative error messages for invalid usernames or network issues.
- **Dark Mode Toggle**: Users can switch between light and dark themes.

## Technologies Used

- **HTML5**
- **CSS3**
- **JavaScript (ES6)**
- **Axios**: For making HTTP requests to the GitHub API.
- **GitHub Calendar**: To display the user's contribution graph.

## Getting Started

Follow these instructions to set up the project on your local machine.

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge, etc.)
- Internet connection (required for API requests and external libraries)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/anubhab-m02/github-user-finder.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd github-user-finder
   ```

3. **Open `index.html` in Your Browser**

   - You can double-click the `index.html` file to open it in your default web browser.
   - Alternatively, you can serve the files using a local development server:

     ```bash
     # Using Python 3.x
     python -m http.server

     # Using Node.js and http-server
     npx http-server
     ```

     Then navigate to `http://localhost:8000` (or the port specified by your server).

## Usage

1. **Search for a User**

   - Enter a GitHub username in the search input field.
   - Press `Enter` or click the search icon (if available).

2. **View User Information**

   - The user's profile information will be displayed in a card format.
   - Scroll down to see the user's repositories, which will load automatically as you scroll (infinite scroll).

3. **Toggle Dark Mode**

   - Click the 'Toggle Dark Mode' button in the header to switch between light and dark themes.

4. **Search History**

   - Recent searches are saved and displayed when you focus on the search input.
   - Click on a username from the search history to quickly search again.

## Project Structure

```
├── index.html      # Main HTML file
├── styles.css      # CSS styles
├── script.js       # JavaScript logic
└── README.md       # Project documentation
```

### Key Components

- **`index.html`**

  - Contains the structure of the application, including the search form, main content area, and links to external libraries.

- **`styles.css`**

  - Includes all the styles for the application, such as responsive design, theming, and animations.

- **`script.js`**

  - Handles the application's logic, including fetching data from the GitHub API, updating the DOM, infinite scrolling, and managing user interactions.

## External Libraries and Resources

- **Axios**

  - Used for HTTP requests.

    ```html
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    ```

- **GitHub Calendar**

  - Used to display the user's contribution graph.

    ```html
    <!-- CSS -->
    <link
      rel="stylesheet"
      href="https://unpkg.com/github-calendar@latest/dist/github-calendar-responsive.css"
    />
    <!-- JavaScript -->
    <script src="https://unpkg.com/github-calendar@latest/dist/github-calendar.min.js"></script>
    ```

## Customization

Feel free to customize the application to suit your needs. Here are some ideas:

- **Change Theme Colors**

  - Update the CSS variables in `styles.css` to modify the color scheme.

- **Adjust Number of Repositories Loaded**

  - In `script.js`, modify the `reposPerPage` variable to change how many repositories are loaded at a time.

- **Add More User Information**

  - Fetch and display additional user data from the GitHub API, such as email, hireable status, or social media links.

## Limitations

- **GitHub API Rate Limiting**

  - The application uses unauthenticated requests to the GitHub API, which are limited to 60 requests per hour per IP address.
  - If you exceed this limit, you may encounter errors or be temporarily unable to fetch data.

## Troubleshooting

- **Contribution Graph Not Displaying**

  - If the contribution graph does not load due to CORS issues, consider using an alternative method, such as displaying an image of the graph:

    ```html
    <img src="https://ghchart.rshah.org/username" alt="GitHub Contribution Chart" />
    ```

    Replace `username` with the actual GitHub username.

- **API Errors**

  - If you receive errors from the GitHub API, ensure that you have not exceeded the rate limit and that the username entered exists.

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the Repository**

   Click the "Fork" button at the top right of the repository page.

2. **Clone Your Fork**

   ```bash
   git clone https://github.com/anubhab-m02/github-user-finder.git
   ```

3. **Create a New Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make Your Changes**

   Implement your feature or fix.

5. **Commit Your Changes**

   ```bash
   git commit -am 'Add some feature'
   ```

6. **Push to the Branch**

   ```bash
   git push origin feature/your-feature-name
   ```

7. **Submit a Pull Request**

   Open a pull request on the original repository and describe your changes.

## Acknowledgments

- **[GitHub API](https://docs.github.com/en/rest)**: For providing access to user data.
- **[Axios](https://github.com/axios/axios)**: Simplifying HTTP requests.
- **[GitHub Calendar](https://github.com/IonicaBizau/github-calendar)**: For the contribution graph component.

## Contact

For questions or suggestions, please open an issue.

---

*Note: Replace placeholders like `yourusername`, `your email or GitHub profile link`, and add an actual screenshot or GIF where indicated.*