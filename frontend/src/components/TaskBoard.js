import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

const TaskBoard = ({ tasks }) => {
  const columns = {
    TODO: tasks.filter(task => task.status === 'TODO'),
    IN_PROGRESS: tasks.filter(task => task.status === 'IN_PROGRESS'),
    REVIEW: tasks.filter(task => task.status === 'REVIEW'),
    DONE: tasks.filter(task => task.status === 'DONE'),
  };

  const columnTitles = {
    TODO: '待办',
    IN_PROGRESS: '进行中',
    REVIEW: '审核中',
    DONE: '已完成',
  };

  return (
    <Grid container spacing={2}>
      {Object.keys(columns).map(columnId => (
        <Grid item xs={12} sm={6} md={3} key={columnId}>
          <Paper
            sx={{
              p: 2,
              height: 'calc(100vh - 200px)',
              overflow: 'auto',
              bgcolor: 'background.default',
            }}
          >
            <Typography variant="h6" gutterBottom>
              {columnTitles[columnId]}
            </Typography>
            <Droppable droppableId={columnId}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{ minHeight: '100px' }}
                >
                  {columns[columnId].map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default TaskBoard; 