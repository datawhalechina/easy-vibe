/**
 * VitePress 2.0 alpha build wrapper
 *
 * VitePress 2.0-alpha 在 build 完成后不会自动退出进程（已知问题，
 * 见 https://github.com/vuejs/vitepress/issues/562）。
 * 此脚本通过子进程运行 build，确保无论如何都能正确退出，
 * 同时保留真实的退出码供 CI 使用。
 */
import { spawn } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const vitepressBin = path.join(
  rootDir,
  'node_modules',
  '.bin',
  process.platform === 'win32' ? 'vitepress.cmd' : 'vitepress'
)
const vitepressArgs = ['build', 'docs', ...process.argv.slice(2)]

const child = spawn(vitepressBin, vitepressArgs, {
  stdio: 'inherit'
})

child.on('close', (code) => {
  process.exit(code ?? 0)
})
