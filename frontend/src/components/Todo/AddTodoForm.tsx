// ** React Imports
import { useState } from 'react';

// ** Store
import { useDispatch } from 'react-redux';
import { addNewTodo } from '../../redux/todoSlice';

export default function AddTodoForm() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addNewTodo({ title: text }));
      setText('');
    }
  };

  return (
    <form className='mb-6' onSubmit={handleSubmit}>
      <label
        htmlFor='default-search'
        className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
      >
        Todo
      </label>
      <div className='relative'>
        <input
          type='text'
          id='default-search'
          value={text}
          onChange={(e) => setText(e.target.value)}
          className='block w-full p-4 ps-4 pe-24 text-md text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder='Create tasks...'
          required
        />
        <button
          type='submit'
          className='cursor-pointer text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Add +
        </button>
      </div>
    </form>
  );
}
