
import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import styled from 'styled-components';

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledSpinner = styled(FaSpinner)`
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Spinner = () => (
  <SpinnerContainer>
    <StyledSpinner size={48} />
  </SpinnerContainer>
);

export default Spinner;