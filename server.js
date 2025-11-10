import express from "express";
import fs from "fs";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());

const USERS_FILE = path.join(__dirname, 'user.json');

// Helper function to read users
function readUsers() {
  try {
    if (!fs.existsSync(USERS_FILE)) {
      return [];
    }
    const data = fs.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading users:', error);
    return [];
  }
}

// Helper function to write users
function writeUsers(users) {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing users:', error);
    return false;
  }
}

// Generate unique ID for users
function generateId() {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

// Login endpoint
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    res.json({ success: true, message: "Login successful", user: { ...user, id: user.id || generateId() } });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// Get all users (admin only)
app.get("/users", (req, res) => {
  try {
    const users = readUsers();
    const usersWithoutPasswords = users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    res.json({ success: true, users: usersWithoutPasswords });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
});

// Create user (admin only)
app.post("/users", (req, res) => {
  try {
    const { email, password, name, role = 'user' } = req.body;
    const users = readUsers();

    // Check if email already exists
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    const newUser = {
      id: generateId(),
      email,
      password,
      name,
      role,
      isActive: true,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    
    if (writeUsers(users)) {
      const { password: _, ...userWithoutPassword } = newUser;
      res.json({ success: true, message: "User created successfully", user: userWithoutPassword });
    } else {
      res.status(500).json({ success: false, message: "Failed to create user" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create user" });
  }
});

// Update user (admin only)
app.put("/users/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, isActive } = req.body;
    const users = readUsers();
    
    const userIndex = users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Update user fields
    if (name !== undefined) users[userIndex].name = name;
    if (role !== undefined) users[userIndex].role = role;
    if (isActive !== undefined) users[userIndex].isActive = isActive;
    
    if (writeUsers(users)) {
      const { password: _, ...userWithoutPassword } = users[userIndex];
      res.json({ success: true, message: "User updated successfully", user: userWithoutPassword });
    } else {
      res.status(500).json({ success: false, message: "Failed to update user" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update user" });
  }
});

// Reset password (admin only)
app.put("/users/:id/password", (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;
    const users = readUsers();
    
    const userIndex = users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    users[userIndex].password = password;
    
    if (writeUsers(users)) {
      res.json({ success: true, message: "Password reset successfully" });
    } else {
      res.status(500).json({ success: false, message: "Failed to reset password" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to reset password" });
  }
});

// Delete user (admin only)
app.delete("/users/:id", (req, res) => {
  try {
    const { id } = req.params;
    const users = readUsers();
    
    const userIndex = users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    users.splice(userIndex, 1);
    
    if (writeUsers(users)) {
      res.json({ success: true, message: "User deleted successfully" });
    } else {
      res.status(500).json({ success: false, message: "Failed to delete user" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete user" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));