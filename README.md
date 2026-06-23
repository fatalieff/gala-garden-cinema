# 🎬 Gala Garden Cinema - Open-Air Cinema Platform

Gala Garden Cinema is a modern and responsive web platform that allows customers to watch movies at open-air cinema and order food for their movie night. The platform features a **Telegram Bot API** powered real-time order notification system.

---

## ✨ Features

- 🍕 **Dynamic Menu System** - Real-time food data from Supabase database
- 🛒 **Shopping Cart System** - Order validation with customer information (name, phone)
- 📱 **Fully Responsive Design** - Perfect display on mobile, tablet, and desktop devices
- 🤖 **Telegram Notifications** - Orders are sent directly to the staff group via Telegram Bot API
- 🗺️ **Location Map** - Interactive map component using Leaflet
- 🎨 **Modern UI/UX** - Systematic color design with Tailwind CSS
- 🔄 **State Management** - Global state management with Redux Toolkit
- ⚡ **Vite Build** - Lightning-fast modern build tool

---

## 🛠️ Technologies

### Frontend
- **React 19** - Component-based UI structure
- **React Router v7** - Page navigation
- **Redux Toolkit + React-Redux** - Global state management
- **Tailwind CSS v4** - Utility-first styling
- **Vite 7** - Super-fast build tool

### Backend & Real-time
- **Supabase** - PostgreSQL database and authentication
- **Supabase JS Client** - Real-time database operations
- **Telegram Bot API** - Order notification system
- **Axios** - HTTP requests

### Utilities
- **React Leaflet** - Interactive maps
- **Leaflet** - Open-source mapping library
- **date-fns** - Date manipulation
- **ESLint** - Code quality control

---

## 📋 Project Structure

```
Gala Garden Cinema/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Website header
│   │   ├── Footer.jsx          # Website footer
│   │   ├── menu.jsx            # Menu component
│   │   ├── mapComponent.jsx    # Map component
│   │   ├── ScrollToTop.jsx     # Scroll to top button
│   │   └── Skeletons.jsx       # Loading placeholders
│   ├── Pages/
│   │   ├── Home.jsx            # Home page
│   │   ├── ourMenu.jsx         # Menu + Cart + Order (main page)
│   │   ├── contact-us.jsx      # Contact page
│   │   └── Users.jsx           # User profile
│   ├── store/
│   │   ├── foodSlice.js        # Redux food state
│   │   └── store.js            # Redux store configuration
│   ├── App.jsx                 # Main App component
│   ├── main.jsx                # React entry point
│   ├── supabaseClient.js       # Supabase configuration
│   └── index.css               # Global CSS
├── index.html                  # HTML template
├── package.json                # Dependencies
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS config
└── eslint.config.js            # ESLint rules
```

---

## 🚀 Installation & Setup

### 1. Clone the project
```bash
cd "Gala Garden Cinema"
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Supabase
- Create an account at [Supabase.io](https://supabase.io)
- Create a new Project
- Add **API URL** and **anon key** to `src/supabaseClient.js`:

```javascript
export const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_ANON_KEY');
```

### 4. Set up Telegram Bot
- Chat with [@BotFather](https://t.me/botfather) on Telegram
- Create a new bot and get your **API token**
- Create a Telegram group for orders
- Get your group ID: Forward the group to `@userinfobot` bot
- Complete the variables in `src/Pages/ourMenu.jsx`:

```javascript
const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN';
const TELEGRAM_CHAT_ID = 'YOUR_GROUP_CHAT_ID';
```

### 5. Create Supabase Tables

**`meals` table:**
```sql
CREATE TABLE meals (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  price INTEGER NOT NULL, -- in cents (1 AZN = 100)
  category TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 6. Start the development server
```bash
npm run dev
```

Server will open at: `http://localhost:5173`




