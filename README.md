Favorite Movies & TV Shows Backend
This is the backend for a full-stack web application that allows users to manage a list of their favorite movies and TV shows. It is built using Node.js, Express, MySQL, and Sequelize as the ORM, following the MVC architecture.
Table of Contents

Features
Technology Stack
Setup Instructions
Database Schema
API Endpoints
Seed Data
Deployment

Features

RESTful APIs for creating, reading (with pagination), updating, and deleting media entries.
Input validation using Joi.
Database management with Sequelize ORM.
Supports infinite scrolling on the frontend through paginated responses.

Technology Stack

Node.js: Runtime environment.
Express: Web framework for API routes.
MySQL: Database for storing media entries.
Sequelize: ORM for database operations.
Joi: Schema validation for API inputs.

Setup Instructions
Prerequisites

Node.js (v18 or higher)
MySQL (v8 or higher)

Installation

Clone the Repository (or navigate to the backend directory):cd backend


Install Dependencies:npm install


Set Up MySQL:
Create a database named movies_db:CREATE DATABASE movies_db;


Update config/database.js with your MySQL credentials (replace your_password with your actual MySQL password):const sequelize = new Sequelize('movies_db', 'root', 'your_password', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});




Run the Backend:npm start

The server will run on http://localhost:5000.

Database Schema
The database is automatically created and synced by Sequelize when the server starts (sequelize.sync()). The Media model has the following schema:



Field
Type
Description



id
INTEGER
Auto-incrementing primary key


title
STRING
Title of the movie/TV show


type
ENUM
'Movie' or 'TV Show'


director
STRING
Director name


budget
STRING
Budget (e.g., '$160M')


location
STRING
Filming location


duration
STRING
Duration (e.g., '148 min')


year
STRING
Year or time range (e.g., '2010')


createdAt
DATETIME
Creation timestamp


updatedAt
DATETIME
Last update timestamp


Table name: media
API Endpoints



Method
Endpoint
Description



GET
/api/media
Fetch paginated media entries (query: page, limit)


POST
/api/media
Create a new media entry


PUT
/api/media/:id
Update a media entry by ID


DELETE
/api/media/:id
Delete a media entry by ID


Example request body for POST/PUT:
{
  "title": "Inception",
  "type": "Movie",
  "director": "Nolan",
  "budget": "$160M",
  "location": "LA, Paris",
  "duration": "148 min",
  "year": "2010"
}

Seed Data
To populate the database with sample data, run the following SQL in your MySQL client:
INSERT INTO media (title, type, director, budget, location, duration, year, createdAt, updatedAt)
VALUES
  ('Inception', 'Movie', 'Nolan', '$160M', 'LA, Paris', '148 min', '2010', NOW(), NOW()),
  ('Breaking Bad', 'TV Show', 'Gilligan', '$3M/ep', 'Albuquerque', '49 min/ep', '2008-2013', NOW(), NOW());

Deployment

Host: Deploy on platforms like Render or Railway.
Steps:
Push the backend directory to a Git repository.
Configure a MySQL database on the platform.
Set environment variables for database credentials in config/database.js (e.g., DB_HOST, DB_USER, DB_PASSWORD).
Deploy the application and ensure the server runs on a public URL (e.g., https://your-backend-url.com).


Update the frontend's API calls (in MediaForm.tsx and MediaTable.tsx) to use the deployed backend URL instead of http://localhost:5000.
