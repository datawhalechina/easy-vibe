import DefaultTheme from 'vitepress/theme'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Viewer from 'viewerjs'
import 'viewerjs/dist/viewer.css'
import TypeIt from 'typeit'
import { onMounted, watch, nextTick } from 'vue'
import { useRoute, useData } from 'vitepress'
import './style.css'
import Layout from './Layout.vue'
import StepBar from './components/StepBar.vue'
import ChapterIntroduction from './components/ChapterIntroduction.vue'
import WebTerminal from './components/appendix/terminal-intro/WebTerminal.vue'
import TerminalGrid from './components/appendix/terminal-intro/TerminalGrid.vue'
import CellInspector from './components/appendix/terminal-intro/CellInspector.vue'
import EscapeSequences from './components/appendix/terminal-intro/EscapeSequences.vue'
import InputVisualizer from './components/appendix/terminal-intro/InputVisualizer.vue'
import SignalsDemo from './components/appendix/terminal-intro/SignalsDemo.vue'
import FlowDiagram from './components/appendix/terminal-intro/FlowDiagram.vue'
import BufferSwitchDemo from './components/appendix/terminal-intro/BufferSwitchDemo.vue'
import AdvancedTUIDemo from './components/appendix/terminal-intro/AdvancedTUIDemo.vue'
import ArchitectureDemo from './components/appendix/terminal-intro/ArchitectureDemo.vue'
import TerminalDefinition from './components/appendix/terminal-intro/TerminalDefinition.vue'
import TerminalOSDemo from './components/appendix/terminal-intro/TerminalOSDemo.vue'
import TerminalHandsOn from './components/appendix/terminal-intro/TerminalHandsOn.vue'

import EscapeParserDemo from './components/appendix/terminal-intro/EscapeParserDemo.vue'
import CookedRawDemo from './components/appendix/terminal-intro/CookedRawDemo.vue'

// LLM Intro Components
import EmbeddingDemo from './components/appendix/llm-intro/EmbeddingDemo.vue'
import LinearAttentionDemo from './components/appendix/llm-intro/LinearAttentionDemo.vue'
import LlmQuickStartDemo from './components/appendix/llm-intro/LlmQuickStartDemo.vue'
import MoEDemo from './components/appendix/llm-intro/MoEDemo.vue'
import NextTokenPrediction from './components/appendix/llm-intro/NextTokenPrediction.vue'
import RNNvsTransformer from './components/appendix/llm-intro/RNNvsTransformer.vue'
import ThinkingModelDemo from './components/appendix/llm-intro/ThinkingModelDemo.vue'
import TokenizationDemo from './components/appendix/llm-intro/TokenizationDemo.vue'
import TokenizerToMatrix from './components/appendix/llm-intro/TokenizerToMatrix.vue'
import TrainingInferenceDemo from './components/appendix/llm-intro/TrainingInferenceDemo.vue'

// VLM Intro Components
import AttentionDemo from './components/appendix/vlm-intro/AttentionDemo.vue'
import FeatureAlignmentDemo from './components/appendix/vlm-intro/FeatureAlignmentDemo.vue'
import LinearProjectionDemo from './components/appendix/vlm-intro/LinearProjectionDemo.vue'
import ModelArchitectureComparisonDemo from './components/appendix/vlm-intro/ModelArchitectureComparisonDemo.vue'
import PatchifyDemo from './components/appendix/vlm-intro/PatchifyDemo.vue'
import PositionalEmbeddingDemo from './components/appendix/vlm-intro/PositionalEmbeddingDemo.vue'
import ProjectorDemo from './components/appendix/vlm-intro/ProjectorDemo.vue'
import TrainingPipelineDemo from './components/appendix/vlm-intro/TrainingPipelineDemo.vue'
import VLMInferenceDemo from './components/appendix/vlm-intro/VLMInferenceDemo.vue'
import ViTOutputDemo from './components/appendix/vlm-intro/ViTOutputDemo.vue'
import VlmQuickStartDemo from './components/appendix/vlm-intro/VlmQuickStartDemo.vue'

