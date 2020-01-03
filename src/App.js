import React, { useReducer, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { mapObjIndexed } from 'ramda';

import { IfEnabled, isEnabled } from './config/flags';
import { NotFound } from './pages/404/err';
import { Combinations } from './pages/Combinations/combinations';
import { CardList } from './pages/CardList/cardList';
import { Licenses } from './pages/Licensing/licensing';
import { Serving } from './pages/Serving/serving';
import { Chips } from './pages/Chips/chips';
import { Card } from './components/Card';
import { responsive, hideable } from './Theme';

import {
  HashRouter,
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

const AppContainer = styled.div`
  display: grid;
  ${responsive.lage} {
    grid-template:
      [row1-start] ".        header header" 2rem [row1-end]
      [row2-start] "nav      page   page"   auto [row2-end]
      [row3-start] "controls page   page"   auto [row3-end]
      [row4-start] "zoom     page   page"   1fr  [row4-end]
      [row5-start] "footer   footer footer" 2em  [row5-end]
      / 15rem auto;
  }

  ${responsive.small} {
   {
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

const NavLink = styled(Link)`
  display: block;
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
  ${hideable}
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

const LargeCard = styled(Card)`
  ${responsive.lage} {
    width: 100%;
  }

  ${responsive.small} {
    width: auto;
    height: ${p => p.width || 'calc(50vh)'};
  }
`;

const ZoomCard = ({ card, closeCard }) => {
  const el = useRef();

  useEffect(() => {
    if (!el.current || window.innerWidth >= responsive.largePx)
      return;

    window.scrollTo({
      top: el.current.offsetTop,
      behavior: 'smooth'
    });
  }, [card]);

  if (!card)
    return null;

  return (
    <ZoomCardContainer ref={el}>
      <CloseButton onClick={closeCard} />
      <LargeCard card={card} />
      <ZoomCardInfo>Month: {card.month}</ZoomCardInfo>
      <ZoomCardInfo>Plant: {card.plant}</ZoomCardInfo>
      <ZoomCardInfo>Type: {card.type}</ZoomCardInfo>
      <ZoomCardInfo hidden={card.names.length === 0}>
        Name{card.names.length === 1 ? "" : "s"}: {card.names.join(', ')}
      </ZoomCardInfo>
    </ZoomCardContainer>
  );
}

const Router = window.location.host.endsWith('github.io')
  ? HashRouter
  : BrowserRouter;

// const ToDo = styled.div`
//   &:hover:after {
//     content: "TODO";
//   }
// `;

const initState = {
  filters: [],
  organize: "Month",
  zoomedCard: undefined
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setFilters":  return { ...state, filters: action.value };
    case "setOrganize": return { ...state, organize: action.value };
    case "zoomCard":    return { ...state, zoomedCard: action.value };
    default:
      console.error({ action, state });
      throw new Error(`${action.type} is not supported.`);
  }
};

const actions = {
  setFilters: dispatch => value => dispatch({ type: "setFilters", value }),
  setOrganize: dispatch => value => dispatch({ type: "setOrganize", value }),
  zoomCard: dispatch => value => dispatch({ type: "zoomCard", value })
};

function App() {
  const [state, dispatch] = useReducer(reducer, initState);

  const routes = [
    { path: "/chips", enabled: isEnabled('chips'), component: Chips },
    { path: "/serving", component: Serving },
    { path: "/combinations", component: () => <Combinations zoomCard={actions.zoomCard(dispatch)} /> },
    { path: "/licenses", enabled: isEnabled('licenses'), component: Licenses },
    { path: "/", exact: true, component: () => <CardList {...state} {...mapObjIndexed(a => a(dispatch), actions)} /> }
  ];

  return (
    <Router>
      <AppContainer>
        <Header>
          Go Stop
        </Header>

        <Links>
          <NavLink to="/">Cards</NavLink>
          <NavLink to="/combinations">Combinations</NavLink>
          <NavLink to="/serving">Serving</NavLink>
          <IfEnabled flag="chips">
            <NavLink to="/chips">Chips</NavLink>
          </IfEnabled>
        </Links>

        <Switch>
          {routes
            .filter(route => route.enabled !== false)
            .map((route, i) => <Route key={i} {...route} />)}
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>

        <ZoomCard card={state.zoomedCard} closeCard={() => actions.zoomCard(dispatch)()} />

        <Footer />
      </AppContainer>
    </Router>
  );
}

export default App;

