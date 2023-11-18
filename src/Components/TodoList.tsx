import React, {useState, useEffect, useRef} from "react";
import TodoItem from "./TodoItem";
import {Todo} from "./Todo";
import TodoForm from "./TodoForm";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      const parsedTodos: Todo[] = JSON.parse(storedTodos);
      setTodos(parsedTodos);
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    } else {
      localStorage.clear();
    }
  }, [todos]);

  const todoInputRef = useRef<HTMLInputElement>(null);
  const handleAddTodo = (
    event: React.FormEvent<HTMLFormElement>,
    category: string,
  ) => {
    event.preventDefault();
    const todoText = todoInputRef.current?.value?.trim();
    if (todoText) {
      const newTodo: Todo = {
        id: Date.now(),
        text: todoText,
        completed: false,
        category: category,
      };
      setTodos(prevTodos => [...prevTodos, newTodo]);
      todoInputRef.current!.value = "";
    }
  };

  const handleToggle = (id: number) => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return {...todo, completed: !todo.completed};
        }
        return todo;
      }),
    );
  };

  const handleDelete = (id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const [selectedOption, setSelectedOption] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const options = ["Personal", "Work", "Other", "All"];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    closeDropdown();
  };
  const filterTodosByCategory = (todos: Todo[], category: string): Todo[] => {
    if (category === "All") {
      return todos;
    } else {
      return todos.filter(todo => todo.category === category);
    }
  };

  const filteredTodos = filterTodosByCategory(todos, selectedOption);
  const completedTodosCount = filteredTodos.filter(
    todo => todo.completed,
  ).length;
  const totalTodosCount = filteredTodos.length;

  return (
    <div className="flex flex-col items-center mt-10 w-80 mx-auto">
      <h1 className="text-4xl font-dm font-semibold tracking-widest text-slate-800">
        Task Master
      </h1>

      <TodoForm handleAddTodo={handleAddTodo} inputRef={todoInputRef} />

      <div className="w-full pl-5 pr-3 mt-5">
        <div className="flex flex-row justify-between">
          <h2 className="text-left font-poppins font-semibold text-neutral-700">
            Todo
          </h2>
          <div className="relative inline-block text-left bg-white">
            <button
              id="dropdown-button"
              className="inline-flex justify-center w-full px-2 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-gray-100 focus:ring-mainColor"
              onClick={toggleDropdown}>
              {selectedOption}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 ml-2 -mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <div
                id="dropdown-menu"
                className="origin-top-right absolute  z-50  right-0 mt-2 w-20 mx-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                onClick={closeDropdown}>
                <div
                  className="py-2 px-2 items-center"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="dropdown-button">
                  {options.map(option => (
                    <a
                      key={option}
                      className={`flex rounded-md px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer ${
                        selectedOption === option ? "font-bold" : ""
                      }`}
                      role="menuitem"
                      onClick={() => handleOptionSelect(option)}>
                      {option}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {filteredTodos.length > 0 &&
          (completedTodosCount === totalTodosCount ? (
            <h4 className="text-mainColorDarker">
              All tasks completed! Congrats!
            </h4>
          ) : (
            <h4 className="text-mainColorDarker">{`${completedTodosCount}/${totalTodosCount} tasks completed!`}</h4>
          ))}
        {filteredTodos.length > 0 ? (
          <ul className="max-h-96 overflow-y-auto">
            {filteredTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                handleToggle={handleToggle}
                handleDelete={handleDelete}
              />
            ))}
          </ul>
        ) : (
          <h4 className="text-center text-slate-400">No Tasks Yet</h4>
        )}
      </div>
    </div>
  );
};

export default TodoList;
