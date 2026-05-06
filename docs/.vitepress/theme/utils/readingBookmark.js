export const READING_BOOKMARK_VERSION = 1
export const READING_BOOKMARK_KEY_PREFIX = 'ev-reading-bookmark:'

export const getReadingBookmarkKey = (path) =>
  `${READING_BOOKMARK_KEY_PREFIX}${path || '/'}`

const clampNumber = (value, min, max, fallback = min) => {
  const numeric = Number(value)
  if (!Number.isFinite(numeric)) return fallback
  return Math.min(max, Math.max(min, numeric))
}

export const createReadingBookmark = ({
  path,
  title = '',
  section = '',
  scrollY = 0,
  progress = 0,
  now = () => Date.now()
}) => ({
  version: READING_BOOKMARK_VERSION,
  path: path || '/',
  title: String(title || '').trim(),
  section: String(section || '').trim(),
  scrollY: Math.max(0, Math.round(Number(scrollY) || 0)),
  progress: Math.round(clampNumber(progress, 0, 100, 0)),
  updatedAt: now()
})

const normalizeBookmark = (
  value,
  expectedPath,
  maxScrollY = Number.MAX_SAFE_INTEGER
) => {
  if (!value || typeof value !== 'object') return null
  if (value.version !== READING_BOOKMARK_VERSION) return null
  if (value.path !== expectedPath) return null

  return {
    version: READING_BOOKMARK_VERSION,
    path: value.path,
    title: String(value.title || '').trim(),
    section: String(value.section || '').trim(),
    scrollY: Math.round(
      clampNumber(value.scrollY, 0, Math.max(0, maxScrollY), 0)
    ),
    progress: Math.round(clampNumber(value.progress, 0, 100, 0)),
    updatedAt: Number(value.updatedAt) || 0
  }
}

export const readReadingBookmark = (storage, path, maxScrollY) => {
  if (!storage) return null

  try {
    const expectedPath = path || '/'
    const raw = storage.getItem(getReadingBookmarkKey(expectedPath))
    if (!raw) return null
    return normalizeBookmark(JSON.parse(raw), expectedPath, maxScrollY)
  } catch {
    return null
  }
}

export const writeReadingBookmark = (storage, bookmark) => {
  if (!storage || !bookmark?.path) return false

  try {
    storage.setItem(
      getReadingBookmarkKey(bookmark.path),
      JSON.stringify(bookmark)
    )
    return true
  } catch {
    return false
  }
}
