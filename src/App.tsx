import { RouterProvider } from 'react-router-dom';
import Popup from './shared/components/overlay/popup/Popup';
import PopupTest from './shared/components/overlay/popup/PopupTest';
import OverlayTest from './shared/components/overlay/modal/OverlayTest';
import { router } from '@/routes/router';

function App() {
  // return <RouterProvider router={router} />;
  return <OverlayTest />;
}

export default App;
