import { BrowserRouter, RouterProvider } from 'react-router-dom';
import { ImageGenerationFunnel } from './pages/generate/components/ImageGenerationFunnel';
import { router } from '@/routes/router';

function App() {
  // return <RouterProvider router={router} />;
  return (
    <BrowserRouter>
      <ImageGenerationFunnel />
    </BrowserRouter>
  );
}

export default App;
