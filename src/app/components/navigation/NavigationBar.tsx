import { Button, Navbar } from '@blueprintjs/core';

import { NavLink } from 'react-router-dom';

const NavigationBar = () => {
  return (
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
  );
};

export default NavigationBar;