// Image Gen Intro Components
import ImageGenArchitecture from './components/appendix/image-gen-intro/ImageGenArchitecture.vue'
import LatentSpaceViz from './components/appendix/image-gen-intro/LatentSpaceViz.vue'
import DiffusionProcessDemo from './components/appendix/image-gen-intro/DiffusionProcessDemo.vue'
import FlowMatchingDemo from './components/appendix/image-gen-intro/FlowMatchingDemo.vue'
import PromptVisualizer from './components/appendix/image-gen-intro/PromptVisualizer.vue'

// Audio Intro Components
import AudioWaveformDemo from './components/appendix/audio-intro/AudioWaveformDemo.vue'
import AudioTokenizationDemo from './components/appendix/audio-intro/AudioTokenizationDemo.vue'
import SpectrogramViz from './components/appendix/audio-intro/SpectrogramViz.vue'
import AutoregressiveAudioDemo from './components/appendix/audio-intro/AutoregressiveAudioDemo.vue'

// Web Basics Components
import WebTechTriad from './components/appendix/web-basics/WebTechTriad.vue'
import UrlToBrowserDemo from './components/appendix/web-basics/UrlToBrowserDemo.vue'
// Git Intro Components
import GitWorkflowDemo from './components/appendix/git-intro/GitWorkflowDemo.vue'
import GitThreeAreasDemo from './components/appendix/git-intro/GitThreeAreasDemo.vue'
import GitStorageDemo from './components/appendix/git-intro/GitStorageDemo.vue'
import GitCommandDemo from './components/appendix/git-intro/GitCommandDemo.vue'
import GitBranchMergeDemo from './components/appendix/git-intro/GitBranchMergeDemo.vue'
import GitConflictDemo from './components/appendix/git-intro/GitConflictDemo.vue'
import GitStashDemo from './components/appendix/git-intro/GitStashDemo.vue'
import GitRemoteDemo from './components/appendix/git-intro/GitRemoteDemo.vue'
// （保留网络相关，未修改）
import NetworkLayers from './components/appendix/web-basics/NetworkLayers.vue'
import TcpUdpComparison from './components/appendix/web-basics/TcpUdpComparison.vue'
import SubnetCalculator from './components/appendix/web-basics/SubnetCalculator.vue'
import NetworkTroubleshooting from './components/appendix/web-basics/NetworkTroubleshooting.vue'

// Deployment appendix components
import DeploymentArchitecture from './components/appendix/deployment/DeploymentArchitecture.vue'
import DnsFlowDemo from './components/appendix/deployment/DnsFlowDemo.vue'
import ServerSizerDemo from './components/appendix/deployment/ServerSizerDemo.vue'
import HttpsNginxDemo from './components/appendix/deployment/HttpsNginxDemo.vue'
import CdnCacheDemo from './components/appendix/deployment/CdnCacheDemo.vue'
import CicdPipelineDemo from './components/appendix/deployment/CicdPipelineDemo.vue'
import RollbackSwitchDemo from './components/appendix/deployment/RollbackSwitchDemo.vue'
import ObservabilityBackupDemo from './components/appendix/deployment/ObservabilityBackupDemo.vue'
import CssBoxModel from './components/appendix/web-basics/CssBoxModel.vue'
import CssFlexbox from './components/appendix/web-basics/CssFlexbox.vue'
import DomManipulator from './components/appendix/web-basics/DomManipulator.vue'
import SemanticTagsDemo from './components/appendix/web-basics/SemanticTagsDemo.vue'
import DnsLookupDemo from './components/appendix/web-basics/DnsLookupDemo.vue'
import TcpHandshakeDemo from './components/appendix/web-basics/TcpHandshakeDemo.vue'
import UrlParserDemo from './components/appendix/web-basics/UrlParserDemo.vue'
import HttpExchangeDemo from './components/appendix/web-basics/HttpExchangeDemo.vue'
import BrowserRenderingDemo from './components/appendix/web-basics/BrowserRenderingDemo.vue'

// Prompt Engineering Components
import PromptQuickStartDemo from './components/appendix/prompt-engineering/PromptQuickStartDemo.vue'
import PromptComparisonDemo from './components/appendix/prompt-engineering/PromptComparisonDemo.vue'
import FewShotDemo from './components/appendix/prompt-engineering/FewShotDemo.vue'
import ChainOfThoughtDemo from './components/appendix/prompt-engineering/ChainOfThoughtDemo.vue'

