import { useState } from "react";

function AddTask({ onTaskAdded }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const task = {
            title: title,
            description: description,
            completed: false,
        };

        try {
            const response = await fetch("http://localhost:8080/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(task),
            });

            if (!response.ok) {
                throw new Error("Failed to create task");
            }

            const savedTask = await response.json();

            console.log("Task saved:", savedTask);
            onTaskAdded(savedTask);

            setTitle("");
            setDescription("");

            alert("Task added successfully!");
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to add task");
        }
    };

    return (
        <div className="add-task">
            <h2>Add New Task</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>

                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter task title"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>

                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter task description"
                    />
                </div>

                <button type="submit" className="add-btn">
                    Add Task
                </button>
            </form>
        </div>
    );
}

export default AddTask;