<template>
  <div class="controller-demo">
    <div class="header">
      <div class="title">Controller 层：请求的"接待员"</div>
      <div class="subtitle">点击流程节点查看详情</div>
    </div>

    <div class="flow">
      <div class="step">
        <div class="step-label">客户端发起请求</div>
        <pre class="step-code">POST /api/users/register
Content-Type: application/json
{ "username": "张三", "email": "zhangsan@example.com", "password": "123456" }</pre>
      </div>

      <div class="arrow">↓ 请求到达</div>

      <div :class="['step', 'clickable', { active: detail === 'ctrl' }]" @click="toggle('ctrl')">
        <div class="step-label accent">Controller 接收并解析请求</div>
        <pre class="step-code">@RestController
@RequestMapping("/api/users")
public class UserController {
    @PostMapping("/register")
    public ResponseEntity&lt;UserDTO&gt; register(
        @RequestBody @Valid UserRegisterRequest request) {
        UserDTO user = userService.register(request);
        return ResponseEntity.ok(user);
    }
}</pre>
      </div>

      <div class="arrow">↓ 参数校验 + 调用</div>

      <div :class="['step', 'clickable', { active: detail === 'valid' }]" @click="toggle('valid')">
        <div class="step-label warn">参数校验（Controller 的职责之一）</div>
        <pre class="step-code">public class UserRegisterRequest {
    @NotBlank(message = "用户名不能为空")
    @Size(min = 2, max = 20) private String username;
    @Email(message = "邮箱格式不正确") private String email;
    @Size(min = 6, message = "密码至少6位") private String password;
}</pre>
        <div v-if="detail === 'valid'" class="detail-box">
          <strong>为什么校验要放在 Controller？</strong>
          <ul>
            <li>第一道防线：尽早拦截非法请求</li>
            <li>减轻下游压力：Service 层可以假设数据已清洗</li>
            <li>关注点分离：Service 专注于业务，不处理格式验证</li>
          </ul>
        </div>
      </div>

      <div class="arrow">↓ 返回结果</div>

      <div class="step">
        <div class="step-label">Controller 封装响应返回</div>
        <pre class="step-code">HTTP/1.1 200 OK
{ "code": 200, "message": "注册成功",
  "data": { "id": 10001, "username": "张三", "email": "zhangsan@example.com" } }</pre>
      </div>
    </div>

    <div class="duties">
      <div class="duties-title">Controller 的核心职责</div>
      <div class="duty-grid">
        <div class="duty" v-for="d in duties" :key="d.name">
          <div class="duty-name">{{ d.name }}</div>
          <div class="duty-desc">{{ d.desc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const detail = ref('')
const toggle = (s) => { detail.value = detail.value === s ? '' : s }

const duties = [
  { name: '接收请求', desc: '映射 HTTP 请求到方法' },
  { name: '参数校验', desc: '基础格式和必填校验' },
  { name: '调用 Service', desc: '将请求转发给业务层' },
  { name: '封装响应', desc: '统一响应格式返回' }
]
</script>

<style scoped>
.controller-demo { padding: 20px; background: var(--vp-c-bg-soft); border-radius: 12px; }
.header { text-align: center; margin-bottom: 20px; }
.title { font-size: 16px; font-weight: 600; color: var(--vp-c-text-1); }
.subtitle { font-size: 13px; color: var(--vp-c-text-3); margin-top: 4px; }

.flow { display: flex; flex-direction: column; gap: 8px; }
.arrow { text-align: center; color: var(--vp-c-text-3); font-size: 12px; }

.step {
  padding: 14px; border-radius: 8px;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
}
.step.clickable { cursor: pointer; transition: all .2s; }
.step.clickable:hover { box-shadow: 0 2px 8px rgba(0,0,0,.06); }
.step.active { border-color: var(--vp-c-brand-1); box-shadow: 0 0 0 2px var(--vp-c-brand-soft); }

.step-label { font-weight: 600; font-size: 13px; color: var(--vp-c-text-1); margin-bottom: 8px; }
.step-label.accent { color: #10b981; }
.step-label.warn { color: #f59e0b; }

.step-code {
  margin: 0; padding: 10px; border-radius: 6px; overflow-x: auto;
  background: var(--vp-c-bg-soft); font-size: 11px; line-height: 1.5;
  color: var(--vp-c-text-2); font-family: var(--vp-font-family-mono);
}

.detail-box {
  margin-top: 12px; padding: 12px; border-radius: 6px;
  background: var(--vp-c-brand-soft); border-left: 3px solid var(--vp-c-brand-1);
  font-size: 12px; color: var(--vp-c-text-1); line-height: 1.6;
}
.detail-box ul { margin: 8px 0 0; padding-left: 18px; }
.detail-box li { margin: 4px 0; }

.duties { margin-top: 20px; padding: 16px; border-radius: 8px; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); }
.duties-title { text-align: center; font-weight: 600; font-size: 14px; color: var(--vp-c-text-1); margin-bottom: 12px; }
.duty-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
.duty { text-align: center; padding: 12px 8px; background: var(--vp-c-bg-soft); border-radius: 6px; }
.duty-name { font-weight: 600; font-size: 13px; color: var(--vp-c-text-1); margin-bottom: 4px; }
.duty-desc { font-size: 11px; color: var(--vp-c-text-3); }

@media (max-width: 768px) {
  .duty-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
