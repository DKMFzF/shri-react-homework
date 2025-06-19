import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from './components/App-Layout';
import { AnalystPage, GeneratorPage, NotFoundPage } from '@pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <AnalystPage/> },
      { path: 'generator', element: <GeneratorPage /> },
      { path: '*', element: <NotFoundPage/> }
    ]
  }
]);
