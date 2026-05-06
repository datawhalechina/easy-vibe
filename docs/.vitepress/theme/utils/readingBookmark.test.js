import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import {
  createReadingBookmark,
  getReadingBookmarkKey,
  readReadingBookmark,
  writeReadingBookmark
} from './readingBookmark.js'

const createStorage = () => {
  const values = new Map()

  return {
    getItem(key) {
      return values.has(key) ? values.get(key) : null
    },
    setItem(key, value) {
      values.set(key, String(value))
    }
  }
}

describe('reading bookmarks', () => {
  it('stores bookmarks by full path so each locale is independent', () => {
    const storage = createStorage()
    const zhBookmark = createReadingBookmark({
      path: '/easy-vibe/zh-cn/stage-1/intro/',
      title: '中文标题',
      section: '小节',
      scrollY: 320,
      progress: 45,
      now: () => 123
    })
    const enBookmark = createReadingBookmark({
      path: '/easy-vibe/en/stage-1/intro/',
      title: 'English title',
      scrollY: 80,
      progress: 12,
      now: () => 456
    })

    assert.equal(writeReadingBookmark(storage, zhBookmark), true)
    assert.equal(writeReadingBookmark(storage, enBookmark), true)

    assert.deepEqual(
      readReadingBookmark(storage, '/easy-vibe/zh-cn/stage-1/intro/', 1000),
      {
        version: 1,
        path: '/easy-vibe/zh-cn/stage-1/intro/',
        title: '中文标题',
        section: '小节',
        scrollY: 320,
        progress: 45,
        updatedAt: 123
      }
    )
    assert.equal(
      readReadingBookmark(storage, '/easy-vibe/en/stage-1/intro/', 1000)
        .title,
      'English title'
    )
  })

  it('normalizes invalid numeric values', () => {
    assert.deepEqual(
      createReadingBookmark({
        path: '/easy-vibe/ja-jp/page/',
        scrollY: -5,
        progress: 140,
        now: () => 1
      }),
      {
        version: 1,
        path: '/easy-vibe/ja-jp/page/',
        title: '',
        section: '',
        scrollY: 0,
        progress: 100,
        updatedAt: 1
      }
    )
  })

  it('ignores malformed or mismatched stored values', () => {
    const storage = createStorage()

    storage.setItem(getReadingBookmarkKey('/easy-vibe/ko-kr/page/'), '{bad')
    assert.equal(
      readReadingBookmark(storage, '/easy-vibe/ko-kr/page/', 1000),
      null
    )

    storage.setItem(
      getReadingBookmarkKey('/easy-vibe/ko-kr/page/'),
      JSON.stringify({
        version: 1,
        path: '/easy-vibe/zh-cn/page/',
        scrollY: 20,
        progress: 10
      })
    )
    assert.equal(
      readReadingBookmark(storage, '/easy-vibe/ko-kr/page/', 1000),
      null
    )
  })

  it('clamps restored scroll position to current document height', () => {
    const storage = createStorage()
    const path = '/easy-vibe/fr-fr/page/'

    writeReadingBookmark(
      storage,
      createReadingBookmark({
        path,
        scrollY: 9000,
        progress: 88,
        now: () => 99
      })
    )

    assert.equal(readReadingBookmark(storage, path, 640).scrollY, 640)
  })
})
