import { useTasks } from "@/context/taskContext";
import { edit, star, trash } from "@/utils/Icons";
import { Task } from "@/utils/types";
import { formatTime } from "@/utils/utilities";
import React from "react";
import { motion } from "framer-motion";
import { item } from "@/utils/animations";

interface TaskItemProps {
  task: Task;
}

function TaskItem({ task }: TaskItemProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "text-green-500";
      case "medium":
        return "text-yellow-500";
      case "high":
        return "text-red-500";
      default:
        return "text-red-500";
    }
  };

  const { getTask, openModalForEdit, deleteTask } = useTasks();

  return (
    <motion.div
      className="h-[16rem] px-4 py-3 flex flex-col gap-4 shadow-sm bg-[#f9f9f9] rounded-lg border-2 border-white"
      variants={item}
    >
      <div>
        <div className="flex justify-between items-center">
          <h4 className="font-bold text-lg sm:text-xl md:text-2xl">
            {task.title}
          </h4>
          <p className="text-xs sm:text-sm text-gray-500">
            Due: {task.dueDate ? formatTime(task.dueDate) : "No due date"}
          </p>
        </div>

        <p className="text-xs sm:text-sm md:text-base text-gray-700 max-h-[9rem] overflow-y-auto">
          {task.description}
        </p>
      </div>

      <div className="mt-auto flex justify-between items-center">
        <p className="text-xs sm:text-sm text-gray-400">
          {formatTime(task.createdAt)}
        </p>
        <p
          className={`text-xs sm:text-sm font-bold ${getPriorityColor(
            task.priority
          )}`}
        >
          {task.priority}
        </p>
        <div>
          <div className="flex items-center gap-3 text-gray-400">
            <button
              className={`${
                task.completed ? "text-yellow-400" : "text-gray-400"
              } text-sm md:text-lg p-1 md:p-2`}
            >
              {star}
            </button>
            <button
              className="text-[#00A1F1] text-sm md:text-lg p-1 md:p-2"
              onClick={() => {
                getTask(task._id);
                openModalForEdit(task);
              }}
            >
              {edit}
            </button>
            <button
              className="text-[#F65314] text-sm md:text-lg p-1 md:p-2"
              onClick={() => {
                deleteTask(task._id);
              }}
            >
              {trash}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default TaskItem;