// Context Engineering Components
import ContextWindowVisualizer from './components/appendix/context-engineering/ContextWindowVisualizer.vue'
import SlidingWindowDemo from './components/appendix/context-engineering/SlidingWindowDemo.vue'
import SelectiveContextDemo from './components/appendix/context-engineering/SelectiveContextDemo.vue'
import RAGSimulationDemo from './components/appendix/context-engineering/RAGSimulationDemo.vue'
import ContextCompressionDemo from './components/appendix/context-engineering/ContextCompressionDemo.vue'

// Agent Intro Components
import AgentWorkflowDemo from './components/appendix/agent-intro/AgentWorkflowDemo.vue'
// import AgentLevelDemo from './components/appendix/agent-intro/AgentLevelDemo.vue'
// import AgentArchitectureDemo from './components/appendix/agent-intro/AgentArchitectureDemo.vue'
// import AgentTaskFlowDemo from './components/appendix/agent-intro/AgentTaskFlowDemo.vue'
import FrameworkComparisonDemo from './components/appendix/agent-intro/FrameworkComparisonDemo.vue'
// import FrameworkSelectionDemo from './components/appendix/agent-intro/FrameworkSelectionDemo.vue'
// import AgentChallengesDemo from './components/appendix/agent-intro/AgentChallengesDemo.vue'
import AgentFutureDemo from './components/appendix/agent-intro/AgentFutureDemo.vue'

// Database Intro Components
import DatabaseIndexDemo from './components/appendix/database-intro/DatabaseIndexDemo.vue'
import RelationalDataDemo from './components/appendix/database-intro/RelationalDataDemo.vue'
import SqlPlaygroundDemo from './components/appendix/database-intro/SqlPlaygroundDemo.vue'

