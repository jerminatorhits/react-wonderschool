import * as React from 'react';
import ListItem from '../ListItem';
import { ListItemProps } from '../ListItem/ListItem';

interface Props {
  items: ListItemProps[];
}
class TaskList extends React.Component<Props, {}> {
  readonly state = {
    
  }
  
  render() {
    return (
      <div>
        {this.props.items.map((item: ListItemProps, index: number) => 
          <ListItem key={index} {...item}/>
        )}
      </div>
    )
  }
}

export default TaskList;