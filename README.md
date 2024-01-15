# MotoSplot

MotoSplot is a digital community platform designed and implemented as a part of an engineering project. The application caters to automotive enthusiasts, offering a comprehensive space for information sharing, interaction, and collaboration. The project includes both server-side and client-side components.

## Link to App

...

#### If you don't want to create an account, you can use the following guest login details:

email: kacper@gmail.com <br>
password: haslo123

## Authors
- Szymanek Grzegorz - Backend
- Stępień Kacper - Frontend

## Table of contents

- [Technologies used in the project](#technologies-used-in-the-project)
- [Functional requirements](#functional-requirements)
- [Features](#features)
- [App screenshots](#app-screenshots)
- [Running the application on local machine](#running-the-application-on-local-machine)
- [Running the application using Docker](#running-the-application-using-docker)
- [Contact](#contact)

## Technologies used in the project:

- <b>Backend:</b> <br>
  [![](https://skills.thijs.gg/icons?i=java,spring,hibernate,postgres,postman,&theme=dark)](https://skills.thijs.gg)
- <b>Frontend:</b> <br>
  [![](https://skills.thijs.gg/icons?i=ts,react,redux,tailwind,vite,xd,&theme=dark)](https://skills.thijs.gg)

## Functional Requirements
### Authorization:
- Logging in: Regular users and administrators can log into their accounts.
- Editing personal data.
- Changing password.
- Adding and changing profile pictures.
- Adjusting privacy settings: public or friends-only.
### Posts:
- Browsing and Interaction:
- Users can browse the latest posts on the main page.
- Adding posts consisting of text and up to five images.
- Editing and deleting user's own posts.
- Commenting on own and other users' posts within the friends list.
- Editing and deleting comments belonging to the user.
- Liking and unliking posts.
- Reporting posts.
### Friends:
- Searching for other users by entering their first name, last name, or username.
- Browsing profiles of other users.
- Sending, accepting, rejecting friend requests.
- Removing another user from the friends list.
- Engaging in private conversations with friends.
### Forums:
- Browsing forums and opening new forum threads.
- Commenting on all forums.
- Searching for forums by filters: car make and model or name.
- Adding forums to the saved list.
- Reporting forums.
### Articles:
- Managing Automotive Articles:
- Browsing automotive articles.
- Adding automotive articles (subject to approval by administrators).
- Searching for articles by filters: car make and model.
- Adding articles to the saved list.
Events:
- Managing Automotive Events:
- Browsing automotive events.
- Adding automotive events.
### Administrator-Specific Functionalities:
- Deleting any post or forum.
- Approving or rejecting articles submitted by users.
- Reviewing reports of violations of platform regulations by other users.

## Features:

- <b>JWT Authentication:</b> The application utilizes JWT for user authentication, and the token is stored in a cookie.

- <b>Real-time Chat and Notifications:</b>  WebSocket is employed for real-time chat functionality and notifications. Users receive instant notifications, such as when someone likes their post or sends a friend request.

- <b>Single Page Application (SPA):</b>  The application is built as a Single Page Application, and React Router is used for navigation between different views without the need for full-page reloads.

- <b>Image Compression and Format Conversion:</b>  The size and quality of images uploaded to posts are reduced on the frontend, and their extension is converted to WebP. This process minimizes the storage size of images in the database without a noticeable decrease in quality.

- <b>Global Search Functionality:</b>  The application features a global search that allows users to search for all content and users within the platform.

- <b>Dark and Light Themes:</b>  Users have the option to switch between dark and light themes in the application.

- <b>Redux Toolkit for Global State Management:</b>  Redux Toolkit is utilized for storing global state in the application, providing efficient state management.


## App screenshots

...

## Running the application on local machine

## Running the application using Docker

...

## Contact

If you have any questions or feedback regarding MotoSplot, please contact us at kacper2007x48@gmail.com or grzesio.szymanek@gmail.com
