import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import App from './App.jsx';
import { CoursesProvider } from './lib/courses.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <CoursesProvider>
          <App />
        </CoursesProvider>
      </MotionConfig>
    </BrowserRouter>
  </StrictMode>
);
