import {
  MemoryRouter as Router,
  NavLink,
  Route,
  Routes,
} from 'react-router-dom';
import './App.css';
import { Button, Navbar } from '@blueprintjs/core';
import Home from './pages/Home';
import Settings from './pages/Settings';

export default function App() {
  return (
    <div
      className={'bp4-dark'}
      style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: 8 }}
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
  );
}
