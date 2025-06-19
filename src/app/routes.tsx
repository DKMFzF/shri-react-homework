import { createBrowserRouter } from "react-router-dom";

import { AppLayout } from './App-Layout';
import {
  AnalystPage,
  GeneratorPage,
  HistoryPage,
  NotFoundPage
} from '@pages';

// такого подключение роутинга в лекциях не было
// но это всё равно часть react-router-dom
export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <AnalystPage/> },
      { path: 'generator', element: <GeneratorPage /> },
      { path: 'history', element: <HistoryPage />},
      { path: '*', element: <NotFoundPage/> }
    ]
  }
]);
