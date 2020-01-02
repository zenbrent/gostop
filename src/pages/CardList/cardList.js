import React from 'react';
import styled from 'styled-components';
import { mapObjIndexed, pipe, map, sort, filter, groupBy } from 'ramda';
import {
  bright,
  animal,
  ribbon,
  junk,
  types,
  allCards,
  cardsByMonth,
  monthIndex,
  typeIndex,
} from '../../cards';

import { Card } from '../../components/Card';

const cardKey = card => `${card.month} ${card.type} ${card.index}`;

const Cards = styled.div`
  text-align: left;
  margin: 0 auto;
  display: block;
  max-width: 90%;
  text-align: center;
`;

export function CardList ({ filters, setFilters, organize, setOrganize }) {
  return (
    <>
      <Filters filters={filters} setFilters={setFilters} />
      <Organize organize={organize} setOrganize={setOrganize} />

      <Cards>
        {pipe(
          filter(cardMatchesFilters(filters)),
          sort(cardComparator(organize)),
          groupBy(card => card[organize.toLowerCase()]),

          map(map(card => (
            <Card card={card} key={cardKey(card)} />
          ))),

          mapObjIndexed((cards, group) => (
            <div key={group} className="Card-group">
              <GroupLabel type={organize} group={group} count={cards.length} />
              <div>{cards}</div>
            </div>
          )),

          Object.values
        ) (allCards)}
      </Cards>
    </>
  );
}

const Organize = ({ organize, setOrganize }) => {
  return (
    <div>
      <label>
        <input type="checkbox" checked={organize === "Month"} onChange={e => setOrganize("Month")} />
        Month
      </label>
      <label>
        <input type="checkbox" checked={organize === "Type"} onChange={e => setOrganize("Type")} />
        Type
      </label>
    </div>
  );
};

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

  return (
    <div>
      <label>
        <input type="checkbox" checked={isAll} onChange={e => e.target.checked ? setFilters(types) : setFilters([bright])} />
        All
      </label>
      <label>
        <input type="checkbox" checked={isChecked(bright)} onChange={change(bright)} />
        Bright
      </label>
      <label>
        <input type="checkbox" checked={isChecked(animal)} onChange={change(animal)} />
        Animal
      </label>
      <label>
        <input type="checkbox" checked={isChecked(ribbon)} onChange={change(ribbon)} />
        Ribbon
      </label>
      <label>
        <input type="checkbox" checked={isChecked(junk)} onChange={change(junk)} />
        Junk
      </label>
    </div>
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
  if (type === "Month") {
    const month = cardsByMonth.find(c => c.month === group);
    return (<div className="Card-label"> {month.month}: <i>{month.plant}</i> ({count})</div>);
  } else if (type === "Type") {
    return (<div className="Card-label"> {group}  ({count})</div>);
  }
}

