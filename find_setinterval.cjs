const fs = require('fs')
const path = require('path')

function walk(dir) {
  let results = []
  const list = fs.readdirSync(dir)
  list.forEach(function (file) {
    file = dir + '/' + file
    const stat = fs.statSync(file)
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file))
    } else {
      if (file.endsWith('.vue')) results.push(file)
    }
  })
  return results
}

const vueFiles = walk('docs/.vitepress/theme/components')

vueFiles.forEach((file) => {
  const lines = fs.readFileSync(file, 'utf8').split('\n')
  let bracketDepth = 0
  let insideScript = false

  lines.forEach((line, index) => {
    if (line.includes('<script setup')) {
      insideScript = true
      bracketDepth = 0
      return
    }
    if (line.includes('</script>')) {
      insideScript = false
    }

    if (insideScript) {
      // Check for setInterval BEFORE updating bracket depth for the current line
      // because `setInterval(() => {` will increase depth but the call ITSELF is at depth 0
      if (line.includes('setInterval') && bracketDepth === 0) {
        console.log(
          `Top-level setInterval: ${file}:${index + 1} - ${line.trim()}`
        )
      }

      // Simple Bracket Depth Counting
      // Handle one-liners like `if (x) { ... }` natively by adding/subtracting on the same line
      // Wait, we only care about trailing brackets basically. Ignore string contents for simplicity.
      // This heuristic is usually fine for formatting standard vue codes
      const openCount = (line.match(/\{/g) || []).length
      const closeCount = (line.match(/\}/g) || []).length
      bracketDepth += openCount - closeCount
    }
  })
})
