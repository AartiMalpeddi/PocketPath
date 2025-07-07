# 💸 PocketPath – MERN Stack Expense Tracker

PocketPath is a full-featured expense tracking web application built with the MERN stack (MongoDB, Express.js, React.js, and Node.js). It allows users to manage income and expenses, visualize financial trends through charts, and download reports – all within a clean and responsive dashboard.

---

## ✨ Features

### 🔐 Authentication
- User Sign Up & Login
- JWT-based session management

### 📊 Dashboard
- Sidebar with links to Dashboard, Income, Expense, and Logout
- Displays:
  - Total Balance, Income, and Expense
  - Financial Overview with Pie Chart
  - Recent Transactions
  - Last 30 Days Expense Overview
  - Last 60 Days Income Overview

### 💰 Income Management
- Add Income with:
  - Source, Amount, Date, and Emoji icon
- Histogram chart showing income trends
- List and delete income entries
- Download income as `.xlsx` file

### 💸 Expense Management
- Add Expense with:
  - Category, Amount, Date, and Emoji icon
- Expense charts and breakdowns
- List and delete expense entries
- Download expenses as `.xlsx` file

---

## 🛠️ Tech Stack

| Layer     | Technology                    |
|-----------|-------------------------------|
| Frontend  | React.js, Tailwind CSS        |
| Backend   | Node.js, Express.js           |
| Database  | MongoDB, Mongoose             |
| Others    | JWT, Bcrypt, Axios, XLSX, Chart.js |

---

## 🧠 How It Works

1. **User registers or logs in** using the authentication form.
2. **Dashboard** is displayed with total balance, income, and expenses.
3. **User navigates** via sidebar to view income or expense pages.
4. **User adds income/expense** entries using forms (with emojis and categories).
5. Charts and summaries update in real time.
6. Income and expense data can be **exported as `.xlsx` files**.

---

## 📦 Getting Started – Project Installation

### 🔧 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)

---

### 🗂️ Clone the Repository

```bash
git clone https://github.com/AartiMalpeddi/pocketpath.git
cd pocketpath
