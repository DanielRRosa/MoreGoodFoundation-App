"use client";
import { Play, Plus, ChevronDown } from "lucide-react";
import { useRef, useState } from "react";
import { useKeyPress } from "../../../hooks/useKeyPress";
import { timeEntryAdded } from "../store";
import { useAppDispatch } from "../../../hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatElapsedTime } from "../../../utils";

export const NewTimeEntry = () => {
  const ref = useRef(null);
  const dispatch = useAppDispatch();

  const [text, setText] = useState<string>("");
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<string>("");

  const tasks = ["task5"]; // Tarefas pré-definidas
  const [customTasks, setCustomTasks] = useState<string[]>([]); // Tarefas personalizadas

  const handleAddClick = () => {
    dispatch(timeEntryAdded({ text: text || selectedTask, startTime: Date.now() }));
    console.log({ text: text || selectedTask, startTime: Date.now() });
  };

  const handleTaskSelect = (task: string) => {
    setSelectedTask(task);
    setText(task);
    setDropdownVisible(false);
  };

  const handleAddCustomTask = (task: string) => {
    if (customTasks.length < 10 && task.trim() !== "") {
      setCustomTasks([...customTasks, task]);
    }
  };

  useKeyPress(handleAddClick, ["Enter"], ref);

  return (
    <div className="relative">
      <div
        className={`absolute top-full left-0 w-full bg-gray-200 border border-gray-200 rounded shadow-lg z-10 ${dropdownVisible ? 'block' : 'hidden'}`}
      >
        <ul className="py-2">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
              onClick={() => handleTaskSelect(task)}
            >
              {task}
            </li>
          ))}
          {customTasks.map((task, index) => (
            <li
              key={index}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
              onClick={() => handleTaskSelect(task)}
            >
              {task}
            </li>
          ))}
          <li className="px-4 py-2">
            <Input
              type="text"
              placeholder="Add custom task..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddCustomTask(e.target.value);
                  e.target.value = "";
                }
              }}
            />
          </li>
        </ul>
      </div>
      <div className="flex items-center border border-neutral rounded-full min-h-[30px] bg-gray-200 px-2">
        <button
          className="flex items-center justify-center text-gray-600 focus:outline-none"
          onClick={() => setDropdownVisible(!dropdownVisible)}
        >
          <ChevronDown className="size-4" />
        </button>
        <Input
          className="flex-1 rounded-lg px-3 py-2 text-base bg-transparent focus:outline-none"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label="new entry text"
          placeholder="What are you working on today?"
        />
        <div className="flex space-x-2">
        {/* Adicionei um botão separado para adicionar uma tarefa personalizada */}
        {/* <Button
          className="rounded-full min-h-[60px] min-w-[60px]"
          onClick={() => handleAddCustomTask(text)}
          size="icon"
          variant="default"
          aria-label="Add custom task"
          title="Add Custom Task"
          disabled={text === ""}
        >
          <p className="sr-only">Add custom task</p>
          <Plus />
        </Button> */}

        {/* Botão principal para adicionar uma entrada */}
        <Button
          className="rounded-full min-h-[60px] min-w-[60px]"
          onClick={handleAddClick}
          size="icon"
          variant="default"
          aria-label="Add entry"
          title="Add Entry"
          disabled={text === ""}
        >
          <p className="sr-only">Start time tracker</p>
          <Play />
        </Button>
      </div>
      </div>
      

      {/* <span
        className={`${
          text === "" ? "opacity-60" : ""
        } flex justify-end text-lg text-right font-bold w-24`}
      >
        {formatElapsedTime(0)}
      </span> */}

      
    </div>
  );
};
