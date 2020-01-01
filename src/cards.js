import { filter, findIndex, addIndex, pipe, map, flatten } from 'ramda';

export const bright = "Bright";
export const animal = "Animal";
export const ribbon = "Ribbon";
export const junk = "Junk";

export const types = [bright, animal, ribbon, junk];

export const cardsByMonth = [
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

export const allCards = pipe(
  map(({ month, plant, types }) =>
    addIndex(map) ((type, index) => ({ month, plant, type, index })) (types)
  ),
  flatten,
) (cardsByMonth);

export const monthIndex = ({ month }) => findIndex(c => c.month === month) (cardsByMonth);
export const typeIndex = ({ type }) => findIndex(t => t === type) (types);

const byType = type => filter(c => c.type === type);

export const cardsByType = {
  bright: byType (bright) (allCards),
  animal: byType (animal) (allCards),
  ribbon: byType (ribbon) (allCards),
  junk: byType (junk) (allCards),
}

export const specialCards = {
  rainMan: allCards.find(c => c.month === "December" && c.index === 0),
  geese: allCards.find(c => c.month === "August" && c.type === animal),
  cuckoo: allCards.find(c => c.month === "April" && c.type === animal),
  nightingale: allCards.find(c => c.month === "February" && c.type === animal),
  poetryRibbons: allCards.filter(c => c.type === ribbon && ["January", "February", "March"].includes(c.month)),
  purpleRibbons: allCards.filter(c => c.type === ribbon && ["June", "September", "October"].includes(c.month)),
  dryRibbons: allCards.filter(c => c.type === ribbon && ["April", "May", "July"].includes(c.month)),

  sake: allCards.find(c => c.month === "September" && c.index === 1),
  lightning: allCards.find(c => c.month === "December" && c.index === 3),
  paulownia: allCards.find(c => c.month === "November" && c.index === 1)
};

