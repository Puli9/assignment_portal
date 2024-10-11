const Assignment = require('../models/assignmentModel');

// Function to view all assignments tagged to the admin
const viewAssignments = async (req, res) => {
  try {
    // Fetch assignments where the 'admin' field matches the logged-in admin's ID
    const assignments = await Assignment.find({ admin: req.user.id })
      .populate('userId', 'name') // Populate the user information to display the name
      .sort({ createdAt: -1 }); // Sort by most recent first

    const transformedAssignments = assignments.map(assignment => ({
      userName: assignment.userId.name,
      task: assignment.task,
      status: assignment.status,
      createdAt: `${new Date(assignment.createdAt).getDate()}-${new Date(assignment.createdAt).getMonth() + 1}-${new Date(assignment.createdAt).getFullYear()} ${new Date(assignment.createdAt).toLocaleTimeString('en-GB')}`
    }));
    
    res.status(200).json(transformedAssignments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error, could not fetch assignments' });
  }
};

// Function to accept an assignment
const acceptAssignment = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the assignment by ID and ensure it belongs to the logged-in admin
    const assignment = await Assignment.findOne({ _id: id, admin: req.user.id });
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found or not authorized' });
    }

    // Update the assignment status to 'accepted'
    assignment.status = 'accepted';
    await assignment.save();

    res.status(200).json({ message: 'Assignment accepted successfully', assignment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error, could not accept assignment' });
  }
};

// Function to reject an assignment
const rejectAssignment = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the assignment by ID and ensure it belongs to the logged-in admin
    const assignment = await Assignment.findOne({ _id: id, admin: req.user.id });
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found or not authorized' });
    }

    // Update the assignment status to 'rejected'
    assignment.status = 'rejected';
    await assignment.save();

    res.status(200).json({ message: 'Assignment rejected successfully', assignment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error, could not reject assignment' });
  }
};

module.exports = {
  viewAssignments,
  acceptAssignment,
  rejectAssignment,
};
