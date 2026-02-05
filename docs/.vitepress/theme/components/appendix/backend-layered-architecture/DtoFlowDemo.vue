<template>
  <div class="dto-flow-demo">
    <div class="demo-header">
      <h4>🔄 DTO 流转：数据在不同层之间的转换</h4>
      <p class="subtitle">DTO（Data Transfer Object）是层与层之间传递数据的载体</p>
    </div>

    <!-- 流程图 -->
    <div class="flow-diagram">
      <div class="flow-step">
        <div class="step-title">Controller 层</div>
        <div class="step-code">
          <div class="code-line">
            <span class="comment">// 接收 Request DTO</span>
          </div>
          <div class="code-line">
            <span class="keyword">public</span> ResponseEntity&lt;UserDTO&gt; createUser(
          </div>
          <div class="code-line">
            &nbsp;&nbsp;@RequestBody <span class="highlight">@Valid UserCreateRequest request</span>
          </div>
          <div class="code-line">
            ) { ... }
          </div>
        </div>
      </div>

      <div class="flow-arrow">⬇️ 转换为 Service 需要的参数</div>

      <div class="flow-step">
        <div class="step-title">Service 层</div>
        <div class="step-code">
          <div class="code-line">
            <span class="comment">// 业务处理</span>
          </div>
          <div class="code-line">
            <span class="keyword">public</span> UserDTO createUser(UserCreateParam param) {
          </div>
          <div class="code-line">
            &nbsp;&nbsp;<span class="comment">// 转换为 Entity</span>
          </div>
          <div class="code-line">
            &nbsp;&nbsp;User user = <span class="highlight">param.toEntity()</span>;
          </div>
          <div class="code-line">
            &nbsp;&nbsp;userRepository.save(user);
          </div>
          <div class="code-line">
            &nbsp;&nbsp;<span class="keyword">return</span> <span class="highlight">UserDTO.from(user)</span>;
          </div>
          <div class="code-line">
            }
          </div>
        </div>
      </div>

      <div class="flow-arrow">⬇️ 转换为 Repository 需要的 Entity</div>

      <div class="flow-step">
        <div class="step-title">Repository 层</div>
        <div class="step-code">
          <div class="code-line">
            <span class="comment">// 数据持久化</span>
          </div>
          <div class="code-line">
            <span class="keyword">public interface</span> UserRepository
          </div>
          <div class="code-line">
            &nbsp;&nbsp;<span class="keyword">extends</span> JpaRepository&lt;<span class="highlight">User</span>, Long&gt; {
          </div>
          <div class="code-line">
            }
          </div>
        </div>
      </div>

      <div class="flow-arrow">⬆️ 返回 Entity，转换为 DTO</div>

      <div class="flow-step">
        <div class="step-title">返回给客户端</div>
        <div class="step-code">
          <div class="code-line">
            <span class="comment">// Response DTO</span>
          </div>
          <div class="code-line">
            {
          </div>
          <div class="code-line">
            &nbsp;&nbsp;<span class="string">"id"</span>: 10001,
          </div>
          <div class="code-line">
            &nbsp;&nbsp;<span class="string">"username"</span>: <span class="string">"张三"</span>,
          </div>
          <div class="code-line">
            &nbsp;&nbsp;<span class="string">"email"</span>: <span class="string">"zhangsan@example.com"</span>,
          </div>
          <div class="code-line">
            &nbsp;&nbsp;<span class="string">"createdAt"</span>: <span class="string">"2024-01-15T10:30:00Z"</span>
          </div>
          <div class="code-line">
            }
          </div>
        </div>
      </div>
    </div>

    <!-- 不同层 DTO 对比 -->
    <div class="dto-comparison">
      <h5>📋 不同层的 DTO 职责</h5>
      <div class="comparison-table">
        <div class="table-header">
          <div class="col-layer">层级</div>
          <div class="col-dto">DTO 类型</div>
          <div class="col-purpose">职责</div>
          <div class="col-example">示例</div>
        </div>
        <div class="table-row">
          <div class="col-layer">
            <span class="layer-tag controller">Controller</span>
          </div>
          <div class="col-dto">
            Request / Response DTO
          </div>
          <div class="col-purpose">
            定义 API 契约、参数校验、序列化
          </div>
          <div class="col-example">
            <code>UserCreateRequest</code>
          </div>
        </div>
        <div class="table-row">
          <div class="col-layer">
            <span class="layer-tag service">Service</span>
          </div>
          <div class="col-dto">
            Param / Result DTO
          </div>
          <div class="col-purpose">
            封装业务方法参数，解耦 Controller 与 Service
          </div>
          <div class="col-example">
            <code>UserCreateParam</code>
          </div>
        </div>
        <div class="table-row">
          <div class="col-layer">
            <span class="layer-tag repository">Repository</span>
          </div>
          <div class="col-dto">
            Entity / DO
          </div>
          <div class="col-purpose">
            映射数据库表结构，ORM 映射
          </div>
          <div class="col-example">
            <code>UserEntity</code>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const viewMode = ref('conversion')
</script>

<style scoped>
.dto-flow-demo {
  padding: 24px;
  background: linear-gradient(135deg, #f0f7ff 0%, #e6f0ff 100%);
  border-radius: 12px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.demo-header {
  text-align: center;
  margin-bottom: 24px;
}

.demo-header h4 {
  margin: 0 0 8px 0;
  color: #1a1a2e;
  font-size: 18px;
}

.subtitle {
  margin: 0;
  color: #666;
  font-size: 13px;
}

.flow-diagram {
  background: white;
  border-radius: 10px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.flow-step {
  background: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
  border-left: 4px solid #409eff;
}

.flow-step:nth-child(odd) {
  border-left-color: #67c23a;
}

.step-title {
  padding: 12px 16px;
  background: white;
  font-weight: 600;
  color: #303133;
  font-size: 14px;
  border-bottom: 1px solid #ebeef5;
}

.step-code {
  padding: 16px;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 12px;
  line-height: 1.6;
}

.code-line {
  padding: 2px 0;
}

.comment {
  color: #6a9955;
}

.keyword {
  color: #569cd6;
}

.highlight {
  background: #fff3cd;
  padding: 2px 4px;
  border-radius: 3px;
  color: #856404;
}

.string {
  color: #ce9178;
}

.flow-arrow {
  text-align: center;
  padding: 12px;
  color: #909399;
  font-size: 13px;
  font-weight: 500;
}

.dto-comparison {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.dto-comparison h5 {
  margin: 0 0 16px 0;
  color: #1a1a2e;
  font-size: 15px;
  text-align: center;
}

.comparison-table {
  overflow-x: auto;
}

.table-header, .table-row {
  display: grid;
  grid-template-columns: 100px 150px 1fr 120px;
  gap: 12px;
  padding: 12px;
  align-items: center;
}

.table-header {
  background: #f5f7fa;
  border-radius: 8px;
  font-weight: 600;
  color: #303133;
  font-size: 13px;
}

.table-row {
  border-bottom: 1px solid #ebeef5;
  font-size: 12px;
  color: #606266;
}

.table-row:last-child {
  border-bottom: none;
}

.layer-tag {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
  display: inline-block;
}

.layer-tag.controller {
  background: #f0f9ff;
  color: #1890ff;
}

.layer-tag.service {
  background: #fff7e6;
  color: #fa8c16;
}

.layer-tag.repository {
  background: #f6ffed;
  color: #52c41a;
}

@media (max-width: 768px) {
  .table-header, .table-row {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .table-header {
    display: none;
  }
}
</style>
