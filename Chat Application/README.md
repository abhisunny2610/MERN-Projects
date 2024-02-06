# MERN Chat Application

This is a full-stack chat application created using the MERN stack **(MongoDB, Express.js, React.js, Node.js)**. The application allows users to register, login, and chat with other users in real-time. It utilizes WebSocket protocol for real-time communication and MongoDB Atlas for data storage. Below is the detailed guide on how to set up and use the application.

## Technologies Used

- **MongoDB:** A NoSQL database used for storing user information and chat messages.
- **Express.js:** A web application framework for Node.js used for building the backend server.
- **React.js:** A JavaScript library used for building the frontend user interface.
- **Node.js:** A JavaScript runtime used for building the backend server.
- **Socket.IO:** A library used for real-time bidirectional event-based communication.

## Features

- **User Registration:** Users can register for an account using their email and password.
- **User Authentication:** Users can securely login and logout to their accounts.
- **Real-time Chat:** Users can send and receive messages in real-time.
- **Typing Indicator:** Users can see when another user is typing a message.
- **Message Notifications:** Users receive notifications for new messages when the chat window is not active.
- **Create Group Chat:** Users can create a group chats.

## Screenshots

### Homepage
![Homepage](./screenshots/home.png)

### Registration Page
![Registration Page](./screenshots/register.png)

### Login Page
![Login Page](./screenshots/login.png)

### Chat Interface
![Chat Interface](./screenshots/chat-interface.png)

## Usage
- Open your browser and go to http://localhost:3000.
- Register for a new account or login if you already have one.
- Once logged in, you can create or join chat rooms.
- Start chatting with other users in real-time!

## Getting Started

To run this application locally, follow these steps:

1. Clone the repository:
   
    git clone https://github.com/abhisunny2610/MERN-Projects/Chat%20Application.git

2. Navigate to the project directory: 
   
    cd Chat Application

3. Install dependencies for both the client and server:

    cd frontend \
    npm install \
    cd ../backend \
    npm install

4. Set up environment variables:

   - Create a `.env` file in the `server` directory.
   - Add the following variables:
     ```
     MONGODB_URI=<your-mongodb-uri>
     JWT_SECRET=<your-jwt-secret>
     ```

5. Start the backend:
   
    cd backend \
    npm start


6. Start the frontend:

    cd ../frontend \
    npm start

7. Open your web browser and navigate to `http://localhost:3000` to view the application.


