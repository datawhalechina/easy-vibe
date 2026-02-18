<template>
  <div class="deployment-overview">
    <div class="demo-header">
      <span class="title">服务上线全流程</span>
      <span class="subtitle">从代码到用户眼中的网页</span>
    </div>

    <div class="demo-content">
      <div class="flow-section">
        <div class="section-title">
          开发阶段
        </div>
        <div class="service-flow">
          <div
            class="flow-step"
            :class="{ active: currentStep >= 1 }"
            @mouseenter="(e) => showTooltip(e, 'git')"
            @mouseleave="hideTooltip"
          >
            <div class="step-title">
              Git
            </div>
            <div class="tech-term">
              代码版本控制
            </div>
          </div>
          <span class="flow-arrow">→</span>
          <div
            class="flow-step"
            :class="{ active: currentStep >= 2 }"
            @mouseenter="(e) => showTooltip(e, 'cicd')"
            @mouseleave="hideTooltip"
          >
            <div class="step-title">
              CI/CD
            </div>
            <div class="tech-term">
              自动化流水线
            </div>
          </div>
        </div>
      </div>

      <div class="flow-section">
        <div class="section-title">
          构建阶段
        </div>
        <div class="service-flow">
          <div
            class="flow-step"
            :class="{ active: currentStep >= 3 }"
            @mouseenter="(e) => showTooltip(e, 'test')"
            @mouseleave="hideTooltip"
          >
            <div class="step-title">
              Test
            </div>
            <div class="tech-term">
              自动化测试
            </div>
          </div>
          <span class="flow-arrow">→</span>
          <div
            class="flow-step"
            :class="{ active: currentStep >= 4 }"
            @mouseenter="(e) => showTooltip(e, 'build')"
            @mouseleave="hideTooltip"
          >
            <div class="step-title">
              Build
            </div>
            <div class="tech-term">
              编译打包
            </div>
          </div>
          <span class="flow-arrow">→</span>
          <div
            class="flow-step"
            :class="{ active: currentStep >= 5 }"
            @mouseenter="(e) => showTooltip(e, 'artifact')"
            @mouseleave="hideTooltip"
          >
            <div class="step-title">
              Artifact
            </div>
            <div class="tech-term">
              构建产物存储
            </div>
          </div>
        </div>
      </div>

      <div class="flow-section">
        <div class="section-title">
          部署阶段
        </div>
        <div class="service-flow">
          <div
            class="flow-step"
            :class="{ active: currentStep >= 6 }"
            @mouseenter="(e) => showTooltip(e, 'server')"
            @mouseleave="hideTooltip"
          >
            <div class="step-title">
              Server
            </div>
            <div class="tech-term">
              服务器环境
            </div>
          </div>
          <span class="flow-arrow">→</span>
          <div
            class="flow-step"
            :class="{ active: currentStep >= 7 }"
            @mouseenter="(e) => showTooltip(e, 'deploy')"
            @mouseleave="hideTooltip"
          >
            <div class="step-title">
              Deploy
            </div>
            <div class="tech-term">
              部署应用
            </div>
          </div>
          <span class="flow-arrow">→</span>
          <div
            class="flow-step"
            :class="{ active: currentStep >= 8 }"
            @mouseenter="(e) => showTooltip(e, 'nginx')"
            @mouseleave="hideTooltip"
          >
            <div class="step-title">
              Nginx
            </div>
            <div class="tech-term">
              反向代理
            </div>
          </div>
        </div>
      </div>

      <div class="flow-section">
        <div class="section-title">
          网络配置
        </div>
        <div class="service-flow">
          <div
            class="flow-step"
            :class="{ active: currentStep >= 9 }"
            @mouseenter="(e) => showTooltip(e, 'https')"
            @mouseleave="hideTooltip"
          >
            <div class="step-title">
              HTTPS
            </div>
            <div class="tech-term">
              SSL证书
            </div>
          </div>
          <span class="flow-arrow">→</span>
          <div
            class="flow-step"
            :class="{ active: currentStep >= 10 }"
            @mouseenter="(e) => showTooltip(e, 'cdn')"
            @mouseleave="hideTooltip"
          >
            <div class="step-title">
              CDN
            </div>
            <div class="tech-term">
              内容分发加速
            </div>
          </div>
          <span class="flow-arrow">→</span>
          <div
            class="flow-step"
            :class="{ active: currentStep >= 11 }"
            @mouseenter="(e) => showTooltip(e, 'dns')"
            @mouseleave="hideTooltip"
          >
            <div class="step-title">
              DNS
            </div>
            <div class="tech-term">
              域名解析
            </div>
          </div>
        </div>
      </div>

      <div class="flow-section">
        <div class="section-title">
          运维阶段
        </div>
        <div class="service-flow">
          <div
            class="flow-step"
            :class="{ active: currentStep >= 12 }"
            @mouseenter="(e) => showTooltip(e, 'monitor')"
            @mouseleave="hideTooltip"
          >
            <div class="step-title">
              Monitor
            </div>
            <div class="tech-term">
              监控状态
            </div>
          </div>
          <span class="flow-arrow">→</span>
          <div
            class="flow-step"
            :class="{ active: currentStep >= 13 }"
            @mouseenter="(e) => showTooltip(e, 'log')"
            @mouseleave="hideTooltip"
          >
            <div class="step-title">
              Log
            </div>
            <div class="tech-term">
              日志收集
            </div>
          </div>
          <span class="flow-arrow">→</span>
          <div
            class="flow-step"
            :class="{ active: currentStep >= 14 }"
            @mouseenter="(e) => showTooltip(e, 'alert')"
            @mouseleave="hideTooltip"
          >
            <div class="step-title">
              Alert
            </div>
            <div class="tech-term">
              告警通知
            </div>
          </div>
        </div>
      </div>

      <Teleport to="body">
        <Transition name="fade">
          <div
            v-if="tooltipVisible"
            class="tooltip-box"
            :style="tooltipStyle"
          >
            <div class="tooltip-title">
              {{ tooltipContent.title }}
            </div>
            <div
              class="tooltip-content"
              v-html="tooltipContent.content"
            />
          </div>
        </Transition>
      </Teleport>

      <div class="info-box">
        <strong>核心原则</strong>：小步快跑 → 先上线MVP → 逐步完善
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const currentStep = ref(0)
const tooltipVisible = ref(false)
const tooltipStyle = reactive({
  top: '0px',
  left: '0px'
})

