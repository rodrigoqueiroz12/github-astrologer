import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { NavBar } from './NavBar';

test('exibe o título da aplicação no NavBar', () => {
  const { getByText } = render(
    <BrowserRouter>
      <NavBar />
    </BrowserRouter>
  );

  // Verifica se o título aparece
  expect(getByText('Astrologia de Commits GitHub')).toBeInTheDocument();
});

test('exibe o link "Mapas Astrais" no NavBar', () => {
  const { getByText } = render(
    <BrowserRouter>
      <NavBar />
    </BrowserRouter>
  );

  expect(getByText('Mapas Astrais')).toBeInTheDocument();
});
