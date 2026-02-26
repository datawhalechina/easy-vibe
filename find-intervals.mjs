import fs from 'fs'
import path from 'path'

function walkSync(dir, filelist = []) {
  fs.readdirSync(dir).forEach((file) => {
    const dirFile = path.join(dir, file)
    try {
      filelist = fs.statSync(dirFile).isDirectory()
        ? walkSync(dirFile, filelist)
        : filelist.concat(dirFile)
    } catch (err) {
      if (err.code === 'OOM' || err.code === 'EMFILE') throw err
    }
  })
  return filelist
}

const vueFiles = walkSync('docs/.vitepress/theme/components').filter((f) =>
  f.endsWith('.vue')
)

for (const file of vueFiles) {
  const content = fs.readFileSync(file, 'utf8')
  if (content.includes('setInterval')) {
    const lines = content.split('\n')
    lines.forEach((line, i) => {
      if (line.includes('setInterval')) {
        console.log(`${file}:${i + 1}: ${line.trim()}`)
      }
    })
  }
}
