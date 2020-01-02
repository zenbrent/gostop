import React from 'react';
import styled from 'styled-components';

const Page = styled.div`
  grid-area: page;
`;

const Serve = styled.div`
  margin-bottom: 1rem;
`;

const Players = styled.div``;

const Hand = styled.div``;

const Field = styled.div``;

const Count = styled.span`
  font-weight: bold;
`;

const Strategy = ({ serve }) => {
  const hand = serve.hand / 2;
  const field = serve.field / 2;

  const repeat = serve.hand % 2 === 0 && serve.field % 2 === 0;

  const after = repeat
    ? ". Repeat."
    : (
      <>
        , then {Math.floor(hand)} to each player and {Math.floor(field)} to the field.
      </>
    )

  return (
    <div>
      Deal {Math.ceil(hand)} to each player and {Math.ceil(field)} to the field{after}
    </div>
  )
}

export function Serving () {
  return (
    <Page>
      {serves.map(serve => (
        <Serve key={serve.players}>
          <Players>For <Count>{serve.players}</Count> players:</Players>
          <Hand><Count>{serve.hand}</Count> cards to each player</Hand>
          <Field><Count>{serve.field}</Count> cards on the field</Field>
          <Strategy serve={serve} />
        </Serve>
      ))}
    </Page>
  );
};

const serves = [
  { players: 2, hand: 10, field: 8 },
  { players: 3, hand: 7,  field: 6 },
  { players: 4, hand: 6,  field: 4 },
  { players: 5, hand: 5,  field: 3 },
];
