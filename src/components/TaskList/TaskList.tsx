import * as React from 'react';
import ListItem from '../ListItem';
import { ListItemObject, ITEM_STATUS } from '../TaskGroups/TaskGroups';

interface Props {
  items: ListItemObject[];
  lockedSet: Set<number>;
  onItemClick: (id: number, group: string) => void;
}

class TaskList extends React.Component<Props, {}> {
  render() {
    const { items, lockedSet, onItemClick } = this.props;
    return (
      <div>
        {items.map((item: ListItemObject, index: number) => {
          const status =
            item.completedAt ? ITEM_STATUS.COMPLETED :
            lockedSet.has(item.id) ? ITEM_STATUS.LOCKED :
            ITEM_STATUS.INCOMPLETE;
          return <ListItem key={index} onItemClick={onItemClick} status={status} {...item} />
         })}
      </div>
    )
  }
}

export default TaskList;
