import * as React from 'react';
import { useState } from "react";
import {v4 as uuidv4} from "uuid";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HeadingToDo from "./HeadingToDo";
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import "./ToDoList.css";


export default function ToDoList(){

    let [task, setTask] = useState([{todo : "sample", id : uuidv4(), isOver : false}]);
    let [newTask, setNewTask] = useState("");

    function addTask(){
        setTask((prevTask) => {
            return [...prevTask, {todo : newTask, id : uuidv4(), isOver : false}]
        });
        setNewTask("");
    }

    function addNewTask(event){
        setNewTask(event.target.value);
    }

    function deleteTask(id) {
        let copy = ((prevTask) => task.filter((Task) => Task.id != id));
        if(task.length == 1){deleteAll()}
        else {setTask(copy);}
    }

    function deleteAll() {
        setTask([{todo : "Nothing", id : uuidv4(), isOver : true}]);
    }

    function undoneAll() {
        setTask((prevTask) => prevTask.map((Task) => {
            return {
                ...Task,
                isOver : false
            }
        }));
    }

    function UndoneOne(id)  {
        setTask((prevTask) => prevTask.map((Task) => {
            if(Task.id == id){
                return {
                    ...Task,
                    isOver : false
                }
            } else return Task;
            
        }));
    }

    function MarkDoneAll() {
        setTask((prevTask) => prevTask.map((Task) => {
            return {
                ...Task,
                isOver : true
            }
        }));
    }

    function MarkDoneOne(id) {
        setTask((prevTask) => prevTask.map((Task) => {
            if(Task.id == id){
                return {
                    ...Task,
                    isOver : true
                }
            } else return Task;
        }));
    }

    return (
    <>
        <HeadingToDo />
        <div className="input-place">
            <input type="text" placeholder="Enter your tasks" value={newTask} onChange={addNewTask}/> &nbsp;
            <Button onClick={addTask} color="secondary" variant="contained">Add Task</Button>
            <h4 className='bodyH4'>Things to Do</h4> <br />
        </div>
        
        
        <div className="todo-List">
            <ul>
                {
                    
                    task.map((work) => (
                        <div className="tasks">
                            <li key={work.id}><span style={work.isOver ? {display : "none"} : {}}>{work.todo}</span> &nbsp; &nbsp;
                                <Button onClick={() => deleteTask(work.id)} variant="contained" color="error"><DeleteIcon fontSize="small"/></Button> &nbsp;
                                <Button onClick={() => UndoneOne(work.id)} variant="contained"><UnpublishedIcon/></Button> &nbsp;
                                <Button onClick={() => MarkDoneOne(work.id)} variant="contained" color="success"><CheckCircleIcon/></Button>
                                <br />
                            </li>
                        </div>
                    ))
                }
            </ul>
        </div>
        
        <div className='bottomButtons'>
            <Button onClick={deleteAll } variant="contained" color="error"><DeleteIcon fontSize="small"/> Delete All</Button> &nbsp;
            <Button onClick={undoneAll} variant="contained"><UnpublishedIcon/>Undone All</Button> &nbsp;
            <Button onClick={MarkDoneAll} variant="contained" color="success"><CheckCircleIcon/> ALL Done</Button>
        </div>
        
        
      
    </>);

}