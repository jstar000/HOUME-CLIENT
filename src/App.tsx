import { RouterProvider } from 'react-router-dom';
import Modal from './shared/components/overlay/Modal';
import OverlayTest from './shared/components/overlay/OverlayTest';
import { router } from '@/routes/router';

function App() {
  // return <RouterProvider router={router} />;
  return <OverlayTest />;
}

export default App;
