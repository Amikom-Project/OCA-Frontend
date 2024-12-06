import { useNavigate } from 'react-router-dom';

type NavigateWithState = <T>(path: string, state: T) => void;

const useNavigateWithState = (): NavigateWithState => {
  const navigate = useNavigate();

  return (path, state) => {
    navigate(path, { state });
  };
};

export { useNavigateWithState };
