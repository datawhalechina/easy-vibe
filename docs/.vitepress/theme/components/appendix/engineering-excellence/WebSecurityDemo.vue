<template>
  <div class="web-security-demo">
    <div class="demo-label">Web 安全漏洞演示（教育用途）── 点击切换漏洞类型</div>

    <div class="tabs">
      <button
        v-for="(v, i) in vulns"
        :key="i"
        class="tab"
        :class="{ active: current === i }"
        @click="current = i"
      >{{ v.icon }} {{ v.name }}</button>
    </div>

    <div class="vuln-card">
      <div class="attack-flow">
        <div class="flow-title">攻击流程</div>
        <div class="flow-steps">
          <div v-for="(s, j) in vulns[current].flow" :key="j" class="flow-step">
            <span class="step-num">{{ j + 1 }}</span>
            <span class="step-text">{{ s }}</span>
          </div>
        </div>
      </div>

      <div class="code-compare">
        <div class="code-col bad">
          <div class="col-title">❌ 有漏洞的代码</div>
          <pre><code>{{ vulns[current].bad }}</code></pre>
        </div>
        <div class="code-col good">
          <div class="col-title">✅ 修复后的代码</div>
          <pre><code>{{ vulns[current].good }}</code></pre>
        </div>
      </div>

      <div class="defense-tip">
        <strong>防御要点：</strong>{{ vulns[current].defense }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const current = ref(0)

const vulns = [
  {
    name: 'XSS',
    icon: '💉',
    flow: [
      '攻击者在输入框提交恶意脚本',
      '服务器未过滤直接存入数据库',
      '其他用户访问页面时脚本被执行',
      '用户 Cookie/数据被窃取'
    ],
    bad: '// 直接插入用户输入（危险！）\nel.innerHTML = userInput\n// 如果 userInput = \'<scr\' + \'ipt>steal(cookie)</scr\' + \'ipt>\'\n// 脚本会被执行！',
    good: `// 使用 textContent 安全插入
el.textContent = userInput
// 或使用框架自动转义
// Vue: {{ userInput }}  自动转义
// React: {userInput}    自动转义`,
    defense: '永远不要信任用户输入。使用框架自带的转义机制，避免 innerHTML，对输出进行编码。'
  },
  {
    name: 'SQL 注入',
    icon: '🗄️',
    flow: [
      '攻击者在登录框输入特殊字符串',
      '字符串被拼接进 SQL 语句',
      '数据库执行了被篡改的查询',
      '攻击者绕过认证或获取数据'
    ],
    bad: `// 字符串拼接 SQL（危险！）
const sql = "SELECT * FROM users " +
  "WHERE name='" + username + "'" +
  " AND pass='" + password + "'"
// 输入: admin' OR '1'='1
// 变成: WHERE name='admin' OR '1'='1'`,
    good: `// 使用参数化查询（安全）
const sql = "SELECT * FROM users " +
  "WHERE name = ? AND pass = ?"
db.query(sql, [username, password])
// 参数被安全转义，无法注入`,
    defense: '始终使用参数化查询或 ORM，永远不要拼接 SQL 字符串。'
  },
  {
    name: 'CSRF',
    icon: '🎭',
    flow: [
      '用户登录了银行网站（有 Cookie）',
      '用户访问了恶意网站',
      '恶意网站自动发起转账请求',
      '浏览器自动携带 Cookie，请求成功'
    ],
    bad: '<!-- 恶意网站的隐藏表单 -->\n<form action="https://bank.com/transfer"\n      method="POST" id="evil">\n  <input name="to" value="attacker" />\n  <input name="amount" value="10000" />\n</form>\n<scr' + 'ipt>document.getElementById(\'evil\')\n  .submit()</scr' + 'ipt>',
    good: `// 服务端：生成并验证 CSRF Token
app.post('/transfer', (req, res) => {
  if (req.body.token !== req.session.csrf) {
    return res.status(403).send('拒绝')
  }
  // 执行转账...
})
// 同时设置 SameSite Cookie 属性`,
    defense: '使用 CSRF Token、设置 SameSite Cookie 属性、验证 Referer/Origin 头。'
  }
]
</script>

<style scoped>
.web-security-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
}
.demo-label { font-size: 0.78rem; font-weight: bold; color: var(--vp-c-text-2); margin-bottom: 1rem; text-align: center; }
.tabs { display: flex; gap: 6px; margin-bottom: 1rem; flex-wrap: wrap; }
.tab { padding: 6px 14px; border-radius: 6px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); cursor: pointer; font-size: 0.85rem; transition: all 0.2s; }
.tab.active { background: var(--vp-c-brand); color: #fff; border-color: var(--vp-c-brand); }

.attack-flow { margin-bottom: 12px; }
.flow-title { font-size: 0.8rem; font-weight: 600; color: var(--vp-c-text-2); margin-bottom: 6px; }
.flow-steps { display: flex; gap: 4px; flex-wrap: wrap; }
.flow-step { display: flex; align-items: center; gap: 6px; font-size: 0.8rem; padding: 4px 8px; background: var(--vp-c-bg); border-radius: 4px; }
.flow-step::after { content: '→'; color: var(--vp-c-text-3); margin-left: 4px; }
.flow-step:last-child::after { content: ''; }
.step-num { width: 18px; height: 18px; border-radius: 50%; background: var(--vp-c-brand); color: #fff; font-size: 0.7rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }

.code-compare { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 10px; }
@media (max-width: 640px) { .code-compare { grid-template-columns: 1fr; } }
.code-col { border-radius: 6px; overflow: hidden; }
.col-title { font-size: 0.72rem; padding: 4px 10px; border-bottom: 1px solid var(--vp-c-divider); }
.code-col.bad .col-title { background: #fef2f2; color: #991b1b; }
.code-col.good .col-title { background: #ecfdf5; color: #065f46; }
:root.dark .code-col.bad .col-title { background: #1c0606; color: #fca5a5; }
:root.dark .code-col.good .col-title { background: #031c14; color: #6ee7b7; }
.code-col pre { margin: 0; padding: 8px; font-size: 0.78rem; line-height: 1.5; overflow-x: auto; background: var(--vp-c-bg); }

.defense-tip { font-size: 0.83rem; padding: 8px; background: var(--vp-c-bg); border-radius: 4px; border-left: 3px solid var(--vp-c-brand); }
</style>
