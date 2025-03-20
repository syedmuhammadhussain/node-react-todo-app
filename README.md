# Project Name

## Overview
This repository contains a **React frontend** and a **Node.js backend**, both running on separate ports during local development. The project is designed to be deployed efficiently, with clear guidelines for setting up and running it both locally and in production.

---

## Features ✨

### Frontend
- 📝 Create, Read, Update, Delete Todos
- ✅ Mark todos as complete/incomplete
- 🔍 Filter todos by status (All/Pending/Completed)
- 🎨 Responsive UI with Tailwind CSS
- 🔄 Real-time sync with backend
- 📱 Mobile-first design
- 🛠 Form validation and error handling

### Backend
- 📈 REST API with proper status codes
- 🛡 Rate limiting and security headers
- 📦 Database normalization
- 📊 Pagination support
- 📄 API documentation
- 🚦 Health check endpoints

## Tech Stack 💻

**Frontend**
- React 19
- Redux Toolkit
- TypeScript
- Vite
- Tailwind CSS
- Axios
- Eslint

**Backend**
- Node.js 20
- Express.js
- SQL
- CORS
- Helmet

## Table of Contents
1. [Local Development Setup](#local-development-setup)
   - [Frontend Setup](#frontend-setup)
   - [Backend Setup](#backend-setup)
2. [Environment Variables](#environment-variables)
3. [Deployment Guide](#deployment-guide)
   - [Deploying the Frontend](#deploying-the-frontend)
   - [Deploying the Backend](#deploying-the-backend)
4. [Best Practices](#best-practices)
5. [Common Issues & Troubleshooting](#common-issues--troubleshooting)

---

## Local Development Setup

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (Recommended LTS version)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Vercel CLI](https://vercel.com/docs/cli) (Optional for deployment)

### Frontend Setup

1. Navigate to the `frontend` folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install  # or yarn install
   ```
3. Start the development server:
   ```sh
   npm start  # or yarn start
   ```
   The frontend will run on `http://localhost:3000` by default.

#### Proxy API Requests (Optional)
To avoid CORS issues, configure a proxy in `vite.config.ts` (for Vite) or `setupProxy.js` (for CRA):

```ts
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:8082'
    }
  }
});
```

### Backend Setup

1. Navigate to the `backend` folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install  # or yarn install
   ```
3. Set up environment variables (see [Environment Variables](#environment-variables)).
4. Start the backend server:
   ```sh
   npm run dev  # or yarn dev
   ```
   The backend will run on `http://localhost:8082` by default.

---

## Environment Variables

Both frontend and backend require `.env` files for configuration.

### Frontend (`frontend/.env`):
```
REACT_APP_API_BASE=http://localhost:8082
REACT_APP_OTHER_VARIABLE=value
```

### Backend (`backend/.env`):
```
PORT=8082
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_DATABASE=dbname
```

For production, use `.env.production` and configure them in the Vercel dashboard.

---

## Best Practices

- **Use version control:** Ensure all changes are committed before deployment.
- **Environment security:** Never commit `.env` files.
- **Optimize performance:** Enable caching and optimize static assets.
- **Monitor API usage:** Use logging and monitoring tools for backend services.

---

## Common Issues & Troubleshooting

### Issue: API Calls Failing in Production
**Solution:** Ensure `REACT_APP_API_BASE` is correctly set to the deployed backend URL.

### Issue: CORS Issues
**Solution:** Configure CORS middleware in your backend:
```js
const cors = require('cors');
app.use(cors({ origin: '*' }));
```

### Issue: Deployment Failing on Vercel
**Solution:** Check logs with:
```sh
vercel logs
```

---

## License
This project is licensed under [MIT License](LICENSE).

