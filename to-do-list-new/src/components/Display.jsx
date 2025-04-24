import { useEffect, useState } from "react";
import "./Display.css";
import Card from "./Card/Card";
const Display = () => {
  const [tasks, setTasks] = useState([]);
  const [ids, setIds] = useState(1);
  const [filteredTask, setFilteredTask] = useState([]);

  const [pageNo, setPageNo] = useState(1);
  const [completedTasks, setComepletedTasks] = useState([]);
  const [showComleted, setShowCompleted] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target.task.value === "") return;
    setTasks([...tasks, { id: ids, task: e.target.task.value }]);
    e.target.task.value = "";
    setIds(ids + 1);
  };

  useEffect(() => {
    const end = pageNo * 5;
    const start = end - 5;
    if (!showComleted) {
      setFilteredTask(tasks.slice(start, end));
    } else {
      setFilteredTask(completedTasks.slice(start, end));
    }
  }, [pageNo, tasks, completedTasks, showComleted]);

  const handlePrev = () => {
    setPageNo(pageNo - 1);
  };

  const handleNext = () => {
    setPageNo(pageNo + 1);
  };

  const handleshow = (e) => {
    setShowCompleted(e.target.value === "true");
    setPageNo(1);
  };

  return (
    <div className="container">
      <h1>To Do List</h1>

      <form onSubmit={(e) => handleClick(e)}>
        <input type="text" name="task" placeholder="Enter Task" />
        <button type="submit">Add</button>
      </form>
      <hr />
      <select
        className="select"
        value={showComleted}
        onChange={(e) => handleshow(e)}
      >
        <option value={false}>Not Completed Task</option>
        <option value={true}>Completed Task</option>
      </select>
      <div className="tasklist">
        {showComleted
          ? filteredTask.map((task) => (
              <Card
                key={task.id}
                task={task}
                tasks={completedTasks}
                setTasks={setComepletedTasks}
                completedTasks={tasks}
                setComepletedTasks={setTasks}
                completed={true}
              />
            ))
          : filteredTask.map((task) => (
              <Card
                key={task.id}
                task={task}
                tasks={tasks}
                setTasks={setTasks}
                completedTasks={completedTasks}
                setComepletedTasks={setComepletedTasks}
              />
            ))}
      </div>
      <span className="btn">
        <button type="button" disabled={pageNo <= 1} onClick={handlePrev}>
          Previues
        </button>
        <span className="pageno">{pageNo}</span>
        <button
          type="button"
          disabled={
            showComleted
              ? pageNo >= Math.ceil(completedTasks.length / 5)
              : pageNo >= Math.ceil(tasks.length / 5)
          }
          onClick={handleNext}
        >
          Next
        </button>
      </span>
    </div>
  );
};
export default Display;
