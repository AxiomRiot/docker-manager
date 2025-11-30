/* eslint-disable style/jsx-one-expression-per-line */
/* eslint-disable style/multiline-ternary */
import type { ContainerType } from '../types/containerTypes';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Theme } from '../components/Theme';
import TopBar from '../components/TopBar';
import { getLoadedContainers } from '../services/containerService';
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [containers, setContainers] = useState<ContainerType[] | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await getLoadedContainers();
        const list = Array.isArray(result) ? result : [];
        if (mounted)
          setContainers(list);
      }
      catch (err) {
        if (mounted)
          setError(String(err));
      }
      finally {
        if (mounted)
          setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  let content = <div></div>;
  if (loading) {
    content = <div style={{ padding: 16 }}>Loading…</div>;
  }
  else {
    if (error) {
      content = <div style={{ color: 'red', padding: 16 }}>Error: {error}</div>;
    }
    else {
      content = (
        <ContainerGrid>
          {containers && containers.length > 0 ? (
            containers.map((c, index) => (
              <ContainerCard key={index} container={c} />
            ))
          ) : (
            <div style={{ padding: 16 }}>No containers available.</div>
          )}
        </ContainerGrid>
      );
    }
  }

  return (
    <Theme>
      <TopBar />
      {content}
    </Theme>
  );
}

export default App;
