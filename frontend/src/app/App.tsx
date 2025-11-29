import type { ContainerType } from '../types/containerTypes';
import styled from 'styled-components';
import { Theme } from '../components/Theme';
import TopBar from '../components/TopBar';
import ContainerCard from './ContainerCard';

const ContainerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
  padding: 1rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

function App() {
  const movieContainer: ContainerType = {
    name: 'movie-night',
    status: 'Running',
    imagePath: './movie-night.png',
    lastUpdated: Date.now(),
  };

  const recipioContainer: ContainerType = {
    name: 'recipio',
    status: 'Stopped',
    imagePath: './recipio.png',
    lastUpdated: Date.now(),
  };

  return (
    <Theme>
      <TopBar />
      <ContainerGrid>
        <ContainerCard container={movieContainer} />
        <ContainerCard container={recipioContainer} />
      </ContainerGrid>
    </Theme>
  );
}

export default App;
