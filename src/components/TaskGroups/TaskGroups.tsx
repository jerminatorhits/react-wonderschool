import * as React from "react";
import groupSVG from "../../assets/svg/group.svg";
import TaskList from "../TaskList";

const API_PAYLOAD = [
  {
    id: 1,
    group: "Purchases",
    task: "Go to the bank",
    dependencyIds: [],
    completedAt: null
  },
  {
    id: 2,
    group: "Purchases",
    task: "Buy hammer",
    dependencyIds: [1],
    completedAt: null
  },
  {
    id: 3,
    group: "Purchases",
    task: "Buy wood",
    dependencyIds: [1],
    completedAt: null
  },
  {
    id: 4,
    group: "Purchases",
    task: "Buy nails",
    dependencyIds: [1],
    completedAt: null
  },
  {
    id: 5,
    group: "Purchases",
    task: "Buy paint",
    dependencyIds: [1],
    completedAt: null
  },
  {
    id: 6,
    group: "Build Airplane",
    task: "Hammer nails into wood",
    dependencyIds: [2, 3, 4],
    completedAt: null
  },
  {
    id: 7,
    group: "Build Airplane",
    task: "Paint wings",
    dependencyIds: [5, 6],
    completedAt: null
  },
  {
    id: 8,
    group: "Build Airplane",
    task: "Have a snack",
    dependencyIds: [],
    completedAt: null
  }
];

export enum ITEM_STATUS {
  LOCKED = "locked",
  COMPLETED = "completed",
  INCOMPLETE = "incomplete"
}

interface State {
  tasks: ListItemObject[];
  selectedGroup: string | null;
}

interface TaskListMap {
  [group: string]: ListItemObject[];
}

export interface ListItemObject {
  id: number;
  group: string;
  task: string;
  dependencyIds: number[];
  completedAt: Date | null;
}

class TaskGroups extends React.Component<State> {
  readonly state: State = {
    tasks: API_PAYLOAD,
    selectedGroup: null
  };

  handleGroupClick = (event?: React.MouseEvent) => {
    this.setState({ selectedGroup: event ? event.currentTarget.id : null });
  };

  handleItemClick = (id: number) => {
    const { tasks } = this.state;
    let completedSet = new Set();
    tasks.forEach(
      (task: ListItemObject) => task.completedAt && completedSet.add(task.id)
    );

    const task = tasks.find(item => item.id === id);
    if (!task) return;

    const completedAt =
      !task.completedAt &&
      (!task.dependencyIds.length ||
        task.dependencyIds.every((id: number) => {
          const foundTask = tasks.find(item => item.id === id);
          return !!foundTask && !!foundTask.completedAt;
        }))
        ? new Date()
        : null;
    if (!completedAt) {
      let collectionToReset = new Set();
      recursiveReset(tasks, id, collectionToReset);

      this.setState({
        tasks: tasks.map(item => {
          return {
            ...item,
            completedAt: collectionToReset.has(item.id) ? null : completedAt
          };
        })
      });
      return;
    }

    this.setState({
      tasks: tasks.map(item => {
        if (item.id !== id) {
          return item;
        }

        return {
          ...item,
          completedAt
        };
      })
    });
  };

  render() {
    const { selectedGroup, tasks } = this.state;
    const sortedTasks: TaskListMap = tasks.reduce(
      (result: TaskListMap, item: ListItemObject) => {
        return {
          ...result,
          [item.group]: [...(result[item.group] || []), item]
        };
      },
      {}
    );
    let completedSet = new Set();
    let lockedSet = new Set();
    tasks.forEach(
      (task: ListItemObject) => task.completedAt && completedSet.add(task.id)
    );
    tasks.forEach((task: ListItemObject) => {
      task.dependencyIds.some((id: number) => !completedSet.has(id)) &&
        lockedSet.add(task.id);
    });
    return (
      <div className="container h-100">
        <div className="row h-100">
          <div className="col-3" />
          <div className="col-6 mt-5">
            <div className="row mb-4 w-100">
              <div className="col-6 text-left">
                <h2 className="mb-0">{selectedGroup || "Things To Do"}</h2>
              </div>
              <div className="col-6 d-flex align-items-end justify-content-end">
                {selectedGroup && (
                  <a
                    href="#"
                    onClick={this.handleGroupClick}
                    className="h4 text-primary mb-0"
                  >
                    ALL GROUPS
                  </a>
                )}
              </div>
            </div>
            <ul className="list-group">
              {!selectedGroup ? (
                Object.keys(sortedTasks).map((group: string) => {
                  const items = sortedTasks[group];
                  const numberOfCompleted = items.filter(
                    (item: ListItemObject) => item.completedAt
                  ).length;
                  return (
                    <li
                      key={group}
                      id={group}
                      onClick={this.handleGroupClick}
                      style={{ borderRight: "0", borderLeft: "0" }}
                      className="list-group-item py-4 d-flex flex-row align-items-center"
                    >
                      <div
                        style={{ height: "32px", width: "32px" }}
                        className="mr-5"
                      >
                        <img src={groupSVG} />
                      </div>
                      <div className="d-flex flex-column text-left">
                        <h6 className="font-weight-bold mb-0">{group}</h6>
                        <h6 className="text-muted mb-0">
                          {numberOfCompleted} OF {items.length} TASKS COMPLETE
                        </h6>
                      </div>
                    </li>
                  );
                })
              ) : (
                <TaskList
                  items={sortedTasks[selectedGroup]}
                  lockedSet={lockedSet}
                  onItemClick={this.handleItemClick}
                />
              )}
            </ul>
          </div>
          <div className="col-3" />
        </div>
      </div>
    );
  }
}

export default TaskGroups;

function recursiveReset(
  tasks: ListItemObject[],
  id: number,
  collectionToReset: Set<number>
) {
  let subIds: number[] = [];
  tasks.forEach(task => {
    if (task.dependencyIds.includes(id) && !collectionToReset.has(id)) {
      collectionToReset.add(id);
      subIds.push(id);
    }
  });
  subIds.forEach(subId => recursiveReset(tasks, subId, collectionToReset));
}
