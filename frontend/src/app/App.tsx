/* eslint-disable style/jsx-one-expression-per-line */
/* eslint-disable style/multiline-ternary */
import type { ContainerType } from '../types/containerTypes';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Theme } from '../components/Theme';
import TopBar from '../components/TopBar';
import { getLoadedContainers, startContainer, stopContainer } from '../services/containerService';
import { STATUS } from '../types/containerTypes';
import ContainerCard from './ContainerCard';

const ContainerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  padding: 1rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [containers, setContainers] = useState<ContainerType[]>([]);

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

  async function handleRequest(container: string, updatedStatus: STATUS) {
    setError(null);

    try {
      let result = { name: '' };

      if (updatedStatus === STATUS.STOPPED) {
        result = await stopContainer(container);
      }
      else if (updatedStatus === STATUS.RUNNING) {
        result = await startContainer(container);
      }

      setContainers(prev => prev.map(c => (
        result.name === container ? { ...c, status: updatedStatus } : c),
      ));
    }
    catch (err) {
      setContainers(prev => prev.map(c => (
        c.name === container ? { ...c, status: STATUS.RUNNING } : c),
      ));

      setError(String(err));
    }
  }

  async function handleOnStop(container: string) {
    setContainers(prev => prev.map(c => (
      c.name === container ? { ...c, status: STATUS.STOPPING } : c),
    ));

    await handleRequest(container, STATUS.STOPPED);
  }

  async function handleOnStart(container: string) {
    setContainers(prev => prev.map(c => (
      c.name === container ? { ...c, status: STATUS.STARTING } : c),
    ));

    await handleRequest(container, STATUS.RUNNING);
  }

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
          {containers.length > 0 ? (
            containers.map((c, index) => (
              <ContainerCard
                onStop={() => handleOnStop(c.name)}
                onStart={() => handleOnStart(c.name)}
                key={index}
                container={c}
              />
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
