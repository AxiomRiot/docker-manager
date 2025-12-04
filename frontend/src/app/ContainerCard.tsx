import type { ContainerType } from '../types/containerTypes';
import styled from 'styled-components';

interface ContainerCardProps {
  container: ContainerType;
  onStop: () => void;
  isStopping: boolean;
}

const Card = styled.div`
  background: white;          /* dark mode background */
  color: oklch(44.6% 0.043 257.281);
  border-radius: 8px;
  padding: 1em;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 180px;
  max-height: 300px;
  max-width: 180px;
`;

export const CardImage = styled.img`
  width: 48px;
  height: 48px;
  object-fit: contain;   /* keeps aspect ratio */
  margin-bottom: 0.1em;
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.1rem;
`;

export const CardText = styled.p`
  font-size: 0.9rem;
  margin-top: 2px;
  color: #ccc;
`;

export const CardSpan = styled.span`
  font-size: 1rem;
  margin-top: 2px;
  color: oklch(44.6% 0.043 257.281);
  margin-bottom: 4px;
`

export const StatusDiv = styled.div`
  margin-bottom: 8px;
`

export const CardActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.2rem;
`;

export const ActionButton = styled.button`
  flex: 1;
  margin: 0 0.25rem;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  color: #fff;
`;

export const PullButton = styled(ActionButton)`
  background: oklch(62.3% 0.214 259.815);

  &:hover {
    background-color: oklch(54.6% 0.245 262.881);
  }
`;

export const RunButton = styled(ActionButton)`
  background: oklch(72.3% 0.219 149.579);

  &:hover {
    background-color: oklch(62.7% 0.194 149.214);
  }
`;

export const StopButton = styled(ActionButton)`
  background: oklch(63.7% 0.237 25.331);

  &:hover {
    background-color: oklch(57.7% 0.245 27.325);
  }

  &:disabled {
    background-color: red;
  }
`;

const STATUS_COLORS: Record<string, string> = {
  running: '#4caf50',
  stopped: '#f44336',
  paused: '#ff9800',
  restarting: '#2196f3',
  default: '#4d4d4d',
};

// add this helper
const getStatusColor = (status?: string) =>
  STATUS_COLORS[status?.toLowerCase() ?? ''] ?? STATUS_COLORS.default;

export const StatusText = styled(CardSpan)<{ $status?: string }>`
  --status-color: ${({ $status }) => getStatusColor($status)};
  color: var(--status-color);
  font-weight: 700;
  letter-spacing: 0.02em;
  text-shadow: 0 0 12px var(--status-color);
  transform-origin: center;
`;

export default function ContainerCard({ container, onStop, isStopping }: ContainerCardProps) {
  const imageStr = `${container.name}:latest`;
  const disabledStop = isStopping || container.status !== 'running';

  function calculateTimeDelta(): string {
    const seconds = Date.now() - container.lastUpdated;

    return `Updated ${seconds} seconds ago`;
  }

  return (
    <Card>
      <CardImage src={container.imagePath} alt={container.name} />
      <CardTitle>{container.name}</CardTitle>
      <CardText>{imageStr}</CardText>
      <StatusDiv>
        <CardSpan>Status: </CardSpan>
        <StatusText $status={container.status}>{container.status}</StatusText>
      </StatusDiv>
      <CardText>{calculateTimeDelta()}</CardText>
      <CardActions>
        <PullButton>PULL</PullButton>
        <RunButton>RUN</RunButton>
        <StopButton
          disabled={isStopping}
          onClick={(e) => {
            e.preventDefault();
            if (!disabledStop)
              onStop();
          }}
        >
          STOP
        </StopButton>
      </CardActions>
    </Card>
  );
}
