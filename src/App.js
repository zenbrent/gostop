import React, { useState } from 'react';
import { mapObjIndexed, addIndex, findIndex, pipe, map, flatten, sort, filter, groupBy } from 'ramda';

import './App.css';
import './Cards.css';

const monthIndex = ({ month }) => findIndex(c => c.month === month) (cards);
const typeIndex = ({ type }) => findIndex(t => t === type) (types);

function Card (card) {
  const { /* month, plant, type, */ index } = card;

  return (
    <div className={`Card Card-medium Card-image-${monthIndex(card)}-${index}`}>
    </div>
  );
}

const bright = "Bright";
const animal = "Animal";
const ribbon = "Ribbon";
const junk = "Junk";

const types = [bright, animal, ribbon, junk];

const cards = [
  { month: "January", plant: "Pine", types: [bright, ribbon, junk, junk] },
  { month: "February", plant: "Plum", types: [animal, ribbon, junk, junk] },
  { month: "March", plant: "Cherry", types: [bright, ribbon, junk, junk] },

  { month: "April", plant: "Wisteria", types: [animal, ribbon, junk, junk] },
  { month: "May", plant: "Iris", types: [animal, ribbon, junk, junk] },
  { month: "June", plant: "Peony", types: [animal, ribbon, junk, junk] },

  { month: "July", plant: "Blush Clover", types: [animal, ribbon, junk, junk] },
  { month: "August", plant: "Pampas Grass", types: [bright, animal, junk, junk] },
  { month: "September", plant: "Chrysanthemum", types: [animal, ribbon, junk, junk] },

  { month: "October", plant: "Maple", types: [animal, ribbon, junk, junk] },
  { month: "November", plant: "Paulownia", types: [bright, junk, junk, junk] },
  { month: "December", plant: "Willow", types: [bright, animal, ribbon, junk] }
];

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

  if (diff === 0)
    return a.index - b.index;
  else
    return diff;
};

const GroupLabel = ({ type,  group, count }) => {
  if (type === "Month") {
    const month = cards.find(c => c.month === group);
    return (<div className="Card-label"> {month.month}: <i>{month.plant}</i> ({count})</div>);
  } else if (type === "Type") {
    return (<div className="Card-label"> {group}  ({count})</div>);
  }
}

function App() {
  const [filters, setFilters] = useState([]);
  const [organize, setOrganize] = useState('Month');

  return (
    <div className="App">
      <Filters filters={filters} setFilters={setFilters} />
      <Organize organize={organize} setOrganize={setOrganize} />

      <div className="Cards">
        {pipe(
          map(({ month, plant, types }) =>
            addIndex(map) ((type, index) => ({ month, plant, type, index })) (types)
          ),
          flatten,
          filter(cardMatchesFilters(filters)),
          sort(cardComparator(organize)),
          groupBy(card => card[organize.toLowerCase()]),

          map(map(card => (
            <Card
              key={`${card.month} ${card.type} ${card.index}`}
              month={card.month} plant={card.plant} type={card.type} index={card.index} />
          ))),

          mapObjIndexed((cards, group) => (
            <div key={group} className="Card-group">
              <GroupLabel type={organize} group={group} count={cards.length} />
              <div>{cards}</div>
            </div>
          )),

          Object.values
        ) (cards)}
      </div>
    </div>
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
  const isChecked = name => filters.includes(name);
  const change = name => e => {
    if (e.target.checked)
      setFilters([name, ...filters]);
    else
      setFilters(filters.filter(f => f !== name));
  };

  return (
    <div>
      <label>
        <input type="checkbox" checked={filters.length === 0} onChange={e => e.target.checked ? setFilters([]) : setFilters([bright])} />
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
