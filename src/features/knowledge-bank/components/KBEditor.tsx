import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useKnowledgeBank } from '../hooks/useKnowledgeBanks'
import { useUpdateBrandTokens, useUpdateICP, useUpdateTone } from '../hooks/useKBMutations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type { BrandTokens, ICP, Tone } from '../types'

function BrandTokensEditor({ kbId, initial }: { kbId: string; initial: BrandTokens | null }) {
  const update = useUpdateBrandTokens(kbId)
  const [colours, setColours] = useState(
    initial?.colours ?? [{ name: 'Primary', hex: '#000000' }]
  )
  const [headingFont, setHeadingFont] = useState(initial?.fonts?.heading ?? '')
  const [bodyFont, setBodyFont] = useState(initial?.fonts?.body ?? '')

  const handleSave = () => {
    update.mutate({
      colours,
      fonts: { heading: headingFont, body: bodyFont },
      spacing_scale: initial?.spacing_scale ?? 'default',
      logo_url: initial?.logo_url ?? null,
    })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <Label>Colours</Label>
        {colours.map((c, i) => (
          <div key={i} className="flex items-center gap-2">
            <Input
              type="color"
              value={c.hex}
              onChange={(e) => {
                const updated = [...colours]
                updated[i] = { ...updated[i], hex: e.target.value }
                setColours(updated)
              }}
              className="h-10 w-14 p-1"
            />
            <Input
              value={c.name}
              onChange={(e) => {
                const updated = [...colours]
                updated[i] = { ...updated[i], name: e.target.value }
                setColours(updated)
              }}
              placeholder="Colour name"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setColours(colours.filter((_, j) => j !== i))}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setColours([...colours, { name: '', hex: '#000000' }])}
        >
          Add colour
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Heading font</Label>
          <Input value={headingFont} onChange={(e) => setHeadingFont(e.target.value)} placeholder="Inter" />
        </div>
        <div className="space-y-2">
          <Label>Body font</Label>
          <Input value={bodyFont} onChange={(e) => setBodyFont(e.target.value)} placeholder="Inter" />
        </div>
      </div>

      <Button onClick={handleSave} disabled={update.isPending}>
        {update.isPending ? 'Saving...' : 'Save brand tokens'}
      </Button>
    </div>
  )
}

function ICPEditor({ kbId, initial }: { kbId: string; initial: ICP | null }) {
  const update = useUpdateICP(kbId)
  const [definition, setDefinition] = useState(initial?.definition ?? '')
  const [painPoints, setPainPoints] = useState(initial?.pain_points?.join('\n') ?? '')
  const [factors, setFactors] = useState(initial?.decision_factors?.join('\n') ?? '')

  const handleSave = () => {
    update.mutate({
      definition,
      pain_points: painPoints.split('\n').filter(Boolean),
      decision_factors: factors.split('\n').filter(Boolean),
    })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>ICP definition</Label>
        <textarea
          className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          value={definition}
          onChange={(e) => setDefinition(e.target.value)}
          placeholder="Describe your ideal customer..."
        />
      </div>
      <div className="space-y-2">
        <Label>Pain points (one per line)</Label>
        <textarea
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          value={painPoints}
          onChange={(e) => setPainPoints(e.target.value)}
          placeholder="Time-consuming manual processes&#10;Inconsistent brand output"
        />
      </div>
      <div className="space-y-2">
        <Label>Decision factors (one per line)</Label>
        <textarea
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          value={factors}
          onChange={(e) => setFactors(e.target.value)}
          placeholder="Price&#10;Speed of delivery&#10;Brand consistency"
        />
      </div>
      <Button onClick={handleSave} disabled={update.isPending}>
        {update.isPending ? 'Saving...' : 'Save ICP'}
      </Button>
    </div>
  )
}

function ToneEditor({ kbId, initial }: { kbId: string; initial: Tone | null }) {
  const update = useUpdateTone(kbId)
  const [voice, setVoice] = useState(initial?.voice_description ?? '')
  const [framework, setFramework] = useState(initial?.writing_framework ?? '')
  const [examples, setExamples] = useState(initial?.examples?.join('\n') ?? '')

  const handleSave = () => {
    update.mutate({
      voice_description: voice,
      writing_framework: framework,
      examples: examples.split('\n').filter(Boolean),
    })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Voice description</Label>
        <textarea
          className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          value={voice}
          onChange={(e) => setVoice(e.target.value)}
          placeholder="Professional but approachable. Uses clear, direct language..."
        />
      </div>
      <div className="space-y-2">
        <Label>Writing framework</Label>
        <Input
          value={framework}
          onChange={(e) => setFramework(e.target.value)}
          placeholder="PAS, AIDA, StoryBrand..."
        />
      </div>
      <div className="space-y-2">
        <Label>Example copy snippets (one per line)</Label>
        <textarea
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          value={examples}
          onChange={(e) => setExamples(e.target.value)}
          placeholder="Example headline or paragraph that captures the voice"
        />
      </div>
      <Button onClick={handleSave} disabled={update.isPending}>
        {update.isPending ? 'Saving...' : 'Save tone'}
      </Button>
    </div>
  )
}

type Tab = 'brand' | 'icp' | 'tone'

export function KBEditorPage() {
  const { kbId } = useParams()
  const { data: kb, isLoading } = useKnowledgeBank(kbId)
  const [activeTab, setActiveTab] = useState<Tab>('brand')

  if (isLoading) {
    return <div className="animate-pulse p-8 text-muted-foreground">Loading knowledge bank...</div>
  }

  if (!kb) {
    return <div className="p-8 text-muted-foreground">Knowledge bank not found</div>
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: 'brand', label: 'Brand Tokens' },
    { key: 'icp', label: 'ICP' },
    { key: 'tone', label: 'Tone' },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{kb.name}</h1>

      <div className="flex gap-2">
        {tabs.map((tab) => (
          <Button
            key={tab.key}
            variant={activeTab === tab.key ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>{tabs.find((t) => t.key === activeTab)?.label}</CardTitle>
        </CardHeader>
        <CardContent>
          {activeTab === 'brand' && (
            <BrandTokensEditor kbId={kb.id} initial={kb.brand_tokens as BrandTokens | null} />
          )}
          {activeTab === 'icp' && (
            <ICPEditor kbId={kb.id} initial={kb.icp as ICP | null} />
          )}
          {activeTab === 'tone' && (
            <ToneEditor kbId={kb.id} initial={kb.tone as Tone | null} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
