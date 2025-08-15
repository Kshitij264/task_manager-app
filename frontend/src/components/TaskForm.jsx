import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from '../features/taskSlice';
import { Box, TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

function TaskForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: '',
  });
  const { title, description, priority, dueDate } = formData;
  
  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  
  const onSubmit = (e) => {
    e.preventDefault();
    // We will pass the full taskData object. The `assignedTo` field will be
    // added in the Dashboard component before dispatching.
    dispatch(createTask(formData));
    // Clear the form for the next entry
    setFormData({
      title: '',
      description: '',
      priority: 'Medium',
      dueDate: '',
    });
  };
  
  return (
    <Box component="form" onSubmit={onSubmit} sx={{ mb: 4 }}>
      <Typography variant="h5" gutterBottom>Create a New Task</Typography>
      <TextField
        label="Task Title"
        name="title"
        value={title}
        onChange={onChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Task Description"
        name="description"
        value={description}
        onChange={onChange}
        fullWidth
        required
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Priority</InputLabel>
        <Select name="priority" value={priority} label="Priority" onChange={onChange}>
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </Select>
      </FormControl>
      <TextField
        name="dueDate"
        label="Due Date"
        type="date"
        value={dueDate}
        onChange={onChange}
        fullWidth
        required
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Add Task
      </Button>
    </Box>
  );
}

export default TaskForm;