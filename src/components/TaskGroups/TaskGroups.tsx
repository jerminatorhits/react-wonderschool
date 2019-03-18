import * as React from 'react';
import TaskList from '../TaskList';
import { ListItemProps } from '../ListItem/ListItem';

const API_PAYLOAD = [
  {
    id: 1,
    group: "Purchases",
    task: "Go to the bank",
    dependencyIds: [],
    completedAt: null,
  },
  {
    id: 2,
    group: "Purchases",
    task: "Buy hammer",
    dependencyIds: [1],
    completedAt: null,
  },
  {
    id: 3,
    group: "Purchases",
    task: "Buy wood",
    dependencyIds: [1],
    completedAt: null,
  },
  {
    id: 4,
    group: "Purchases",
    task: "Buy nails",
    dependencyIds: [1],
    completedAt: null,
  },
  {
    id: 5,
    group: "Purchases",
    task: "Buy paint",
    dependencyIds: [1],
    completedAt: null,
  },
  {
    id: 6,
    group: "Build Airplane",
    task: "Hammer nails into wood",
    dependencyIds: [2, 3, 4],
    completedAt: null,
  },
  {
    id: 7,
    group: "Build Airplane",
    task: "Paint wings",
    dependencyIds: [5, 6],
    completedAt: null,
  },
  {
    id: 8,
    group: "Build Airplane",
    task: "Have a snack",
    dependencyIds: [],
    completedAt: null,
  }
];

interface TaskListMap {
  [key: string]: ListItemProps[];
}

const TaskGroups = () => {
  const taskListMap: TaskListMap = API_PAYLOAD.reduce((result: { [key: string]: ListItemProps[] }, item: ListItemProps) => {
    return {
      ...result,
      [item.group]: [
        ...(result[item.group] || []),
        item
      ]
    }
  }, {});

  return (
    <div className="container">
      <h1>Things To Do</h1>
      {Object.keys(taskListMap).map((group: string, index: number) => (
        <TaskList key={index} items={taskListMap[group]} />
      ))}
    </div>
  );
};

export default TaskGroups;