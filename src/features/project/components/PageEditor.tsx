import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useBlocks, useCreateBlock, useDeleteBlock } from '../hooks/useBlocks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Blocks, Trash2 } from 'lucide-react'

const blockTypeOptions = [
  'Hero',
  'Proof Bar',
  'Feature Grid',
  'Testimonials',
  'CTA',
  'FAQ',
  'Footer',
  'Custom',
]

export function PageEditor() {
  const { pageId } = useParams()
  const { data: blocks, isLoading } = useBlocks(pageId)
  const createBlock = useCreateBlock(pageId ?? '')
  const deleteBlock = useDeleteBlock(pageId ?? '')

  const [newBlockName, setNewBlockName] = useState('')
  const [showAddBlock, setShowAddBlock] = useState(false)

  if (isLoading) {
    return <div className="animate-pulse p-8 text-muted-foreground">Loading blocks...</div>
  }

  const handleAddBlock = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newBlockName.trim()) return

    await createBlock.mutateAsync({ name: newBlockName.trim() })
    setNewBlockName('')
    setShowAddBlock(false)
  }

  const statusColor: Record<string, 'default' | 'secondary' | 'outline' | 'destructive'> = {
    draft: 'secondary',
    in_review: 'outline',
    approved: 'default',
    rejected: 'destructive',
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Blocks</h2>
        <Button variant="outline" size="sm" onClick={() => setShowAddBlock(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add block
        </Button>
      </div>

      {showAddBlock && (
        <Card>
          <CardContent className="space-y-3 pt-4">
            <div className="flex flex-wrap gap-2">
              {blockTypeOptions.map((type) => (
                <Button
                  key={type}
                  variant={newBlockName === type ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setNewBlockName(type)}
                >
                  {type}
                </Button>
              ))}
            </div>
            <form onSubmit={handleAddBlock} className="flex gap-2">
              <Input
                placeholder="Block name"
                value={newBlockName}
                onChange={(e) => setNewBlockName(e.target.value)}
              />
              <Button type="submit" disabled={createBlock.isPending || !newBlockName.trim()}>
                Add
              </Button>
              <Button type="button" variant="ghost" onClick={() => { setShowAddBlock(false); setNewBlockName('') }}>
                Cancel
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {!blocks?.length && !showAddBlock ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-4 py-12">
            <Blocks className="h-12 w-12 text-muted-foreground/50" />
            <p className="text-muted-foreground">No blocks yet. Add blocks to define the page structure.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {blocks?.map((block, index) => (
            <Card key={block.id}>
              <CardHeader className="flex flex-row items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">{index + 1}</span>
                  <CardTitle className="text-base">{block.name}</CardTitle>
                  {block.current_version ? (
                    <Badge variant={statusColor[block.current_version.status] ?? 'secondary'}>
                      {block.current_version.status}
                    </Badge>
                  ) : (
                    <Badge variant="secondary">No version</Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Generate
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => deleteBlock.mutate(block.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
