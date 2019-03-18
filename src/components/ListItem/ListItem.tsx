import * as React from 'react';

export interface ListItemProps {
  id: number;
  group: string;
  task: string;
  dependencyIds: number[];
  completedAt: Date | null;
}

const ListItem = ({ id, group, task, dependencyIds, completedAt }: ListItemProps) => (
  <div>
    <p>id: {id}</p>
    <p>group: {group}</p>
    <p>task: {task}</p>
    <p>dependencyIds: {dependencyIds}</p>
    <p>completedAt: {completedAt}</p>
  </div>
);

export default ListItem;
