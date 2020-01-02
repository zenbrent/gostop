import React, { useState } from 'react';
import styled from 'styled-components';

import { Combinations } from './pages/Combinations/combinations';
import { CardList } from './pages/CardList/cardList';
import { Licenses } from './pages/Licensing/licensing';
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
  @media (min-width: 450px) {
    grid-template:
      [row1-start] ".        header header" 2rem [row1-end]
      [row2-start] "nav      page   page"   auto [row2-end]
      [row3-start] "controls page   page"   auto [row3-end]
      [row4-start] "zoom     page   page"   1fr  [row4-end]
      [row5-start] "footer   footer footer" 2em  [row5-end]
      / 15rem auto;
  }

  @media (max-width: 449px) {
    grid-template:
      [row1-start] "header   header   header"   2rem [row1-end]
      [row2-start] "nav      nav      nav "     auto [row2-end]
      [row3-start] "controls controls controls" auto [row3-end]
      [row5-start] ".        page     ."        auto [row5-end]
      [row6-start] "footer   footer   footer"   2em  [row6-end]
      [row4-start] "zoom     zoom     zoom"     1fr  [row4-end]
      / 0.5rem auto 0.5rem;
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

const Footer = styled.div`
  grid-area: footer;
  justify-self: center;
  align-self: center;
`;

const ZoomCardContainer = styled.div`
  grid-area: zoom;
  margin: 0 auto;
  width: calc(100% - 2rem);
`;

const ZoomCardInfo = styled.div`
  display: block;
`;

const CloseButton = styled.div`
  &:after {
    content: '[close]';
    float: right;
    font-size: small;
    font-weight: 100;
    height: 1rem;
    line-height: 1rem;
    color: rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }
  &:hover:after {
    color: deeppink;
  }
`;

const ZoomCard = ({ card, closeCard }) => {
  if (!card)
    return null;

  return (
    <ZoomCardContainer>
      <CloseButton onClick={closeCard} />
      <Card card={card} width='100%' />
      <ZoomCardInfo>{card.month}</ZoomCardInfo>
      <ZoomCardInfo>{card.plant}</ZoomCardInfo>
      <ZoomCardInfo>{card.type}</ZoomCardInfo>
    </ZoomCardContainer>
  );
}

const Router = window.location.host.endsWith('github.io')
  ? HashRouter
  : BrowserRouter;

const ToDo = styled.div`
  &:hover:after {
    content: "TODO";
  }
`;

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
          <ToDo>Serving</ToDo>
        </Links>

        <Switch>
          <Route path="/combinations">
            <Combinations zoomCard={zoomCard} />
          </Route>
          <Route path="/licenses">
            <Licenses />
          </Route>
          <Route path="/">
            <CardList {...{ filters, setFilters, organize, setOrganize, zoomCard }} />
          </Route>
        </Switch>

        <ZoomCard card={zoomedCard} closeCard={() => zoomCard()} />

        <Footer />
      </AppContainer>
    </Router>
  );
}

export default App;

