import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import TodoList from '../components/Todo/TodoList';

export default createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <TodoList />,
      },
      // {
      //   path: 'completed',
      //   element: <TodoList />,
      // },
    ],
  },
]);
