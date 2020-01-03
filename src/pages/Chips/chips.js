/* eslint-disable */
import React, { useState } from 'react';
import styled from 'styled-components';
import { SectionTitle, SectionSubtitle } from '../../Theme';

const Page = styled.div`
  grid-area: page;
`;

// const Serve = styled.div`
//   margin-bottom: 1rem;
// `;

const Em = styled.em`
  font-weight: bold;
  font-style: initial;
`;

const Go = () => <Em>Go</Em>;
const Stop = () => <Em>Stop</Em>;

const emptyScores = () => ({
  score: 0,
  shakes: 0,
  brightCards: 0,
  animalCards: 0,
  junkCards: 0,
  lastRoundWasDraw: false,
  gos: 0,
  result: {}
});

export function Chips () {
  const [players, setPlayers] = useState([
    emptyScores(),
    emptyScores(),
    emptyScores(),
    emptyScores(),
    emptyScores()
  ]);
  const results = calculateChips(players);

  function setScore (update, _i) {
    const newPlayers = players.map((player, i) => ({
      ...player,
      ...(_i === i ? update : {}),
    }));

    setPlayers(newPlayers);
  }

  return (
    <Page>
      <SectionTitle>Chips</SectionTitle>

      <p>
        Decide at the beginning of the game how many points can <Stop /> & win the game.
        With 2 players, it's usually set to 5 or 7 points. With 3 or more players, the score is usually 3.
      </p>

      <p>
        When a player gets the chosen number of points, they can say <Stop /> and collect their reward,
        or they can say <Go /> and continue playing. Every time they say <Go /> they get a larger reward
        if they win. They can then say <Go /> the next time their score is higer than the last time they
        said <Go />
      </p>

      <p>
        Note: if a player says <Go /> and another player reaches the set score, they can say <Stop /> and
        collect the reward, even if their score is lower.
      </p>

      <p>
        Also, if a player says <Go /> and doesn't increase their score, they do not win.
      </p>

      <p>
        When a player <Stop /> they are paid chips equal to their score by each other player.
      </p>

      <p>
        If a player says <Go /> once, they get 1 extra chip from each player.<br />
        If a player says <Go /> twice, they get an additional 1 extra chip (totalling 2) from each player.<br />
        If a player says <Go /> thrice, they get those 2 chips from each player, then each opponent pays double.<br />
        If a player says <Go /> four times, and each opponent pays double again.
      </p>


      Other conditions:
      <p>
        When you start a game, if a player has 3 cards of the same month in their hand, they can show it to their opponents.<br />
        If they do that and still win, then each opponent must pay double.<br />
        If they showed two such sets, two doubles are applied, quadrupling the payment.
      </p>
      <p>
        If the winner has a scoring set of bright cards, then opponents with no captured bright cards must pay double.
      </p>
      <p>
        If the winner has a 7 or ore animal cards, then each opponent must pay double.
      </p>
      <p>
        If the winner has a set 10 or more junk cards,
        then opponents with less than 5 junk cards must pay double.
        (For this purpose, the special junk cards count as two or three junk, as for scoring).
      </p>

      {players.map((p, i) =>
        <ScoreForm
          score={p}
          setScore={score => setScore(score, i)}
          result={results[i]}
          />
      )}
    </Page>
  );
};



const Form = styled.form`
  display: block;
  margin-bottom: 1em;
`;

const Label = styled.label`
  display: block;
`;

const intValue = cb => e => cb(parseInt(e.target.value));
const checked = cb => e => cb(e.target.checked);

const ScoreForm = ({ score, setScore, result }) => {
  const update = prop => value => setScore({ ...score, [prop]: value });

  return (
    <Form>
      <Label>Score: <input type="number" value={score.score} onChange={intValue(update('score'))} /></Label>
      <Label>Shakes: <input type="number" value={score.shakes} onChange={intValue(update('shakes'))} /></Label>
      <Label>Bright Cards: <input type="number" value={score.brightCards} onChange={intValue(update('brightCards'))} /></Label>
      <Label>Animal Cards: <input type="number" value={score.animalCards} onChange={intValue(update('animalCards'))} /></Label>
      <Label>Junk Cards: <input type="number" value={score.junkCards} onChange={intValue(update('junkCards'))} /></Label>
      <Label>Last Round Was Draw: <input type="checkbox" checked={score.lastRoundWasDraw} onChange={checked(update('lastRoundWasDraw'))} /></Label>
      <Label>Gos: <input type="number" value={score.gos} onChange={intValue(update('gos'))} /></Label>

      {JSON.stringify(result)}
    </Form>
  )
}

const emptyModifier = () => ({ doubles: 0, add: 0, subtract: 0 });

const calculateChips = hands => {
  const [winnersHand, ...othersHands] = hands;

  const basePayment = winnersHand.score;

  const winnersModifier = emptyModifier();
  const othersModifiers = othersHands.map(emptyModifier);

  const {
    score,                     // other players pay the winner's score
    shakes = 0,                // showing 3 cards of the same month from your hand. each player pays double.
    brightCards = 0,           // if winner has a scoring bright set, players w/ 0 brights pay double.
    animalCards = 0,           // winner has 7+ animals, other players pay double.
    junkCards = 0,             // winner has 10+ junks, others w/ less than 5 pay double. Specials count.
    lastRoundWasDraw = false,  // if the last round was a draw, winner gets double.
    gos = 0,                   // 1: +1, 2: +1 again, 3: double, 4 double again, etc.
  } = winnersHand;

  winnersModifier.doubles += shakes;
  winnersModifier.doubles += gos;
  if (animalCards > 7)
    winnersModifier.doubles++;
  if (lastRoundWasDraw)
    winnersModifier.doubles++;

  if (junkCards >= 10)
    othersHands.forEach((hand, i) => {
      console.log({hand, i, othersModifiers})
      if (hand.junkCards < 5)
        othersModifiers[i].doubles++;
    });

  if (brightCards > 3)
    othersHands.forEach((hand, i) => {
      if (hand.brightCards === 0)
        othersModifiers[i].doubles++;
    });

  return [
    winnersModifier,
    ...othersModifiers
  ];
}

