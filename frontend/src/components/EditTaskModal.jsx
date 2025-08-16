import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateTask } from '../features/taskSlice';
import { Modal, Box, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

// Style for the modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

function EditTaskModal({ task, isOpen, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'To Do',
    dueDate: '',
  });

  const dispatch = useDispatch();

  // This effect runs when the 'task' prop changes (i.e., when you click edit on a task)
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        // Format the date correctly for the HTML date input
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
      });
    }
  }, [task]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const updatedTaskData = {
      ...formData,
      _id: task._id, // Pass the task ID with the update
    };
    dispatch(updateTask(updatedTaskData));
    onClose(); // Close the modal after submission
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style} component="form" onSubmit={onSubmit}>
        <Typography variant="h6" component="h2">Edit Task</Typography>
        <TextField label="Task Title" name="title" value={formData.title} onChange={onChange} fullWidth required margin="normal" />
        <TextField label="Task Description" name="description" value={formData.description} onChange={onChange} fullWidth required margin="normal" />
        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select name="status" value={formData.status} label="Status" onChange={onChange}>
            <MenuItem value="To Do">To Do</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Done">Done</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Priority</InputLabel>
          <Select name="priority" value={formData.priority} label="Priority" onChange={onChange}>
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
        </FormControl>
        <TextField name="dueDate" label="Due Date" type="date" value={formData.dueDate} onChange={onChange} fullWidth required margin="normal" InputLabelProps={{ shrink: true }} />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>Save Changes</Button>
      </Box>
    </Modal>
  );
}

export default EditTaskModal;