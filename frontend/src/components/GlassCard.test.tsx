import { render } from '@testing-library/react';
import { GlassCard } from './GlassCard';

test('renderiza o texto passado como filho', () => {
  const { getByText } = render(
    <GlassCard>
      <p>Texto dentro do card</p>
    </GlassCard>
  );

  expect(getByText('Texto dentro do card')).toBeInTheDocument();
});
