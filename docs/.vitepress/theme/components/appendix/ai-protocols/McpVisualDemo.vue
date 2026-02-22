<template>
  <div class="mcp-visual-demo">
    <div class="section-title">MCP 是什么？</div>

    <div class="intro-text">
      MCP（Model Context Protocol）是 Anthropic 于 2024 年 11 月推出的<strong>AI 与外部工具连接的统一标准</strong>。它让 AI 应用可以调用外部工具、读取资源数据、使用预定义提示，就像给 AI 装上了"手"和"眼睛"。
    </div>

    <div class="section-title">三大核心能力</div>

    <div class="能力-table">
      <div class="table-header">
        <div class="col-能力">能力</div>
        <div class="col-英文">英文</div>
        <div class="col-作用">作用</div>
        <div class="col-示例">示例</div>
      </div>
      <div class="table-row">
        <div class="col-能力"><strong>工具</strong></div>
        <div class="col-英文">Tools</div>
        <div class="col-作用">AI 可以调用的功能</div>
        <div class="col-示例">查询天气、发送邮件、调用 API</div>
      </div>
      <div class="table-row">
        <div class="col-能力"><strong>资源</strong></div>
        <div class="col-英文">Resources</div>
        <div class="col-作用">AI 可以读取的数据</div>
        <div class="col-示例">文件内容、数据库记录、配置信息</div>
      </div>
      <div class="table-row">
        <div class="col-能力"><strong>提示</strong></div>
        <div class="col-英文">Prompts</div>
        <div class="col-作用">预定义的提示模板</div>
        <div class="col-示例">代码审查模板、写作模板</div>
      </div>
    </div>

    <div class="section-title">什么时候用 MCP？</div>

    <div class="use-cases">
      <div class="use-case">
        <div class="use-case-title">当 AI 需要执行实际操作时</div>
        <div class="use-case-desc">AI 不仅要回答问题，还要真正做事：发送邮件、操作文件、调用第三方 API</div>
      </div>
      <div class="use-case">
        <div class="use-case-title">当 AI 需要访问私有数据时</div>
        <div class="use-case-desc">读取本地文件、查询数据库、访问企业内部系统</div>
      </div>
      <div class="use-case">
        <div class="use-case-title">当需要标准化工具接入时</div>
        <div class="use-case-desc">一次开发，多个 AI 应用可用（Claude、Cursor、Windsurf 等）</div>
      </div>
    </div>

    <div class="section-title">如何使用 MCP？</div>

    <div class="usage-steps">
      <div class="step">
        <div class="step-num">1</div>
        <div class="step-content">
          <div class="step-title">开发 MCP Server</div>
          <div class="step-desc">按 MCP 规范实现 Server，提供 tools/resources/prompts</div>
        </div>
      </div>
      <div class="step">
        <div class="step-num">2</div>
        <div class="step-content">
          <div class="step-title">配置 AI 应用连接</div>
          <div class="step-desc">在 AI 应用中添加 MCP Server 配置（本地或远程）</div>
        </div>
      </div>
      <div class="step">
        <div class="step-num">3</div>
        <div class="step-content">
          <div class="step-title">AI 自动调用</div>
          <div class="step-desc">AI 根据任务需求，自动发现并调用合适的工具或读取资源</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.mcp-visual-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 1.25rem;
  margin: 1rem 0;
}

.section-title {
  font-weight: 600;
  font-size: 1rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.75rem;
  margin-top: 1.25rem;
}

.section-title:first-child {
  margin-top: 0;
}

.intro-text {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.intro-text strong {
  color: var(--vp-c-brand);
}

.能力-table {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.table-header {
  display: flex;
  background: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider);
  font-weight: 600;
  font-size: 0.8rem;
}

.table-row {
  display: flex;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 0.8rem;
}

.table-row:last-child {
  border-bottom: none;
}

.col-能力 {
  width: 15%;
  padding: 0.5rem 0.6rem;
  color: var(--vp-c-text-1);
}

.col-英文 {
  width: 18%;
  padding: 0.5rem 0.6rem;
  color: var(--vp-c-text-2);
}

.col-作用 {
  width: 32%;
  padding: 0.5rem 0.6rem;
  color: var(--vp-c-text-2);
}

.col-示例 {
  width: 35%;
  padding: 0.5rem 0.6rem;
  color: var(--vp-c-text-3);
}

.use-cases {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-bottom: 1rem;
}

.use-case {
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border-left: 3px solid var(--vp-c-brand);
}

.use-case-title {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.3rem;
}

.use-case-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.usage-steps {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
}

.step-num {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: 600;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-title {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.2rem;
}

.step-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

@media (max-width: 640px) {
  .table-header,
  .table-row {
    flex-direction: column;
  }

  .col-能力,
  .col-英文,
  .col-作用,
  .col-示例 {
    width: 100%;
    padding: 0.35rem 0.6rem;
  }

  .table-header {
    display: none;
  }

  .table-row {
    padding: 0.5rem 0;
  }

  .col-能力 {
    font-size: 0.85rem;
    padding-bottom: 0.2rem;
  }

  .col-英文 {
    font-size: 0.75rem;
    padding-top: 0;
    padding-bottom: 0.2rem;
  }

  .col-作用 {
    font-size: 0.8rem;
    padding-top: 0;
    padding-bottom: 0.2rem;
  }

  .col-示例 {
    font-size: 0.75rem;
    padding-top: 0;
  }
}
</style>
