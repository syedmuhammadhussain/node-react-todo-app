import { Outlet, Link } from 'react-router-dom';

export default function Layout() {
  return (
    <div className='min-h-screen bg-gray-100'>
      {/* <nav className='bg-white shadow'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='flex justify-between h-16'>
            <div className='flex items-center'>
              <Link to='/' className='text-gray-700 px-3 py-2 rounded-md text-sm font-medium'>
                All Todos
              </Link>
              <Link
                to='/completed'
                className='text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium'
              >
                Completed
              </Link>
            </div>
          </div>
        </div>
      </nav> */}
      <Outlet />
    </div>
  );
}
