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
import TokenizationDemo from './components/appendix/llm-intro/TokenizationDemo.vue'
import NextTokenPrediction from './components/appendix/llm-intro/NextTokenPrediction.vue'
import TokenizerToMatrix from './components/appendix/llm-intro/TokenizerToMatrix.vue'
import EmbeddingDemo from './components/appendix/llm-intro/EmbeddingDemo.vue'
import TrainingInferenceDemo from './components/appendix/llm-intro/TrainingInferenceDemo.vue'
import RNNvsTransformer from './components/appendix/llm-intro/RNNvsTransformer.vue'
import PatchifyDemo from './components/appendix/vlm-intro/PatchifyDemo.vue'
import ProjectorDemo from './components/appendix/vlm-intro/ProjectorDemo.vue'
import VLMInferenceDemo from './components/appendix/vlm-intro/VLMInferenceDemo.vue'
import LinearProjectionDemo from './components/appendix/vlm-intro/LinearProjectionDemo.vue'
import PositionalEmbeddingDemo from './components/appendix/vlm-intro/PositionalEmbeddingDemo.vue'
import AttentionDemo from './components/appendix/vlm-intro/AttentionDemo.vue'
import TrainingPipelineDemo from './components/appendix/vlm-intro/TrainingPipelineDemo.vue'
import ModelArchitectureComparisonDemo from './components/appendix/vlm-intro/ModelArchitectureComparisonDemo.vue'
import ThinkingModelDemo from './components/appendix/llm-intro/ThinkingModelDemo.vue'
import MoEDemo from './components/appendix/llm-intro/MoEDemo.vue'
import LinearAttentionDemo from './components/appendix/llm-intro/LinearAttentionDemo.vue'
import LlmQuickStartDemo from './components/appendix/llm-intro/LlmQuickStartDemo.vue'
import FeatureAlignmentDemo from './components/appendix/vlm-intro/FeatureAlignmentDemo.vue'
import VlmQuickStartDemo from './components/appendix/vlm-intro/VlmQuickStartDemo.vue'

import EscapeParserDemo from './components/appendix/terminal-intro/EscapeParserDemo.vue'
import CookedRawDemo from './components/appendix/terminal-intro/CookedRawDemo.vue'

import ViTOutputDemo from './components/appendix/vlm-intro/ViTOutputDemo.vue'

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
    app.component('TokenizationDemo', TokenizationDemo)
    app.component('NextTokenPrediction', NextTokenPrediction)
    app.component('TokenizerToMatrix', TokenizerToMatrix)
    app.component('EmbeddingDemo', EmbeddingDemo)
    app.component('TrainingInferenceDemo', TrainingInferenceDemo)
    app.component('RNNvsTransformer', RNNvsTransformer)
    app.component('PatchifyDemo', PatchifyDemo)
    app.component('ProjectorDemo', ProjectorDemo)
    app.component('VLMInferenceDemo', VLMInferenceDemo)
    app.component('LinearProjectionDemo', LinearProjectionDemo)
    app.component('PositionalEmbeddingDemo', PositionalEmbeddingDemo)
    app.component('AttentionDemo', AttentionDemo)
    app.component('ViTOutputDemo', ViTOutputDemo)
    app.component('TrainingPipelineDemo', TrainingPipelineDemo)
    app.component('ModelArchitectureComparisonDemo', ModelArchitectureComparisonDemo)
    app.component('ThinkingModelDemo', ThinkingModelDemo)
    app.component('MoEDemo', MoEDemo)
    app.component('LinearAttentionDemo', LinearAttentionDemo)
    app.component('LlmQuickStartDemo', LlmQuickStartDemo)
    app.component('FeatureAlignmentDemo', FeatureAlignmentDemo)
    app.component('VlmQuickStartDemo', VlmQuickStartDemo)
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
