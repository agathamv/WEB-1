import { useState } from 'react';
import FormToDo from "./FormToDo";
import ToDo from "./ToDo"
import "../styles/List.css";

function ListToDo() {

  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    //trim() quita los espacios del principio y final, y verifica que no esté vacía.
    if (task.text.trim()) {
      task.text = task.text.trim();
      //Concatena la tarea nueva a las ya existentes al principio, con "..." lo pasamos de array a objetos individuales, por eso lo concatena. Al final sería [...tasks, task]
      const updatedTasks = [task, ...tasks];
      setTasks(updatedTasks);
    }
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  const completeTask = (id) => {
    const updatedTasks = tasks.map(task => {
      if(task.id === id) {
        task.completed = !task.completed;
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <>
      <FormToDo onSubmit={addTask} />
      <div className='list-todo-container'>
        {
          tasks.map((task) => 

            <ToDo
              key={task.id}
              id={task.id}
              text={task.text}
              completed={task.completed}
              deleteToDo={deleteTask}
              completeToDo={completeTask}
            />
          )
        }
      </div>
    </>
  );
}

export default ListToDo;