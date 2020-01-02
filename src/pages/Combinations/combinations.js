import React from 'react';
import { uniq, map, filter, pipe } from 'ramda';
import styled from 'styled-components';

import { Card, cardKey } from '../../components/Card';

import { combinations } from '../../Sets';

const ComboPage = styled.div`
  grid-area: page;
`;

const ComboControls = styled.div`
  grid-area: controls;
  margin: 1rem;
  margin-top: 0;
`;

const ComboLink = styled.a`
  display: block;
`;

const Combination = styled.div`
  padding-bottom: 1rem;
`;

const CardList = styled.div`
  display: inline-block;
  padding-right: 1rem;
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
  text-align: center;
  font-weight: bold;
`;

const ComboPoints = styled(ComboTitle)`
  text-align: center;
  color: deeppink;
`;

export function Combinations () {
  return (
    <>
      <ComboControls>
        {combinations.map(({ name }) => (
          <ComboLink href={`#${name}`}>{name}</ComboLink>
        ))}
      </ComboControls>

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
            notes,
            points
          } = combination;

          const pool = pipe(
            filter(x => !requires.includes(x)),
            filter(x => !excludes.includes(x)),
            uniq
          ) (_pool);

          return (
            <Combination>
              <ComboTitle>
                <a name={name}>{name}</a>
              </ComboTitle>
              <ComboPoints>
                {points.base} {points.base === 1 ? 'point' : 'points'} 
                {!points.additionalAfter
                    ? ''
                    : (
                      ` after ${points.additionalAfter} cards, and an additional point per card after`
                    )
                }.
              </ComboPoints>
              {notes &&
                <div>
                  Note: {notes}
                </div>
              }
              {when(requires, () => (
                <CardList>
                  <CardInstructions>
                    {requires.length === 1 ? "this card" : "the following cards"}
                  </CardInstructions>
                  <CombinationCards cards={requires} />
                </CardList>
              ))}
              {when(pool, () => (
                <CardList>
                  <CardInstructions>
                    {when(requires, () => "and ")}
                    {!min && !!pool.length && count && (count < pool.length + requires.length
                      ? `any ${count - requires.length} of the following cards`
                      : "all of the following cards")}
                    {pool && min && `at least ${min} of the following cards`}
                  </CardInstructions>
                  <CombinationCards cards={pool.filter(c => !excludes.includes(c))} />
                </CardList>
              ))}
              {when(excludes, () => (
                <CardList>
                  <CardInstructions>
                    not
                  </CardInstructions>
                  <CombinationCards cards={excludes} />
                </CardList>
              ))}
              {when(sets, () => (
                <CardList>
                  <CardInstructions>
                    {sets.length === 1 && "All cards in this set"}
                    {sets.length > 1 && "Any one of these sets"}
                  </CardInstructions>
                  {map(set => (
                    <div>
                      <CombinationCards cards={set} />
                    </div>
                  )) (sets)}
                </CardList>
              ))}
            </Combination>
          );
        })}
      </ComboPage>
    </>
  );
}

function when (xs, cb) {
  if (xs.length)
    return cb();
}
