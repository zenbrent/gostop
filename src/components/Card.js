import styled from 'styled-components';
import './Card.css';
import { responsive } from '../Theme';

// from http://png-pixel.com/
const transparentPng100x164 =
  "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAACkCAQAAADLA0NrAAAAmUlEQVR42u3PAQEAAAgCoPx/uh8KD8iViIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIyHbkAQJkAKVTKMc5AAAAAElFTkSuQmCC";

export const Card = styled.img.attrs(p => ({
  className: `Card-image-${p.card.monthIndex}-${p.card.index}`,
  src: transparentPng100x164
}))`
  display: inline-block;
  position: relative;
  margin-right: 2px;

  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 3px;

  cursor: ${p => p.onClick ? 'pointer' : 'default'};

  ${responsive.lage} {
    width: ${p => p.width || 'calc(30px + 4vw)'};
  }

  ${responsive.small} {
    width: ${p => p.width || 'calc(25vw - 10px)'};
  }
`;

export const cardKey = card => `${card.month} ${card.type} ${card.index}`;
