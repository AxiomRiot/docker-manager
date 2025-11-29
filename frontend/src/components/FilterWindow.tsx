import styled from 'styled-components';
import Genres from './Genres';
import Providers from './Providers';

const FilterWindowDiv = styled.div`
  background-color: white;
  border: 1px solid #ccc;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 9;
  display: flex;
`;

const VerticalDivider = styled.div`
  width: 1px;
  height: 90%;
  background: #4D4D4D;
  border-radius: 1px;
  min-height: 40px;
  margin: 0 2em;
`;

const GenreWrapper = styled.div`
  flex: 1;
`;

const ProvidersWrapper = styled.div`
  flex: 1;
`;

export default function FilterWindow() {
  function handleProviderUpdate(provider: string) {
    console.warn(provider);
  }

  return (
    <FilterWindowDiv>
      <GenreWrapper>
        <Genres />
      </GenreWrapper>
      <VerticalDivider />
      <ProvidersWrapper>
        <h2>Providers</h2>
        <Providers handleUpdateSelectedProviderList={handleProviderUpdate} />
      </ProvidersWrapper>
    </FilterWindowDiv>
  );
}
