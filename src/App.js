import React, { useState } from 'react';
import styled from 'styled-components';

import { Combinations } from './pages/Combinations/combinations';
import { CardList } from './pages/CardList/cardList';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const AppContainer = styled.div`
  text-align: center;
  margin: 10px 20px;
`;

function App() {
  const [filters, setFilters] = useState([]);
  const [organize, setOrganize] = useState("Month");

  return (
    <AppContainer>
      <Router>
        <Link to="/">Cards</Link>
        <Link to="/combinations">Combinations</Link>
        <Switch>

          <Route path="/combinations">
            <Combinations />
          </Route>

          <Route path="/">
            <CardList {...{ filters, setFilters, organize, setOrganize }} />
          </Route>

        </Switch>
      </Router>
    </AppContainer>
  );
}

export default App;

