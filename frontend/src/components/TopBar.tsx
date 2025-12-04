import styled from 'styled-components';

const TopBarContainer = styled.div`
  height: 50px;
  display: flex;
  justify-content: start;
  align-items: center;
  background-color: oklch(90.1% 0.058 230.902);
`;

const Title = styled.p`
  font-family: 'Roboto';
  color: #36B1D9;
  font-size: larger;
  font-weight: 700;
  margin-left: 10px;
`;

const StyledImage = styled.img`
  margin-left: 12px;
`;

export default function TopBar() {
  return (
    <TopBarContainer>
      <StyledImage src="docker.png" />
      <Title>dockerDash</Title>
    </TopBarContainer>
  );
}
