<template>
  <div class="controller-layer-demo">
    <div class="demo-header">
      <h4>🎮 Controller 层：请求的"接待员"</h4>
      <p class="subtitle">点击流程节点查看 Controller 如何接收和处理请求</p>
    </div>

    <div class="flow-container">
      <!-- 请求发起 -->
      <div class="flow-step">
        <div class="step-icon">🌐</div>
        <div class="step-content">
          <div class="step-title">客户端发起请求</div>
          <div class="step-code">
            POST /api/users/register
            Content-Type: application/json
            {
              "username": "张三",
              "email": "zhangsan@example.com",
              "password": "123456"
            }
          </div>
        </div>
      </div>

      <div class="arrow-connector">⬇️ 请求到达</div>

      <!-- Controller 接收 -->
      <div
        class="flow-step controller-step"
        :class="{ active: showDetails === 'controller' }"
        @click="toggleDetails('controller')"
      >
        <div class="step-icon">🎮</div>
        <div class="step-content">
          <div class="step-title">Controller 接收并解析请求</div>
          <div class="step-code">
            @RestController
            @RequestMapping("/api/users")
            public class UserController {

              @PostMapping("/register")
              public ResponseEntity&lt;UserDTO&gt; register(
                @RequestBody @Valid UserRegisterRequest request
              ) {
                // 调用 Service 处理业务
                UserDTO user = userService.register(request);
                return ResponseEntity.ok(user);
              }
            }
          </div>
        </div>
      </div>

      <div class="arrow-connector">⬇️ 参数校验 + 调用</div>

      <!-- 校验逻辑 -->
      <div
        class="flow-step validation-step"
        :class="{ active: showDetails === 'validation' }"
        @click="toggleDetails('validation')"
      >
        <div class="step-icon">✅</div>
        <div class="step-content">
          <div class="step-title">参数校验（Controller 的职责之一）</div>
          <div class="step-code">
            public class UserRegisterRequest {
              @NotBlank(message = "用户名不能为空")
              @Size(min = 2, max = 20, message = "用户名长度2-20")
              private String username;

              @Email(message = "邮箱格式不正确")
              private String email;

              @Size(min = 6, message = "密码至少6位")
              private String password;
            }
          </div>
          <div v-if="showDetails === 'validation'" class="detail-panel">
            <h5>为什么校验要放在 Controller？</h5>
            <ul>
              <li>🛡️ 第一道防线：尽早拦截非法请求</li>
              <li>📦 减轻下游压力：Service 层可以假设数据已清洗</li>
              <li>🔧 关注点分离：Service 专注于业务，不处理格式验证</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="arrow-connector">⬇️ 返回结果</div>

      <!-- 响应返回 -->
      <div class="flow-step">
        <div class="step-icon">📤</div>
        <div class="step-content">
          <div class="step-title">Controller 封装响应返回给客户端</div>
          <div class="step-code">
            HTTP/1.1 200 OK
            Content-Type: application/json

            {
              "code": 200,
              "message": "注册成功",
              "data": {
                "id": 10001,
                "username": "张三",
                "email": "zhangsan@example.com",
                "createdAt": "2024-01-15T10:30:00Z"
              }
            }
          </div>
        </div>
      </div>
    </div>

    <!-- Controller 职责总结 -->
    <div class="controller-summary">
      <h5>🎯 Controller 的核心职责</h5>
      <div class="duty-grid">
        <div class="duty-item">
          <div class="duty-icon">📡</div>
          <div class="duty-title">接收请求</div>
          <div class="duty-desc">映射 HTTP 请求到方法</div>
        </div>
        <div class="duty-item">
          <div class="duty-icon">✅</div>
          <div class="duty-title">参数校验</div>
          <div class="duty-desc">基础格式和必填校验</div>
        </div>
        <div class="duty-item">
          <div class="duty-icon">🔄</div>
          <div class="duty-title">调用 Service</div>
          <div class="duty-desc">将请求转发给业务层</div>
        </div>
        <div class="duty-item">
          <div class="duty-icon">📦</div>
          <div class="duty-title">封装响应</div>
          <div class="duty-desc">统一响应格式返回</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showDetails = ref('')

const toggleDetails = (section) => {
  showDetails.value = showDetails.value === section ? '' : section
}
</script>

<style scoped>
.controller-layer-demo {
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

.flow-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.flow-step {
  display: flex;
  gap: 16px;
  padding: 16px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  cursor: pointer;
}

.flow-step:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.flow-step.active {
  border: 2px solid #409eff;
  box-shadow: 0 0 0 3px rgba(64, 158, 255, 0.2);
}

.controller-step {
  border-left: 4px solid #67c23a;
}

.validation-step {
  border-left: 4px solid #e6a23c;
}

.step-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-title {
  font-weight: 600;
  color: #303133;
  margin-bottom: 8px;
  font-size: 14px;
}

.step-code {
  background: #f8f9fa;
  padding: 12px;
  border-radius: 6px;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 11px;
  color: #333;
  white-space: pre-wrap;
  line-height: 1.5;
}

.arrow-connector {
  text-align: center;
  padding: 8px;
  font-size: 12px;
  color: #909399;
  font-weight: 500;
}

.detail-panel {
  margin-top: 12px;
  padding: 16px;
  background: #f0f7ff;
  border-radius: 8px;
  border-left: 4px solid #409eff;
}

.detail-panel h5 {
  margin: 0 0 12px 0;
  color: #1a1a2e;
  font-size: 14px;
}

.detail-panel ul {
  margin: 0;
  padding-left: 20px;
}

.detail-panel li {
  margin: 6px 0;
  color: #606266;
  font-size: 12px;
  line-height: 1.6;
}

.controller-summary {
  margin-top: 24px;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.controller-summary h5 {
  margin: 0 0 16px 0;
  color: #1a1a2e;
  font-size: 15px;
  text-align: center;
}

.duty-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.duty-item {
  text-align: center;
  padding: 16px 12px;
  background: #f8f9fa;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.duty-item:hover {
  background: #e6f7ff;
  transform: translateY(-2px);
}

.duty-icon {
  font-size: 28px;
  margin-bottom: 8px;
}

.duty-title {
  font-weight: 600;
  color: #303133;
  font-size: 13px;
  margin-bottom: 4px;
}

.duty-desc {
  color: #909399;
  font-size: 11px;
}

@media (max-width: 768px) {
  .duty-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .flow-step {
    flex-direction: column;
    gap: 8px;
  }

  .step-content {
    width: 100%;
  }
}
</style>
