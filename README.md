<h1 align="center">🧠 AccessiScan</h1>
<h3 align="center">A Web Accessibility Analyzer built with ❤️ using React.js, Node.js, Puppeteer, and axe-core</h3>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.x-blue?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Node.js-18.x-green?style=for-the-badge&logo=node.js" />
  <img src="https://img.shields.io/badge/Express.js-black?style=for-the-badge&logo=express" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-brightgreen?style=for-the-badge&logo=mongodb" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css" />
</p>

---

## 🌐 What is AccessiScan?

**AccessiScan** is an open-source web accessibility analyzer that allows users to scan any website for accessibility issues. Powered by **axe-core** and **Puppeteer**, it provides detailed reports highlighting areas of improvement to make web experiences more inclusive for all users.

---

## 🚀 Tech Stack

| Frontend | Backend | Tools & Libraries | Database |
|---------|---------|------------------|-----------|
| React.js | Node.js | Puppeteer, axe-core | MongoDB (Atlas) |
| Tailwind CSS | Express.js | Axios, REST API |  |

---

## ✨ Features

- 🌍 **URL-based Accessibility Scanning**
- 📋 **Detailed Reports** with severity, issue type, and element info
- ⚡ **Fast & Automated** analysis using headless browser (Puppeteer)
- 📂 **History of Scans** saved in MongoDB
- 🎯 **Minimal UI** built with Tailwind CSS
- 🔒 **Secure & Clean API** with Node.js & Express

---



## 🛠️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/your-username/AccessiScan.git
cd AccessiScan

# Install backend dependencies
cd server
npm install

# Set up .env file for backend
# Example:
# MONGO_URI=your_mongodb_connection_string
# PORT=5000

# Start backend
npm run dev

# Open new terminal and install frontend
cd ../client
npm install

# Start frontend
npm run dev

