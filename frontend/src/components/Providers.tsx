import styled from 'styled-components';
import { PROVIDERS } from '../config/config';

interface ProvidersProps {
  handleUpdateSelectedProviderList: (provider: string) => void;
}

const ProviderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ProviderInput = styled.input`
  border: none;
`;

export default function Providers({ handleUpdateSelectedProviderList }: ProvidersProps) {
  return (
    <ProviderContainer>
      {PROVIDERS.map((item, index) => (
        <ProviderInput
          key={index}
          type="image"
          src={item.imageSrc}
          onClick={() => handleUpdateSelectedProviderList(item.text)}
        />
      ))}
    </ProviderContainer>
  );
}
