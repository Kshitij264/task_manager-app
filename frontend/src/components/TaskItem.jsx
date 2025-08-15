import React from 'react';
import { Paper, Typography, Box, IconButton, Chip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function TaskItem({ task }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'error';
      case 'Medium':
        return 'warning';
      case 'Low':
      default:
        return 'success';
    }
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
        <IconButton aria-label="edit" color="primary">
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" color="error">
          <DeleteIcon />
        </IconButton>
      </Box>
    </Paper>
  );
}

export default TaskItem;