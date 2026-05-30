import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HomePage } from './HomePage';

function renderComRouter() {
  return render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );
}

test('renderiza o input e o botao na tela', () => {
  const { getByPlaceholderText, getByText } = renderComRouter();

  expect(getByPlaceholderText('usuário...')).toBeInTheDocument();
  expect(getByText('Gerar Mapa Astral')).toBeInTheDocument();
});

test('mostra erro se tentar enviar sem digitar nada', async () => {
  const { getByText, findByText } = renderComRouter();

  const btn = getByText('Gerar Mapa Astral');
  btn.click();

  const erro = await findByText('Insira um usuário do GitHub para consultar os astros.');
  expect(erro).toBeInTheDocument();
});
