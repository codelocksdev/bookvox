import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import { useMemo } from 'react';
import { IpcService } from './ipc/IpcService';

const Hello = () => {
  const ipcService = useMemo(() => new IpcService(), []);

  return (
    <div>
      <div className="Hello">
        <img width="200px" alt="icon" src={icon} />
      </div>
      <h1>electron-react-boilerplate</h1>
      <div className="Hello">
        <a
          href="https://electron-react-boilerplate.js.org/"
          target="_blank"
          rel="noreferrer"
        >
          <button
            type="button"
            onClick={() =>
              ipcService
                .send<{ kernel: string }>('system-info')
                .then(console.log)
            }
          >
            <span role="img" aria-label="books">
              📚
            </span>
            system info
          </button>
        </a>
        <a
          href="https://github.com/sponsors/electron-react-boilerplate"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              🙏
            </span>
            Donate
          </button>
        </a>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
