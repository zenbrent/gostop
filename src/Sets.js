import { any, none, all } from 'ramda';

import {
  specialCards,
  cardsByType
} from './cards';

export const matchesCombination = combination => cards => {
  const {
    name,
    count = null,
    min = null,
    pool = [],
    requires = [],
    excludes = [],
    sets = null
  } = combination;

  const cardSet = new Set(cards);
  const poolSet = new Set(pool);

  if (count !== null && cardSet.size !== count)
    return false;
  else if (min !== null && cardSet.size < min)
    return false;
  else if (count === null && min === null && sets === null)
    throw new Error(`sets, count, or min must be defined for ${name}`);

  if (sets !== null) {
    return any(s => {
      if (s.length !== cards.length)
        return false;
      const set = new Set(s);
      return all(c => set.has(c)) (cards);
    }) (sets);
  } else
    return all(x => poolSet.has(x)) (cards)
      && all(x => cardSet.has(x)) (requires)
      && none(x => cardSet.has(x)) (excludes);

};

// from http://www.sloperama.com/gostop/scoring.html
export const combinations = [
  // Brights
  {
    name: "5 Brights",
    points: { base: 15 },
    count: 5,
    pool: cardsByType.bright,
  }, {
    name: "Wet 4 Brights",
    points: { base: 4 },
    count: 4,
    pool: cardsByType.bright,
    requires: [specialCards.rainMan]
  }, {
    name: "Dry 4 Brights",
    points: { base: 5 },
    count: 4,
    pool: cardsByType.bright,
    excludes: [specialCards.rainMan]
  }, {
    name: "Wet 3 Brights",
    points: { base: 2 },
    count: 3,
    pool: cardsByType.bright,
    requires: [specialCards.rainMan]
  }, {
    name: "Dry 3 Brights",
    points: { base: 3 },
    count: 3,
    pool: cardsByType.bright,
    excludes: [specialCards.rainMan]
  },

  // Animals
  {
    name: "5 Animals",
    points: { base: 1, additionalAfter: 5 },
    min: 5,
    pool: cardsByType.animal
  }, {
    name: "Godori",
    points: { base: 3 },
    sets: [[specialCards.geese, specialCards.cuckoo, specialCards.nightingale]]
  },

  // Ribbons
  {
    name: "5 Ribbons",
    points: { base: 1, additionalAfter: 5 },
    count: 5,
    pool: cardsByType.ribbon
  }, {
    name: "3 Matching Ribbons",
    points: { base: 3 },
    notes:
`This doesn't include the "rain ribbon" in December.
Also note -- "Freedom of choice" principle: 2 ribbon triplets can count as 3 matching ribbons twice, plus 5 ribbons + 1, for 8 points.`,
    sets: [specialCards.poetryRibbons, specialCards.purpleRibbons, specialCards.dryRibbons]
  },

  // Junk
  {
    name: "Ten Pi",
    notes: "Pi is Korean for Junk",
    points: { base: 1, additionalAfter: 10 },
    min: 10,
    pool: cardsByType.junk,
  }, {
    name: "Special Junk",
    nots: "These cards count as 2 junks. The Sake card may be one Animal card XOR 2 junk cards. sang-pi in Korean.",
    points: { base: 2 },
    sets: [[specialCards.sake], [specialCards.lightning], [specialCards.paulownia]]
  }
];
