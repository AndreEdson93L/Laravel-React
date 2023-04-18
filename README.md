# Laravel React Example Full Stack Application

This is a full stack application built using Laravel as the backend and React with Vite for the frontend. This project demonstrates user authentication, user management, and a dynamic news application that fetches data from external APIs.

## Installation

Make sure you have the environment set up properly. You will need PHP 8.1, Composer, and Node.js.

### Backend Setup

1. Download the project (or clone using GIT).
2. Copy `.env.example` into `.env` and configure the database credentials.
3. Navigate to the project's root directory using the terminal.
4. Run `composer install`.
5. Set the encryption key by executing `php artisan key:generate --ansi`.
6. Start the local server by executing `php artisan serve`.

### Frontend Setup

1. Open a new terminal and navigate to the `react` folder.
2. Copy `react/.env.example` into `.env` and adjust the `VITE_API_BASE_URL` parameter.
3. Run `npm install`.
4. Run `npm run dev` to start the Vite server for React.

## Usage

This is the first time I have worked with PHP and Laravel, but I believe the application is user-friendly and easy to use. Here's an overview of the features:

### Sign Up

In the Sign Up view, you can register for free by providing your name, email, and password.

### Login

In the Login view, you can log in using your registered email and password.

### Users

In the Users view, you can see all the users, edit their information, delete them, or add new users.

### News Application

In the navigation bar, you can access all the pages of our News Application. Each page makes an API call to fetch news data. You can filter the results dynamically using the search bar.

To obtain the API keys, visit the following websites:

- [News API](https://newsapi.org/)
- [The Guardian Open Platform](https://open-platform.theguardian.com/)

## Author

Andrea Edson Lorenzoni

## Conclusion

I hope you enjoy this project, and I am available for any further information or assistance. Please feel free to reach out if you have any questions or need help.
