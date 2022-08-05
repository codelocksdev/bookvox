import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { Provider } from 'react-redux';

import './App.css';
import { BookvoxContainer, BookvoxContents } from './components/styled';
import Home from './pages/Home';
import Settings from './pages/Settings';
import { store } from './common/state/store';
import NavigationBar from './components/navigation/NavigationBar';

export default function App() {
  return (
    <Provider store={store}>
      <BookvoxContainer>
        <BookvoxContents className={'bp4-dark'}>
          <Router>
            <NavigationBar />
            <Routes>
              <Route path={'/'} element={<Home />} />
              <Route path={'/settings'} element={<Settings />} />
            </Routes>
          </Router>
        </BookvoxContents>
      </BookvoxContainer>
    </Provider>
  );
}
