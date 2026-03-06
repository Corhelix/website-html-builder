import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useProject } from '../hooks/useProjects'
import { usePages, useCreatePage, useDeletePage } from '../hooks/usePages'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, FileText, Trash2 } from 'lucide-react'

export function ProjectDashboard() {
  const { workspaceSlug, projectId } = useParams()
  const { data: project, isLoading } = useProject(projectId)
  const { data: pages } = usePages(projectId)
  const createPage = useCreatePage(projectId ?? '')
  const deletePage = useDeletePage(projectId ?? '')

  const [newPageName, setNewPageName] = useState('')
  const [showAddPage, setShowAddPage] = useState(false)

  if (isLoading) {
    return <div className="animate-pulse p-8 text-muted-foreground">Loading project...</div>
  }

  if (!project) {
    return <div className="p-8 text-muted-foreground">Project not found</div>
  }

  const handleAddPage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPageName.trim()) return

    await createPage.mutateAsync({ name: newPageName.trim() })
    setNewPageName('')
    setShowAddPage(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{project.name}</h1>
        <div className="mt-1 flex items-center gap-2">
          <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
            {project.status}
          </Badge>
          {project.knowledge_bank && (
            <Badge variant="outline">KB: {project.knowledge_bank.name}</Badge>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Pages</h2>
          <Button variant="outline" size="sm" onClick={() => setShowAddPage(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add page
          </Button>
        </div>

        {showAddPage && (
          <Card>
            <CardContent className="pt-4">
              <form onSubmit={handleAddPage} className="flex gap-2">
                <Input
                  placeholder="Page name (e.g. Homepage, About, Pricing)"
                  value={newPageName}
                  onChange={(e) => setNewPageName(e.target.value)}
                  autoFocus
                />
                <Button type="submit" disabled={createPage.isPending}>Add</Button>
                <Button type="button" variant="ghost" onClick={() => setShowAddPage(false)}>Cancel</Button>
              </form>
            </CardContent>
          </Card>
        )}

        {!pages?.length && !showAddPage ? (
          <Card>
            <CardContent className="flex flex-col items-center gap-4 py-12">
              <FileText className="h-12 w-12 text-muted-foreground/50" />
              <p className="text-muted-foreground">No pages yet. Add your first page to define the site structure.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {pages?.map((page, index) => (
              <Link
                key={page.id}
                to={`/${workspaceSlug}/projects/${projectId}/pages/${page.id}`}
              >
                <Card className="transition-colors hover:bg-accent">
                  <CardHeader className="flex flex-row items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">{index + 1}</span>
                      <CardTitle className="text-base">{page.name}</CardTitle>
                      {page.conversion_goal && (
                        <span className="text-sm text-muted-foreground">
                          Goal: {page.conversion_goal}
                        </span>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        deletePage.mutate(page.id)
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