const tooltipContent = reactive({
  title: '',
  content: ''
})

const tooltipData = {
  git: {
    title: 'Git - 代码管理',
    content: `
      <div class="tooltip-section">
        <h4>这是什么东西？</h4>
        <p>想象一下，你写论文的时候，每次修改都Ctrl+S保存一个新文件：论文_v1.doc、论文_v2.doc、论文_v3.doc...这样你可以随时找回之前的版本。Git 就是干这个事情的，不过它是专门管代码的"另存为"。</p>
      </div>
      <div class="tooltip-section">
        <h4>为什么要用这个？</h4>
        <p>如果你是一个人开发，可能感觉不到它的好处。但如果是团队协作，5个人同时改一个文件，没有Git的话简直是一场灾难——你覆盖我的代码，我覆盖你的代码，最后谁也不知道哪个版本是最新的。</p>
        <p>有了Git之后，每个人都在自己的"分支"上改东西，改完后再合并到一起。就像几个人同时装修一套房子，每个人负责不同的房间，最后统一验收合并。</p>
      </div>
      <div class="tooltip-section">
        <h4>怎么用？</h4>
        <p>最常用的平台有 GitHub、GitLab、Gitee（国内的，访问速度快）。你在本地写完代码后，用 <code>git add .</code> 把改动暂存起来，用 <code>git commit -m "修复了登录bug"</code> 提交本次修改，然后用 <code>git push</code> 把代码推送到云端。</p>
        <p>下次想看看之前改了什么，用 <code>git log</code> 就能看到完整的修改历史。</p>
      </div>
    `
  },
  cicd: {
    title: 'CI/CD - 自动化的力量',
    content: `
      <div class="tooltip-section">
        <h4>这是什么东西？</h4>
        <p>你可以把它想象成一个全年无休的"机器人助手"。以前你每次上线新功能，都需要手动做一堆事情：打开电脑、登录服务器、拉取最新代码、安装依赖、运行测试、打包、部署...累死人不说，还容易漏掉某个步骤。</p>
        <p>有了CI/CD之后，你只需要把代码往GitHub上一推，机器人就自动帮你完成剩下的所有事情：拉代码 → 安装依赖 → 跑测试 → 打包构建 → 部署上线，全部自动完成，你该干嘛干嘛去。</p>
      </div>
      <div class="tooltip-section">
        <h4>为什么要用这个？</h4>
        <p>第一个好处是省事儿，你不用每次都手动操作了。第二个好处是安全——机器人不会忘记跑测试，不会喝多了手抖打错命令。第三个好处是快，可能原本手动需要半小时的活，机器人3分钟就干完了。</p>
      </div>
      <div class="tooltip-section">
        <h4>怎么用？</h4>
        <p>GitHub Actions 是最简单的选择，因为它集成在GitHub里，你只需要在项目里加一个 .github/workflows 目录，放一个配置文件就行。配置文件里写清楚：什么时候触发、要做哪些步骤。</p>
        <p>配置文件大概长这样：代码推送后 -> 安装依赖 -> 运行测试 -> 打包 -> 部署到服务器。</p>
      </div>
    `
  },
  test: {
    title: 'Test - 自动化测试',
    content: `
      <div class="tooltip-section">
        <h4>这是什么东西？</h4>
        <p>你可以理解为"考前模拟卷"。正式上线之前，先让电脑跑一遍测试用例，看看有没有bug。这就像考试前做几套模拟题，发现知识盲区赶紧补上，总比真正上考场才发现不会强。</p>
      </div>
      <div class="tooltip-section">
        <h4>为什么要用这个？</h4>
        <p>手动测试太累了，而且很容易漏掉一些边界情况。比如你改了一个登录功能的代码，表面上看没问题，但实际上可能把"忘记密码"功能给弄坏了。人工测试很容易忽略这种"顺带手"的改动，但电脑跑测试用例的话，所有相关功能都会被检查一遍。</p>
        <p>而且测试跑一次就行了，下次改代码再跑一次，不用你每次都手动点点点。</p>
      </div>
      <div class="tooltip-section">
        <h4>怎么用？</h4>
        <p>前端项目常用 Jest 或 Vitest 来写测试。你需要先写测试用例，比如"点击登录按钮，输入正确的用户名密码，应该跳转首页"。写好之后，每次 <code>npm run test</code> 就能自动跑这些测试。</p>
        <p>不用追求100%覆盖率，先把核心业务流程测了就行，比如用户注册、登录、下单、支付这些关键路径。</p>
      </div>
    `
  },
  build: {
    title: 'Build - 把代码变成可运行的包',
    content: `
      <div class="tooltip-section">
        <h4>这是什么东西？</h4>
        <p>你写的 Vue/React 代码，浏览器根本看不懂。浏览器只认识纯HTML、CSS、JavaScript这些"原始语言"。</p>
        <p>这就好像你写中文论文要发表到国际期刊，得先翻译成英文一样。Build 就是这个"翻译"的过程——把你写的高级代码（Vue/React），翻译成浏览器能看懂的普通代码（HTML/CSS/JS）。</p>
      </div>
      <div class="tooltip-section">
        <h4>为什么要用这个？</h4>
        <p>不只是翻译，Build 还会帮你做很多优化：</p>
        <ul>
          <li><strong>压缩</strong>：把代码里的空格、注释全删掉，变量名也改成短的，文件能小很多，用户加载就快</li>
          <li><strong>合并</strong>：你可能写了10个JS文件，打包后变成1个大文件，减少HTTP请求</li>
          <li><strong>混淆</strong>：代码压缩后人类基本看不懂了，也算是一种"加密"吧</li>
          <li><strong>缓存</strong>：文件名会加一串哈希值（比如 app.abc123.js），代码变了文件名就变，浏览器就会重新下载，没变的就用缓存</li>
        </ul>
      </div>
      <div class="tooltip-section">
        <h4>怎么用？</h4>
        <p>运行 <code>npm run build</code>（或 <code>yarn build</code>），然后去项目根目录的 dist 文件夹里找打包好的文件。这些就是最终要上传到服务器的文件。</p>
      </div>
    `
  },
  artifact: {
    title: 'Artifact - 构建产物存储',
    content: `
      <div class="tooltip-section">
        <h4>这是什么东西？</h4>
        <p>你可以理解为"成品仓库"。Build 之后产生的文件（dist目录里的那些HTML/CSS/JS），不能直接扔掉，得找个地方存起来。</p>
        <p>这就像做好的快递包裹，不是放在配送站就行，得存进仓库里，等要发货的时候再取。</p>
      </div>
      <div class="tooltip-section">
        <h4>为什么要用这个？</h4>
        <p>第一，每次都重新Build太慢了，存起来下次直接用。第二，你可以给每次Build打上版本标签（比如 v1.0.0、v1.0.1），万一上线后发现有bug，可以一键回滚到上一个版本。第三，如果你有多个服务器部署，可以从仓库统一拉取，不用每个服务器都Build一次。</p>
      </div>
      <div class="tooltip-section">
        <h4>怎么用？</h4>
        <p>简单方案：直接把Build产物上传到阿里云OSS或AWS S3这些云存储。</p>
        <p>高级方案：使用 Docker Registry（如果你用Docker的话）或 Nexus。这些工具可以帮你管理不同版本的构建产物，还能设置访问权限。</p>
      </div>
    `
  },
  server: {
    title: 'Server - 租一台永远不关机的电脑',
    content: `
      <div class="tooltip-section">
        <h4>这是什么东西？</h4>
        <p>就是你租的一台放在专业机房的电脑，24小时不关机，网络永远接通。这东西你肯定见过——就是那些互联网公司说的"服务器"。</p>
      </div>
      <div class="tooltip-section">
        <h4>为什么要用这个？</h4>
        <p>总不能让你自己的电脑24小时开着吧？且不说电费，你家网络也没那么稳定，万一断网了网站就访问不了。而且你家的电脑没有公网IP，别人根本找不到你。</p>
        <p>服务器放在专业机房，电力有备用电源，网络是千兆光纤，还有专人维护，温度湿度都控制得好好的。你只需要SSH远程登录上去管理就行。</p>
      </div>
      <div class="tooltip-section">
        <h4>怎么用？</h4>
        <p>国内推荐阿里云、腾讯云，新用户首年只要几十块钱。国外推荐 AWS、DigitalOcean（支持支付宝）。</p>
        <p>配置不用太高，1核2G内存够跑个人项目了。学生的话阿里云有学生认证，更便宜。</p>
        <p>买完服务器后，你会拿到一个IP地址（像 123.45.67.89 这样的）和密码，用 SSH 客户端（如 Termius、Xshell）登录上去就能管理了。</p>
      </div>
    `
  },
  deploy: {
    title: 'Deploy - 把代码上传到服务器',
    content: `
      <div class="tooltip-section">
        <h4>这是什么东西？</h4>
        <p>就是把你本地Build好的文件，上传到服务器上，然后启动服务让网站跑起来。</p>
        <p>这就像你开餐厅，厨房准备好了（代码写完了Build好了），得把菜端上餐桌（部署到服务器），客人才能吃到。</p>
      </div>
      <div class="tooltip-section">
        <h4>为什么要用这个？</h4>
        <p>代码在你本地电脑上，只有你自己能访问。要让全世界的用户都能访问，必须得部署到服务器上。</p>
      </div>
      <div class="tooltip-section">
        <h4>怎么用？</h4>
        <p><strong>最简单的方式</strong>：用FTP工具（如 FileZilla）手动上传文件到服务器。</p>
        <p><strong>推荐的方式</strong>：用 Docker 部署。你需要先在服务器上安装Docker，然后写一个 Dockerfile（就像食谱一样，告诉我怎么运行你的应用），最后 <code>docker build</code> + <code>docker run</code> 就搞定。</p>
        <p>Docker 的好处是"一次构建，到处运行"——在本地能跑，放到服务器上也一定能跑，不会出现"在我电脑上能跑啊"这种问题。</p>
      </div>
    `
  },
  nginx: {
    title: 'Nginx - 站在门口的服务员',
    content: `
      <div class="tooltip-section">
        <h4>这是什么东西？</h4>
        <p>Nginx 就像是餐厅门口的前台服务员。用户来了，先找 Nginx，Nginx 再根据情况把用户分配到不同的"厨师"（你的应用）那里。</p>
        <p>它站在服务器门口，帮你的应用挡刀干很多累活：同时接待很多用户、处理静态文件（图片/CSS/JS）、缓存响应等等。</p>
      </div>
      <div class="tooltip-section">
        <h4>为什么要用这个？</h4>
        <p>如果没有 Nginx，让你的应用直接面对用户，会有很多问题：</p>
        <ul>
          <li>一个应用只能跑一个端口，用户全挤在一起</li>
          <li>处理静态文件很慢，拖累业务逻辑</li>
          <li>没有负载均衡，一台服务器扛不住</li>
        </ul>
        <p>Nginx 就是来解决这些问题的，它可以监听80端口（HTTP默认端口），然后把请求转发到你应用的端口（比如3000）。</p>
      </div>
      <div class="tooltip-section">
        <h4>怎么用？</h4>
        <p>Nginx 配置文件看起来复杂，其实核心就几行：</p>
        <pre>server {
    listen 80;
    server_name yourdomain.com;
    
    location / {
        proxy_pass http://localhost:3000;
    }
    
    location /static/ {
        alias /var/www/static/;
    }
}</pre>
        <p>意思就是：监听80端口，域名是 yourdomain.com，用户访问 / 路径就转发到本地3000端口的应用，访问 /static/ 就直接返回静态文件。</p>
      </div>
    `
  },
  https: {
    title: 'HTTPS - 给网站装把锁',
    content: `
      <div class="tooltip-section">
        <h4>这是什么东西？</h4>
        <p>HTTPS 就是 HTTP + SSL/TLS，相当于在 HTTP 外面加了一层加密。简单说就是给你网站装一把"锁"，用户和服务器之间传输的数据都是加密的，第三者就算截获了也看不懂。</p>
      </div>
      <div class="tooltip-section">
        <h4>为什么要用这个？</h4>
        <p>没有HTTPS的话，用户在你网站输入的密码、填的个人信息，都是明文传输的，中间的任何人都能偷看到。现在浏览器很聪明，会给没有HTTPS的网站显示"不安全"，用户一看就不敢用了。</p>
        <p>而且Google等搜索引擎也会优先收录HTTPS的网站，影响SEO。</p>
      </div>
      <div class="tooltip-section">
        <h4>怎么用？</h4>
        <p><strong>最省钱的方式</strong>：用 Let's Encrypt，完全免费。配合 Certbot 工具可以自动申请和续期，三四年不用管。</p>
        <p><strong>最简单的方式</strong>：用 Cloudflare，它提供免费的HTTPS证书，而且是DNS级别的，你只需要把域名DNS迁到Cloudflare就行，证书自动搞定。</p>
        <p>证书安装好后，Nginx 配置里加一行 <code>ssl_certificate</code> 指向证书文件，再加个 <code>listen 443 ssl</code> 就行。</p>
      </div>
    `
  },
  cdn: {
    title: 'CDN - 让用户就近访问',
    content: `
      <div class="tooltip-section">
        <h4>这是什么东西？</h4>
        <p>CDN 就是"内容分发网络"。想象一下，你在全中国甚至全球各地都开了分店，用户访问时自动被引导到最近的那家店拿东西，而不是都跑你总店来。</p>
        <p>具体来说，CDN会在各地部署"边缘节点"，把网站的静态资源（图片、CSS、JS）缓存到这些节点上。用户访问时，自动连接到离他最近的节点拿资源，速度当然就快了。</p>
      </div>
      <div class="tooltip-section">
        <h4>为什么要用这个？</h4>
        <p>如果没有CDN，全世界用户都从你一个服务器下载资源。美国的用户要跨越整个太平洋来加载，速度慢死了。而且你服务器带宽是有限的，人多了就卡。</p>
        <p>有了CDN，美国用户从美国的节点拿资源，日本用户从日本的节点拿，大家都不跨海了，速度飞快，服务器压力也小了。</p>
      </div>
      <div class="tooltip-section">
        <h4>怎么用？</h4>
        <p><strong>最简单的方式</strong>：用 Cloudflare，注册账号，把域名DNS改成它给的DNS地址，就完事儿了。全程不需要配置服务器。</p>
        <p>国内的话阿里云CDN、腾讯云CDN都不错，不过需要你把域名DNS改过去，还要在CDN控制台添加域名配置。</p>
        <p>一般配置思路：CDN 域名 → 指向你服务器IP → 用户访问时CDN回源到你服务器拉取资源并缓存。</p>
      </div>
    `
  },
  dns: {
    title: 'DNS - 域名的作用',
    content: `
      <div class="tooltip-section">
        <h4>这是什么东西？</h4>
        <p>DNS 就是"域名系统"，相当于一本"电话号码簿"。用户输入的是好记的域名（如 example.com），但电脑只认IP地址（如 192.168.1.1），DNS就是负责把域名翻译成IP地址的。</p>
      </div>
      <div class="tooltip-section">
        <h4>为什么要用这个？</h4>
        <p>你总不能告诉用户"请访问 123.45.67.89 这个IP地址"吧？既不好记也不专业。买一个域名（如 myproject.com），用户输入域名就能访问，这才是正确的姿势。</p>
      </div>
      <div class="tooltip-section">
        <h4>怎么用？</h4>
        <p>第一步：买域名。阿里云、腾讯云、GoDaddy 都能买，一年几十块。</p>
        <p>第二步：配置DNS记录。最常见的是"A记录"——把域名指向服务器IP。</p>
        <p>配置示例：在DNS控制台添加一条记录：</p>
        <ul>
          <li>记录类型：A</li>
          <li>主机记录：@（或者 www）</li>
          <li>记录值：你的服务器IP（如 123.45.67.89）</li>
        </ul>
        <p>第三步：等生效。DNS修改后需要几分钟到24小时全球生效，可以用 <code>ping 你的域名</code> 命令检查是否生效。</p>
      </div>
    `
  },
  monitor: {
    title: 'Monitor - 监控网站的健康状态',
    content: `
      <div class="tooltip-section">
        <h4>这是什么东西？</h4>
        <p>监控就是给服务器装一个"体检仪"，实时监测各项指标：CPU使用率、内存占用、磁盘空间、网络流量、应用响应时间、错误率等等。</p>
      </div>
      <div class="tooltip-section">
        <h4>为什么要用这个？</h4>
        <p>服务器不会说话，它不舒服了不会主动告诉你。等用户打电话过来说"网站打不开了"，你才去处理黄花菜都凉了。</p>
        <p>有了监控，你可以设置阈值报警：CPU超过80%提醒我、内存超过90%提醒我、响应时间超过3秒提醒我。这样你可以在问题变严重之前就发现并处理。</p>
      </div>
      <div class="tooltip-section">
        <h4>怎么用？</h4>
        <p><strong>最简单的方式</strong>：用 Uptime Robot。注册账号，添加你的网站URL，它会每5分钟检查一次网站是否正常。免费版本可以监控50个网站，不支持微信/邮件通知但支持短信。网站挂了会发邮件通知你。</p>
        <p><strong>进阶方式</strong>：用阿里云监控、腾讯云监控（如果你服务器在这些云商买的话，自带监控功能）。</p>
        <p><strong>专业方式</strong>：用 Prometheus + Grafana，可以监控各种指标并做出漂亮的可视化图表，不过配置稍微复杂一些。</p>
      </div>
    `
  },
  log: {
    title: 'Log - 出了事上哪查原因',
    content: `
      <div class="tooltip-section">
        <h4>这是什么东西？</h4>
        <p>日志就是应用运行时的"日记本"，记录了程序运行过程中的各种信息：谁在什么时候访问了什么接口、返回了什么结果、有没有报错、报错信息是什么...</p>
      </div>
      <div class="tooltip-section">
        <h4>为什么要用这个？</h4>
        <p>出问题时，日志就是破案的关键线索。没有日志，你只能靠"玄学"猜问题。有了日志，你可以清楚地看到：用户在几点几分访问了哪个功能，程序在哪一行报错了，错误信息是什么。</p>
        <p>就像汽车的黑匣子——正常行驶时没人看它，但出事故了就得靠它还原真相。</p>
      </div>
      <div class="tooltip-section">
        <h4>怎么用？</h4>
        <p><strong>最简单的方式</strong>：把日志写到服务器的文件里（logs/access.log）。出问题时SSH登录服务器，用 <code>grep "关键词" logs/app.log</code> 搜索相关日志。</p>
        <p><strong>进阶方式</strong>：用专业工具收集日志，比如 Loki（免费）、ELK（Elasticsearch + Logstash + Kibana，功能强大但有点复杂）、或者国内的日志服务。</p>
        <p>建议日志里至少包含这些信息：时间戳、请求ID（traceId）、操作类型、关键参数、返回结果、错误堆栈。</p>
      </div>
    `
  },
  alert: {
    title: 'Alert - 出问题了自动通知你',
    content: `
      <div class="tooltip-section">
        <h4>这是什么东西？</h4>
        <p>告警就是当监控系统发现问题（如服务器挂了、CPU爆了、错误率飙升），自动发消息通知你。你不用一直盯着监控面板看，它会自动叫你来处理。</p>
      </div>
      <div class="tooltip-section">
        <h4>为什么要用这个？</h4>
        <p>你不可能24小时盯着监控面板看吧？就算你可以，你睡觉的时候怎么办？告警系统就像烟雾报警器——着火了自动响，不用你一直盯着有没有烟。</p>
      </div>
      <div class="tooltip-section">
        <h4>怎么用？</h4>
        <p>最常用的方式是建一个钉钉群或企业微信群，然后添加机器人。拿到机器人Webhook地址后，配置到监控工具里就行。</p>
        <p>告警通知渠道优先级建议：</p>
        <ul>
          <li><strong>紧急（网站完全挂掉）</strong>：发短信 + 打电话，必须马上知道</li>
          <li><strong>严重（错误率飙升）</strong>：发钉钉/微信消息，看到就处理</li>
          <li><strong>一般（CPU偏高）</strong>：发邮件汇总，一天看一次就行</li>
        </ul>
        <p>别什么问题都发短信把自己烦到了，设好告警级别很重要。</p>
      </div>
    `
  }
}

