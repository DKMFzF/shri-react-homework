import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from '@components';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(<App />);
