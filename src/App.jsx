import React, { useState, useRef, useEffect, Fragment } from "react";
import { v4 as uuidv4 } from "uuid";
import { TodoList } from "./components/TodoList";
import Header from "./components/Header";
import "./App.sass";

const KEY = "todoApp.todos";

export function App() {
	const [todos, setTodos] = useState([
		{ id: uuidv4(), task: "Task 1", completed: false },
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
		<Fragment>
			<Header />
			<main>
				<article className="tasks">
					<h2 className="tasks__title">Pending</h2>
					<p className="tasks__pending">
						You have {todos.filter((todo) => !todo.completed).length} tasks left
						to finish
					</p>

					<TodoList todos={todos} toggleTodo={toggleTodo} />

					<input
						ref={todoTaskRef}
						type="text"
						className="tasks__input"
						placeholder="New task"
					></input>
					<div className="tasks__btn-container">
						<button
							title="Add task"
							className="tasks__button --add"
							onClick={handlerTodoAdd}
						>
							<i className="bi bi-plus-lg"></i> Add
						</button>
						<button
							title="Delete task"
							className="tasks__button --delete"
							onClick={handlerClearAll}
						>
							<i className="bi bi-trash-fill"></i> Delete
						</button>
					</div>
				</article>
			</main>
		</Fragment>
	);
}
