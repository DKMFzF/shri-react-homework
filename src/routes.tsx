import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from '@components';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: []   
  }
]);
