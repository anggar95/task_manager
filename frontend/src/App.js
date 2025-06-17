import React, { useState, useEffect } from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { DragDropContext } from 'react-beautiful-dnd';
import TaskBoard from './components/TaskBoard';
import TaskForm from './components/TaskForm';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [tasks, setTasks] = useState([]);
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    // 初始化WebSocket连接
    const client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8081/ws'),
      onConnect: () => {
        console.log('Connected to WebSocket');
        client.subscribe('/topic/tasks', message => {
          const task = JSON.parse(message.body);
          setTasks(prevTasks => {
            const index = prevTasks.findIndex(t => t.id === task.id);
            if (index >= 0) {
              const newTasks = [...prevTasks];
              newTasks[index] = task;
              return newTasks;
            }
            return [...prevTasks, task];
          });
        });

        client.subscribe('/topic/tasks/delete', message => {
          const taskId = JSON.parse(message.body);
          setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
        });
      },
    });

    client.activate();
    setStompClient(client);

    // 获取初始任务列表
    fetchTasks();

    return () => {
      client.deactivate();
    };
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    if (source.droppableId === destination.droppableId) return;

    const task = tasks.find(t => t.id === parseInt(draggableId));
    const updatedTask = { ...task, status: destination.droppableId };

    try {
      await axios.put(`http://localhost:8081/api/tasks/${task.id}`, updatedTask);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <TaskForm />
        <DragDropContext onDragEnd={handleDragEnd}>
          <TaskBoard tasks={tasks} />
        </DragDropContext>
      </Container>
    </ThemeProvider>
  );
}

export default App; 