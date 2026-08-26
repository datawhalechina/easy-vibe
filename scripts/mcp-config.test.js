import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const configUrl = new URL('../config/mcporter.json', import.meta.url)
const englishGuideUrl = new URL(
  '../docs/en/stage-3/core-skills/mcp/index.md',
  import.meta.url
)
const chineseGuideUrl = new URL(
  '../docs/zh-cn/stage-3/core-skills/mcp/index.md',
  import.meta.url
)

const expectedTools = [
  'docs',
  'searchTweets',
  'lookupTweet',
  'getTweetThread',
  'getUser'
]

test('shared MCP config is portable and read-only', async () => {
  const rawConfig = await readFile(configUrl, 'utf8')
  const config = JSON.parse(rawConfig)

  assert.equal(
    config.$schema,
    'https://raw.githubusercontent.com/openclaw/mcporter/main/mcporter.schema.json'
  )
  assert.deepEqual(config.imports, [])
  assert.deepEqual(Object.keys(config.mcpServers), ['xquik'])
  assert.deepEqual(config.mcpServers.xquik, {
    description: 'Read public X data with Xquik',
    url: 'https://xquik.com/mcp?codemode=false',
    auth: 'oauth',
    allowedTools: expectedTools
  })
  assert.doesNotMatch(rawConfig, /\/(?:Users|home)\//)
  assert.doesNotMatch(
    rawConfig,
    /(?:api[_-]?key|token|secret)\s*[=:]\s*["'][^$]/i
  )
})

test('both MCP guides document the tested Xquik endpoint', async () => {
  const guides = await Promise.all(
    [englishGuideUrl, chineseGuideUrl].map((url) => readFile(url, 'utf8'))
  )

  for (const guide of guides) {
    assert.match(guide, /https:\/\/xquik\.com\/mcp\?codemode=false/)
    assert.match(guide, /claude mcp add --transport http --scope project xquik/)
    assert.match(guide, /claude mcp login xquik/)
    assert.doesNotMatch(guide, /\.claude\/mcp\.json/)
  }
})
