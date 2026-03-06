import { Link, useParams, useLocation } from 'react-router-dom'
import { useWorkspaceRole } from '@/features/workspace/hooks/useWorkspaceRole'
import { useWorkspace } from '@/features/workspace/hooks/useWorkspace'
import {
  LayoutDashboard,
  FolderOpen,
  BookOpen,
  ClipboardCheck,
  Eye,
  Settings,
  GitBranch,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { WorkspaceRole } from '@/features/workspace/types'

interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  roles: WorkspaceRole[]
}

function getNavItems(workspaceSlug: string): NavItem[] {
  return [
    {
      label: 'Dashboard',
      href: `/${workspaceSlug}`,
      icon: LayoutDashboard,
      roles: ['builder', 'reviewer', 'client', 'developer'],
    },
    {
      label: 'Projects',
      href: `/${workspaceSlug}/projects`,
      icon: FolderOpen,
      roles: ['builder', 'reviewer', 'developer'],
    },
    {
      label: 'Knowledge Banks',
      href: `/${workspaceSlug}/knowledge-banks`,
      icon: BookOpen,
      roles: ['builder', 'developer'],
    },
    {
      label: 'Review Board',
      href: `/${workspaceSlug}/review`,
      icon: ClipboardCheck,
      roles: ['builder', 'reviewer', 'developer'],
    },
    {
      label: 'Client Portal',
      href: `/${workspaceSlug}/portal`,
      icon: Eye,
      roles: ['client'],
    },
    {
      label: 'Git',
      href: `/${workspaceSlug}/git`,
      icon: GitBranch,
      roles: ['developer'],
    },
    {
      label: 'Settings',
      href: `/${workspaceSlug}/settings`,
      icon: Settings,
      roles: ['builder', 'developer'],
    },
  ]
}

export function Sidebar() {
  const { workspaceSlug } = useParams()
  const location = useLocation()
  const { data: workspace } = useWorkspace(workspaceSlug)
  const { data: role } = useWorkspaceRole(workspace?.id)

  if (!workspaceSlug || !role) return null

  const navItems = getNavItems(workspaceSlug).filter((item) =>
    item.roles.includes(role)
  )

  return (
    <aside className="flex w-60 flex-col border-r bg-sidebar text-sidebar-foreground">
      <div className="border-b p-4">
        <h2 className="truncate font-semibold">{workspace?.name ?? workspaceSlug}</h2>
      </div>
      <nav className="flex-1 space-y-1 p-2">
        {navItems.map((item) => {
          const isActive =
            location.pathname === item.href ||
            (item.href !== `/${workspaceSlug}` && location.pathname.startsWith(item.href))

          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
