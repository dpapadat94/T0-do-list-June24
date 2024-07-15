import { useEffect, useState } from "react";
//react icons
import { MdDeleteSweep } from "react-icons/md";
import { FaCheckSquare, FaRegCheckCircle } from "react-icons/fa";

const App = () => {
  const [showComplete, setShowComplete] = useState(false);
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);
  const [priority, setPriority] = useState("Normal");

  const AddTodoItem = () => {
    const newTodo = {
      title: newTask,
      description: newDescription,
      priority: priority,
    };

    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos, newTodo];
      localStorage.setItem("todolist", JSON.stringify(updatedTodos));
      return updatedTodos;
    });

    setNewTask("");
    setNewDescription("");
  };

  const handleDelete = (index) => {
    let reducedTodoList = [...todos];
    reducedTodoList.splice(index, 1);
    localStorage.setItem("todolist", JSON.stringify(reducedTodoList));
    setTodos(reducedTodoList);
  };
  const handleComplete = (index) => {
    const now = new Date();
    const completedOn = `${
      now.getMonth() + 1
    }/${now.getDate()}/${now.getFullYear()}`;

    setCompletedTodos((prevCompletedTodos) => {
      const updatedCompletedArr = [
        ...prevCompletedTodos,
        {
          ...todos[index],
          completedOn: completedOn,
        },
      ];

      localStorage.setItem(
        "completedTodos",
        JSON.stringify(updatedCompletedArr)
      );
      return updatedCompletedArr;
    });

    handleDelete(index);
  };

  const handleDeleteCompleted = (index) => {
    let reducedTodoList = [...completedTodos];
    reducedTodoList.splice(index, 1);
    localStorage.setItem("completedTodos", JSON.stringify(reducedTodoList));
    setCompletedTodos(reducedTodoList);
  };

  const getPriorityColor = (itemPriority) => {
    if (itemPriority === "High") {
      return "high-priority";
    } else if (itemPriority === "Normal") {
      return "normal-priority";
    } else if (itemPriority === "Low") {
      return "low-priority";
    } else {
      return "";
    }
  };

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todolist"));
    let savedCompletedTodo = JSON.parse(localStorage.getItem("completedTodos"));

    if (savedTodo) {
      setTodos(savedTodo);
    }
    if (savedCompletedTodo) {
      setCompletedTodos(savedCompletedTodo);
    }
  }, []);

  return (
    <div className="App">
      <div className="todo-container">
        <h1>To-Do List</h1>
        <div className="todo-form">
          <div className="todo-form-item">
            <label>Task Heading</label>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter heading"
            />
          </div>
          <div className="todo-form-item">
            <label>Task Details</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Enter task details"
            />
          </div>
          <div className="priorities">
            <h4>Priority:</h4>
            <div>
              High
              <input
                type="radio"
                name="priority"
                value="High"
                onChange={(e) => setPriority(e.target.value)}
              />
            </div>
            <div>
              Normal
              <input
                type="radio"
                name="priority"
                value="Normal"
                onChange={(e) => setPriority(e.target.value)}
              />
            </div>
            <div>
              Low
              <input
                type="radio"
                name="priority"
                value="Low"
                onChange={(e) => setPriority(e.target.value)}
              />
            </div>
          </div>
          <div className="todo-form-item">
            <button type="button" className="primaryBtn" onClick={AddTodoItem}>
              Add
            </button>
          </div>
        </div>
        <div className="btn-area">
          <button
            className={`secondaryBtn ${showComplete === false && "active"}`}
            onClick={() => setShowComplete(false)}
          >
            My Tasks
          </button>
          <button
            className={` secondaryBtn ${showComplete && "active"}`}
            onClick={() => setShowComplete(true)}
          >
            Completed
          </button>
        </div>
        <div className="todo-list">
          {showComplete === false
            ? todos.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`todo-list-item ${getPriorityColor(
                      item.priority
                    )}`}
                  >
                    <div className="item-wrapper">
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <h6>Priority: {item.priority}</h6>
                    </div>
                    <div>
                      <MdDeleteSweep
                        onClick={() => handleDelete(index)}
                        className="icon"
                      />
                      <FaCheckSquare
                        onClick={() => {
                          handleComplete(index);
                        }}
                        className="check-icon"
                      />
                    </div>
                  </div>
                );
              })
            : completedTodos.map((item, index) => {
                return (
                  <div key={index} className="todo-list-item completed">
                    <div>
                      <div>
                        <h3>
                          {item.title} <FaRegCheckCircle color="green" />
                        </h3>
                      </div>
                      <p>{item.description}</p>
                      <p>
                        <small>Completed On: {item.completedOn}</small>
                      </p>
                    </div>
                    <div>
                      <MdDeleteSweep
                        onClick={() => handleDeleteCompleted(index)}
                        className="icon"
                      />
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default App;
