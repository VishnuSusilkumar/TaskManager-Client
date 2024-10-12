"use client";
import { useTasks } from "@/context/taskContext";
import useDetectOutside from "@/hooks/useDetectOutside";
import React, { useEffect } from "react";

function Modal() {
  const {
    task,
    handleInput,
    createTask,
    isEditing,
    closeModal,
    modalMode,
    activeTask,
    updateTask,
  } = useTasks();
  const ref = React.useRef(null);

  useDetectOutside({
    ref,
    callback: () => {
      if (isEditing) {
        closeModal();
      }
    },
  });

  useEffect(() => {
    if (modalMode === "edit" && activeTask) {
      handleInput("setTask")(activeTask);
    }
  }, [modalMode, activeTask]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (modalMode === "edit") {
      updateTask(task);
    } else if (modalMode === "add") {
      createTask(task);
    }
    closeModal();
  };

  return (
    <div className="fixed left-0 top-0 z-50 h-full w-full bg-[#333]/30 overflow-hidden flex justify-center items-center">
      <form
        action=""
        className="modal-task py-5 px-6 w-full max-w-[520px] md:max-w-[400px] sm:max-w-[90%] bg-white rounded-lg shadow-md transform transition-all duration-300"
        onSubmit={handleSubmit}
        ref={ref}
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="text-sm md:text-base">
            Title
          </label>
          <input
            className="bg-[#F9F9F9] p-2 rounded-md border"
            type="text"
            id="title"
            placeholder="Task Title"
            name="title"
            value={task.title}
            onChange={(e) => handleInput("title")(e)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="text-sm md:text-base">
            Description
          </label>
          <textarea
            className="bg-[#F9F9F9] p-2 rounded-md border resize-none text-sm md:text-base"
            name="description"
            placeholder="Task Description"
            rows={4}
            value={task.description}
            onChange={(e) => handleInput("description")(e)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="priority" className="text-sm md:text-base">
            Select Priority
          </label>
          <select
            className="bg-[#F9F9F9] p-2 rounded-md border cursor-pointer text-sm md:text-base"
            name="priority"
            value={task.priority}
            onChange={(e) => handleInput("priority")(e)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="dueDate" className="text-sm md:text-base">
            Due Date
          </label>
          <input
            className="bg-[#F9F9F9] p-2 rounded-md border text-sm md:text-base"
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={(e) => handleInput("dueDate")(e)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="completed" className="text-sm md:text-base">
            Task Completed
          </label>
          <div className="flex items-center justify-between bg-[#F9F9F9] p-2 rounded-md border">
            <label htmlFor="completed" className="text-sm md:text-base">
              Completed
            </label>
            <div>
              <select
                className="bg-[#F9F9F9] p-2 rounded-md border cursor-pointer  text-sm md:text-base"
                name="completed"
                value={task.completed ? "true" : "false"}
                onChange={(e) => handleInput("completed")(e)}
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className={`text-white py-2 rounded-md w-full hover:bg-blue-500 transition duration-200 ease-in-out ${
              modalMode === "edit" ? "bg-blue-400" : "bg-green-400"
            }`}
          >
            {modalMode === "edit" ? "Update Task" : "Create Task"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Modal;
