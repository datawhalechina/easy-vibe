<template>
  <div class="k8s-services-demo">
    <div class="demo-header">
      <h4>Kubernetes 服务生态全景</h4>
      <p class="demo-desc">探索 AWS 和阿里云上的 K8s 服务及配套生态</p>
    </div>

    <div class="k8s-architecture">
      <div class="arch-layer control-plane">
        <div class="layer-title">控制平面</div>
        <div class="layer-content">
          <div class="service-box">
            <div class="service-name">EKS / ACK</div>
            <div class="service-desc">托管 Kubernetes 控制平面</div>
          </div>
        </div>
      </div>

      <div class="arch-layer worker-nodes">
        <div class="layer-title">工作节点</div>
        <div class="layer-content">
          <div class="node-types">
            <div class="node-box">
              <div class="node-icon">💻</div>
              <div class="node-name">EC2/ECS</div>
              <div class="node-desc">标准计算节点</div>
            </div>
            <div class="node-box">
              <div class="node-icon">⚡</div>
              <div class="node-name">Fargate/ECI</div>
              <div class="node-desc">Serverless 节点</div>
            </div>
            <div class="node-box">
              <div class="node-icon">🎯</div>
              <div class="node-name">Spot/抢占式</div>
              <div class="node-desc">低成本竞价节点</div>
            </div>
          </div>
        </div>
      </div>

      <div class="arch-layer addons">
        <div class="layer-title">插件生态</div>
        <div class="layer-content">
          <div class="addon-grid">
            <div class="addon-card">
              <div class="addon-name">Ingress/Nginx</div>
              <div class="addon-aws">AWS Load Balancer</div>
              <div class="addon-aliyun">ALB Ingress</div>
            </div>
            <div class="addon-card">
              <div class="addon-name">Storage</div>
              <div class="addon-aws">EBS/EFS CSI</div>
              <div class="addon-aliyun">云盘/NAS CSI</div>
            </div>
            <div class="addon-card">
              <div class="addon-name">Monitoring</div>
              <div class="addon-aws">CloudWatch/AMP</div>
              <div class="addon-aliyun">ARMS/Prometheus</div>
            </div>
            <div class="addon-card">
              <div class="addon-name">Service Mesh</div>
              <div class="addon-aws">App Mesh</div>
              <div class="addon-aliyun">Service Mesh ASM</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Component logic here if needed
</script>

<style scoped>
.k8s-services-demo {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 12px;
  padding: 24px;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.demo-header {
  text-align: center;
  margin-bottom: 24px;
}

.demo-header h4 {
  margin: 0 0 8px 0;
  font-size: 1.25rem;
  background: linear-gradient(90deg, #00d4ff, #7b2cbf);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.demo-desc {
  margin: 0;
  color: #8892b0;
  font-size: 0.875rem;
}

.k8s-architecture {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.arch-layer {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.layer-title {
  font-weight: 600;
  font-size: 0.875rem;
  color: #00d4ff;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.service-box {
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(123, 44, 191, 0.15));
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 10px;
  padding: 16px;
  text-align: center;
}

.service-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: #e6f1ff;
  margin-bottom: 4px;
}

.service-desc {
  font-size: 0.8125rem;
  color: #8892b0;
}

.node-types {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.node-box {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 14px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.node-icon {
  font-size: 1.5rem;
  margin-bottom: 6px;
}

.node-name {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #e6f1ff;
  margin-bottom: 2px;
}

.node-desc {
  font-size: 0.6875rem;
  color: #8892b0;
}

.addon-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.addon-card {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.addon-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #e6f1ff;
  margin-bottom: 8px;
  padding-bottom: 6px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.addon-aws, .addon-aliyun {
  font-size: 0.75rem;
  padding: 2px 0;
}

.addon-aws {
  color: #ff9900;
}

.addon-aliyun {
  color: #ff6a00;
}

@media (max-width: 768px) {
  .node-types {
    grid-template-columns: 1fr;
  }

  .addon-grid {
    grid-template-columns: 1fr;
  }
}
</style>