function showTooltip(event, key) {
  const data = tooltipData[key]
  if (!data) return
  
  tooltipContent.title = data.title
  tooltipContent.content = data.content
  
  const rect = event.target.getBoundingClientRect()
  const tooltipWidth = 480
  const tooltipMaxHeight = 550
  const padding = 16
  
  let left = rect.right + padding
  let top = rect.top
  
  if (left + tooltipWidth > window.innerWidth) {
    left = rect.left - tooltipWidth - padding
  }
  
  if (left < 0) {
    left = padding
  }
  
  if (top + tooltipMaxHeight > window.innerHeight) {
    top = window.innerHeight - tooltipMaxHeight - padding
  }
  
  if (top < 0) {
    top = padding
  }
  
  tooltipStyle.top = `${top}px`
  tooltipStyle.left = `${left}px`
  tooltipVisible.value = true
}

function hideTooltip() {
  tooltipVisible.value = false
}
</script>

<style scoped>
.deployment-overview {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  padding: 0.75rem;
  margin: 0.5rem 0;
  position: relative;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.demo-header .title {
  font-weight: bold;
  font-size: 1.1rem;
}

.demo-header .subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  margin-left: 0.5rem;
}

.demo-content {
  margin-bottom: 0.5rem;
}

.flow-section {
  margin-bottom: 1rem;
}

