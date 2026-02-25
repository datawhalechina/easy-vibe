/**
 * VitePress 2.0 alpha build wrapper
 *
 * VitePress 2.0-alpha 在 build 完成后不会自动退出进程（已知问题，
 * 见 https://github.com/vuejs/vitepress/issues/562）。
 * 此脚本通过子进程运行 build，确保无论如何都能正确退出，
 * 同时保留真实的退出码供 CI 使用。
 */
import { spawn } from 'node:child_process'

const child = spawn('npx', ['vitepress', 'build', 'docs', '--force'], {
  stdio: 'inherit',
  shell: true
})

child.on('close', (code) => {
  process.exit(code ?? 0)
})
