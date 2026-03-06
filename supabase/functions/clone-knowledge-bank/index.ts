import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing authorization' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const supabaseUser = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    )

    const { source_kb_id, workspace_id } = await req.json()

    if (!source_kb_id || !workspace_id) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Verify user has access to the workspace
    const { data: { user } } = await supabaseUser.auth.getUser()
    if (!user) {
      return new Response(JSON.stringify({ error: 'Not authenticated' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const { data: membership } = await supabaseUser
      .from('workspace_users')
      .select('role')
      .eq('workspace_id', workspace_id)
      .eq('user_id', user.id)
      .single()

    if (!membership || !['builder', 'developer'].includes(membership.role)) {
      return new Response(JSON.stringify({ error: 'Not authorised' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Fetch source KB and all sub-tables
    const [
      { data: sourceKB },
      { data: sourceBrand },
      { data: sourceICP },
      { data: sourceTone },
      { data: sourceAssets },
    ] = await Promise.all([
      supabaseAdmin.from('knowledge_banks').select('*').eq('id', source_kb_id).single(),
      supabaseAdmin.from('kb_brand_tokens').select('*').eq('kb_id', source_kb_id).maybeSingle(),
      supabaseAdmin.from('kb_icp').select('*').eq('kb_id', source_kb_id).maybeSingle(),
      supabaseAdmin.from('kb_tone').select('*').eq('kb_id', source_kb_id).maybeSingle(),
      supabaseAdmin.from('kb_assets').select('*').eq('kb_id', source_kb_id),
    ])

    if (!sourceKB) {
      return new Response(JSON.stringify({ error: 'Source KB not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Create new KB
    const { data: newKB, error: kbError } = await supabaseAdmin
      .from('knowledge_banks')
      .insert({
        workspace_id,
        name: `${sourceKB.name} (copy)`,
        vertical_template: sourceKB.vertical_template,
        is_template: false,
      })
      .select()
      .single()

    if (kbError) throw kbError

    // Copy sub-tables
    const copies = []

    if (sourceBrand) {
      copies.push(
        supabaseAdmin.from('kb_brand_tokens').insert({
          kb_id: newKB.id,
          colours: sourceBrand.colours,
          fonts: sourceBrand.fonts,
          spacing_scale: sourceBrand.spacing_scale,
          logo_url: sourceBrand.logo_url,
        })
      )
    }

    if (sourceICP) {
      copies.push(
        supabaseAdmin.from('kb_icp').insert({
          kb_id: newKB.id,
          definition: sourceICP.definition,
          pain_points: sourceICP.pain_points,
          decision_factors: sourceICP.decision_factors,
        })
      )
    }

    if (sourceTone) {
      copies.push(
        supabaseAdmin.from('kb_tone').insert({
          kb_id: newKB.id,
          voice_description: sourceTone.voice_description,
          writing_framework: sourceTone.writing_framework,
          examples: sourceTone.examples,
        })
      )
    }

    if (sourceAssets?.length) {
      copies.push(
        supabaseAdmin.from('kb_assets').insert(
          sourceAssets.map((a) => ({
            kb_id: newKB.id,
            file_url: a.file_url,
            file_type: a.file_type,
            label: a.label,
          }))
        )
      )
    }

    await Promise.all(copies)

    return new Response(JSON.stringify({ id: newKB.id, name: newKB.name }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
