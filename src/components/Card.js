// import React from 'react';
import styled from 'styled-components';

import { monthIndex, } from '../cards';

export const Card = styled.div`
  display: inline-block;
  position: relative;
  margin: 2px;

  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 3px;

  width: calc(30px + 4vw);
  height: calc((30px + 4vw) * 1.64);

  background-image: url("./cards/${p => monthIndex(p.card)}/${p => p.card.index}.png"); 

  &:hover:before {
    background-image: url("./cards/${p => monthIndex(p.card)}/${p => p.card.index}.png"); 
    position: absolute;
    content: ' ';
    top: -50%;
    right: -50%;
    bottom: -50%;
    left: -50%;
    z-index: 1;
    box-shadow: rgba(100, 100, 100, 0.5) 3px 3px 15px 1px;
    cursor: pointer;

    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 3px;

    background-image: url("./cards/${p => monthIndex(p.card)}/${p => p.card.index}.png"); 

  }
`;

export const cardKey = card => `${card.month} ${card.type} ${card.index}`;
