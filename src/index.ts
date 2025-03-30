import { config } from 'dotenv';
config(); // Load environment variables from the .env file
import { Server } from './Server/Server';

const PORT: string | number = process.env.PORT || 3000; // Default to 3000 if PORT is not set in .env

const server = new Server(PORT);
server.start(); // Start the server
