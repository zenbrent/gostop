import { filter, addIndex, pipe, map, flatten } from 'ramda';
const mapIndexed = addIndex(map);

const bright = "Bright";
const animal = "Animal";
const ribbon = "Ribbon";
const junk = "Junk";

export const types = { bright, animal, ribbon, junk };

const s = {
  poetryRibbon: "Poetry Ribbon",
  nightingale: "Nightingale",
  cuckoo: "Cuckoo",
  dryRibbon: "Dry Ribbon",
  purpleRibbon: "Purple Ribbon",
  geese: "Geese",
  paulownia: "Paulownia",
  sake: "Sake",
  rainMan: "Rain Man",
  lightning: "Lightning",
  godori: "Godori",
  specialJunk: "Special Junk"
}

export const specialCardNames = s;

export const cardsByMonth = [
  { month: "January", plant: "Pine", types: [
    { type: bright },
    { type: ribbon, names: [s.poetryRibbon] },
    { type: junk },
    { type: junk }
  ]},
  { month: "February", plant: "Plum", types: [
    { type: animal, names: [s.nightingale, s.godori] },
    { type: ribbon, names: [s.poetryRibbon] },
    { type: junk },
    { type: junk }
  ]},
  { month: "March", plant: "Cherry", types: [
    { type: bright },
    { type: ribbon, names: [s.poetryRibbon] },
    { type: junk },
    { type: junk }
  ]},

  { month: "April", plant: "Wisteria", types: [
    { type: animal, names: [s.cuckoo, s.godori] },
    { type: ribbon, names: [s.dryRibbon] },
    { type: junk },
    { type: junk }
  ]},
  { month: "May", plant: "Iris", types: [
    { type: animal },
    { type: ribbon, names: [s.dryRibbon] },
    { type: junk },
    { type: junk }
  ]},
  { month: "June", plant: "Peony", types: [
    { type: animal },
    { type: ribbon, names: [s.purpleRibbon] },
    { type: junk },
    { type: junk }
  ]},

  { month: "July", plant: "Blush Clover", types: [
    { type: animal },
    { type: ribbon, names: [s.dryRibbon] },
    { type: junk },
    { type: junk }
  ]},
  { month: "August", plant: "Pampas Grass", types: [
    { type: bright },
    { type: animal, names: [s.geese, s.godori] },
    { type: junk },
    { type: junk }
  ]},
  { month: "September", plant: "Chrysanthemum", types: [
    { type: animal, names: [s.sake, s.specialJunk] },
    { type: ribbon, names: [s.purpleRibbon] },
    { type: junk },
    { type: junk }
  ]},

  { month: "October", plant: "Maple", types: [
    { type: animal },
    { type: ribbon, names: [s.purpleRibbon] },
    { type: junk },
    { type: junk }
  ]},
  { month: "November", plant: "Paulownia", types: [
    { type: bright },
    { type: junk, names: [s.paulownia, s.specialJunk] },
    { type: junk },
    { type: junk }
  ]},
  { month: "December", plant: "Willow", types: [
    { type: bright, names: [s.rainMan] },
    { type: animal },
    { type: ribbon },
    { type: junk, names: [s.lightning, s.specialJunk] }
  ]}
];

const typeOrder = [ bright, animal, ribbon, junk ];
const typeIndex = ({ type }) => typeOrder.indexOf(type);

export const allCards = pipe(
  mapIndexed (({ types, ...month }, monthIndex) =>
    mapIndexed ((type, index) => ({
      ...month,
      names: [], // default
      ...type,
      index,
      monthIndex,
      typeIndex: typeIndex(type),
      sortIndex: monthIndex * 12 + index
    })) (types)
  ),
  flatten,
) (cardsByMonth);

const cardsOfType = type => filter(c => c.type === type) (allCards);

export const cardsByType = map(cardsOfType, types);

const specialCardsByName = Object.fromEntries(
  Object.entries(specialCardNames)
    .map(([, name]) => [name, []])
);

export const specialCards = allCards.reduce(
  (acc, card) => card.names.reduce((acc, name) => ({
    ...acc,
    [name]: [...acc[name], card]
  }), acc),
  specialCardsByName
);
