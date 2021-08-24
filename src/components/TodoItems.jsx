import React from "react";

export function TodoItems({ todo, toggleTodo }) {
	const { id, task, completed } = todo;
	const handleTodoClick = () => {
		toggleTodo(id);
	};

	return (
		<li>
			<input
				type="checkbox"
				checked={completed}
				className="tasks__checkbox"
				onChange={handleTodoClick}
			></input>
			{task}
		</li>
	);
}
