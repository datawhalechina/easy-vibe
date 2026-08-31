import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import test from 'node:test'

import { relatedArticlesMap } from '../docs/.vitepress/theme/data/relatedArticles.js'

const locales = [
  'en',
  'zh-tw',
  'ja-jp',
  'ko-kr',
  'es-es',
  'fr-fr',
  'de-de',
  'ar-sa',
  'vi-vn'
]

test('UI design pages request related articles for their own locale', async () => {
  for (const locale of locales) {
    const source = await readFile(
      new URL(
        `../docs/${locale}/stage-2/frontend/ui-design/index.md`,
        import.meta.url
      ),
      'utf8'
    )

    assert.match(
      source,
      new RegExp(
        `relatedArticlesMap\\['${locale}/stage-2/frontend/ui-design'\\]`
      ),
      `${locale} should request its own localized related articles`
    )

    const articles =
      relatedArticlesMap[`${locale}/stage-2/frontend/ui-design`]
    assert.ok(articles?.length > 0, `${locale} should have related articles`)

    for (const { href } of articles) {
      assert.ok(
        href.startsWith(`/${locale}/`),
        `${href} should stay within the ${locale} locale`
      )
      await access(new URL(`../docs${href}index.md`, import.meta.url))
    }
  }
})
