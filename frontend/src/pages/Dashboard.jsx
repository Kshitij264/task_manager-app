import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTasks, reset } from '../features/taskSlice';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import EditTaskModal from '../components/EditTaskModal'; // Import the modal
import { Box, Typography, CircularProgress, Divider } from '@mui/material';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const { user } = useSelector((state) => state.auth);
  const { tasks, isLoading, isError, message } = useSelector(
    (state) => state.task
  );

  useEffect(() => {
    if (isError) {
      console.error(message);
    }
    if (!user) {
      navigate('/login');
      return;
    }
    dispatch(getTasks());
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);
  
  // Modal handler functions
  const handleOpenEditModal = (task) => {
    setCurrentTask(task);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentTask(null);
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1">
          Welcome {user && user.token ? 'User' : ''}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Your Task Dashboard
        </Typography>
      </Box>

      <TaskForm />
      <Divider sx={{ my: 4 }} />

      <Box>
        <Typography variant="h5" gutterBottom>
          Your Tasks
        </Typography>
        {tasks && tasks.length > 0 ? (
          <Box>
            {tasks.map((task) => (
              <TaskItem key={task._id} task={task} onEdit={handleOpenEditModal} />
            ))}
          </Box>
        ) : (
          <Typography>You have no tasks to display.</Typography>
        )}
      </Box>

      {/* Conditionally render the modal */}
      {currentTask && (
        <EditTaskModal
          task={currentTask}
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
        />
      )}
    </>
  );
}

export default Dashboard;