const Assignment = require('../models/assignmentModel');
const Admin = require('../models/adminModel');
const User = require('../models/userModel');

// Function to upload an assignment
const uploadAssignment = async (req, res) => {
    try {
      const { userId, task, admin } = req.body;
  
      // Validate that all required fields are present
      if (!userId || !task || !admin) {
        return res.status(400).json({ message: 'User name, task, and admin name are required.' });
      }
  
      // Find the user by their name
      const user = await User.findOne({ name: userId });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Find the admin by their name
      const adminUser = await Admin.findOne({ name: admin });
      if (!adminUser) {
        return res.status(404).json({ message: 'Admin not found' });
      }
  
      // Create a new assignment using the found user and admin IDs
      const newAssignment = new Assignment({
        userId: user._id, // Use the user's ID from the found user document
        task,
        admin: adminUser._id, // Use the admin's ID from the found admin document
        status: 'pending', // default status
      });
  
      // Save the assignment to the database
      await newAssignment.save();
  
      res.status(201).json({ message: 'Assignment uploaded successfully'});
    } catch (error) {
      console.error('Upload assignment error:', error.message);
      res.status(500).json({ message: 'Server error, could not upload assignment' });
    }
  };

// Function to fetch all admins
const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({}, 'name').lean();

    // Extract only the names from the result
    const adminNames = admins.map((admin) => admin.name);

    res.status(200).json(adminNames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error, could not fetch admins' });
  }
};

module.exports = {
  uploadAssignment,
  getAdmins,
};
