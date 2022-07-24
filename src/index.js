import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProvider } from './Context';
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<AuthProvider><App tab="home" /></AuthProvider>  );