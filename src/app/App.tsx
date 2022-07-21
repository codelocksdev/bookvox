import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { useMemo } from 'react';
import { Button, FileInput, HTMLInputProps, Navbar } from '@blueprintjs/core';
import IpcService from './common/ipc/IpcService';
import Home from './pages/Home';
import Settings from './pages/Settings';

const Hello = () => {
  const ipcService = useMemo(() => new IpcService(), []);
  return (
    <div>
      <blockquote className="bp4-blockquote">
        Premium Aerotec is a key supplier for Airbus, producing 30 million parts
        per year, which is huge complexity. Skywise helps us manage all the
        production steps. It gives Airbus much better visibility into where the
        product is in the supply chain, and it lets us immediately see our weak
        points so we can react on the spot.
      </blockquote>
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
            .send<{ audioChapters: unknown[][] }>('batch-text', {
              params: {
                filePaths,
              },
            })
            .then((response) => {
              console.log(response);
              return response;
            })
            .catch(() => console.log('failed to parse uploads'));
        }}
        {...{ webkitdirectory: '', directory: '' }}
      />
      <FileInput
        text="Choose destination..."
        onInputChange={(e) => console.log(e.currentTarget.files)}
        inputProps={{ webkitdirectory: '', directory: '' } as HTMLInputProps}
      />
    </div>
  );
};

export default function App() {
  return (
    <div
      className={'bp4-dark'}
      style={{ display: 'flex', flexDirection: 'column', flex: 1 }}
    >
      <Navbar>
        <Navbar.Group>
          <Navbar.Heading style={{ fontFamily: 'Luckiest Guy' }}>
            bookvox
          </Navbar.Heading>
          <Navbar.Divider />
          <Button className="bp4-minimal" icon="refresh" text="Convert" />
          <Button className="bp4-minimal" icon="cog" text="Settings" />
        </Navbar.Group>
      </Navbar>
      <Router>
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/settings'} element={<Settings />} />
        </Routes>
      </Router>
    </div>
  );
}
