# 2048 Trial Game

Welcome to the 2048 Trial Game project! This project is an implementation of the classic 2048 game using React for the frontend and Node.js with Express for the backend.

## Features

- Play the classic 2048 game on a 4x4 grid.
- Slide tiles in four directions: up, down, left, right.
- Merge tiles with the same number to create higher-value tiles.
- Randomly spawn new tiles (2 or 4) after each move.
- Win by reaching the 2048 tile.
- View high scores and submit your score.
- Responsive design using Tailwind CSS.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Styling**: Tailwind CSS

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

- Node.js (with npm)
- MySQL Server

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Sarvesh-Mane/2048-trial-game.git
   cd 2048-trial-game
Install dependencies:

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
Set up MySQL database:

Create a MySQL database named 2048game.
Update the database configuration in backend/index.js.
Run the application:

# Start the backend server (from the backend directory)
npm start

# Start the frontend development server (from the frontend directory)
npm start
Access the application:

Open your web browser and go to http://localhost:3000 to play the game.

Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to submit an issue or pull request.

License
This project is licensed under the MIT License - see the LICENSE file for details.
