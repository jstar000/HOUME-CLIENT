import { RouterProvider } from 'react-router-dom';
import Toast from './shared/components/toast/Toast';
import { router } from '@/routes/router';

function App() {
  // return <RouterProvider router={router} />;
  return <Toast />;
}

export default App;
