# 🚀 GigFlow: The Next-Gen Freelance Hub

**GigFlow** is a high-performance, full-stack marketplace designed to bridge the gap between visionaries (Clients) and experts (Freelancers). Engineered with a focus on transactional integrity and real-time responsiveness, it offers a seamless workflow for project management—from initial brief to the final hire.

---

## 🏗 System Architecture

GigFlow is built on the **MERN** stack, utilizing a "Unified User" model that allows every participant to seamlessly toggle between hiring and earning roles without switching accounts.



### Data Schematics
* **User Node**: Manages secure profiles and hashed credentials.
* **Gig Node**: Tracks project lifecycles. Gigs transition from `open` to `assigned` once a talent is secured.
* **Bid Node**: The marketplace connective tissue. Proposals include financial quotes and custom pitches, moving through `pending`, `hired`, or `rejected` states.

---

## ✨ Engineering Highlights

### 🛡️ Transactional Integrity (Bonus 1)
To prevent "double-hiring" or data race conditions, the hiring process is wrapped in a **MongoDB Session**. This ensures that the gig assignment, the winning bid approval, and the rejection of competing bids happen as a single, indivisible **ACID** transaction.



### ⚡ Live-Pulse Notifications (Bonus 2)
Powered by **Socket.IO**, the platform features a "Live-Pulse" system. When a Client clicks "Hire," the chosen Freelancer receives an instant toast notification, and their bid status updates in real-time without a page refresh.

### 🎨 Cyber-Market UI
A custom-built interface using **Tailwind CSS** and **Framer Motion**, featuring:
* **Glass-morphism** navigation and floating headers.
* **Inventory-style** project management for clients.
* **Responsive layout** optimized for both desktop and mobile workflows.

---

## 🛠 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS, Lucide Icons |
| **State** | Redux Toolkit (RTK) |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB & Mongoose (Transactions enabled) |
| **Real-time** | Socket.IO |
| **Security** | JWT (HttpOnly Cookies), BcryptJS |

---

## 🚦 API Navigation

### Auth Gateway
* `POST /api/auth/register` - New user onboarding.
* `POST /api/auth/login` - Secure entry via JWT.
* `GET /api/auth/me` - Session persistence.

### Marketplace Engine
* `GET /api/gigs` - Explore open opportunities (supports fuzzy search).
* `POST /api/gigs` - Launch a new project brief.
* `PATCH /api/bids/:bidId/hire` - The **Atomic Hire** endpoint (Owner only).
* `GET /api/bids/my/bids` - Personal proposal tracking for freelancers.

---

## 📦 Local Deployment

### 1. Prerequisites
* Node.js (v18+)
* MongoDB Cluster (v6.0+ recommended for Transaction support)

### 2. Environment Configuration
Create a `.env` file in the `/backend` directory:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_high_entropy_secret_key
PORT=5000
FRONTEND_URL=http://localhost:5173


Live Deployement : https://gigflow-7apm.onrender.com