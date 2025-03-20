import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { deleteTodo, updateTodo } from '../../redux/todoSlice';
import type { Todo } from '../../types/todo';
import DeleteIcon from '../../icons/DeleteIcon';
import MarkAsCompleted from '../../icons/MarkAsCompleted';
import EditIcon from '../../icons/EditIcon';
import ConfirmDialog from '../ConfirmDialog';

export default function TodoItem({ id, title, description, status }: Todo) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({ title, description });
  const [showConfirm, setShowConfirm] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleUpdate = async () => {
    await dispatch(updateTodo({ id, changes: editValues }));
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await dispatch(deleteTodo(id));
    setShowConfirm(false);
  };

  return (
    <div className='group flex items-center justify-between p-4 bg-white mb-2 rounded shadow hover:shadow-md transition-shadow'>
      {isEditing ? (
        <div className='flex-1 mr-4'>
          <input
            value={editValues.title}
            onChange={(e) => setEditValues((v) => ({ ...v, title: e.target.value }))}
            className='w-full mb-2 p-1 border-b'
          />
        </div>
      ) : (
        <div className='flex-1 mr-4'>
          <div className={`${status === 'completed' ? 'line-through text-gray-400' : ''}`}>
            {title}
          </div>
        </div>
      )}

      <div className='flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity'>
        {!isEditing ? (
          <>
            <button
              onClick={() =>
                dispatch(
                  updateTodo({
                    id,
                    changes: { status: status === 'completed' ? 'pending' : 'completed' },
                  }),
                )
              }
              className='p-1 hover:bg-gray-100 rounded-md'
              title='Toggle status'
            >
              <MarkAsCompleted />
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className='p-1 hover:bg-gray-100 rounded-md'
              title='Edit'
            >
              <EditIcon />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleUpdate}
              className='p-1 hover:bg-green-100 rounded-md'
              title='Save'
            >
              ✔️
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className='p-1 hover:bg-gray-100 rounded-md'
              title='Cancel'
            >
              ✖️
            </button>
          </>
        )}
        <button
          onClick={() => setShowConfirm(true)}
          className='p-1 hover:bg-red-100 rounded-md'
          title='Delete'
        >
          <DeleteIcon />
        </button>
      </div>
      <ConfirmDialog
        isOpen={showConfirm}
        title='Confirm Deletion'
        message='Are you sure you want to delete this todo?'
        onConfirm={handleDelete}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
}
