import { combinations, matchesCombination } from './Sets';

import {allCards, cardsByType, specialCards, animal, bright } from './cards';

const brightCards = allCards.filter(c => c.type === bright);
const animalCards = allCards.filter(c => c.type === animal);

const dryBrights = brightCards.filter(c => c.month !== "December");
// can slice(0, n) and have a wet bright set
const wetBrights = [specialCards.rainMan, ...dryBrights];

test('sanity checks', () => {
  expect(dryBrights).toHaveLength(4);
})

describe('brights', () => {
  test('5 brights', () => {
    const c = combinations[0];
    expect(c.name).toBe("5 Brights");
    const matches = matchesCombination(c);

    expect(matches (brightCards)).toBe(true);
    expect(matches (brightCards.slice(0, 4))).toBe(false);
    expect(matches ([ ...brightCards.slice(0, 4), animalCards[0] ])).toBe(false);
  });

  test('Wet 4 brights', () => {
    const c = combinations[1];
    expect(c.name).toBe("Wet 4 Brights");

    const matches = matchesCombination(c);
    expect(matches (wetBrights.slice(0, 4))).toBe(true);
    expect(matches (brightCards)).toBe(false);
    expect(matches (dryBrights)).toBe(false);
    expect(matches ([ ...wetBrights.slice(0, 3), animalCards[0] ])).toBe(false);
  });

  test('Dry 4 brights', () => {
    const c = combinations[2];
    expect(c.name).toBe("Dry 4 Brights");

    const matches = matchesCombination(c);
    expect(matches (dryBrights)).toBe(true);
    expect(matches (wetBrights.slice(0, 4))).toBe(false);
    expect(matches (brightCards)).toBe(false);
    expect(matches ([ ...dryBrights.slice(0, 3), animalCards[0] ])).toBe(false);
  });

  test('Wet 3 brights', () => {
    const c = combinations[3];
    expect(c.name).toBe("Wet 3 Brights");

    const matches = matchesCombination(c);
    expect(matches (wetBrights.slice(0, 3))).toBe(true);
    expect(matches (dryBrights.slice(0, 3))).toBe(false);
    expect(matches (brightCards)).toBe(false);
    expect(matches ([ ...wetBrights.slice(0, 2), animalCards[0] ])).toBe(false);
  });

  test('Dry 3 brights', () => {
    const c = combinations[4];
    expect(c.name).toBe("Dry 3 Brights");

    const matches = matchesCombination(c);
    expect(matches (dryBrights.slice(0, 3))).toBe(true);
    expect(matches (wetBrights.slice(0, 3))).toBe(false);
    expect(matches (brightCards)).toBe(false);
    expect(matches ([ ...dryBrights.slice(0, 2), animalCards[0] ])).toBe(false);
  });
})

describe('animals', () => {
  test('5 animals', () => {
    const c = combinations[5];
    expect(c.name).toBe("5 Animals");

    const matches = matchesCombination(c);
    expect(matches (cardsByType.animal.slice(0, 5))).toBe(true);
    expect(matches (cardsByType.animal.slice(0, 3))).toBe(false);
    expect(matches (brightCards)).toBe(false);
    expect(matches ([ ...dryBrights.slice(0, 2), animalCards[0] ])).toBe(false);
  });

  test('Godori', () => {
    const c = combinations[6];
    expect(c.name).toBe("Godori");

    const matches = matchesCombination(c);
    expect(matches ([specialCards.geese, specialCards.cuckoo, specialCards.nightingale])).toBe(true);
    expect(matches ([specialCards.cuckoo, specialCards.geese, specialCards.nightingale])).toBe(true);
    expect(matches ([cardsByType.animal[2], specialCards.geese, specialCards.nightingale])).toBe(false);
  });
});
