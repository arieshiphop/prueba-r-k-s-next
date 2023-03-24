import styled from 'styled-components';

const Indicator = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  border: 3px solid #4a658f;
  border-top-color: #fff;
  animation: spin 0.6s ease-in-out infinite;
  z-index: 9999;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingIndicator = () => {
  return <Indicator />;
}

export default LoadingIndicator;
