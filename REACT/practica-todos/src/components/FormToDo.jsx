import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../styles/Form.css';

function FormToDo(props) {

  const [input, setInput] = useState('');

  const handleChange = (event) => {
    setInput(event.target.value);
  }

  const handleSend = (event) => {
    //Para que no se vuelva a cargar la página al enviar el formulario
    event.preventDefault(); 

    //Creamos un nuevo objeto 
    const newTask = {
      id: uuidv4(),
      text: input,
      completed: false
    }

    //Se lo pasaremos al componente padre ListToDo cuando se envía, tenemos que pasar onSumbit(nombre estándar) como prop desde ListToDo.
    props.onSubmit(newTask);
  };

  return (
    <form 
      className='form-todo'
      onSubmit={handleSend}>
      <input
        className='input-todo'
        type='text'
        placeholder="Escriba una tarea"
        name="text"
        onChange={handleChange}
      />
      <button className='button-todo'>
        Añadir tarea
      </button>
    </form>
  );
}

export default FormToDo;