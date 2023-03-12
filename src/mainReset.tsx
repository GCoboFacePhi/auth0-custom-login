import ReactDOM from 'react-dom/client';
import AppReset from './AppReset';
import './index.css';

const resetElement = document.getElementById('reset-password');
ReactDOM.createRoot(resetElement as HTMLElement).render(<AppReset />);
