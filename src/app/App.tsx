import {
  MemoryRouter as Router,
  NavLink,
  Route,
  Routes,
} from 'react-router-dom';
import { Button, Navbar } from '@blueprintjs/core';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Provider } from 'react-redux';

import './App.css';
import Home from './pages/Home';
import Settings from './pages/Settings';
import { store } from './common/state/store';

export default function App() {
  return (
    <Provider store={store}>
      <PerfectScrollbar
        style={{ width: '100%', height: '100%', display: 'flex' }}
      >
        <div
          className={'bp4-dark'}
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            padding: 8,
          }}
        >
          <Router>
            <Navbar>
              <Navbar.Group>
                <Navbar.Heading style={{ fontFamily: 'Luckiest Guy' }}>
                  bookvox
                </Navbar.Heading>
                <Navbar.Divider />
                <NavLink to={'/'}>
                  <Button
                    className="bp4-minimal"
                    icon="refresh"
                    text="Convert"
                    style={{ marginRight: 8 }}
                  />
                </NavLink>

                <NavLink to={'/settings'}>
                  <Button className="bp4-minimal" icon="cog" text="Settings" />
                </NavLink>
              </Navbar.Group>
            </Navbar>
            <Routes>
              <Route path={'/'} element={<Home />} />
              <Route path={'/settings'} element={<Settings />} />
            </Routes>
          </Router>
        </div>
      </PerfectScrollbar>
    </Provider>
  );
}
