import { FC, ReactElement } from 'react';
import './App.css';
import Router from './components/Router';
import { Container } from '@mui/material';

const App: FC = (): ReactElement => {
  return (
    <Container maxWidth="lg">
      <Router />
    </Container>
  );
}

export default App;
