# Blog Post Management System

## Project Overview

A production-ready blog post manager with full CRUD, search, pagination, CSV export, and a modern responsive dashboard UI.

## Features

- Create, view, update, and delete blog posts
- Search by title, author, or category
- Server-side pagination and sorting
- Filter by category and status
- CSV export for all or filtered posts
- Centralized validation and error handling
- Responsive MUI-based interface with toast notifications

## Tech Stack

**Frontend:** React, Vite, Material UI, Redux Toolkit, React Router, React Hook Form, Yup, Axios, React Toastify

**Backend:** Node.js, Express, MongoDB, Mongoose, json2csv

## Installation

Clone the repository and install dependencies in both apps:

```bash
cd backend
npm install

cd ../frontend
npm install
```

## Backend Setup

Create a `backend/.env` file based on the values below:

```bash
PORT=5000
MONGODB_URI=
NODE_ENV=development
```

Run the backend:

```bash
cd backend
npm run dev
```

## Frontend Setup

Create a `frontend/.env` file with the API URL:

```bash
VITE_API_URL=http://localhost:5000/api
```

Run the frontend:

```bash
cd frontend
npm run dev
```

## Environment Variables

Copy values from `.env.example` and place them in the correct app folder:

- `backend/.env` for API settings
- `frontend/.env` for the Vite API URL

## MongoDB Setup

- Create a MongoDB database (local or cloud)
- Add the connection string to `MONGODB_URI`

## API Documentation

Base URL: `/api`

| Method | Endpoint            | Description                            |
| ------ | ------------------- | -------------------------------------- |
| POST   | `/blogs`            | Create a blog post                     |
| GET    | `/blogs`            | List blogs with filters and pagination |
| GET    | `/blogs/:id`        | Get a single blog                      |
| PUT    | `/blogs/:id`        | Update a blog                          |
| DELETE | `/blogs/:id`        | Delete a blog                          |
| GET    | `/blogs/export/csv` | Export blogs to CSV                    |

### List Blogs Query Params

```
?page=1
&limit=10
&search=react
&category=Technology
&status=Published
&sortBy=createdAt
&order=desc
```

## Folder Structure

```
root/
  backend/
  frontend/
  .env.example
  render.yaml
```

## Deployment Steps

### Backend (Render)

- Create a new Web Service using the repo
- Root directory: `backend`
- Build command: `npm install`
- Start command: `npm start`
- Set environment variables: `MONGODB_URI`, `NODE_ENV`

### Frontend (Vercel)

- Create a new project pointing to the `frontend` folder
- Build command: `npm run build`
- Output directory: `dist`
- Set environment variable: `VITE_API_URL`

## Screenshots

<img width="1864" height="873" alt="image" src="https://github.com/user-attachments/assets/385e5556-16f4-41da-b8c0-a2314227b21f" />
<img width="933" height="872" alt="image" src="https://github.com/user-attachments/assets/7d85597e-a7be-4ad8-a098-b55e9bfc9147" />

