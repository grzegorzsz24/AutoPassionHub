# MotoSplot

<p>MotoSplot is a digital community platform designed and implemented as a part of an engineering project. The application caters to automotive enthusiasts, offering a comprehensive space for information sharing, interaction, and collaboration. The project includes both server-side and client-side components. An important component of the application is <b>real-time chat</b> between friends.</p>


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
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Functional requirements](#functional-requirements)
  - [Authorization](#authorization)
  - [Posts](#posts)
  - [Friends](#friends)
  - [Forums](#forums)
  - [Articles](#articles)
  - [Events](#events)
  - [Administrator-Specific Functionalities](#administrator-specific-functionalities)
- [Features](#features)
- [App screenshots](#app-screenshots)
- [Running the application on local machine](#running-the-application-on-local-machine)
- [Running the application using Docker](#running-the-application-using-docker)
- [Contact](#contact)

## Technologies used in the project:
### Backend
  [![](https://skills.thijs.gg/icons?i=java,spring,hibernate,postgres,postman,&theme=dark)](https://skills.thijs.gg)
### Frontend
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
- Real-time private chat among friends.
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
### Events:
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
### Login page
![login_page](/screens/login_page.png)
### Register page
![register_page](/screens/register_page.png)
### Main page
![main_page](/screens/main_page_with_report.png)
![main_page_with_my_post](/screens/main_page_with_my_post.png)
### Main page - adding new post
![main_page_adding_new_post](/screens/main_page_adding_post.png)
### Photo preview
![photo_preview](/screens/gallery.png)
### Main page - global search
![main_page_global_search](/screens/main_page_with_global_search.png)
![main_page_global_search_light](/screens/main_page_with_global_search_light.png)
### Main page - notifications
![main_page_notifications](/screens/notifications.png)
### User page
![user_page](/screens/user_page_with_received_notification.png)
### Forums page
![forums_page](/screens/forums_page.png)
![forums_page_with_filters](/screens/forums_page_with_filters.png)
![forum_page_with_message_notifications](/screens/messages_notifications.png)
### Forum page
![forum_page](/screens/forum_page.png)
### Add forum page
![add_forum_page](/screens/add_forum_page.png)
### Articles page
![articles_page](/screens/articles_page.png)
### Article page
![article_page](/screens/article_page.png)
### Add article page
![add_article_page](/screens/new_article_page.png)
### Events page
![events_page](/screens/events_page.png)
### Event page
![event_page](/screens/event_page.png)
### Add event page
![add_event_page](/screens/add_event_page.png)
### Saved forums page
![saved_forums_page](/screens/saved_page.png)
### Logged in user profile page
![logged_in_user_profile_page](/screens/my_page.png)
### Settings page
![change_personal_data_page](/screens/change_my_data_page.png)
![change_my_photo_page](/screens/change_my_photo_page.png)
### Friends page
![friends_page](/screens/friends_page.png)

### Articles to approve page - for admin only
![articles_to_approv_page](/screens/articles_to_approv_page.png)

### Reported forums page - for admin only
![reported_forums_page](/screens/reported_forums.png)

### Chat page
![chat_page](/screens/chat_page.png)
![chat_page_with_no_messages](/screens/chat_page_with_no_messages.png)
![chat_page_with_messages](/screens/chat_page_with_messages.png)

## Running the application on local machine
#### Download repository
1. Open your terminal or command prompt.
2. Navigate to the directory where you want to clone the repository.
3. Execute the following command to clone the repository:

        git clone https://github.com/grzegorzsz24/AutoPassionHub.git

5. After cloning is complete, navigate into the project's main directory:

        cd AutoPassionHub

#### Run Server Application
1. To run the server application, you need Java 17 and a PostgreSQL database.
2. Create a database named "testdb" in PostgreSQL with no additional options. The database server should run on port 5432, or you can change the port number in the application-dev.yml file in the resources directory. Ensure that the database user is named "postgres," and the password is set to "user." You can modify these credentials in the same application-dev.yml file.
3. Open the terminal in the main project directory (Application): backend\AutomotiveApp.
4. Enter the following command in the console:

        mvn spring-boot:run -Dspring-boot.run.profiles=dev

#### Run Client Application
1. The client application requires Node.js to run.
2. Open the terminal in the main project directory (Application): frontend.
3. Enter and execute the following command:

        npm install

4. Enter and execute the following command:

       npm run dev
   
## Running the application using Docker

...

## Contact

If you have any questions or feedback regarding MotoSplot, please contact us at kacper2007x48@gmail.com or grzesio.szymanek@gmail.com
