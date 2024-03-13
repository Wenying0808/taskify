import React from 'react'
import { useState, useRef, useEffect } from 'react';
import { Todo } from '../model';
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import './SingleTodo.css';
import { Draggable } from 'react-beautiful-dnd';

type Props = {
    index: number,
    todo: Todo,
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
}

const SingleTodo = ({index, todo, todos, setTodos}: Props) => {

    const [editMode, setEditMode] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);

    const handleDone = (id: number) => {
        setTodos(todos.map((todo) => 
            todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
            )
        );
    };

    const handleDelete = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id )); //return the todo of the id doesn't match the one you click
    };

    const handleEdit = (e: React.FormEvent ,id: number) =>{
        e.preventDefault();

        setTodos(todos.map((todo) => (
            todo.id === id ? {...todo, todo: editTodo} : todo
        )));
        setEditMode(false);
    };

    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(()=>{
        inputRef.current?.focus();
    }, [editMode])


  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
        {
            (provided, snapshot) => (
                <form 
                    className={`todos__single ${snapshot.isDragging ? 'drag' : ''}`}
                    onSubmit={(e)=>handleEdit(e, todo.id)}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >

                    { editMode ? (
                        <input className="todos__single--text" ref={inputRef} value={editTodo} onChange={(e)=>setEditTodo(e.target.value)}/> //show the input when the edit mode is on
                    ) : todo.isDone ? (
                        <s className='todos__single--text'>{todo.todo}</s> //strike thorugh the todo text when task is complete
                    ) : (
                        <span className='todos__single--text'>{todo.todo}</span>
                    )}

                    <div>
                        <span className='icon' onClick={()=> {if(!editMode && !todo.isDone){setEditMode(!editMode)}}}>
                            <AiFillEdit/>
                        </span>
                        <span className='icon' onClick={()=>handleDelete(todo.id)}>
                            <AiFillDelete/>
                        </span>
                        <span className='icon' onClick={()=>handleDone(todo.id)}>
                            <MdDone/>
                        </span>
                    </div>
                </form>
            )
        }
        
        
    </Draggable>  
  )
};

export default SingleTodo;
