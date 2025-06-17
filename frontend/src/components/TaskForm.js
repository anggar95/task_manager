import React, { useState } from 'react';
import {
  Paper,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import axios from 'axios';

const TaskForm = () => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'TODO',
    dueDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8081/api/tasks', task);
      setTask({
        title: '',
        description: '',
        status: 'TODO',
        dueDate: '',
      });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          name="title"
          label="任务标题"
          value={task.title}
          onChange={handleChange}
          required
          sx={{ flexGrow: 1 }}
        />
        <TextField
          name="description"
          label="任务描述"
          value={task.description}
          onChange={handleChange}
          multiline
          rows={1}
          sx={{ flexGrow: 2 }}
        />
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>状态</InputLabel>
          <Select
            name="status"
            value={task.status}
            onChange={handleChange}
            label="状态"
          >
            <MenuItem value="TODO">待办</MenuItem>
            <MenuItem value="IN_PROGRESS">进行中</MenuItem>
            <MenuItem value="REVIEW">审核中</MenuItem>
            <MenuItem value="DONE">已完成</MenuItem>
          </Select>
        </FormControl>
        <TextField
          name="dueDate"
          label="截止日期"
          type="date"
          value={task.dueDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <Button type="submit" variant="contained" color="primary">
          创建任务
        </Button>
      </Box>
    </Paper>
  );
};

export default TaskForm; 