.flow-section:last-of-type {
  margin-bottom: 0.5rem;
}

.section-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.5rem;
  padding-left: 0.25rem;
}

.service-flow {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25rem;
  overflow-x: auto;
  padding-bottom: 0.25rem;
}

.flow-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 6px;
  transition: all 0.2s ease;
  flex-shrink: 0;
  min-width: 80px;
  cursor: pointer;
}

.flow-step:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.flow-step.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
}

.step-title {
  font-weight: 600;
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
  text-align: center;
  white-space: nowrap;
}

.tech-term {
  font-size: 0.65rem;
  color: var(--vp-c-text-2);
  text-align: center;
  white-space: normal;
  line-height: 1.2;
}

.flow-arrow {
  font-size: 0.9rem;
  color: var(--vp-c-text-3);
  flex-shrink: 0;
}

.info-box {
  background: var(--vp-c-bg-alt);
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 0.75rem;
}

.info-box strong {
  color: var(--vp-c-text-1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<style>
.tooltip-box {
  position: fixed;
  max-width: 480px;
  padding: 1.25rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.18);
  z-index: 9999;
}

.tooltip-title {
  font-weight: 600;
  font-size: 1rem;
  color: var(--vp-c-brand-1);
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.tooltip-content {
  max-height: 500px;
  
}

.tooltip-section {
  margin-bottom: 1.25rem;
}

.tooltip-section:last-child {
  margin-bottom: 0;
}

.tooltip-section h4 {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.tooltip-section p {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.7;
  margin-bottom: 0.5rem;
}

.tooltip-section ul {
  margin: 0.5rem 0;
  padding-left: 1.25rem;
}

.tooltip-section li {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 0.35rem;
}

.tooltip-section pre {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75rem;
  overflow-x: auto;
  font-size: 0.75rem;
  color: var(--vp-c-text-1);
  line-height: 1.5;
  margin: 0.5rem 0;
}

.tooltip-section code {
  background: var(--vp-c-bg-soft);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-size: 0.75rem;
  color: var(--vp-c-brand-1);
}

.tooltip-section strong {
  color: var(--vp-c-text-1);
  font-weight: 600;
}
</style>
