import React from 'react';
import { uniq, map, filter, pipe } from 'ramda';
import styled from 'styled-components';

import { Card, cardKey } from '../../components/Card';

import { combinations } from '../../Sets';

const ComboPage = styled.div`
  grid-area: page;
`;

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

export function Combinations () {
  return (
    <ComboPage>
      {combinations.map(combination => {
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

        const pool = pipe(
          filter(x => !requires.includes(x)),
          filter(x => !excludes.includes(x)),
          uniq
        ) (_pool);

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
      })}
    </ComboPage>
  );
}

function when (xs, cb) {
  if (xs.length)
    return cb();
}
