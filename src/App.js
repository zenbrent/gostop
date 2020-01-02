import React, { useState } from 'react';
import styled from 'styled-components';

import { Combinations } from './pages/Combinations/combinations';
import { CardList } from './pages/CardList/cardList';
import { Card } from './components/Card';

import {
  HashRouter,
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

const AppContainer = styled.div`
  display: grid;
  @media (min-width: 376px) {
    grid-template:
      [row1-start] ".        header header" 2rem [row1-end]
      [row2-start] "nav      page   page"   auto [row2-end]
      [row3-start] "controls page   page"   auto [row3-end]
      [row4-start] "zoom     page   page"   1fr  [row4-end]
      [row5-start] "footer   footer footer" 2em  [row5-end]
      / 15rem auto;
  }

  @media (max-width: 375px) {
    grid-template:
      [row1-start] "header"   2rem [row1-end]
      [row2-start] "nav "     auto [row2-end]
      [row3-start] "controls" auto [row3-end]
      [row3-start] "page"     auto [row3-end]
      [row4-start] "zoom"     1fr  [row4-end]
      [row5-start] "footer"   2em  [row5-end]
      / 100%;
  }
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

const ZoomCard = styled(Card)`
  grid-area: zoom;
  width: calc(100% - 2rem);
  margin: 0 auto;
`;

const Router = window.location.host.endsWith('github.io')
  ? HashRouter
  : BrowserRouter;

function App() {
  const [filters, setFilters] = useState([]);
  const [organize, setOrganize] = useState("Month");
  const [zoomedCard, zoomCard] = useState();

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
            <Combinations zoomCard={zoomCard} />
          </Route>
          <Route path="/">
            <CardList {...{ filters, setFilters, organize, setOrganize, zoomCard }} />
          </Route>
        </Switch>

        {!zoomedCard ? '' : <ZoomCard card={zoomedCard} />}
      </AppContainer>
    </Router>
  );
}

export default App;

