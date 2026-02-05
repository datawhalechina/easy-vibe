<template>
  <div class="cloud-services-map-demo">
    <div class="demo-header">
      <h4>云计算服务版图全景图</h4>
      <p class="demo-desc">点击各个板块查看 AWS 与阿里云的对应服务</p>
    </div>

    <div class="map-container">
      <!-- 计算层 -->
      <div
        class="service-layer compute-layer"
        :class="{ active: activeLayer === 'compute' }"
        @click="setActiveLayer('compute')"
      >
        <div class="layer-icon">⚙️</div>
        <div class="layer-title">计算服务</div>
        <div class="layer-services">
          <span class="service-tag">EC2/ECS</span>
          <span class="service-tag">Lambda/函数计算</span>
        </div>
      </div>

      <!-- 存储层 -->
      <div
        class="service-layer storage-layer"
        :class="{ active: activeLayer === 'storage' }"
        @click="setActiveLayer('storage')"
      >
        <div class="layer-icon">💾</div>
        <div class="layer-title">存储服务</div>
        <div class="layer-services">
          <span class="service-tag">S3/OSS</span>
          <span class="service-tag">EBS/云盘</span>
        </div>
      </div>

      <!-- 网络层 -->
      <div
        class="service-layer network-layer"
        :class="{ active: activeLayer === 'network' }"
        @click="setActiveLayer('network')"
      >
        <div class="layer-icon">🌐</div>
        <div class="layer-title">网络服务</div>
        <div class="layer-services">
          <span class="service-tag">VPC/专有网络</span>
          <span class="service-tag">ELB/SLB</span>
        </div>
      </div>

      <!-- 安全层 -->
      <div
        class="service-layer security-layer"
        :class="{ active: activeLayer === 'security' }"
        @click="setActiveLayer('security')"
      >
        <div class="layer-icon">🔒</div>
        <div class="layer-title">安全服务</div>
        <div class="layer-services">
          <span class="service-tag">IAM/RAM</span>
          <span class="service-tag">KMS/密钥管理</span>
        </div>
      </div>

      <!-- 数据库层 -->
      <div
        class="service-layer database-layer"
        :class="{ active: activeLayer === 'database' }"
        @click="setActiveLayer('database')"
      >
        <div class="layer-icon">🗄️</div>
        <div class="layer-title">数据库服务</div>
        <div class="layer-services">
          <span class="service-tag">RDS/PolarDB</span>
          <span class="service-tag">DynamoDB/Tablestore</span>
        </div>
      </div>

      <!-- 中间件层 -->
      <div
        class="service-layer middleware-layer"
        :class="{ active: activeLayer === 'middleware' }"
        @click="setActiveLayer('middleware')"
      >
        <div class="layer-icon">🔧</div>
        <div class="layer-title">中间件服务</div>
        <div class="layer-services">
          <span class="service-tag">MQ/RocketMQ</span>
          <span class="service-tag">ElastiCache/Redis</span>
        </div>
      </div>
    </div>

    <!-- 详情面板 -->
    <div v-if="activeLayer" class="detail-panel">
      <div class="detail-header">
        <h5>{{ layerDetails[activeLayer].title }}</h5>
        <button class="close-btn" @click="activeLayer = null">×</button>
      </div>
      <div class="detail-content">
        <div class="comparison-table">
          <div class="table-header">
            <div class="col aws">AWS</div>
            <div class="col aliyun">阿里云</div>
            <div class="col desc">功能描述</div>
          </div>
          <div
            v-for="(item, index) in layerDetails[activeLayer].services"
            :key="index"
            class="table-row"
          >
            <div class="col aws">{{ item.aws }}</div>
            <div class="col aliyun">{{ item.aliyun }}</div>
            <div class="col desc">{{ item.desc }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeLayer = ref(null)

const setActiveLayer = (layer) => {
  activeLayer.value = layer
}

const layerDetails = {
  compute: {
    title: '计算服务对比',
    services: [
      {
        aws: 'Amazon EC2',
        aliyun: 'ECS 云服务器',
        desc: '虚拟服务器，可完全控制计算资源'
      },
      {
        aws: 'AWS Lambda',
        aliyun: '函数计算 FC',
        desc: '无服务器计算，按需运行代码'
      },
      {
        aws: 'Amazon ECS/EKS',
        aliyun: 'ACK 容器服务',
        desc: '容器编排和管理服务'
      },
      {
        aws: 'AWS Fargate',
        aliyun: 'Serverless Kubernetes',
        desc: '无服务器容器计算引擎'
      },
      {
        aws: 'AWS Batch',
        aliyun: '批量计算',
        desc: '批量作业调度服务'
      },
      {
        aws: 'AWS Elastic Beanstalk',
        aliyun: 'EDAS',
        desc: '应用部署和托管平台'
      }
    ]
  },
  storage: {
    title: '存储服务对比',
    services: [
      {
        aws: 'Amazon S3',
        aliyun: 'OSS 对象存储',
        desc: '海量、安全、低成本的对象存储'
      },
      {
        aws: 'Amazon EBS',
        aliyun: '云盘 ESSD',
        desc: '块存储服务，为EC2/ECS提供持久存储'
      },
      {
        aws: 'Amazon EFS',
        aliyun: 'NAS 文件存储',
        desc: '托管的弹性文件存储'
      },
      {
        aws: 'Amazon Glacier',
        aliyun: 'OSS 归档存储',
        desc: '低成本长期归档存储'
      },
      {
        aws: 'AWS Storage Gateway',
        aliyun: '混合云存储阵列',
        desc: '混合云存储服务'
      },
      {
        aws: 'AWS Backup',
        aliyun: '云备份服务',
        desc: '集中式备份管理'
      }
    ]
  },
  network: {
    title: '网络服务对比',
    services: [
      {
        aws: 'Amazon VPC',
        aliyun: '专有网络 VPC',
        desc: '虚拟私有云网络环境'
      },
      {
        aws: 'Elastic Load Balancing',
        aliyun: 'SLB 负载均衡',
        desc: '流量分发服务'
      },
      {
        aws: 'Amazon CloudFront',
        aliyun: 'CDN 内容分发',
        desc: '全球内容分发网络'
      },
      {
        aws: 'AWS Transit Gateway',
        aliyun: '云企业网 CEN',
        desc: '网络传输网关'
      },
      {
        aws: 'AWS Direct Connect',
        aliyun: '高速通道',
        desc: '专线连接服务'
      },
      {
        aws: 'AWS App Mesh',
        aliyun: '服务网格 ASM',
        desc: '微服务网格管理'
      },
      {
        aws: 'AWS Global Accelerator',
        aliyun: '全球加速 GA',
        desc: '网络加速服务'
      }
    ]
  },
  security: {
    title: '安全服务对比',
    services: [
      {
        aws: 'AWS IAM',
        aliyun: 'RAM 访问控制',
        desc: '身份和访问管理服务'
      },
      {
        aws: 'AWS KMS',
        aliyun: 'KMS 密钥管理',
        desc: '密钥管理服务'
      },
      {
        aws: 'AWS WAF',
        aliyun: 'WAF 防火墙',
        desc: 'Web应用防火墙'
      },
      {
        aws: 'AWS Shield',
        aliyun: 'DDoS 防护',
        desc: 'DDoS攻击防护'
      },
      {
        aws: 'Amazon GuardDuty',
        aliyun: '云安全中心',
        desc: '智能威胁检测'
      },
      {
        aws: 'AWS Certificate Manager',
        aliyun: 'SSL 证书服务',
        desc: 'SSL/TLS证书管理'
      },
      {
        aws: 'AWS Secrets Manager',
        aliyun: '凭据管家',
        desc: '机密信息托管'
      },
      {
        aws: 'Amazon Macie',
        aliyun: '敏感数据保护',
        desc: '敏感数据发现与保护'
      }
    ]
  },
  database: {
    title: '数据库服务对比',
    services: [
      {
        aws: 'Amazon RDS',
        aliyun: 'RDS 关系型数据库',
        desc: '托管的关系型数据库服务'
      },
      {
        aws: 'Amazon Aurora',
        aliyun: 'PolarDB',
        desc: '云原生关系型数据库'
      },
      {
        aws: 'Amazon DynamoDB',
        aliyun: 'Tablestore',
        desc: 'NoSQL键值和文档数据库'
      },
      {
        aws: 'Amazon ElastiCache',
        aliyun: '云数据库 Redis',
        desc: '托管的内存缓存服务'
      },
      {
        aws: 'Amazon DocumentDB',
        aliyun: 'MongoDB 副本集',
        desc: '兼容MongoDB的文档数据库'
      },
      {
        aws: 'Amazon Keyspaces',
        aliyun: 'Cassandra 服务',
        desc: '托管的Cassandra兼容服务'
      },
      {
        aws: 'Amazon Neptune',
        aliyun: '图数据库 GDB',
        desc: '全托管图数据库'
      },
      {
        aws: 'Amazon QLDB',
        aliyun: '区块链 BaaS',
        desc: '全托管分类账数据库'
      },
      {
        aws: 'Amazon Timestream',
        aliyun: '时序数据库 TSDB',
        desc: '全托管时序数据库'
      }
    ]
  },
  middleware: {
    title: '中间件服务对比',
    services: [
      {
        aws: 'Amazon MQ',
        aliyun: '消息队列 MQ',
        desc: '托管的消息代理服务'
      },
      {
        aws: 'Amazon SQS',
        aliyun: '消息服务 MNS',
        desc: '全托管消息队列服务'
      },
      {
        aws: 'Amazon SNS',
        aliyun: '事件总线 EventBridge',
        desc: '全托管发布/订阅服务'
      },
      {
        aws: 'Amazon Kinesis',
        aliyun: '实时计算 Flink',
        desc: '实时数据流处理'
      },
      {
        aws: 'AWS Step Functions',
        aliyun: 'Serverless 工作流',
        desc: '工作流编排服务'
      },
      {
        aws: 'AWS AppSync',
        aliyun: 'API 网关',
        desc: '托管GraphQL服务'
      },
      {
        aws: 'Amazon EventBridge',
        aliyun: '事件总线',
        desc: '无服务器事件总线'
      }
    ]
  }
}
</script>

<style scoped>
.cloud-services-map-demo {
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

.map-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}

.service-layer {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.service-layer:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.service-layer.active {
  background: rgba(0, 212, 255, 0.15);
  border-color: #00d4ff;
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
}

.layer-icon {
  font-size: 2rem;
  margin-bottom: 8px;
}

.layer-title {
  font-weight: 600;
  font-size: 0.9375rem;
  margin-bottom: 8px;
  color: #e6f1ff;
}

.layer-services {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: center;
}

.service-tag {
  background: rgba(123, 44, 191, 0.3);
  color: #c084fc;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
}

.service-layer.active .service-tag {
  background: rgba(0, 212, 255, 0.3);
  color: #00d4ff;
}

.detail-panel {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  padding: 20px;
  margin-top: 16px;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.detail-header h5 {
  margin: 0;
  color: #00d4ff;
  font-size: 1.1rem;
}

.close-btn {
  background: none;
  border: none;
  color: #8892b0;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.comparison-table {
  width: 100%;
}

.table-header {
  display: grid;
  grid-template-columns: 1.2fr 1.2fr 2fr;
  gap: 12px;
  padding: 10px 12px;
  background: rgba(0, 212, 255, 0.1);
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  color: #e6f1ff;
  margin-bottom: 8px;
}

.table-row {
  display: grid;
  grid-template-columns: 1.2fr 1.2fr 2fr;
  gap: 12px;
  padding: 10px 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 0.875rem;
  transition: background 0.2s;
}

.table-row:hover {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 6px;
}

.col.aws {
  color: #ff9900;
  font-weight: 500;
}

.col.aliyun {
  color: #ff6a00;
  font-weight: 500;
}

.col.desc {
  color: #8892b0;
}

@media (max-width: 768px) {
  .map-container {
    grid-template-columns: repeat(2, 1fr);
  }

  .table-header,
  .table-row {
    grid-template-columns: 1fr 1fr;
  }

  .col.desc {
    display: none;
  }
}

@media (max-width: 480px) {
  .map-container {
    grid-template-columns: 1fr;
  }
}
</style>
