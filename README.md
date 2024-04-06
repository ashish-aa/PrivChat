# ChatNexus

Welcome to ChatNexus! This project is a real-time chat application built using Node.js, Express.js, Socket.IO, and MongoDB. It enables users to create private chat rooms with unique passkeys, facilitating seamless communication with other users.

## Features

- **Real-time Communication**: Utilizes Socket.IO for instant messaging and chat room functionality, providing users with a seamless communication experience without page reloads.
- **Private Chat Rooms**: Users can create private chat rooms with unique passkeys and share them with others to join, ensuring secure and private conversations.
- **User Authentication**: Implements user authentication to secure user accounts and prevent unauthorized access to chat rooms.
- **Scalable Backend**: Built with Node.js, Express.js, and MongoDB, the backend ensures efficient data storage and scalability as the user base grows.
- **Intuitive User Interface**: Features an intuitive user interface with streamlined room creation and joining functionalities, enhancing user engagement and satisfaction.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/ashish-aa/chatnexus.git
    ```

2. Install dependencies:

    ```bash
    cd chatnexus
    npm install
    ```

3. Set up environment variables:

    ```
    Create a .env file in the root directory and add the following:

    PORT=3000
    MONGODB_URI=your_mongodb_uri
    ```

4. Start the server:

    ```bash
    npm start
    ```

5. Access the application in your browser at `http://localhost:3000`.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript, EJS
- **Backend**: Node.js, Express.js
- **Real-time Communication**: Socket.IO
- **Database**: MongoDB

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request for any improvements or features you'd like to add.

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Create a new Pull Request.
