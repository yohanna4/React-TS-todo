import React, {useState} from "react";

interface TodoFormProps {
  handleAddTodo: (event: React.FormEvent<HTMLFormElement>, category: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

const TodoForm: React.FC<TodoFormProps> = ({handleAddTodo, inputRef}) => {
  const [selectedCategory, setSelectedCategory] = useState("Personal");
  const [todoText, setTodoText] = useState("");
  const categories = ["Personal", "Work", "Other"];

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const getCategoryNames = (category: string) => {
    if (selectedCategory === category) {
      return 'bg-mainColor text-white';
    } else {
      return 'border-2 border-grey-300 text-gray-900 hover:bg-mainColorDarker hover:text-white hover:border-mainColorDarker';
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedText = todoText.trim();
    if (trimmedText) {
      handleAddTodo(event,selectedCategory);
      setTodoText("");
    }
  };

  return (
    <div className="mt-7">

      <form onSubmit={handleSubmit}>
      <div className="mt-4">
        <div className="flex my-2">
          {categories.map(category => (
            <button
              key={category}
              className={`mr-2 w-full ${getCategoryNames(
                category,
              )} rounded-xl flex justify-center items-center`}
              onClick={() => handleCategoryClick(category)}>
              {category}
            </button>
          ))}
        </div>
      </div>
        <div className="font-poppins relative rounded-2xl shadow-sm w-72 mb-2">
          <input
            type="text"
            value={todoText}
            ref={inputRef}
            onChange={e => setTodoText(e.target.value)}
            className="block w-full rounded-2xl border-0 py-2 pl-3 pr-10 h-10 text-gray-900 ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-3 focus:ring-inset focus:outline-none focus:ring-mainColor sm:text-sm sm:leading-6"
            placeholder="Your next task..."
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            <button
              type="submit"
              className="border-slate-200 border-1 rounded-full w-6 h-6 flex justify-center items-center pt-0.5 text-slate-100 text-sm bg-mainColor hover:bg-mainColorDarker">
              +
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
