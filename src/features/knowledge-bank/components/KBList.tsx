import { Link, useParams } from 'react-router-dom'
import { useWorkspace } from '@/features/workspace/hooks/useWorkspace'
import { useKnowledgeBanks, useCloneKB } from '../hooks/useKnowledgeBanks'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Plus, BookOpen, Copy } from 'lucide-react'

export function KBList() {
  const { workspaceSlug } = useParams()
  const { data: workspace } = useWorkspace(workspaceSlug)
  const { data: knowledgeBanks, isLoading } = useKnowledgeBanks(workspace?.id)
  const cloneKB = useCloneKB(workspace?.id ?? '')

  if (isLoading) {
    return <div className="animate-pulse p-8 text-muted-foreground">Loading knowledge banks...</div>
  }

  const templates = knowledgeBanks?.filter((kb) => kb.is_template) ?? []
  const userKBs = knowledgeBanks?.filter((kb) => !kb.is_template) ?? []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Knowledge Banks</h1>
        <Link to={`/${workspaceSlug}/knowledge-banks/new`}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New KB
          </Button>
        </Link>
      </div>

      {!userKBs.length && !templates.length ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-4 py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground/50" />
            <p className="text-muted-foreground">No knowledge banks yet. Create one or start from a template.</p>
          </CardContent>
        </Card>
      ) : null}

      {userKBs.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {userKBs.map((kb) => (
            <Link key={kb.id} to={`/${workspaceSlug}/knowledge-banks/${kb.id}`}>
              <Card className="transition-colors hover:bg-accent">
                <CardHeader>
                  <CardTitle className="text-base">{kb.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  {kb.vertical_template && (
                    <Badge variant="outline">{kb.vertical_template}</Badge>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {templates.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Templates</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {templates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <CardTitle className="text-base">{template.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{template.vertical_template}</Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => cloneKB.mutate(template.id)}
                      disabled={cloneKB.isPending}
                    >
                      <Copy className="mr-2 h-3 w-3" />
                      Use template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
