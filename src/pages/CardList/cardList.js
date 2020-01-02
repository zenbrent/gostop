import React from 'react';
import styled from 'styled-components';
import { mapObjIndexed, pipe, map, sort, filter, groupBy } from 'ramda';
import { bright, animal, ribbon, junk, types, allCards, cardsByMonth, monthIndex, typeIndex } from '../../cards';

import { Card, cardKey } from '../../components/Card';

const Controls = styled.div`
  grid-area: controls;

  margin: 1rem;
  margin-top: 0;
`;

const CardPage = styled.div`
  grid-area: page;
  text-align: center;
`;

const CardGroup = styled.div`
  display: inline-block;
  margin-right: 1em;
`;

const CardLabel = styled.div`
  display: block;
  text-align: left;
`;


export function CardList ({ filters, setFilters, organize, setOrganize, zoomCard }) {
  return (
    <>
      <Controls>
        <Filters filters={filters} setFilters={setFilters} />
        <Organize organize={organize} setOrganize={setOrganize} />
      </Controls>

      <CardPage>
        {pipe(
          filter(cardMatchesFilters(filters)),
          sort(cardComparator(organize)),
          groupBy(card => card[organize.toLowerCase()]),

          map(map(card => (
            <Card card={card} key={cardKey(card)} onClick={() => zoomCard(card)} />
          ))),

          mapObjIndexed((cards, group) => (
            <CardGroup key={group}>
              <GroupLabel type={organize} group={group} count={cards.length} />
              <div>{cards}</div>
            </CardGroup>
          )),

          Object.values
        ) (allCards)}
      </CardPage>
    </>
  );
}

const FilterLabel = styled.label`
  display: block;
`;

const ControlGroup = styled.div`
  margin-bottom: 1rem;
`;

const Filters = ({ filters, setFilters }) => {
  const isAll = filters.length === types.length;
  const isChecked = name => isAll || filters.includes(name);
  const change = name => e => {
    if (e.target.checked)
      setFilters([name, ...filters]);
    else {
      setFilters(filters.filter(f => f !== name));
    }
  };

  const FilterInput = ({ prop, children }) => (
    <FilterLabel>
      <input type="checkbox" checked={isChecked(prop)} onChange={change(prop)} />
      {children}
    </FilterLabel>
  );

  return (
    <ControlGroup>
      Filter card types:
      <FilterLabel>
        <input type="checkbox" checked={isAll} onChange={e => e.target.checked ? setFilters(types) : setFilters([bright])} />
        All
      </FilterLabel>
      <FilterInput prop={bright}>Bright</FilterInput>
      <FilterInput prop={animal}>Animal</FilterInput>
      <FilterInput prop={ribbon}>Ribbon</FilterInput>
      <FilterInput prop={junk}>Junk</FilterInput>
    </ControlGroup>
  );
};


const Organize = ({ organize, setOrganize }) => {
  return (
    <ControlGroup>
      Group by:
      <FilterLabel>
        <input type="radio" name="organize" checked={organize === "Month"} onChange={e => setOrganize("Month")} />
        Month
      </FilterLabel>
      <FilterLabel>
        <input type="radio" name="organize" checked={organize === "Type"} onChange={e => setOrganize("Type")} />
        Type
      </FilterLabel>
    </ControlGroup>
  );
};



const cardMatchesFilters = filters => card => {
  if (filters.length === 0)
    return true;

  if (card.type === junk)
    return filters.includes(junk);
  else
    return filters.includes(card.type);
};

const cardComparator = organize => (a, b) => {
  let diff;

  if (organize === "Month")
    diff = monthIndex(a) - monthIndex(b);
  else if (organize === "Type")
    diff = typeIndex(a) - typeIndex(b);

  return diff !== 0
    ? diff
    : a.index - b.index;
};

const GroupLabel = ({ type,  group, count }) => {
  const Contents = () => {
    if (type === "Month") {
      const month = cardsByMonth.find(c => c.month === group);
      return <> {month.month}: <i>{month.plant}</i></>;
    } else if (type === "Type") {
      return <> {group} </>;
    }
  };

  return (
    <CardLabel>
      <Contents /> ({count})
    </CardLabel>
  );
}

