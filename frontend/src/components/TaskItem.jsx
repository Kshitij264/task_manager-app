import React from 'react';
import { Paper, Typography, Box, IconButton, Chip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../features/taskSlice';

// Add 'onEdit' to the component's props
function TaskItem({ task, onEdit }) {
  const dispatch = useDispatch();

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'error';
      case 'Medium': return 'warning';
      default: return 'success';
    }
  };

  const handleDelete = () => {
    dispatch(deleteTask(task._id));
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box>
        <Typography variant="h6">{task.title}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {task.description}
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', gap: 1, alignItems: 'center' }}>
          <Chip label={task.status} size="small" />
          <Chip label={task.priority} size="small" color={getPriorityColor(task.priority)} />
          <Typography variant="caption" color="text.secondary">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </Typography>
        </Box>
      </Box>
      <Box>
        {/* Call the onEdit function when the button is clicked, passing this task */}
        <IconButton aria-label="edit" color="primary" onClick={() => onEdit(task)}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" color="error" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Paper>
  );
}

export default TaskItem;