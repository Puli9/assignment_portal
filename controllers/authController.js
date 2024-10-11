const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Admin = require('../models/adminModel');

// Function for registering a user or admin
const register = async (req, res) => {
    const { name, email, password, role } = req.body;
  
    try {
      // Check if the email already exists in the User collection
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email is already registered as a user.' });
      }
  
      // Check if the email already exists in the Admin collection
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
        return res.status(400).json({ message: 'Email is already registered as an admin.' });
      }
  
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);
      const userData = { name, email, password: hashedPassword, role };
  
      // Create a new user or admin based on the role
      let newUser;
      if (role === 'admin') {
        newUser = await Admin.create(userData);
      } else {
        newUser = await User.create(userData);
      }
  
      res.status(201).json({ message: 'Registration successful'});
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Server error during registration' });
    }
  };

// Function for user/admin login
const login = async (req, res) => {
    // Extract email, password, and role from the request body
    const { email, password, role } = req.body;
  
    try {
      // Find the user based on the provided role:
      // - If the role is 'admin', search in the Admin collection
      // - If the role is 'user', search in the User collection
      const user = role === 'admin'
        ? await Admin.findOne({ email })
        : await User.findOne({ email });
  
      // If no user is found, return an 'Invalid credentials' message with a 401 status
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
  
      // If the password does not match, return an 'Invalid credentials' message with a 401 status
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate a JSON Web Token (JWT) that contains the user's ID and role, valid for 1 day
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
  
      // Return a success message along with the generated token
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      // Log any errors that occur during the login process and return a server error message
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
  

module.exports = { register, login };
