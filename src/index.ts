import {config} from 'dotenv';
config(); // Load environment variables from the .env file
import express from 'express';
import { Server } from './Server/Server';

const app = express();
const PORT: string | number = process.env.PORT || 3000; // Default to 3000 if PORT is not set in .env

const server = new Server(PORT);
server.start(); // Start the server
