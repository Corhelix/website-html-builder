import { createBrowserRouter, Navigate } from 'react-router-dom'

// Placeholder pages — replaced in Sprint 1
function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  )
}

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <PlaceholderPage title="Login" />,
  },
  {
    path: '/signup',
    element: <PlaceholderPage title="Sign Up" />,
  },
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
])
