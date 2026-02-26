const fs = require('fs')
const path = require('path')
const compiler = require('vue/compiler-sfc')
const babel = require('@babel/parser')
const traverse = require('@babel/traverse').default

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
  const content = fs.readFileSync(file, 'utf8')
  if (!content.includes('setInterval')) return
  const { descriptor } = compiler.parse(content)
  if (!descriptor.scriptSetup) return

  const ast = babel.parse(descriptor.scriptSetup.content, {
    sourceType: 'module',
    plugins: ['typescript']
  })

  traverse(ast, {
    CallExpression(path) {
      if (path.node.callee.name === 'setInterval') {
        // check if we are inside a function declaration or arrow function or onMounted check
        let parent = path.parentPath
        let insideFunction = false
        while (parent) {
          if (
            parent.isFunctionDeclaration() ||
            parent.isArrowFunctionExpression() ||
            parent.isFunctionExpression() ||
            parent.isObjectMethod()
          ) {
            insideFunction = true
            break
          }
          parent = parent.parentPath
        }
        if (!insideFunction) {
          console.log(
            `Top-level setInterval found in ${file} at line ${path.node.loc.start.line}`
          )
        }
      }
    }
  })
})
