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
  display: grid;
  grid-template:
    [row1-start] ".        header header" 2rem [row1-end]
    [row2-start] "nav      page   page"   auto [row2-end]
    [row3-start] "controls page   page"   1fr  [row3-end]
    [row4-start] "footer   footer footer" 2em  [row4-end]
    / 15rem auto;
`;

const Links = styled.div`
  grid-area: nav;
  margin: 1rem;
  margin-top: 0;
`;

const Header = styled.div`
  grid-area: header;
  justify-self: center;
  align-self: center;
`;

function App() {
  const [filters, setFilters] = useState([]);
  const [organize, setOrganize] = useState("Month");

  return (
    <Router>
      <AppContainer>
        <Header>
          Go Stop
        </Header>

        <Links>
          <Link to="/">Cards</Link><br />
          <Link to="/combinations">Combinations</Link>
        </Links>

        <Switch>
          <Route path="/combinations">
            <Combinations />
          </Route>
          <Route path="/">
            <CardList {...{ filters, setFilters, organize, setOrganize }} />
          </Route>
        </Switch>
      </AppContainer>
    </Router>
  );
}

export default App;

