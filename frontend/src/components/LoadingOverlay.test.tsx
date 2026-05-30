import { render } from '@testing-library/react';
import { LoadingOverlay } from './LoadingOverlay';

test('exibe a primeira mensagem de carregamento', () => {
  const { getByText } = render(<LoadingOverlay />);

  expect(
    getByText('Lendo as estrelas e ignorando o .gitignore...')
  ).toBeInTheDocument();
});
