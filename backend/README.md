# Portfolio Backend System

## Overview

This system provides a backend API for a portfolio website, specifically handling two key features: **service orders** and **client reviews**. Built with plain Node.js and Express, it's designed to be simple to set up and run without requiring a separate database server.

## What It Does

### 1. Review Management
- **Public Submission**: Anyone can submit a review with a name, rating (1-5), and comment
- **Public Viewing**: Anyone can view all submitted reviews along with the average rating
- **Data Storage**: Reviews are automatically saved to a JSON file

### 2. Service Order Management
- **Order Submission**: Clients can submit service requests with their contact details, desired service, timeline, and project description
- **Private Administration**: Admins can view all submitted orders using a secret key
- **Optional Email Notifications**: When configured with SMTP settings, the system can send email alerts about new orders
- **Data Storage**: Orders are automatically saved to a JSON file

### 3. Health Monitoring
- A simple health check endpoint to verify the system is running

## System Structure

The application follows a clean, modular architecture:

### Entry Point
- `server.js` - Wires everything together and starts the Express server

### Core Components
- **Routes** (`src/routes/`) - Define URL endpoints and delegate to controllers
- **Controllers** (`src/controllers/`) - Handle request/response logic for each resource
- **Models** (`src/models/`) - Define data structure and validation rules
- **Middleware** (`src/middleware/`) - Handle errors and 404 responses
- **Utilities** (`src/utils/`) - Optional email sending functionality
- **Database Helper** (`src/db.js`) - Simple JSON file read/write operations

### Data Storage
- All data is stored in JSON files in the `data/` directory
- No external database required - perfect for low-traffic or demonstration sites

### Static Files
- The `public/` directory serves the website's frontend files

## Key Features

- **No Database Setup**: Runs with file-based storage right out of the box
- **Modular Design**: Clean separation of concerns makes the code easy to maintain
- **Same-Origin API**: Frontend and API work together seamlessly
- **Admin Protection**: Secure endpoint for viewing orders with a header-based authentication
- **Optional Email Integration**: Can notify you about new orders via email

## Use Cases

This system is ideal for:
- Personal portfolio websites
- Freelancer service pages
- Small business websites
- Projects that need a simple backend without the complexity of a full database setup

The system is designed to be lightweight and easy to understand while being extensible enough to grow into a more robust solution if needed.
