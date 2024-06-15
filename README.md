# Karthik Pomodoro Project

This repository holds the React.js code for the Karthik Pomodoro Project.

## Pages Needed

1. **Login Page**: Accessible at the root path `/`
   - This is the main entry point of the application where users can log in.
2. **404 Page**: Accessible at `/notfound`
   - This page is displayed when a user navigates to a route that does not exist.
3. **Home Page**: Accessible at `/home?timestamp=<UNIX_TIMESTAMP>`
   - This page displays the home screen with a query parameter for a timestamp.

## Login Information

The login information is stored in `sessionStorage`. This means that the user needs to log in every time they visit the app or reload the page.
- **sessionStorage**: A web storage object that stores data for the duration of the page session.
- **Implication**: The login state is not persistent across browser sessions or tab closures, ensuring a new login is required for each visit.
