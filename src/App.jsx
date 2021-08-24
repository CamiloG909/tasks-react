import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { TodoList } from "./components/TodoList";
import "./App.css";

const KEY = "todoApp.todos";

export function App() {
	const [todos, setTodos] = useState([
		{ id: uuidv4(), task: "Tarea 1", completed: false },
	]);

	const todoTaskRef = useRef();

	useEffect(() => {
		const storedTodos = JSON.parse(localStorage.getItem(KEY));
		if (storedTodos) {
			setTodos(storedTodos);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(KEY, JSON.stringify(todos));
	}, [todos]);

	const toggleTodo = (id) => {
		const newTodos = [...todos];
		const todo = newTodos.find((todo) => todo.id === id);
		todo.completed = !todo.completed;
		setTodos(newTodos);
	};

	const handlerTodoAdd = () => {
		const task = todoTaskRef.current.value;
		if (task === "") return;
		setTodos((prevTodos) => {
			return [...prevTodos, { id: uuidv4(), task, completed: false }];
		});
		todoTaskRef.current.value = null;
	};

	const handlerClearAll = () => {
		const newTodos = todos.filter((todo) => !todo.completed);
		setTodos(newTodos);
	};

	return (
		<section className="tasks-box">
			<article className="tasks">
				<h1>Pending tasks</h1>
				<p className="tasks__pending">
					Te quedan {todos.filter((todo) => !todo.completed).length} tareas por
					terminar
				</p>

				<TodoList todos={todos} toggleTodo={toggleTodo} />

				<input
					ref={todoTaskRef}
					type="text"
					className="tasks__input"
					placeholder="New task"
				></input>
				<button
					title="Add task"
					className="tasks__button"
					onClick={handlerTodoAdd}
				>
					<i className="bi bi-plus-lg"></i>
				</button>
				<button
					title="Delete task"
					className="tasks__button --delete"
					onClick={handlerClearAll}
				>
					<i className="bi bi-trash-fill"></i>
				</button>
			</article>
		</section>
	);
}
