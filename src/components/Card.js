import styled from 'styled-components';
import './Card.css';

import { monthIndex, } from '../cards';

// from http://png-pixel.com/
const transparentPng100x164 =
  "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAACkCAQAAADLA0NrAAAAmUlEQVR42u3PAQEAAAgCoPx/uh8KD8iViIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIyHbkAQJkAKVTKMc5AAAAAElFTkSuQmCC";

export const Card = styled.img.attrs(p => ({
  className: `Card-image-${monthIndex(p.card)}-${p.card.index}`,
  src: transparentPng100x164
}))`
  display: inline-block;
  position: relative;
  margin-right: 2px;

  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 3px;

  cursor: pointer;

  @media (min-width: 376px) {
    width: calc(30px + 4vw);
  }
  @media (max-width: 375px) {
    width: calc(20vw - 10px);
  }
`;

export const cardKey = card => `${card.month} ${card.type} ${card.index}`;
