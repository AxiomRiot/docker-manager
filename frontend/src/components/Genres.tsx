import React, { useState } from 'react';
import styled from 'styled-components';
import { GENRES } from '../config/config';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const GenreDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.5rem;
  align-items: start;
`;

const GenreButton = styled.button<{ $active?: boolean }>`
  background: ${({ $active }) =>
    $active ? 'oklch(84% 0.03 250)' : 'oklch(98.5% 0.001 106.423)'};
  border-radius: 4px;
  box-shadow: ${({ $active }) =>
    $active
      ? 'inset 0 3px 6px rgba(0,0,0,0.18), 0 1px 2px rgba(0,0,0,0.2)'
      : '0px 4px 6px rgba(0, 0, 0, 0.5)'};
  border: 1px solid #e0e0e0;
  padding: 10px 10px;
  margin: 4px;
  color: #4d4d4d;
  cursor: pointer;

  transition: transform 120ms ease, box-shadow 120ms ease, background 120ms ease;
  will-change: transform, box-shadow;

  &:hover {
    background: ${({ $active }) =>
      $active ? 'oklch(82% 0.03 248)' : 'oklch(86.9% 0.022 252.894)'};
  }

  &:active {
    transform: translateY(2px);
    box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.35), inset 0 3px 6px rgba(0,0,0,0.12);
  }

  /* ensure keyboard users see pressed state */
  &:focus-visible {
    outline: 2px solid rgba(0,0,0,0.12);
    outline-offset: 2px;
  }

  /* show depressed look when toggled on */
  ${({ $active }) =>
      $active && `transform: translateY(2px);`
  }
`;

export default function Genres() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  function toggleGenre(genre: string) {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(genre)) next.delete(genre);
      else next.add(genre);
      return next;
    });
  }

  return (
    <Wrapper>
      <h2>Genres</h2>
      <GenreDiv>
        {GENRES.map((item, index) => {
          const isActive = selected.has(item);
          return (
            <GenreButton
              key={index}
              $active={isActive}
              aria-pressed={isActive}
              onClick={() => toggleGenre(item)}
            >
              {item}
            </GenreButton>
          );
        })}
      </GenreDiv>
    </Wrapper>
  );
}
