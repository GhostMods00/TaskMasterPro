[![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Fira+Code&pause=1000&background=11FF9D00&center=true&width=450&lines=Welcome+to+TaskMasterPRO+%F0%9F%93%8A;Developed+by+Waleed%2C+Dov+and+Gabriel)](https://git.io/typing-svg)

# TaskMaster Pro 📊
A modern, feature-rich project management application built with React, Node.js, Express, and PostgreSQL. TaskMaster Pro helps teams collaborate efficiently, manage projects seamlessly, and boost productivity.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-v18.x-green.svg)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v15.x-336791.svg)](https://www.postgresql.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

## 📑 Table of Contents
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📥 Installation](#-installation)
- [🔐 Environment Setup](#-environment-setup)
- [📈 Roadmap](#-roadmap)
- [👥 Contributing](#-contributing)
- [🔄 Development Process](#-development-process)
- [📄 License](#-license)
- [📫 Contact](#-contact)
### Home Page
![App Screenshot1](https://i.imgur.com/a4NxiSw.png)

### Dashboard
![App Screenshot2](https://i.imgur.com/gTKH6RR.png)


## ✨ Features

- 📊 **Interactive Dashboard** - Get real-time insights into your projects and tasks
- 👥 **Team Collaboration** - Work together seamlessly with team members
- 📱 **Responsive Design** - Works perfectly on desktop and mobile devices
- 🌙 **Dark/Light Mode** - Choose your preferred theme
- 🔐 **Secure Authentication** - JWT-based authentication system
- 📋 **Project Management** - Create, track, and manage projects efficiently
- ✅ **Task Management** - Organize tasks with priorities and deadlines
- 📈 **Progress Tracking** - Monitor project and task progress
- 🔔 **Real-time Updates** - Stay informed with instant notifications
- 📁 **File Management** - Attach and manage files in projects and tasks

## 🛠️ Tech Stack

### Frontend
- ⚛️ **React** - UI Library
- 🔄 **Redux Toolkit** - State Management
- 🎨 **Tailwind CSS** - Styling
- 📊 **Recharts** - Data Visualization
- 🎭 **Framer Motion** - Animations
- 🔐 **JWT Decode** - Authentication

### Backend
- 🟢 **Node.js** - Runtime Environment
- 🚂 **Express.js** - Web Framework
- 🐘 **PostgreSQL** - Database
- 🔄 **Sequelize** - ORM
- 🔑 **JWT** - Authentication
- 📝 **TypeScript** - Type Safety

## 📥 Installation

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14.0.0 or higher)
- PostgreSQL (v13.0 or higher)
- npm or yarn package manager
- Git

### Step-by-Step Installation Guide

#### 1️⃣ Clone the Repository
```bash

git clone https://github.com/yourusername/taskmaster-pro.git
```

#### 2️⃣ Navigate to project directory
```bash
# cd TaskMasterPro
```
### Frontend Setup
```bash
# Navigate to frontend directory
cd client
```
#### Install dependencies
```bash
yarn install
```

### Create .env file for frontend
```bash
cp .env.example .env
```
#### Start development server
```
yarn start
```
### Backend Setup
```bash
# Navigate to frontend directory
cd server
```
#### Install dependencies
```bash
yarn install
```

### Create .env file for frontend
```bash
cp .env.example .env
```
#### Start development server
```
yarn dev start
```
## 📊 Database Setup
### Create PostgreSQL database
```bash
psql -U postgres
```
```bash
CREATE DATABASE taskmasterpro;
```
## 🔐 Environment Setup
- Required env variables ⚠️ 

## 🖥️ Frontend Environment Variables

Create a `.env` file in the root of your client directory:

```env
# Cient Configuration 🌐 
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_API_TIMEOUT=30000
```
## 🖥️ Backend Environment Variables

Create a `.env` file in the root of your server directory:

```env
# Server Configuration 🌐 
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=taskmasterpro
DB_USER=postgres
DB_PASSWORD=your_password

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=24h

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```
# 📈 Roadmap
* 💬 Team chat integration
* 📊 Advanced analytics dashboard
* ⏰ Time tracking features 
* 📱 Mobile application
* 📚 API documentation
* 📁 Enhanced file management
* ⚙️ Custom workflow automation
  
## 👥 Contributing

Contributions are welcome! Here's how you can help:

1. 🍴 Fork the repository
2. 🌱 Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. 💫 Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. 🚀 Push to the branch (`git push origin feature/AmazingFeature`)
5. 🔍 Open a Pull Request

### 🔄 Development Process
1. Fork the repository
2. Create your feature branch
```bash
git checkout -b feature/amazing-feature
```
3. Commit changes
```bash
git commit -m 'feat: add amazing feature'
```
4. Push to the branch
```bash
git push origin feature/amazing-feature
```
5. Open a Pull Request



## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📫 Contact

Let's connect! Reach out to us through:

- 📧 **Email**:
-  westendcrew1982@gmail.com
-  dgoldenthal@gmail.com
-  https://github.com/GabrielSilvaxD

---

Made with ❤️ by Waleed, Dov, Gabriel | © 2024 All Rights Reserved ✨
