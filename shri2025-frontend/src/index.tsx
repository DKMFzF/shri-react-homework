import { createRoot } from 'react-dom/client';

import { App } from './app';
import './index.css';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(<App />);
