import { createBrowserRouter } from 'react-router-dom'
import { AuthGuard } from '@/features/auth/components/AuthGuard'
import { LoginForm } from '@/features/auth/components/LoginForm'
import { SignupForm } from '@/features/auth/components/SignupForm'
import { MagicLinkForm } from '@/features/auth/components/MagicLinkForm'
import { AuthCallback } from '@/features/auth/components/AuthCallback'
import { AppShell } from '@/components/layout/AppShell'
import { WorkspaceSelector } from '@/features/workspace/components/WorkspaceSelector'
import { CreateWorkspaceForm } from '@/features/workspace/components/CreateWorkspaceForm'
import { WorkspaceDashboard } from '@/features/workspace/components/WorkspaceDashboard'
import { WorkspaceSettings } from '@/features/workspace/components/WorkspaceSettings'

function AuthPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      {children}
    </div>
  )
}

function ProtectedPage({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        {children}
      </div>
    </AuthGuard>
  )
}

function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center p-8">
      <p className="text-muted-foreground">{title} — coming in next sprint</p>
    </div>
  )
}

export const router = createBrowserRouter([
  // Public auth routes
  {
    path: '/login',
    element: <AuthPage><LoginForm /></AuthPage>,
  },
  {
    path: '/signup',
    element: <AuthPage><SignupForm /></AuthPage>,
  },
  {
    path: '/magic-link',
    element: <AuthPage><MagicLinkForm /></AuthPage>,
  },
  {
    path: '/auth/callback',
    element: <AuthCallback />,
  },

  // Workspace creation (protected but no shell)
  {
    path: '/workspace/new',
    element: (
      <ProtectedPage>
        <CreateWorkspaceForm />
      </ProtectedPage>
    ),
  },

  // Workspace selector (protected, no shell)
  {
    path: '/',
    element: (
      <AuthGuard>
        <WorkspaceSelector />
      </AuthGuard>
    ),
  },

  // Workspace routes (protected, with AppShell)
  {
    path: '/:workspaceSlug',
    element: (
      <AuthGuard>
        <AppShell />
      </AuthGuard>
    ),
    children: [
      { index: true, element: <WorkspaceDashboard /> },
      { path: 'settings', element: <WorkspaceSettings /> },
      { path: 'members', element: <WorkspaceSettings /> },
      // Sprint 2 placeholders
      { path: 'projects', element: <ComingSoon title="Projects" /> },
      { path: 'projects/:projectId', element: <ComingSoon title="Project" /> },
      { path: 'knowledge-banks', element: <ComingSoon title="Knowledge Banks" /> },
      { path: 'knowledge-banks/:kbId', element: <ComingSoon title="Knowledge Bank" /> },
      // Sprint 5 placeholder
      { path: 'review', element: <ComingSoon title="Review Board" /> },
      // Sprint 7 placeholder
      { path: 'portal', element: <ComingSoon title="Client Portal" /> },
      // Sprint 6 placeholder
      { path: 'git', element: <ComingSoon title="Git" /> },
    ],
  },
])
