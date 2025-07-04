# 📦 Express MongoDB User API

This is a simple Express.js REST API connected to a MongoDB database using Mongoose. The app allows you to **create**, **read**, **update**, and **delete** (CRUD) user data. It also uses middleware and basic validation for incoming data.

---

## 📁 Project Structure
```bash
├── node_modules/ # Node dependencies
├── MOCK_DATA.json # Initial mock data (no longer used)
├── index.js # Main server file
├── package.json # Project metadata and scripts
├── package-lock.json # Dependency lock file
├── task.txt # Optional notes or tasks (your use)
├── test.txt # Optional test notes (your use)
```


---

## 🧰 Tech Stack

- **Node.js** with **Express.js**
- **MongoDB** for the database
- **Mongoose** for schema modeling

---

## 💻 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Start MongoDB
Make sure MongoDB is running on your system (local server).
MongoDB URL used: mongodb://127.0.0.1:27017/youtube-app-1

### 3. Start the Server
```bash
node index.js
```
Server will run on:
http://localhost:8000

## 🔌 API Endpoints
### ✅ Create User
**POST** /api/users
**Request body:**
```json
{
  "first_name": "Charul",
  "last_name": "192",
  "email": "charul@example.com",
  "gender": "Female",
  "ip_address": "127.0.0.1",
  "job_title": "Developer"
}
```

### 📄 Get All Users
**GET** /api/users

### 🔍 Get User by ID
**GET** /api/users/:id

### ✏️ Update User by ID
**PATCH** /api/users/:id

### ❌ Delete User by ID
**DELETE** /api/users/:id

### 🧪 Middleware
- Logs message from Middleware 1
- Adds req.myUserName = "Charul" for demo purpose

### ✅ Validation
The **POST** /api/users route checks for the presence of required fields before inserting into the database.

### 📝 Notes
MOCK_DATA.json is no longer used for user data (kept for backup/testing).
task.txt and test.txt are user-defined files, probably for notes or testing.

### 🔮 Future Suggestions
- Add validation with libraries like Joi or express-validator
- Setup Swagger/OpenAPI docs
- Add frontend to visualize the users
- Deploy on Render/Vercel/Glitch with MongoDB Atlas
