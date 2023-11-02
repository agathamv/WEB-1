import Logo from './components/Logo';
import ListToDo from './components/ListToDo';

import './App.css';

function App() {
  return (
    <div className="App">
      <Logo />
      <div className="todo-list">
        <h1>Mis Tareas</h1>
        <ListToDo />
      </div>
    </div>
  );
}

export default App;