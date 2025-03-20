// ** Third Components
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

// ** Store
import { store } from './redux/store';

// ** Router
import router from './routes/Routes';

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App