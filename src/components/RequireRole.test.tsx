import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RequireRole } from './RequireRole';
import { useAuth } from '../context/AuthContext';
import type { Profile } from '../types';

vi.mock('../context/AuthContext', () => ({ useAuth: vi.fn() }));

const mockedUseAuth = vi.mocked(useAuth);

function profile(role: Profile['role']): Profile {
  return { id: 'u1', username: 'ash', displayName: null, avatarUrl: null, role, hasClaimedLocal: true, tier: 'free' };
}

function renderWithRole(role: Parameters<typeof RequireRole>[0]['role']) {
  return render(
    <MemoryRouter>
      <RequireRole role={role}>
        <div>protected content</div>
      </RequireRole>
    </MemoryRouter>
  );
}

describe('RequireRole', () => {
  it('renders nothing while auth is loading', () => {
    mockedUseAuth.mockReturnValue({ profile: null, loading: true } as ReturnType<typeof useAuth>);
    const { container } = renderWithRole('teacher');
    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing when there is no profile', () => {
    mockedUseAuth.mockReturnValue({ profile: null, loading: false } as ReturnType<typeof useAuth>);
    const { container } = renderWithRole('teacher');
    expect(container).toBeEmptyDOMElement();
  });

  it('renders children when the profile role matches', () => {
    mockedUseAuth.mockReturnValue({ profile: profile('teacher'), loading: false } as ReturnType<typeof useAuth>);
    renderWithRole('teacher');
    expect(screen.getByText('protected content')).toBeInTheDocument();
  });

  it('shows a role-mismatch message with a link to /account for non-admin roles', () => {
    mockedUseAuth.mockReturnValue({ profile: profile('student'), loading: false } as ReturnType<typeof useAuth>);
    renderWithRole('teacher');
    expect(screen.queryByText('protected content')).not.toBeInTheDocument();
    expect(screen.getByText(/This page is for teacher accounts/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /update your account/i })).toHaveAttribute('href', '/account');
  });

  it('shows a manual-grant message with no self-serve link when denying admin access', () => {
    mockedUseAuth.mockReturnValue({ profile: profile('student'), loading: false } as ReturnType<typeof useAuth>);
    renderWithRole('admin');
    expect(screen.queryByText('protected content')).not.toBeInTheDocument();
    expect(screen.getByText(/granted manually/)).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
