// ** React Import
import { useEffect, useState } from 'react';

// ** Store
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import { fetchTodos } from '../../redux/todoSlice';

// ** Reusable Components
import TodoItem from './TodoItem';
import AddTodoForm from './AddTodoForm';
import LoadingSpinner from '../LoadingSpinner';

type Filter = 'all' | 'pending' | 'completed';

export default function TodoList() {
  const { items, status } = useSelector((state: RootState) => state.todos);
  const [filter, setFilter] = useState<Filter>('all');
  const dispatch = useDispatch();

  // Fetch todos when component mounts
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTodos());
    }
  }, [dispatch, status]);

  // Derive filtered todos from the Redux state
  const filteredTodos = items.filter((todo) => {
    if (filter === 'completed') return todo.status === 'completed';
    if (filter === 'pending') return todo.status === 'pending';
    return true;
  });

  return (
    <div className='max-w-2xl mx-auto p-4'>
      <div className='flex justify-between items-center mb-6'>
        <div className='flex gap-2'>
          {(['all', 'pending', 'completed'] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 text-sm md:text-md rounded-md ${
                filter === f
                  ? 'bg-blue-700 hover:bg-blue-800 text-white font-semibold'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <button
          onClick={() => dispatch(fetchTodos())}
          className='px-4 py-2 text-sm md:text-md bg-gray-200 hover:bg-gray-200 rounded-md'
          disabled={status === 'loading'}
        >
          Refresh
        </button>
      </div>
      <AddTodoForm />
      <div className='space-y-2'>
        {status === 'failed' && <div className='text-red-500 text-center'>Error loading todos</div>}
        {status === 'loading' ? (
          <LoadingSpinner />
        ) : (
          filteredTodos.map((todo) => <TodoItem key={todo.id} {...todo} />)
        )}
      </div>
    </div>
  );
}
