import React, { useState } from 'react';
import { uniq, mapObjIndexed, pipe, map, sort, filter, groupBy } from 'ramda';
import styled from 'styled-components';

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
} from './cards';

import {
  combinations
} from './Sets';

import './App.css';
import './Cards.css';

const Card = styled.div`
  display: inline-block;
  margin: 2px;

  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 3px;

  width: ${p => p.size || 100}px;
  height: ${p => p.size ? 1.64 * p.size : 164}px;

  background-image: url("./cards/${p => monthIndex(p.card)}/${p => p.card.index}.png"); 
`;

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

function App() {
  const [listType, setListType] = useState("combinations");
  const [filters, setFilters] = useState([]);
  const [organize, setOrganize] = useState("Month");

  return (
    <div className="App">
      <div>
        <label>
          <input type="radio" name="listType" checked={listType === "cards"} value="cards" onChange={e => setListType(e.target.value)} />
          Cards
        </label>
        <label>
          <input type="radio" name="listType" checked={listType === "combinations"} value="combinations" onChange={e => setListType(e.target.value)} />
          Combinations
        </label>
      </div>
      {listType === "combinations"
        ? <Combinations />
        : <CardList {...{ filters, setFilters, organize, setOrganize }} />}
    </div>
  );
}

const cardKey = card => `${card.month} ${card.type} ${card.index}`;

const Combination = styled.div`
  display: inline-block;
  padding: 0 1em;
  border: solid hotpink 1px;
`;

const CombinationCards = ({ cards }) => (
  cards.map(card =>
    <Card card={card} key={cardKey(card)} />
  )
);

const CardInstructions = styled.div`
  display: block;
`;

const ComboTitle = styled.div`
  margin-top: 1em;
  font-weight: bold;
`;

function Combinations () {
  return combinations.map(combination => {
    const {
      name,
      pool: _pool = [],
      count,
      min,
      requires = [],
      excludes = [],
      sets = [],
      notes
    } = combination;

    const pool = uniq(
      _pool
      .filter(x => !requires.includes(x))
      .filter(x => !excludes.includes(x))
    );

    return (
      <div>
        <ComboTitle>
          {name}
        </ComboTitle>
        {notes &&
          <div>
            Note: {notes}
          </div>
        }
        {when(requires, () => (
          <Combination>
            <CardInstructions>
              the following cards
            </CardInstructions>
            <CombinationCards cards={requires} />
          </Combination>
        ))}
        {when(pool, () => (
          <Combination>
            <CardInstructions>
              {when(requires, () => "and")}
              {!min && !!pool.length && count && (count < pool.length + requires.length
                ? ` any ${count - requires.length} of the following cards: `
                : " all of the following cards: ")}
              {pool && min && ` at least ${min} of the following cards: `}
            </CardInstructions>
            <CombinationCards cards={pool.filter(c => !excludes.includes(c))} />
          </Combination>
        ))}
        {when(excludes, () => (
          <Combination>
            <CardInstructions>
              not
            </CardInstructions>
            <CombinationCards cards={excludes} />
          </Combination>
        ))}
        {when(sets, () => (
          <Combination>
            <CardInstructions>
              {sets.length === 1 && "All cards in this set:"}
              {sets.length > 1 && "Any one of these sets:"}
            </CardInstructions>
            {map(set => (
              <div>
                <CombinationCards cards={set} />
              </div>
            )) (sets)}
          </Combination>
        ))}
      </div>
    );
  });
}

const Cards = styled.div`
  text-align: left;
  margin: 0 auto;
  display: block;
  max-width: 90%;
  text-align: center;
`;

function CardList ({ filters, setFilters, organize, setOrganize }) {
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

export default App;

function when (xs, cb) {
  if (xs.length)
    return cb();
}
