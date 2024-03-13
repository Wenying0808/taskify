import React, { useRef } from "react";
import './InputField.css';

interface Props{
    todo: string,
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }:Props) => {
    const inputRef = useRef <HTMLInputElement> (null); 

    return(
        <form className="input" onSubmit={ (e)=>{
            handleAdd(e);
            inputRef.current?.blur(); /* shift the focus to input field after clicking enter*/
            }
            }>
            <input
                ref={inputRef}
                type="input"
                value={todo}
                onChange={(event) => setTodo(event.target.value)}
                placeholder="Enter a task" 
                className="input__box" />
            <button 
                className="input__submit" 
                type="submit"
                >Add</button>
        </form>
    );
}

export default InputField;
