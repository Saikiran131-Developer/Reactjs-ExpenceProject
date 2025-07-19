const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { readData, writeData } = require('../utils/jsonStorage');
const { v4: uuidv4 } = require('uuid');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const users = readData();

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: uuidv4(),
      username,
      email,
      password: hashedPassword,
    };

    users.push(newUser);
    writeData(users);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = readData();

    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getProfile = (req, res) => {
  try {
    const userFromToken = req.user; // user info attached by auth middleware
    if (!userFromToken) {
      console.log('getProfile failed: Unauthorized - no user in request');
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const users = require('../utils/jsonStorage').readData();
    const userIndex = users.findIndex(u => u.id === userFromToken.id);
    if (userIndex === -1) {
      console.log('getProfile failed: User not found for id', userFromToken.id);
      return res.status(404).json({ message: 'User not found' });
    }
    const user = users[userIndex];
    // Return numeric id (index + 1) for user-friendly display
    res.json({ id: userIndex + 1, username: user.username, email: user.email });
  } catch (error) {
    console.log('getProfile error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register, login, getProfile };
