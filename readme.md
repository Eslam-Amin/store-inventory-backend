# Digital Bookstore Backend API

A robust, containerized backend system for a digital bookstore. This project implements a Clean Architecture pattern to manage inventory via CSV uploads and generate PDF analytics reports.

## 🚀 Tech Stack

- **Runtime:** Node.js (v18+)
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Sequelize
- **Architecture:** Modular (Startup/Routes/Controllers/Services)
- **Containerization:** Docker & Docker Compose

---

## 📂 Project Structure

```text
/
├── docker-compose.yml      # Orchestration for App + DB
├── Dockerfile              # Node.js image definition
├── server.js               # Application Entry Point
├── .env                    # Environment Variables
└── src
    ├── config              # Database Configuration
    ├── controllers         # Request Handlers (CSV Logic, PDF Generation)
    ├── middlewares         # Custom Middlewares (Error Handling, Validation)
    ├── models              # Sequelize Schemas (Store, Book, Author)
    ├── routes              # API Route Definitions
    ├── startup             # App & DB Initialization Logic
    └── utils               # Helper Utilities (Custom Errors, Formatters)

```

---

## 🐳 Quick Start (Docker) - Recommended

1. **Clone the repository:**

```bash
git clone <repository-url>
cd <repository-folder>

```

2. **Start the services:**

```bash
docker-compose up --build

```

- The API will be available at: `http://localhost:3000`
- The Database (PostgreSQL) runs on port `5432`.

3. **Stop the services:**

```bash
docker-compose down

```

---

## 💻 Manual Setup (Local Development)

1. **Install Dependencies:**

```bash
npm install

```

2. **Configure Environment:**
   Create a `.env` file in the root directory:

```env
DB_HOST=127.0.0.1
DB_USER=postgres
DB_PASS=your_password
DB_NAME=bookstore
PORT=3000

```

3. **Start the Database:**
   Ensure you have a PostgreSQL database named `bookstore` running locally.
4. **Run the App:**

```bash
# Development Mode (Auto-restart)
npm run dev

# Production Start
npm start

```

---

## 📡 API Endpoints

### 1. Upload Inventory (CSV)

Ingest data to create/update Stores, Authors, Books, and Inventory.

- **Endpoint:** `POST /api/inventory/upload`
- **Body Type:** `form-data`
- **Key:** `file` (Select CSV file)

**CSV Headers Required:**

```csv
store_name,store_address,book_name,pages,author_name,price,logo

```

### 2. Download Store Report

Generate a PDF report listing the Top 5 Priciest Books and Top 5 Prolific Authors.

- **Endpoint:** `GET /api/store/:id/download-report`
- **Example:** `GET /api/store/1/download-report`

---
