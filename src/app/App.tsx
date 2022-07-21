import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Uploady from '@rpldy/uploady';
import { useMemo } from 'react';
import IpcService from './common/ipc/IpcService';
import { readFileSync } from 'fs';

const Hello = () => {
  const ipcService = useMemo(() => new IpcService(), []);
  return (
    <div>
      <Uploady destination={{ url: '[upload-url]' }}>
        <input
          type={'file'}
          onInput={(e) => {
            const filePaths: string[] = [];

            const { files } = e.currentTarget;
            if (!files) return;

            for (let i = 0; i < files.length; i += 1) {
              const path = files.item(i)?.path;
              if (path) filePaths.push(path);
            }

            ipcService
              .send('batch-text', {
                params: {
                  filePaths,
                },
              })
              .then((response) => console.log(response))
              .catch(() => console.log('failed to parse uploads'));
          }}
          {...{ webkitdirectory: '', directory: '' }}
        />
      </Uploady>
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
