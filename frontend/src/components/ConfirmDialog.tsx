// src/components/ConfirmDialog.tsx
import React from 'react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!isOpen) return null;
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50' style={{
      background: 'hsl(0deg 0% 0% / 44%)'
    }}>
      <div className='bg-white rounded-lg shadow-lg w-96 p-6'>
        <h2 className='text-xl font-bold mb-4'>{title}</h2>
        <p className='mb-6'>{message}</p>
        <div className='flex justify-end gap-4'>
          <button onClick={onCancel} className='cursor-pointer px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded'>
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className='cursor-pointer px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded'
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
