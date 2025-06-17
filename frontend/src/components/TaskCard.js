import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Chip,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import axios from 'axios';

const TaskCard = ({ task }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8081/api/tasks/${task.id}`);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <Card sx={{ mb: 2, position: 'relative' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Typography variant="h6" component="div" gutterBottom>
            {task.title}
          </Typography>
          <IconButton
            size="small"
            onClick={handleDelete}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {task.description}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Chip
            label={task.assignedTo ? task.assignedTo.name : '未分配'}
            size="small"
            color="primary"
            variant="outlined"
          />
          {task.dueDate && (
            <Typography variant="caption" color="text.secondary">
              截止日期: {new Date(task.dueDate).toLocaleDateString()}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskCard; 