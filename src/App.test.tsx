import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders a generated password and controls on mount', () => {
    render(<App basename="/" />);

    expect(screen.getByText('Password Generator')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Generate' })).toBeInTheDocument();
    expect(screen.getByLabelText('Character length')).toBeInTheDocument();
  });
});
