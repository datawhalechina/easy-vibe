<template>
  <div class="dto-demo">
    <div class="header">
      <div class="title">DTO 流转：数据在不同层之间的转换</div>
      <div class="subtitle">DTO（Data Transfer Object）是层与层之间传递数据的载体</div>
    </div>

    <div class="flow-box">
      <div class="flow-step green">
        <div class="step-label">Controller 层</div>
        <pre class="step-code"><code>// 接收 Request DTO
public ResponseEntity&lt;UserDTO&gt; createUser(
    @RequestBody @Valid UserCreateRequest request) { ... }</code></pre>
      </div>

      <div class="arrow">↓ 转换为 Service 需要的参数</div>

      <div class="flow-step orange">
        <div class="step-label">Service 层</div>
        <pre class="step-code"><code>public UserDTO createUser(UserCreateParam param) {
    User user = param.toEntity();   // 转换为 Entity
    userRepository.save(user);
    return UserDTO.from(user);      // Entity → DTO
}</code></pre>
      </div>

      <div class="arrow">↓ 转换为 Repository 需要的 Entity</div>

      <div class="flow-step blue">
        <div class="step-label">Repository 层</div>
        <pre class="step-code"><code>public interface UserRepository
    extends JpaRepository&lt;User, Long&gt; { }</code></pre>
      </div>

      <div class="arrow">↑ 返回 Entity，转换为 DTO</div>

      <div class="flow-step">
        <div class="step-label">返回给客户端</div>
        <pre class="step-code"><code>{ "id": 10001, "username": "张三",
  "email": "zhangsan@example.com", "createdAt": "2024-01-15T10:30:00Z" }</code></pre>
      </div>
    </div>

    <div class="table-box">
      <div class="table-title">不同层的 DTO 职责</div>
      <table>
        <thead>
          <tr><th>层级</th><th>DTO 类型</th><th>职责</th><th>示例</th></tr>
        </thead>
        <tbody>
          <tr v-for="r in rows" :key="r.layer">
            <td><span :class="['tag', r.cls]">{{ r.layer }}</span></td>
            <td>{{ r.type }}</td>
            <td>{{ r.purpose }}</td>
            <td><code>{{ r.example }}</code></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
const rows = [
  { layer: 'Controller', cls: 'green', type: 'Request / Response DTO', purpose: '定义 API 契约、参数校验', example: 'UserCreateRequest' },
  { layer: 'Service', cls: 'orange', type: 'Param / Result DTO', purpose: '封装业务方法参数，解耦层间依赖', example: 'UserCreateParam' },
  { layer: 'Repository', cls: 'blue', type: 'Entity / DO', purpose: '映射数据库表结构', example: 'UserEntity' }
]
</script>

<style scoped>
.dto-demo { padding: 20px; background: var(--vp-c-bg-soft); border-radius: 12px; }
.header { text-align: center; margin-bottom: 20px; }
.title { font-size: 16px; font-weight: 600; color: var(--vp-c-text-1); }
.subtitle { font-size: 13px; color: var(--vp-c-text-3); margin-top: 4px; }

.flow-box {
  padding: 18px; border-radius: 10px; margin-bottom: 16px;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
}
.flow-step {
  border-radius: 6px; overflow: hidden;
  background: var(--vp-c-bg-soft); border-left: 3px solid var(--vp-c-divider);
}
.flow-step.green { border-left-color: #10b981; }
.flow-step.orange { border-left-color: #f59e0b; }
.flow-step.blue { border-left-color: #3b82f6; }

.step-label {
  padding: 10px 14px; font-weight: 600; font-size: 13px;
  color: var(--vp-c-text-1); border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}
.step-code {
  margin: 0; padding: 12px 14px; overflow-x: auto;
  font-size: 11px; line-height: 1.5;
}
.step-code code { color: var(--vp-c-text-2); font-family: var(--vp-font-family-mono); }
.arrow { text-align: center; padding: 8px; color: var(--vp-c-text-3); font-size: 12px; }

.table-box {
  padding: 16px; border-radius: 10px;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
}
.table-title { text-align: center; font-weight: 600; font-size: 14px; color: var(--vp-c-text-1); margin-bottom: 12px; }
table { width: 100%; border-collapse: collapse; font-size: 12px; }
th, td { padding: 10px; text-align: left; border-bottom: 1px solid var(--vp-c-divider); color: var(--vp-c-text-2); }
th { background: var(--vp-c-bg-soft); font-weight: 600; color: var(--vp-c-text-1); }
.tag { padding: 2px 8px; border-radius: 10px; font-size: 11px; color: #fff; }
.tag.green { background: #10b981; }
.tag.orange { background: #f59e0b; }
.tag.blue { background: #3b82f6; }
</style>