// IDE Intro Components
import VirtualVSCodeDemo from './components/appendix/ide-intro/VirtualVSCodeDemo.vue'
import IdeArchitectureDemo from './components/appendix/ide-intro/IdeArchitectureDemo.vue'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.use(ElementPlus)
    app.component('StepBar', StepBar)
    app.component('ChapterIntroduction', ChapterIntroduction)
    app.component('WebTerminal', WebTerminal)
    app.component('TerminalGrid', TerminalGrid)
    app.component('CellInspector', CellInspector)
    app.component('EscapeSequences', EscapeSequences)
    app.component('EscapeParserDemo', EscapeParserDemo)
    app.component('CookedRawDemo', CookedRawDemo)
    app.component('InputVisualizer', InputVisualizer)
    app.component('SignalsDemo', SignalsDemo)
    app.component('FlowDiagram', FlowDiagram)
    app.component('BufferSwitchDemo', BufferSwitchDemo)
    app.component('AdvancedTUIDemo', AdvancedTUIDemo)
    app.component('ArchitectureDemo', ArchitectureDemo)
    app.component('TerminalDefinition', TerminalDefinition)
    app.component('TerminalOSDemo', TerminalOSDemo)
    app.component('TerminalHandsOn', TerminalHandsOn)

    // LLM Intro Components Registration
    app.component('EmbeddingDemo', EmbeddingDemo)
    app.component('LinearAttentionDemo', LinearAttentionDemo)
    app.component('LlmQuickStartDemo', LlmQuickStartDemo)
    app.component('MoEDemo', MoEDemo)
    app.component('NextTokenPrediction', NextTokenPrediction)
    app.component('RNNvsTransformer', RNNvsTransformer)
    app.component('ThinkingModelDemo', ThinkingModelDemo)
    app.component('TokenizationDemo', TokenizationDemo)
    app.component('TokenizerToMatrix', TokenizerToMatrix)
    app.component('TrainingInferenceDemo', TrainingInferenceDemo)

    // VLM Intro Components Registration
    app.component('AttentionDemo', AttentionDemo)
    app.component('FeatureAlignmentDemo', FeatureAlignmentDemo)
    app.component('LinearProjectionDemo', LinearProjectionDemo)
    app.component(
      'ModelArchitectureComparisonDemo',
      ModelArchitectureComparisonDemo
    )
    app.component('PatchifyDemo', PatchifyDemo)
    app.component('PositionalEmbeddingDemo', PositionalEmbeddingDemo)
    app.component('ProjectorDemo', ProjectorDemo)
    app.component('TrainingPipelineDemo', TrainingPipelineDemo)
    app.component('VLMInferenceDemo', VLMInferenceDemo)
    app.component('ViTOutputDemo', ViTOutputDemo)
    app.component('VlmQuickStartDemo', VlmQuickStartDemo)

    // Image Gen Intro Components Registration
    app.component('ImageGenArchitecture', ImageGenArchitecture)
    app.component('LatentSpaceViz', LatentSpaceViz)
    app.component('DiffusionProcessDemo', DiffusionProcessDemo)
    app.component('FlowMatchingDemo', FlowMatchingDemo)
    app.component('PromptVisualizer', PromptVisualizer)

    // Audio Intro Components Registration
    app.component('AudioWaveformDemo', AudioWaveformDemo)
    app.component('AudioTokenizationDemo', AudioTokenizationDemo)
    app.component('SpectrogramViz', SpectrogramViz)
    app.component('AutoregressiveAudioDemo', AutoregressiveAudioDemo)

    // Web Basics Components Registration
    app.component('WebTechTriad', WebTechTriad)
    app.component('UrlToBrowserDemo', UrlToBrowserDemo)
    app.component('GitWorkflowDemo', GitWorkflowDemo)
    app.component('GitThreeAreasDemo', GitThreeAreasDemo)
    app.component('GitStorageDemo', GitStorageDemo)
    app.component('GitCommandDemo', GitCommandDemo)
    app.component('GitBranchMergeDemo', GitBranchMergeDemo)
    app.component('GitConflictDemo', GitConflictDemo)
    app.component('GitStashDemo', GitStashDemo)
    app.component('GitRemoteDemo', GitRemoteDemo)
    app.component('NetworkLayers', NetworkLayers)
    app.component('TcpUdpComparison', TcpUdpComparison)
    app.component('SubnetCalculator', SubnetCalculator)
    app.component('NetworkTroubleshooting', NetworkTroubleshooting)
    // Deployment appendix
    app.component('DeploymentArchitecture', DeploymentArchitecture)
    app.component('DnsFlowDemo', DnsFlowDemo)
    app.component('ServerSizerDemo', ServerSizerDemo)
    app.component('HttpsNginxDemo', HttpsNginxDemo)
    app.component('CdnCacheDemo', CdnCacheDemo)
    app.component('CicdPipelineDemo', CicdPipelineDemo)
    app.component('RollbackSwitchDemo', RollbackSwitchDemo)
    app.component('ObservabilityBackupDemo', ObservabilityBackupDemo)
    app.component('CssBoxModel', CssBoxModel)
    app.component('CssFlexbox', CssFlexbox)
    app.component('DomManipulator', DomManipulator)
    app.component('SemanticTagsDemo', SemanticTagsDemo)
    app.component('DnsLookupDemo', DnsLookupDemo)
    app.component('TcpHandshakeDemo', TcpHandshakeDemo)
    app.component('UrlParserDemo', UrlParserDemo)
    app.component('HttpExchangeDemo', HttpExchangeDemo)
    app.component('BrowserRenderingDemo', BrowserRenderingDemo)

    // Prompt Engineering Components Registration
    app.component('PromptQuickStartDemo', PromptQuickStartDemo)
    app.component('PromptComparisonDemo', PromptComparisonDemo)
    app.component('FewShotDemo', FewShotDemo)
    app.component('ChainOfThoughtDemo', ChainOfThoughtDemo)

    // Context Engineering Components Registration
    app.component('ContextWindowVisualizer', ContextWindowVisualizer)
    app.component('SlidingWindowDemo', SlidingWindowDemo)
    app.component('SelectiveContextDemo', SelectiveContextDemo)
    app.component('RAGSimulationDemo', RAGSimulationDemo)
    app.component('ContextCompressionDemo', ContextCompressionDemo)

    // Agent Intro Components Registration
    app.component('AgentWorkflowDemo', AgentWorkflowDemo)
    // app.component('AgentLevelDemo', AgentLevelDemo)
    // app.component('AgentArchitectureDemo', AgentArchitectureDemo)
    // app.component('AgentTaskFlowDemo', AgentTaskFlowDemo)
    app.component('FrameworkComparisonDemo', FrameworkComparisonDemo)
    // app.component('FrameworkSelectionDemo', FrameworkSelectionDemo)
    // app.component('AgentChallengesDemo', AgentChallengesDemo)
    app.component('AgentFutureDemo', AgentFutureDemo)

    // Database Intro Components Registration
    app.component('DatabaseIndexDemo', DatabaseIndexDemo)
    app.component('RelationalDataDemo', RelationalDataDemo)
    app.component('SqlPlaygroundDemo', SqlPlaygroundDemo)

    // IDE Intro Components Registration
    app.component('VirtualVSCodeDemo', VirtualVSCodeDemo)
    app.component('DemoIde', VirtualVSCodeDemo) // Alias
    app.component('IdeArchitectureDemo', IdeArchitectureDemo)
  },
  setup() {
    const route = useRoute()
    const { frontmatter } = useData()
    let viewer = null

    const initViewer = () => {
      // 销毁旧实例
      if (viewer) {
        viewer.destroy()
        viewer = null
      }

      // 找到文章内容容器
      const doc = document.querySelector('.vp-doc')
      if (doc) {
        // 初始化 Viewer，配置一些常用选项
        viewer = new Viewer(doc, {
          button: true, // 显示右上角关闭按钮
          navbar: true, // 显示底部缩略图导航
          title: true, // 显示图片标题（alt 属性）
          toolbar: true, // 显示工具栏（缩放、旋转等）
          tooltip: true, // 显示缩放百分比
          movable: true, // 允许拖拽
          zoomable: true, // 允许缩放
          rotatable: true, // 允许旋转
          scalable: true, // 允许翻转
          transition: false, // 禁用自带动画，确保打开瞬间无飞入
          fullscreen: true, // 允许全屏播放
          shown() {
            // 打开完成后，标记为 ready，CSS 此时才会介入 transition
            document.body.classList.add('viewer-ready')
          },
          hide() {
            // 关闭前移除标记，确保关闭瞬间无动画
            document.body.classList.remove('viewer-ready')
          },
          keyboard: true, // 允许键盘控制
          url: 'src', // 图片源
          // 过滤掉不想查看的图片（比如表情包等小图标，如果需要的话）
          filter(image) {
            return !image.classList.contains('no-viewer')
          }
        })
      }
    }

    const initTypewriter = () => {
      const taglineData = frontmatter.value.hero?.tagline
      if (Array.isArray(taglineData) && taglineData.length > 0) {
        const taglineEl = document.querySelector('.VPHomeHero .tagline')
        if (taglineEl) {
          taglineEl.innerHTML = ''

          const typeIt = new TypeIt(taglineEl, {
            speed: 50,
            startDelay: 500,
            loop: true
          })

          taglineData.forEach((text) => {
            typeIt.type(text).pause(2000).delete().pause(500)
          })

          typeIt.go()
        }
      }
    }

    const optimizeImages = () => {
      const images = document.querySelectorAll('.vp-doc img')
      images.forEach((img) => {
        if (img.complete) {
          applyImageStyle(img)
        } else {
          img.onload = () => applyImageStyle(img)
        }
      })
    }

    const applyImageStyle = (img) => {
      const { naturalWidth, naturalHeight } = img
      if (!naturalWidth || !naturalHeight) return

      const ratio = naturalHeight / naturalWidth
      img.classList.remove(
        'img-tall',
        'img-very-tall',
        'img-ultra-tall',
        'img-limit-width',
        'img-limit-height'
      )

      img.style.maxWidth = ''
      img.style.maxHeight = ''
      img.style.width = ''
      img.style.height = ''

      if (ratio <= 1) {
        img.classList.add('img-limit-width')
        return
      }

      img.classList.add('img-tall')
      if (ratio > 2.2) {
        img.classList.add('img-ultra-tall')
      } else if (ratio > 1.3) {
        img.classList.add('img-very-tall')
      }
    }

    onMounted(() => {
      initViewer()
      initTypewriter()
      optimizeImages()
    })

    watch(
      () => route.path,
      () =>
        nextTick(() => {
          initViewer()
          initTypewriter()
          optimizeImages()
        })
    )
  }
}
