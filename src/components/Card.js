// import React from 'react';
import styled from 'styled-components';

import { monthIndex, } from '../cards';

import '../Cards.css';

export const Card = styled.div`
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

export const cardKey = card => `${card.month} ${card.type} ${card.index}`;
