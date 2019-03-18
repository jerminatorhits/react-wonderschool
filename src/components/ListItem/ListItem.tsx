import * as React from 'react';
import completedSVG from '../../assets/svg/completed.svg';
import incompleteSVG from '../../assets/svg/incomplete.svg';
import lockedSVG from '../../assets/svg/locked.svg';
import { ListItemObject } from '../TaskGroups/TaskGroups';

export interface ListItemProps extends ListItemObject {
  status: ITEM_STATUS;
  onItemClick: (id: number, group: string) => void;
}

export enum ITEM_STATUS {
  LOCKED = 'locked',
  COMPLETED = 'completed',
  INCOMPLETE = 'incomplete',
}

const statusToSVG = {
  [ITEM_STATUS.COMPLETED]: completedSVG,
  [ITEM_STATUS.INCOMPLETE]: incompleteSVG,
  [ITEM_STATUS.LOCKED]: lockedSVG,
}

const ListItem = ({ id, group, status, task, onItemClick }: ListItemProps) => {
  return (
    <li key={group} onClick={() => onItemClick(id, group)} style={{ borderRight: '0', borderLeft: '0' }} className="list-group-item py-4 d-flex flex-row align-items-center">
      <div style={{ height: '24px', width: '24px' }} className="mr-5 d-flex justify-center align-center">
        <img src={statusToSVG[status]} className="h-100 w-100" />
      </div>
      <h6 className={`font-weight-bold mb-0${status === ITEM_STATUS.LOCKED ? ' text-muted' : ''}`}>{task}</h6>
    </li>
  );
};

export default ListItem;
