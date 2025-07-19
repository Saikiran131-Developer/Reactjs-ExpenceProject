# Expense Tracker MERN App - Project Folder Structure and Starter API List

## Project Folder Structure

### Frontend (React)
```
src/
  components/           # Reusable UI components (buttons, inputs, modals, charts)
  controllers/          # Controllers for business logic and state management
  models/               # Data models and state management (e.g., context, redux slices)
  views/                # Page-level components and feature views
  services/             # API service calls (axios/fetch wrappers)
  utils/                # Utility functions and helpers
  hooks/                # Custom React hooks
  styles/               # CSS/SCSS files and themes
  App.jsx               # Main app component with routing
  index.jsx             # React entry point
```

### Backend (Node.js + Express)
```
src/
  controllers/          # Route handlers and business logic
  models/               # Mongoose schemas and models
  routes/               # Express route definitions
  middleware/           # Authentication, error handling, logging middleware
  utils/                # Utility functions (e.g., JWT, email)
  config/               # Configuration files (DB, environment variables)
  app.js                # Express app setup
  server.js             # Server startup
```

## Starter API List

### Authentication
- POST /api/auth/register - Register new user (hash password, validate input)
- POST /api/auth/login - Login user (JWT token generation)
- POST /api/auth/logout - Logout user (invalidate token or clear session)
- POST /api/auth/forgot-password - Request password reset
- POST /api/auth/reset-password - Reset password with token

### Transactions
- GET /api/transactions - Get all transactions for authenticated user (with filters)
- POST /api/transactions - Add new transaction
- PUT /api/transactions/:id - Update existing transaction
- DELETE /api/transactions/:id - Delete transaction

### Categories
- GET /api/categories - Get user categories
- POST /api/categories - Create new category
- PUT /api/categories/:id - Update category
- DELETE /api/categories/:id - Delete category

### Budget Goals
- GET /api/budgets - Get budget goals
- POST /api/budgets - Set new budget goal
- PUT /api/budgets/:id - Update budget goal
- DELETE /api/budgets/:id - Delete budget goal

### Recurring Transactions
- GET /api/recurring - Get recurring transactions
- POST /api/recurring - Add recurring transaction
- PUT /api/recurring/:id - Update recurring transaction
- DELETE /api/recurring/:id - Delete recurring transaction

### User Profile
- GET /api/user/profile - Get user profile
- PUT /api/user/profile - Update user profile
- PUT /api/user/password - Change password
- PUT /api/user/settings - Update user settings (currency, dark mode)

### Data Export/Import
- GET /api/export/csv - Export transactions as CSV
- POST /api/import/csv - Import transactions from CSV

### Notifications
- GET /api/notifications - Get user notifications
- POST /api/notifications/subscribe - Subscribe to notifications
- POST /api/notifications/unsubscribe - Unsubscribe from notifications

### Data Visualization
- GET /api/analytics/category-distribution - Get data for pie chart
- GET /api/analytics/monthly-summary - Get monthly income vs expenses
- GET /api/analytics/net-balance - Get net balance over time

---

Please review this folder structure and API list. Let me know if you want me to proceed with implementing any specific parts or provide further details.
