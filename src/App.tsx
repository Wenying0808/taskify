import React from 'react';
import { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import { Todo } from './model';
import TodoList from './components/TodoList';
import {DragDropContext, DropResult} from 'react-beautiful-dnd';

const App: React.FC = () =>  {

  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault(); //prevent refresh when clicking add
    if(todo){
      setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }]);
      setTodo(''); //empty the input field after adding a task
    }
  };

  const onDragEnd = (result: DropResult) => {
    console.log(result);
    const { source, destination } = result;
    if (!destination) return; //if the destination is null, return the singletodo to original place
    if (destination.droppableId === source.droppableId && destination.index === source.index) return; //if the drop place is the same as the drag place
    let add;
    let active = todos;
    let complete = completedTodos;

    if (source.droppableId === 'TodoList'){
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === 'TodoList'){
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setTodos(active);
    setCompletedTodos(complete);


  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
            <span className="heading">Taskify</span>
            <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
            <TodoList 
              todos={todos} 
              setTodos={setTodos}
              completedTodos={completedTodos}
              setCompletedTodos={setCompletedTodos}
              />
      </div>
    </DragDropContext>
    
  );

}

export default App;
