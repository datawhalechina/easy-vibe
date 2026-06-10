import DefaultTheme from 'vitepress/theme'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Viewer from 'viewerjs'
import 'viewerjs/dist/viewer.css'
import TypeIt from 'typeit'
import { defineAsyncComponent, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { useRoute, useData } from 'vitepress'
import './style.css'
import Layout from './Layout.vue'
import HomeFeatures from './components/HomeFeatures.vue'
import WelcomeScreen from './components/WelcomeScreen.vue'
import NavGrid from './components/NavGrid.vue'
import NavCard from './components/NavCard.vue'
import CategoryIndex from './components/CategoryIndex.vue'
import ArticleGrid from './components/ArticleGrid.vue'
import RelatedArticlesSection from './components/RelatedArticlesSection.vue'
import StepBar from './components/StepBar.vue'
import ChapterIntroduction from './components/ChapterIntroduction.vue'
import ReadingProgress from './components/ReadingProgress.vue'
import SummaryCard from './components/SummaryCard.vue'
import Tabs from './components/Tabs.vue'
import TabItem from './components/TabItem.vue'

// API Intro Components

// LLM Intro Components

// VLM Intro Components

// Image Gen Intro Components

// Audio Intro Components

// Web Basics Components

// Git Intro Components

// （保留网络相关，未修改）

// Computer Fundamentals Components

// import EvolutionFlowDemo from './components/appendix/computer-fundamentals/EvolutionFlowDemo.vue'

// Computer Fundamentals Additional Components

// Vibe Coding Fullstack Components

// Computer Fundamentals - Additional

// Data Encoding Components

// Deployment appendix components

// Browser & Frontend Components (a11y & i18n)

// URL to Browser Components

// Transformer & Attention Components

// AI Protocols Components

// Frontend Evolution Components

// Frontend Performance Components

// Canvas Intro Components

// Cache Design Components

// Auth Design Components

// Queue Design Components

// Prompt Engineering Components

// Context Engineering Components

// Frontend Engineering Components

// Frontend Routing Components

// Agent Intro Components

// Database Intro Components

// IDE Intro Components

// Tracking Design Components

// Operations Components

// Backend Languages Components

// Concurrency Models Components

// Component State Management Components

// Cloud Services Components

// Cloud Services Simple Components (new)

// Cloud IAM Simple Components (new)

// Gateway Proxy Components

// Load Balancing Components

// Scheduled Tasks Components

// Cloud IAM Components

// Backend Layered Architecture Components

// Browser Rendering Pipeline Components

// Cache Design Extra Components

// Cloud Storage CDN Extra Components

// API Design Components

// JavaScript Intro Components

// JavaScript Runtime Components

// Development Tools Components

// Ports & Localhost Components

// TypeScript Intro Components

// Server & Backend Components

// Engineering Excellence Components

// Data Components

// RAG Components

// Embedding & Vector Components

// AI Native App Components

// Infrastructure as Code Components

// DNS & HTTPS Components

// Model Finetuning Components

// Incident Response Components

// // Async Task Queues Components
// Async Task Queues Components

// // File Storage Components
// File Storage Components

// // Rate Limiting Components

// Search Engines Components Registration

// Monolith to Microservices Components

// High Availability Components

// Distributed Systems Components

// System Design Methodology Components

// Data Visualization Components

// Data Governance Components

// Linux Basics Components

// Docker Containers Components

// Kubernetes Components

// Neural Networks Components

// Project Architecture Components

// Appendix Navigation Component
import AppendixFlowMap from './components/AppendixFlowMap.vue'

import CopyOrDownloadAsMarkdownButtons from './components/CopyOrDownloadAsMarkdownButtons/index.vue'

const appendixComponentModules = {
  './components/appendix/terminal-intro/WebTerminal.vue': () => import('./components/appendix/terminal-intro/WebTerminal.vue'),
  './components/appendix/terminal-intro/TerminalGrid.vue': () => import('./components/appendix/terminal-intro/TerminalGrid.vue'),
  './components/appendix/terminal-intro/CellInspector.vue': () => import('./components/appendix/terminal-intro/CellInspector.vue'),
  './components/appendix/terminal-intro/EscapeSequences.vue': () => import('./components/appendix/terminal-intro/EscapeSequences.vue'),
  './components/appendix/terminal-intro/EscapeParserDemo.vue': () => import('./components/appendix/terminal-intro/EscapeParserDemo.vue'),
  './components/appendix/terminal-intro/CookedRawDemo.vue': () => import('./components/appendix/terminal-intro/CookedRawDemo.vue'),
  './components/appendix/terminal-intro/InputVisualizer.vue': () => import('./components/appendix/terminal-intro/InputVisualizer.vue'),
  './components/appendix/terminal-intro/SignalsDemo.vue': () => import('./components/appendix/terminal-intro/SignalsDemo.vue'),
  './components/appendix/terminal-intro/FlowDiagram.vue': () => import('./components/appendix/terminal-intro/FlowDiagram.vue'),
  './components/appendix/terminal-intro/BufferSwitchDemo.vue': () => import('./components/appendix/terminal-intro/BufferSwitchDemo.vue'),
  './components/appendix/terminal-intro/AdvancedTUIDemo.vue': () => import('./components/appendix/terminal-intro/AdvancedTUIDemo.vue'),
  './components/appendix/terminal-intro/ArchitectureDemo.vue': () => import('./components/appendix/terminal-intro/ArchitectureDemo.vue'),
  './components/appendix/terminal-intro/TerminalDefinition.vue': () => import('./components/appendix/terminal-intro/TerminalDefinition.vue'),
  './components/appendix/terminal-intro/TerminalOSDemo.vue': () => import('./components/appendix/terminal-intro/TerminalOSDemo.vue'),
  './components/appendix/terminal-intro/TerminalHandsOn.vue': () => import('./components/appendix/terminal-intro/TerminalHandsOn.vue'),
  './components/appendix/api-intro/ApiQuickStartDemo.vue': () => import('./components/appendix/api-intro/ApiQuickStartDemo.vue'),
  './components/appendix/api-intro/ApiConceptDemo.vue': () => import('./components/appendix/api-intro/ApiConceptDemo.vue'),
  './components/appendix/api-intro/RequestResponseFlow.vue': () => import('./components/appendix/api-intro/RequestResponseFlow.vue'),
  './components/appendix/api-intro/ApiMethodDemo.vue': () => import('./components/appendix/api-intro/ApiMethodDemo.vue'),
  './components/appendix/api-intro/ApiDocumentDemo.vue': () => import('./components/appendix/api-intro/ApiDocumentDemo.vue'),
  './components/appendix/api-intro/ApiPlayground.vue': () => import('./components/appendix/api-intro/ApiPlayground.vue'),
  './components/appendix/api-intro/RealWorldApiDemo.vue': () => import('./components/appendix/api-intro/RealWorldApiDemo.vue'),
  './components/appendix/api-intro/FunctionApiDemo.vue': () => import('./components/appendix/api-intro/FunctionApiDemo.vue'),
  './components/appendix/api-intro/ApiTypesComparison.vue': () => import('./components/appendix/api-intro/ApiTypesComparison.vue'),
  './components/appendix/api-intro/ApiFunctionVsHttp.vue': () => import('./components/appendix/api-intro/ApiFunctionVsHttp.vue'),
  './components/appendix/api-intro/DocumentTypesComparison.vue': () => import('./components/appendix/api-intro/DocumentTypesComparison.vue'),
  './components/appendix/api-intro/HttpMethodsDemo.vue': () => import('./components/appendix/api-intro/HttpMethodsDemo.vue'),
  './components/appendix/api-intro/StatusCodeCategories.vue': () => import('./components/appendix/api-intro/StatusCodeCategories.vue'),
  './components/appendix/llm-intro/EmbeddingDemo.vue': () => import('./components/appendix/llm-intro/EmbeddingDemo.vue'),
  './components/appendix/llm-intro/LinearAttentionDemo.vue': () => import('./components/appendix/llm-intro/LinearAttentionDemo.vue'),
  './components/appendix/llm-intro/LlmQuickStartDemo.vue': () => import('./components/appendix/llm-intro/LlmQuickStartDemo.vue'),
  './components/appendix/llm-intro/MoEDemo.vue': () => import('./components/appendix/llm-intro/MoEDemo.vue'),
  './components/appendix/llm-intro/NextTokenPrediction.vue': () => import('./components/appendix/llm-intro/NextTokenPrediction.vue'),
  './components/appendix/llm-intro/RNNvsTransformer.vue': () => import('./components/appendix/llm-intro/RNNvsTransformer.vue'),
  './components/appendix/llm-intro/ThinkingModelDemo.vue': () => import('./components/appendix/llm-intro/ThinkingModelDemo.vue'),
  './components/appendix/llm-intro/TokenizationDemo.vue': () => import('./components/appendix/llm-intro/TokenizationDemo.vue'),
  './components/appendix/llm-intro/TokenizerToMatrix.vue': () => import('./components/appendix/llm-intro/TokenizerToMatrix.vue'),
  './components/appendix/llm-intro/TrainingInferenceDemo.vue': () => import('./components/appendix/llm-intro/TrainingInferenceDemo.vue'),
  './components/appendix/vlm-intro/AttentionDemo.vue': () => import('./components/appendix/vlm-intro/AttentionDemo.vue'),
  './components/appendix/vlm-intro/FeatureAlignmentDemo.vue': () => import('./components/appendix/vlm-intro/FeatureAlignmentDemo.vue'),
  './components/appendix/vlm-intro/LinearProjectionDemo.vue': () => import('./components/appendix/vlm-intro/LinearProjectionDemo.vue'),
  './components/appendix/vlm-intro/ModelArchitectureComparisonDemo.vue': () => import('./components/appendix/vlm-intro/ModelArchitectureComparisonDemo.vue'),
  './components/appendix/vlm-intro/PatchifyDemo.vue': () => import('./components/appendix/vlm-intro/PatchifyDemo.vue'),
  './components/appendix/vlm-intro/PositionalEmbeddingDemo.vue': () => import('./components/appendix/vlm-intro/PositionalEmbeddingDemo.vue'),
  './components/appendix/vlm-intro/ProjectorDemo.vue': () => import('./components/appendix/vlm-intro/ProjectorDemo.vue'),
  './components/appendix/vlm-intro/TrainingPipelineDemo.vue': () => import('./components/appendix/vlm-intro/TrainingPipelineDemo.vue'),
  './components/appendix/vlm-intro/VLMInferenceDemo.vue': () => import('./components/appendix/vlm-intro/VLMInferenceDemo.vue'),
  './components/appendix/vlm-intro/ViTOutputDemo.vue': () => import('./components/appendix/vlm-intro/ViTOutputDemo.vue'),
  './components/appendix/vlm-intro/VlmQuickStartDemo.vue': () => import('./components/appendix/vlm-intro/VlmQuickStartDemo.vue'),
  './components/appendix/image-gen-intro/ImageGenArchitecture.vue': () => import('./components/appendix/image-gen-intro/ImageGenArchitecture.vue'),
  './components/appendix/image-gen-intro/LatentSpaceViz.vue': () => import('./components/appendix/image-gen-intro/LatentSpaceViz.vue'),
  './components/appendix/image-gen-intro/DiffusionProcessDemo.vue': () => import('./components/appendix/image-gen-intro/DiffusionProcessDemo.vue'),
  './components/appendix/image-gen-intro/FlowMatchingDemo.vue': () => import('./components/appendix/image-gen-intro/FlowMatchingDemo.vue'),
  './components/appendix/image-gen-intro/PromptVisualizer.vue': () => import('./components/appendix/image-gen-intro/PromptVisualizer.vue'),
  './components/appendix/image-gen-intro/ImageGenQuickStartDemo.vue': () => import('./components/appendix/image-gen-intro/ImageGenQuickStartDemo.vue'),
  './components/appendix/audio-intro/AudioWaveformDemo.vue': () => import('./components/appendix/audio-intro/AudioWaveformDemo.vue'),
  './components/appendix/audio-intro/AudioTokenizationDemo.vue': () => import('./components/appendix/audio-intro/AudioTokenizationDemo.vue'),
  './components/appendix/audio-intro/SpectrogramViz.vue': () => import('./components/appendix/audio-intro/SpectrogramViz.vue'),
  './components/appendix/audio-intro/AutoregressiveAudioDemo.vue': () => import('./components/appendix/audio-intro/AutoregressiveAudioDemo.vue'),
  './components/appendix/audio-intro/AudioQuickStartDemo.vue': () => import('./components/appendix/audio-intro/AudioQuickStartDemo.vue'),
  './components/appendix/audio-intro/MelSpectrogramDemo.vue': () => import('./components/appendix/audio-intro/MelSpectrogramDemo.vue'),
  './components/appendix/audio-intro/TTSPipelineDemo.vue': () => import('./components/appendix/audio-intro/TTSPipelineDemo.vue'),
  './components/appendix/audio-intro/VoiceCloningDemo.vue': () => import('./components/appendix/audio-intro/VoiceCloningDemo.vue'),
  './components/appendix/audio-intro/ASRvsTTSDemo.vue': () => import('./components/appendix/audio-intro/ASRvsTTSDemo.vue'),
  './components/appendix/audio-intro/EmotionControlDemo.vue': () => import('./components/appendix/audio-intro/EmotionControlDemo.vue'),
  './components/appendix/web-basics/WebTechTriad.vue': () => import('./components/appendix/web-basics/WebTechTriad.vue'),
  './components/appendix/web-basics/UrlToBrowserDemo.vue': () => import('./components/appendix/web-basics/UrlToBrowserDemo.vue'),
  './components/appendix/url-to-browser/UrlToBrowserQuickStart.vue': () => import('./components/appendix/url-to-browser/UrlToBrowserQuickStart.vue'),
  './components/appendix/git-intro/GitCommitFlow.vue': () => import('./components/appendix/git-intro/GitCommitFlow.vue'),
  './components/appendix/git-intro/GitBranchVisual.vue': () => import('./components/appendix/git-intro/GitBranchVisual.vue'),
  './components/appendix/git-intro/GitSyncDemo.vue': () => import('./components/appendix/git-intro/GitSyncDemo.vue'),
  './components/appendix/git-intro/GitCommandCheatsheet.vue': () => import('./components/appendix/git-intro/GitCommandCheatsheet.vue'),
  './components/appendix/web-basics/NetworkLayers.vue': () => import('./components/appendix/web-basics/NetworkLayers.vue'),
  './components/appendix/web-basics/TcpUdpComparison.vue': () => import('./components/appendix/web-basics/TcpUdpComparison.vue'),
  './components/appendix/web-basics/SubnetCalculator.vue': () => import('./components/appendix/web-basics/SubnetCalculator.vue'),
  './components/appendix/web-basics/NetworkTroubleshooting.vue': () => import('./components/appendix/web-basics/NetworkTroubleshooting.vue'),
  './components/appendix/computer-fundamentals/TransistorDemo.vue': () => import('./components/appendix/computer-fundamentals/TransistorDemo.vue'),
  './components/appendix/computer-fundamentals/LogicGateDemo.vue': () => import('./components/appendix/computer-fundamentals/LogicGateDemo.vue'),
  './components/appendix/computer-fundamentals/BinaryAdditionRulesDemo.vue': () => import('./components/appendix/computer-fundamentals/BinaryAdditionRulesDemo.vue'),
  './components/appendix/computer-fundamentals/HalfAdderDemo.vue': () => import('./components/appendix/computer-fundamentals/HalfAdderDemo.vue'),
  './components/appendix/computer-fundamentals/FullAdderDemo.vue': () => import('./components/appendix/computer-fundamentals/FullAdderDemo.vue'),
  './components/appendix/computer-fundamentals/AdderDemo.vue': () => import('./components/appendix/computer-fundamentals/AdderDemo.vue'),
  './components/appendix/computer-fundamentals/AdderChainDemo.vue': () => import('./components/appendix/computer-fundamentals/AdderChainDemo.vue'),
  './components/appendix/computer-fundamentals/CompleteAdderDemo.vue': () => import('./components/appendix/computer-fundamentals/CompleteAdderDemo.vue'),
  './components/appendix/computer-fundamentals/FunctionalUnitDemo.vue': () => import('./components/appendix/computer-fundamentals/FunctionalUnitDemo.vue'),
  './components/appendix/computer-fundamentals/CpuArchitectureDemo.vue': () => import('./components/appendix/computer-fundamentals/CpuArchitectureDemo.vue'),
  './components/appendix/computer-fundamentals/MinCpuDemo.vue': () => import('./components/appendix/computer-fundamentals/MinCpuDemo.vue'),
  './components/appendix/computer-fundamentals/RegisterDemo.vue': () => import('./components/appendix/computer-fundamentals/RegisterDemo.vue'),
  './components/appendix/computer-fundamentals/PipelineDemo.vue': () => import('./components/appendix/computer-fundamentals/PipelineDemo.vue'),
  './components/appendix/computer-fundamentals/ControllerDemo.vue': () => import('./components/appendix/computer-fundamentals/ControllerDemo.vue'),
  './components/appendix/computer-fundamentals/BusSystemDemo.vue': () => import('./components/appendix/computer-fundamentals/BusSystemDemo.vue'),
  './components/appendix/computer-fundamentals/InstructionFormatDemo.vue': () => import('./components/appendix/computer-fundamentals/InstructionFormatDemo.vue'),
  './components/appendix/computer-fundamentals/AddressingModeDemo.vue': () => import('./components/appendix/computer-fundamentals/AddressingModeDemo.vue'),
  './components/appendix/computer-fundamentals/CacheDemo.vue': () => import('./components/appendix/computer-fundamentals/CacheDemo.vue'),
  './components/appendix/computer-fundamentals/IOMethodDemo.vue': () => import('./components/appendix/computer-fundamentals/IOMethodDemo.vue'),
  './components/appendix/computer-fundamentals/PSWFlagDemo.vue': () => import('./components/appendix/computer-fundamentals/PSWFlagDemo.vue'),
  './components/appendix/computer-fundamentals/FlipFlopDemo.vue': () => import('./components/appendix/computer-fundamentals/FlipFlopDemo.vue'),
  './components/appendix/computer-fundamentals/ProcessDemo.vue': () => import('./components/appendix/computer-fundamentals/ProcessDemo.vue'),
  './components/appendix/computer-fundamentals/MemoryDemo.vue': () => import('./components/appendix/computer-fundamentals/MemoryDemo.vue'),
  './components/appendix/computer-fundamentals/FilesystemDemo.vue': () => import('./components/appendix/computer-fundamentals/FilesystemDemo.vue'),
  './components/appendix/computer-fundamentals/EncodingDemo.vue': () => import('./components/appendix/computer-fundamentals/EncodingDemo.vue'),
  './components/appendix/computer-fundamentals/StorageDemo.vue': () => import('./components/appendix/computer-fundamentals/StorageDemo.vue'),
  './components/appendix/computer-fundamentals/TransmissionDemo.vue': () => import('./components/appendix/computer-fundamentals/TransmissionDemo.vue'),
  './components/appendix/computer-fundamentals/DataStructureDemo.vue': () => import('./components/appendix/computer-fundamentals/DataStructureDemo.vue'),
  './components/appendix/computer-fundamentals/AlgorithmDemo.vue': () => import('./components/appendix/computer-fundamentals/AlgorithmDemo.vue'),
  './components/appendix/computer-fundamentals/LanguageMapDemo.vue': () => import('./components/appendix/computer-fundamentals/LanguageMapDemo.vue'),
  './components/appendix/computer-fundamentals/TypeSystemDemo.vue': () => import('./components/appendix/computer-fundamentals/TypeSystemDemo.vue'),
  './components/appendix/computer-fundamentals/CompilerDemo.vue': () => import('./components/appendix/computer-fundamentals/CompilerDemo.vue'),
  './components/appendix/computer-fundamentals/StaticVsDynamicDemo.vue': () => import('./components/appendix/computer-fundamentals/StaticVsDynamicDemo.vue'),
  './components/appendix/computer-fundamentals/StrongVsWeakDemo.vue': () => import('./components/appendix/computer-fundamentals/StrongVsWeakDemo.vue'),
  './components/appendix/computer-fundamentals/TypeInferenceFlowDemo.vue': () => import('./components/appendix/computer-fundamentals/TypeInferenceFlowDemo.vue'),
  './components/appendix/computer-fundamentals/LexerTokenDemo.vue': () => import('./components/appendix/computer-fundamentals/LexerTokenDemo.vue'),
  './components/appendix/computer-fundamentals/CompileVsInterpretDemo.vue': () => import('./components/appendix/computer-fundamentals/CompileVsInterpretDemo.vue'),
  './components/appendix/computer-fundamentals/CodeToInstructionDemo.vue': () => import('./components/appendix/computer-fundamentals/CodeToInstructionDemo.vue'),
  './components/appendix/computer-fundamentals/CISCvsRISCDemo.vue': () => import('./components/appendix/computer-fundamentals/CISCvsRISCDemo.vue'),
  './components/appendix/computer-fundamentals/TypeSafetyPracticeDemo.vue': () => import('./components/appendix/computer-fundamentals/TypeSafetyPracticeDemo.vue'),
  './components/appendix/computer-fundamentals/GenericTypeDemo.vue': () => import('./components/appendix/computer-fundamentals/GenericTypeDemo.vue'),
  './components/appendix/computer-fundamentals/ASTVisualizerDemo.vue': () => import('./components/appendix/computer-fundamentals/ASTVisualizerDemo.vue'),
  './components/appendix/computer-fundamentals/CodeOptimizationDemo.vue': () => import('./components/appendix/computer-fundamentals/CodeOptimizationDemo.vue'),
  './components/appendix/computer-fundamentals/NetworkLayers.vue': () => import('./components/appendix/computer-fundamentals/NetworkLayers.vue'),
  './components/appendix/computer-fundamentals/SubnetCalculator.vue': () => import('./components/appendix/computer-fundamentals/SubnetCalculator.vue'),
  './components/appendix/computer-fundamentals/TcpUdpComparison.vue': () => import('./components/appendix/computer-fundamentals/TcpUdpComparison.vue'),
  './components/appendix/computer-fundamentals/OSArchitectureDemo.vue': () => import('./components/appendix/computer-fundamentals/OSArchitectureDemo.vue'),
  './components/appendix/computer-fundamentals/ProgramLaunchDemo.vue': () => import('./components/appendix/computer-fundamentals/ProgramLaunchDemo.vue'),
  './components/appendix/computer-fundamentals/DataLifecycleDemo.vue': () => import('./components/appendix/computer-fundamentals/DataLifecycleDemo.vue'),
  './components/appendix/computer-fundamentals/EncodingStorageTransmissionDemo.vue': () => import('./components/appendix/computer-fundamentals/EncodingStorageTransmissionDemo.vue'),
  './components/appendix/computer-fundamentals/NetworkOverviewDemo.vue': () => import('./components/appendix/computer-fundamentals/NetworkOverviewDemo.vue'),
  './components/appendix/computer-fundamentals/PhysicalLayerDemo.vue': () => import('./components/appendix/computer-fundamentals/PhysicalLayerDemo.vue'),
  './components/appendix/computer-fundamentals/DataLinkLayerDemo.vue': () => import('./components/appendix/computer-fundamentals/DataLinkLayerDemo.vue'),
  './components/appendix/computer-fundamentals/TransportLayerDemo.vue': () => import('./components/appendix/computer-fundamentals/TransportLayerDemo.vue'),
  './components/appendix/computer-fundamentals/ApplicationLayerDemo.vue': () => import('./components/appendix/computer-fundamentals/ApplicationLayerDemo.vue'),
  './components/appendix/computer-fundamentals/DataStructureOverviewDemo.vue': () => import('./components/appendix/computer-fundamentals/DataStructureOverviewDemo.vue'),
  './components/appendix/computer-fundamentals/LinearStructuresDemo.vue': () => import('./components/appendix/computer-fundamentals/LinearStructuresDemo.vue'),
  './components/appendix/computer-fundamentals/HashTableDemo.vue': () => import('./components/appendix/computer-fundamentals/HashTableDemo.vue'),
  './components/appendix/computer-fundamentals/TreeStructureDemo.vue': () => import('./components/appendix/computer-fundamentals/TreeStructureDemo.vue'),
  './components/appendix/computer-fundamentals/DataStructureSelectorDemo.vue': () => import('./components/appendix/computer-fundamentals/DataStructureSelectorDemo.vue'),
  './components/appendix/computer-fundamentals/AlgorithmOverviewDemo.vue': () => import('./components/appendix/computer-fundamentals/AlgorithmOverviewDemo.vue'),
  './components/appendix/computer-fundamentals/RecursiveThinkingDemo.vue': () => import('./components/appendix/computer-fundamentals/RecursiveThinkingDemo.vue'),
  './components/appendix/computer-fundamentals/GreedyThinkingDemo.vue': () => import('./components/appendix/computer-fundamentals/GreedyThinkingDemo.vue'),
  './components/appendix/computer-fundamentals/AlgorithmParadigmDemo.vue': () => import('./components/appendix/computer-fundamentals/AlgorithmParadigmDemo.vue'),
  './components/appendix/computer-fundamentals/LanguageEvolutionDemo.vue': () => import('./components/appendix/computer-fundamentals/LanguageEvolutionDemo.vue'),
  './components/appendix/computer-fundamentals/ProgrammingParadigmDemo.vue': () => import('./components/appendix/computer-fundamentals/ProgrammingParadigmDemo.vue'),
  './components/appendix/computer-fundamentals/LanguageScenarioDemo.vue': () => import('./components/appendix/computer-fundamentals/LanguageScenarioDemo.vue'),
  './components/appendix/computer-fundamentals/ProgrammingLanguageComparisonDemo.vue': () => import('./components/appendix/computer-fundamentals/ProgrammingLanguageComparisonDemo.vue'),
  './components/appendix/computer-fundamentals/CompilerAnalogyDemo.vue': () => import('./components/appendix/computer-fundamentals/CompilerAnalogyDemo.vue'),
  './components/appendix/computer-fundamentals/SearchAlgorithmDemo.vue': () => import('./components/appendix/computer-fundamentals/SearchAlgorithmDemo.vue'),
  './components/appendix/computer-fundamentals/SortingAlgorithmDemo.vue': () => import('./components/appendix/computer-fundamentals/SortingAlgorithmDemo.vue'),
  './components/appendix/computer-fundamentals/NetworkPrincipleDemo.vue': () => import('./components/appendix/computer-fundamentals/NetworkPrincipleDemo.vue'),
  './components/appendix/computer-fundamentals/DataEncodingBasicsDemo.vue': () => import('./components/appendix/computer-fundamentals/DataEncodingBasicsDemo.vue'),
  './components/appendix/computer-fundamentals/StorageHierarchyDemo.vue': () => import('./components/appendix/computer-fundamentals/StorageHierarchyDemo.vue'),
  './components/appendix/computer-fundamentals/GraphStructureDemo.vue': () => import('./components/appendix/computer-fundamentals/GraphStructureDemo.vue'),
  './components/appendix/computer-fundamentals/LanguageTypeModelDemo.vue': () => import('./components/appendix/computer-fundamentals/LanguageTypeModelDemo.vue'),
  './components/appendix/computer-fundamentals/CompilationPracticeDemo.vue': () => import('./components/appendix/computer-fundamentals/CompilationPracticeDemo.vue'),
  './components/appendix/computer-fundamentals/DeveloperSkillShiftDemo.vue': () => import('./components/appendix/computer-fundamentals/DeveloperSkillShiftDemo.vue'),
  './components/appendix/computer-fundamentals/ComputerFieldMapDemo.vue': () => import('./components/appendix/computer-fundamentals/ComputerFieldMapDemo.vue'),
  './components/appendix/computer-fundamentals/FrontendTriadDemo.vue': () => import('./components/appendix/computer-fundamentals/FrontendTriadDemo.vue'),
  './components/appendix/computer-fundamentals/FrontendFrameworkDemo.vue': () => import('./components/appendix/computer-fundamentals/FrontendFrameworkDemo.vue'),
  './components/appendix/computer-fundamentals/BackendCoreDemo.vue': () => import('./components/appendix/computer-fundamentals/BackendCoreDemo.vue'),
  './components/appendix/computer-fundamentals/ProgrammingLanguageMapDemo.vue': () => import('./components/appendix/computer-fundamentals/ProgrammingLanguageMapDemo.vue'),
  './components/appendix/computer-fundamentals/LanguageSelectionDemo.vue': () => import('./components/appendix/computer-fundamentals/LanguageSelectionDemo.vue'),
  './components/appendix/computer-fundamentals/FullstackSkillDemo.vue': () => import('./components/appendix/computer-fundamentals/FullstackSkillDemo.vue'),
  './components/appendix/computer-fundamentals/AIvsTraditionalDemo.vue': () => import('./components/appendix/computer-fundamentals/AIvsTraditionalDemo.vue'),
  './components/appendix/computer-fundamentals/CareerPathDemo.vue': () => import('./components/appendix/computer-fundamentals/CareerPathDemo.vue'),
  './components/appendix/computer-fundamentals/LearningStrategyDemo.vue': () => import('./components/appendix/computer-fundamentals/LearningStrategyDemo.vue'),
  './components/appendix/computer-fundamentals/VibeCodingFlowDemo.vue': () => import('./components/appendix/computer-fundamentals/VibeCodingFlowDemo.vue'),
  './components/appendix/computer-fundamentals/PowerOnDemo.vue': () => import('./components/appendix/computer-fundamentals/PowerOnDemo.vue'),
  './components/appendix/computer-fundamentals/BootProcessDemo.vue': () => import('./components/appendix/computer-fundamentals/BootProcessDemo.vue'),
  './components/appendix/computer-fundamentals/BiosUefiDemo.vue': () => import('./components/appendix/computer-fundamentals/BiosUefiDemo.vue'),
  './components/appendix/computer-fundamentals/BiosUefiInteractiveDemo.vue': () => import('./components/appendix/computer-fundamentals/BiosUefiInteractiveDemo.vue'),
  './components/appendix/computer-fundamentals/AppLaunchDemo.vue': () => import('./components/appendix/computer-fundamentals/AppLaunchDemo.vue'),
  './components/appendix/computer-fundamentals/DesktopDemo.vue': () => import('./components/appendix/computer-fundamentals/DesktopDemo.vue'),
  './components/appendix/computer-fundamentals/OSBootInteractiveDemo.vue': () => import('./components/appendix/computer-fundamentals/OSBootInteractiveDemo.vue'),
  './components/appendix/computer-fundamentals/BrowserArchitectureDemo.vue': () => import('./components/appendix/computer-fundamentals/BrowserArchitectureDemo.vue'),
  './components/appendix/computer-fundamentals/URLRequestDemo.vue': () => import('./components/appendix/computer-fundamentals/URLRequestDemo.vue'),
  './components/appendix/computer-fundamentals/RenderingDemo.vue': () => import('./components/appendix/computer-fundamentals/RenderingDemo.vue'),
  './components/appendix/computer-fundamentals/FullProcessDemo.vue': () => import('./components/appendix/computer-fundamentals/FullProcessDemo.vue'),
  './components/appendix/data-encoding/GarbledTextDemo.vue': () => import('./components/appendix/data-encoding/GarbledTextDemo.vue'),
  './components/appendix/data-encoding/CharacterEncodingExplorer.vue': () => import('./components/appendix/data-encoding/CharacterEncodingExplorer.vue'),
  './components/appendix/data-encoding/StoragePyramidDemo.vue': () => import('./components/appendix/data-encoding/StoragePyramidDemo.vue'),
  './components/appendix/data-encoding/DataTransmissionDemo.vue': () => import('./components/appendix/data-encoding/DataTransmissionDemo.vue'),
  './components/appendix/data-encoding/PhotoUploadJourneyDemo.vue': () => import('./components/appendix/data-encoding/PhotoUploadJourneyDemo.vue'),
  './components/appendix/data-encoding/ImageEncodingDemo.vue': () => import('./components/appendix/data-encoding/ImageEncodingDemo.vue'),
  './components/appendix/data-encoding/AudioEncodingDemo.vue': () => import('./components/appendix/data-encoding/AudioEncodingDemo.vue'),
  './components/appendix/deployment/DeploymentOverviewDemo.vue': () => import('./components/appendix/deployment/DeploymentOverviewDemo.vue'),
  './components/appendix/deployment/DeploymentBuildDemo.vue': () => import('./components/appendix/deployment/DeploymentBuildDemo.vue'),
  './components/appendix/deployment/DeploymentServerDemo.vue': () => import('./components/appendix/deployment/DeploymentServerDemo.vue'),
  './components/appendix/deployment/DeploymentDnsDemo.vue': () => import('./components/appendix/deployment/DeploymentDnsDemo.vue'),
  './components/appendix/deployment/DeploymentHttpsDemo.vue': () => import('./components/appendix/deployment/DeploymentHttpsDemo.vue'),
  './components/appendix/deployment/DeploymentCicdDemo.vue': () => import('./components/appendix/deployment/DeploymentCicdDemo.vue'),
  './components/appendix/deployment/DeploymentMonitorDemo.vue': () => import('./components/appendix/deployment/DeploymentMonitorDemo.vue'),
  './components/appendix/web-basics/CssBoxModel.vue': () => import('./components/appendix/web-basics/CssBoxModel.vue'),
  './components/appendix/web-basics/CssFlexbox.vue': () => import('./components/appendix/web-basics/CssFlexbox.vue'),
  './components/appendix/web-basics/CssLayoutDemo.vue': () => import('./components/appendix/web-basics/CssLayoutDemo.vue'),
  './components/appendix/web-basics/CssPlaygroundDemo.vue': () => import('./components/appendix/web-basics/CssPlaygroundDemo.vue'),
  './components/appendix/web-basics/CssCommonProperties.vue': () => import('./components/appendix/web-basics/CssCommonProperties.vue'),
  './components/appendix/web-basics/CssSelectorsDemo.vue': () => import('./components/appendix/web-basics/CssSelectorsDemo.vue'),
  './components/appendix/web-basics/DomManipulator.vue': () => import('./components/appendix/web-basics/DomManipulator.vue'),
  './components/appendix/web-basics/SemanticTagsDemo.vue': () => import('./components/appendix/web-basics/SemanticTagsDemo.vue'),
  './components/appendix/web-basics/DnsLookupDemo.vue': () => import('./components/appendix/web-basics/DnsLookupDemo.vue'),
  './components/appendix/web-basics/TcpHandshakeDemo.vue': () => import('./components/appendix/web-basics/TcpHandshakeDemo.vue'),
  './components/appendix/web-basics/UrlParserDemo.vue': () => import('./components/appendix/web-basics/UrlParserDemo.vue'),
  './components/appendix/web-basics/HttpExchangeDemo.vue': () => import('./components/appendix/web-basics/HttpExchangeDemo.vue'),
  './components/appendix/web-basics/BrowserRenderingDemo.vue': () => import('./components/appendix/web-basics/BrowserRenderingDemo.vue'),
  './components/appendix/browser-frontend/AccessibilityDemo.vue': () => import('./components/appendix/browser-frontend/AccessibilityDemo.vue'),
  './components/appendix/browser-frontend/InternationalizationDemo.vue': () => import('./components/appendix/browser-frontend/InternationalizationDemo.vue'),
  './components/appendix/web-basics/FrontendEvolutionDemo.vue': () => import('./components/appendix/web-basics/FrontendEvolutionDemo.vue'),
  './components/appendix/web-basics/SliceRequestDemo.vue': () => import('./components/appendix/web-basics/SliceRequestDemo.vue'),
  './components/appendix/web-basics/ResponsiveGridDemo.vue': () => import('./components/appendix/web-basics/ResponsiveGridDemo.vue'),
  './components/appendix/web-basics/JQueryVsStateDemo.vue': () => import('./components/appendix/web-basics/JQueryVsStateDemo.vue'),
  './components/appendix/web-basics/VueReactComparisonDemo.vue': () => import('./components/appendix/web-basics/VueReactComparisonDemo.vue'),
  './components/appendix/web-basics/RoutingModeDemo.vue': () => import('./components/appendix/web-basics/RoutingModeDemo.vue'),
  './components/appendix/web-basics/SpaStatePreservationDemo.vue': () => import('./components/appendix/web-basics/SpaStatePreservationDemo.vue'),
  './components/appendix/web-basics/BundlerSizeDemo.vue': () => import('./components/appendix/web-basics/BundlerSizeDemo.vue'),
  './components/appendix/web-basics/RenderingStrategyDemo.vue': () => import('./components/appendix/web-basics/RenderingStrategyDemo.vue'),
  './components/appendix/web-basics/BigFrontendScopeDemo.vue': () => import('./components/appendix/web-basics/BigFrontendScopeDemo.vue'),
  './components/appendix/ai-history/AiEvolutionDemo.vue': () => import('./components/appendix/ai-history/AiEvolutionDemo.vue'),
  './components/appendix/ai-history/FoundationDemo.vue': () => import('./components/appendix/ai-history/FoundationDemo.vue'),
  './components/appendix/ai-history/ExpertSystemWaveDemo.vue': () => import('./components/appendix/ai-history/ExpertSystemWaveDemo.vue'),
  './components/appendix/ai-history/AIErasComparisonDemo.vue': () => import('./components/appendix/ai-history/AIErasComparisonDemo.vue'),
  './components/appendix/ai-history/RuleBasedVsLearningDemo.vue': () => import('./components/appendix/ai-history/RuleBasedVsLearningDemo.vue'),
  './components/appendix/ai-history/PerceptronDemo.vue': () => import('./components/appendix/ai-history/PerceptronDemo.vue'),
  './components/appendix/ai-history/AIEvolutionTimelineDemo.vue': () => import('./components/appendix/ai-history/AIEvolutionTimelineDemo.vue'),
  './components/appendix/ai-history/CombinatorialExplosionDemo.vue': () => import('./components/appendix/ai-history/CombinatorialExplosionDemo.vue'),
  './components/appendix/ai-history/NeuralNetworkVisualizationDemo.vue': () => import('./components/appendix/ai-history/NeuralNetworkVisualizationDemo.vue'),
  './components/appendix/ai-history/BackpropagationDemo.vue': () => import('./components/appendix/ai-history/BackpropagationDemo.vue'),
  './components/appendix/ai-history/AttentionMechanismDemo.vue': () => import('./components/appendix/ai-history/AttentionMechanismDemo.vue'),
  './components/appendix/ai-history/DiscriminativeVsGenerativeDemo.vue': () => import('./components/appendix/ai-history/DiscriminativeVsGenerativeDemo.vue'),
  './components/appendix/ai-history/GPTEvolutionDemo.vue': () => import('./components/appendix/ai-history/GPTEvolutionDemo.vue'),
  './components/appendix/transformer-attention/TransformerQuickStartDemo.vue': () => import('./components/appendix/transformer-attention/TransformerQuickStartDemo.vue'),
  './components/appendix/transformer-attention/RnnVsTransformerDemo.vue': () => import('./components/appendix/transformer-attention/RnnVsTransformerDemo.vue'),
  './components/appendix/transformer-attention/SelfAttentionDemo.vue': () => import('./components/appendix/transformer-attention/SelfAttentionDemo.vue'),
  './components/appendix/transformer-attention/QKVMechanismDemo.vue': () => import('./components/appendix/transformer-attention/QKVMechanismDemo.vue'),
  './components/appendix/transformer-attention/MultiHeadAttentionDemo.vue': () => import('./components/appendix/transformer-attention/MultiHeadAttentionDemo.vue'),
  './components/appendix/transformer-attention/TransformerArchitectureDemo.vue': () => import('./components/appendix/transformer-attention/TransformerArchitectureDemo.vue'),
  './components/appendix/transformer-attention/PositionalEncodingDemo.vue': () => import('./components/appendix/transformer-attention/PositionalEncodingDemo.vue'),
  './components/appendix/transformer-attention/AttentionDecompositionDemo.vue': () => import('./components/appendix/transformer-attention/AttentionDecompositionDemo.vue'),
  './components/appendix/ai-protocols/McpVisualDemo.vue': () => import('./components/appendix/ai-protocols/McpVisualDemo.vue'),
  './components/appendix/ai-protocols/A2AVisualDemo.vue': () => import('./components/appendix/ai-protocols/A2AVisualDemo.vue'),
  './components/appendix/ai-protocols/McpDetailedDemo.vue': () => import('./components/appendix/ai-protocols/McpDetailedDemo.vue'),
  './components/appendix/ai-protocols/A2ADetailedDemo.vue': () => import('./components/appendix/ai-protocols/A2ADetailedDemo.vue'),
  './components/appendix/ai-protocols/ProtocolComparisonDemo.vue': () => import('./components/appendix/ai-protocols/ProtocolComparisonDemo.vue'),
  './components/appendix/ai-protocols/ProtocolWorkflowDemo.vue': () => import('./components/appendix/ai-protocols/ProtocolWorkflowDemo.vue'),
  './components/appendix/web-basics/ImperativeVsDeclarativeDemo.vue': () => import('./components/appendix/web-basics/ImperativeVsDeclarativeDemo.vue'),
  './components/appendix/web-basics/ComponentReusabilityDemo.vue': () => import('./components/appendix/web-basics/ComponentReusabilityDemo.vue'),
  './components/appendix/framework-nature/FrameworkMotivationDemo.vue': () => import('./components/appendix/framework-nature/FrameworkMotivationDemo.vue'),
  './components/appendix/framework-nature/ManualVsAutoSyncDemo.vue': () => import('./components/appendix/framework-nature/ManualVsAutoSyncDemo.vue'),
  './components/appendix/framework-nature/ReactivityMechanismDemo.vue': () => import('./components/appendix/framework-nature/ReactivityMechanismDemo.vue'),
  './components/appendix/framework-nature/VirtualDomDiffDemo.vue': () => import('./components/appendix/framework-nature/VirtualDomDiffDemo.vue'),
  './components/appendix/framework-nature/FrameworkSpectrumDemo.vue': () => import('./components/appendix/framework-nature/FrameworkSpectrumDemo.vue'),
  './components/appendix/framework-nature/DataUIGapDemo.vue': () => import('./components/appendix/framework-nature/DataUIGapDemo.vue'),
  './components/appendix/framework-nature/DeclarativeFormulaDemo.vue': () => import('./components/appendix/framework-nature/DeclarativeFormulaDemo.vue'),
  './components/appendix/framework-nature/DomOperationCostDemo.vue': () => import('./components/appendix/framework-nature/DomOperationCostDemo.vue'),
  './components/appendix/framework-nature/ComponentTreeDemo.vue': () => import('./components/appendix/framework-nature/ComponentTreeDemo.vue'),
  './components/appendix/framework-nature/WhatIsDomDemo.vue': () => import('./components/appendix/framework-nature/WhatIsDomDemo.vue'),
  './components/appendix/framework-nature/WhyNoAutoSyncDemo.vue': () => import('./components/appendix/framework-nature/WhyNoAutoSyncDemo.vue'),
  './components/appendix/backend-evolution/BackendEvolutionDemo.vue': () => import('./components/appendix/backend-evolution/BackendEvolutionDemo.vue'),
  './components/appendix/backend-evolution/BackendQuickStartDemo.vue': () => import('./components/appendix/backend-evolution/BackendQuickStartDemo.vue'),
  './components/appendix/backend-evolution/EvolutionIntroDemo.vue': () => import('./components/appendix/backend-evolution/EvolutionIntroDemo.vue'),
  './components/appendix/backend-evolution/PhysicalServerDemo.vue': () => import('./components/appendix/backend-evolution/PhysicalServerDemo.vue'),
  './components/appendix/backend-evolution/MonolithDemo.vue': () => import('./components/appendix/backend-evolution/MonolithDemo.vue'),
  './components/appendix/backend-evolution/ContainerDockerDemo.vue': () => import('./components/appendix/backend-evolution/ContainerDockerDemo.vue'),
  './components/appendix/backend-evolution/MicroservicesDemo.vue': () => import('./components/appendix/backend-evolution/MicroservicesDemo.vue'),
  './components/appendix/backend-evolution/KubernetesDemo.vue': () => import('./components/appendix/backend-evolution/KubernetesDemo.vue'),
  './components/appendix/backend-evolution/ServerlessDemo.vue': () => import('./components/appendix/backend-evolution/ServerlessDemo.vue'),
  './components/appendix/backend-evolution/ArchitectureComparisonDemo.vue': () => import('./components/appendix/backend-evolution/ArchitectureComparisonDemo.vue'),
  './components/appendix/backend-evolution/DeploymentFlowDemo.vue': () => import('./components/appendix/backend-evolution/DeploymentFlowDemo.vue'),
  './components/appendix/backend-evolution/TechStackTimelineDemo.vue': () => import('./components/appendix/backend-evolution/TechStackTimelineDemo.vue'),
  './components/appendix/backend-evolution/ScalingStrategyDemo.vue': () => import('./components/appendix/backend-evolution/ScalingStrategyDemo.vue'),
  './components/appendix/backend-evolution/MonolithVsMicroserviceDemo.vue': () => import('./components/appendix/backend-evolution/MonolithVsMicroserviceDemo.vue'),
  './components/appendix/backend-evolution/CgiQueueDemo.vue': () => import('./components/appendix/backend-evolution/CgiQueueDemo.vue'),
  './components/appendix/backend-evolution/MonolithReleaseRiskDemo.vue': () => import('./components/appendix/backend-evolution/MonolithReleaseRiskDemo.vue'),
  './components/appendix/backend-evolution/MicroserviceLatencyDemo.vue': () => import('./components/appendix/backend-evolution/MicroserviceLatencyDemo.vue'),
  './components/appendix/backend-evolution/CacheHitRatioDemo.vue': () => import('./components/appendix/backend-evolution/CacheHitRatioDemo.vue'),
  './components/appendix/backend-evolution/ServerlessCostAutoScaleDemo.vue': () => import('./components/appendix/backend-evolution/ServerlessCostAutoScaleDemo.vue'),
  './components/appendix/frontend-performance/PerformanceMetricsDemo.vue': () => import('./components/appendix/frontend-performance/PerformanceMetricsDemo.vue'),
  './components/appendix/frontend-performance/PerformanceOverviewDemo.vue': () => import('./components/appendix/frontend-performance/PerformanceOverviewDemo.vue'),
  './components/appendix/frontend-performance/ReflowRepaintDemo.vue': () => import('./components/appendix/frontend-performance/ReflowRepaintDemo.vue'),
  './components/appendix/frontend-performance/ImageOptimizationDemo.vue': () => import('./components/appendix/frontend-performance/ImageOptimizationDemo.vue'),
  './components/appendix/frontend-performance/LazyLoadingDemo.vue': () => import('./components/appendix/frontend-performance/LazyLoadingDemo.vue'),
  './components/appendix/frontend-performance/CachingStrategyDemo.vue': () => import('./components/appendix/frontend-performance/CachingStrategyDemo.vue'),
  './components/appendix/frontend-performance/CriticalRenderingPathDemo.vue': () => import('./components/appendix/frontend-performance/CriticalRenderingPathDemo.vue'),
  './components/appendix/frontend-performance/VirtualScrollingDemo.vue': () => import('./components/appendix/frontend-performance/VirtualScrollingDemo.vue'),
  './components/appendix/canvas-intro/CanvasBasicsDemo.vue': () => import('./components/appendix/canvas-intro/CanvasBasicsDemo.vue'),
  './components/appendix/canvas-intro/CoordinateSystemDemo.vue': () => import('./components/appendix/canvas-intro/CoordinateSystemDemo.vue'),
  './components/appendix/canvas-intro/AnimationLoopDemo.vue': () => import('./components/appendix/canvas-intro/AnimationLoopDemo.vue'),
  './components/appendix/canvas-intro/EventHandlingDemo.vue': () => import('./components/appendix/canvas-intro/EventHandlingDemo.vue'),
  './components/appendix/canvas-intro/ParticleSystemDemo.vue': () => import('./components/appendix/canvas-intro/ParticleSystemDemo.vue'),
  './components/appendix/canvas-intro/PerformanceDemo.vue': () => import('./components/appendix/canvas-intro/PerformanceDemo.vue'),
  './components/appendix/cache-design/CacheArchitectureDemo.vue': () => import('./components/appendix/cache-design/CacheArchitectureDemo.vue'),
  './components/appendix/cache-design/LocalityPrincipleDemo.vue': () => import('./components/appendix/cache-design/LocalityPrincipleDemo.vue'),
  './components/appendix/cache-design/CacheLifecycleDemo.vue': () => import('./components/appendix/cache-design/CacheLifecycleDemo.vue'),
  './components/appendix/cache-design/LocalVsDistributedCacheDemo.vue': () => import('./components/appendix/cache-design/LocalVsDistributedCacheDemo.vue'),
  './components/appendix/cache-design/MultiLevelCacheDemo.vue': () => import('./components/appendix/cache-design/MultiLevelCacheDemo.vue'),
  './components/appendix/cache-design/CachePatternsDemo.vue': () => import('./components/appendix/cache-design/CachePatternsDemo.vue'),
  './components/appendix/cache-design/CacheProblemsDemo.vue': () => import('./components/appendix/cache-design/CacheProblemsDemo.vue'),
  './components/appendix/cache-design/ProductCacheDemo.vue': () => import('./components/appendix/cache-design/ProductCacheDemo.vue'),
  './components/appendix/auth-design/AuthEvolutionDemo.vue': () => import('./components/appendix/auth-design/AuthEvolutionDemo.vue'),
  './components/appendix/auth-design/AuthBasicsDemo.vue': () => import('./components/appendix/auth-design/AuthBasicsDemo.vue'),
  './components/appendix/auth-design/AuthInteractiveLoginDemo.vue': () => import('./components/appendix/auth-design/AuthInteractiveLoginDemo.vue'),
  './components/appendix/auth-design/AuthNvsAuthZDemo.vue': () => import('./components/appendix/auth-design/AuthNvsAuthZDemo.vue'),
  './components/appendix/auth-design/SessionCookieDemo.vue': () => import('./components/appendix/auth-design/SessionCookieDemo.vue'),
  './components/appendix/auth-design/JWTWorkflowDemo.vue': () => import('./components/appendix/auth-design/JWTWorkflowDemo.vue'),
  './components/appendix/auth-design/SessionVsJWTDemo.vue': () => import('./components/appendix/auth-design/SessionVsJWTDemo.vue'),
  './components/appendix/auth-design/OAuth2FlowDemo.vue': () => import('./components/appendix/auth-design/OAuth2FlowDemo.vue'),
  './components/appendix/auth-design/PasswordHashingDemo.vue': () => import('./components/appendix/auth-design/PasswordHashingDemo.vue'),
  './components/appendix/auth-design/CSRFDefenseDemo.vue': () => import('./components/appendix/auth-design/CSRFDefenseDemo.vue'),
  './components/appendix/queue-design/MessageQueueDemo.vue': () => import('./components/appendix/queue-design/MessageQueueDemo.vue'),
  './components/appendix/queue-design/PeakShavingDemo.vue': () => import('./components/appendix/queue-design/PeakShavingDemo.vue'),
  './components/appendix/queue-design/MessageQueueComponentsDemo.vue': () => import('./components/appendix/queue-design/MessageQueueComponentsDemo.vue'),
  './components/appendix/queue-design/PointToPointVsPubSubDemo.vue': () => import('./components/appendix/queue-design/PointToPointVsPubSubDemo.vue'),
  './components/appendix/queue-design/MessageQueueComparisonDemo.vue': () => import('./components/appendix/queue-design/MessageQueueComparisonDemo.vue'),
  './components/appendix/queue-design/CouplingDemo.vue': () => import('./components/appendix/queue-design/CouplingDemo.vue'),
  './components/appendix/queue-design/DecouplingDemo.vue': () => import('./components/appendix/queue-design/DecouplingDemo.vue'),
  './components/appendix/queue-design/PubSubDemo.vue': () => import('./components/appendix/queue-design/PubSubDemo.vue'),
  './components/appendix/queue-design/DeadLetterQueueDemo.vue': () => import('./components/appendix/queue-design/DeadLetterQueueDemo.vue'),
  './components/appendix/queue-design/DelayedMessageDemo.vue': () => import('./components/appendix/queue-design/DelayedMessageDemo.vue'),
  './components/appendix/queue-design/SeckillSystemDemo.vue': () => import('./components/appendix/queue-design/SeckillSystemDemo.vue'),
  './components/appendix/prompt-engineering/PromptQuickStartDemo.vue': () => import('./components/appendix/prompt-engineering/PromptQuickStartDemo.vue'),
  './components/appendix/prompt-engineering/PromptComparisonDemo.vue': () => import('./components/appendix/prompt-engineering/PromptComparisonDemo.vue'),
  './components/appendix/prompt-engineering/FewShotDemo.vue': () => import('./components/appendix/prompt-engineering/FewShotDemo.vue'),
  './components/appendix/prompt-engineering/ChainOfThoughtDemo.vue': () => import('./components/appendix/prompt-engineering/ChainOfThoughtDemo.vue'),
  './components/appendix/prompt-engineering/PromptTemplatesDemo.vue': () => import('./components/appendix/prompt-engineering/PromptTemplatesDemo.vue'),
  './components/appendix/prompt-engineering/PromptRobustnessDemo.vue': () => import('./components/appendix/prompt-engineering/PromptRobustnessDemo.vue'),
  './components/appendix/prompt-engineering/PromptSecurityDemo.vue': () => import('./components/appendix/prompt-engineering/PromptSecurityDemo.vue'),
  './components/appendix/prompt-engineering/TrainingProcessDemo.vue': () => import('./components/appendix/prompt-engineering/TrainingProcessDemo.vue'),
  './components/appendix/context-engineering/AgentContextFlow.vue': () => import('./components/appendix/context-engineering/AgentContextFlow.vue'),
  './components/appendix/context-engineering/IntroProblemReasonSolution.vue': () => import('./components/appendix/context-engineering/IntroProblemReasonSolution.vue'),
  './components/appendix/context-engineering/ContextWindowVisualizer.vue': () => import('./components/appendix/context-engineering/ContextWindowVisualizer.vue'),
  './components/appendix/context-engineering/SlidingWindowDemo.vue': () => import('./components/appendix/context-engineering/SlidingWindowDemo.vue'),
  './components/appendix/context-engineering/SelectiveContextDemo.vue': () => import('./components/appendix/context-engineering/SelectiveContextDemo.vue'),
  './components/appendix/context-engineering/RAGSimulationDemo.vue': () => import('./components/appendix/context-engineering/RAGSimulationDemo.vue'),
  './components/appendix/context-engineering/ContextCompressionDemo.vue': () => import('./components/appendix/context-engineering/ContextCompressionDemo.vue'),
  './components/appendix/context-engineering/MemoryPalaceDemo.vue': () => import('./components/appendix/context-engineering/MemoryPalaceDemo.vue'),
  './components/appendix/context-engineering/MemoryPalaceActionDemo.vue': () => import('./components/appendix/context-engineering/MemoryPalaceActionDemo.vue'),
  './components/appendix/context-engineering/KVCacheDemo.vue': () => import('./components/appendix/context-engineering/KVCacheDemo.vue'),
  './components/appendix/context-engineering/LostInMiddleDemo.vue': () => import('./components/appendix/context-engineering/LostInMiddleDemo.vue'),
  './components/appendix/frontend-engineering/BuildPipelineDemo.vue': () => import('./components/appendix/frontend-engineering/BuildPipelineDemo.vue'),
  './components/appendix/frontend-engineering/BundlerComparisonDemo.vue': () => import('./components/appendix/frontend-engineering/BundlerComparisonDemo.vue'),
  './components/appendix/frontend-engineering/TreeShakingDemo.vue': () => import('./components/appendix/frontend-engineering/TreeShakingDemo.vue'),
  './components/appendix/frontend-engineering/CodeSplittingDemo.vue': () => import('./components/appendix/frontend-engineering/CodeSplittingDemo.vue'),
  './components/appendix/frontend-engineering/HotReloadDemo.vue': () => import('./components/appendix/frontend-engineering/HotReloadDemo.vue'),
  './components/appendix/frontend-engineering/DependencyGraphDemo.vue': () => import('./components/appendix/frontend-engineering/DependencyGraphDemo.vue'),
  './components/appendix/frontend-engineering/SourceMapDemo.vue': () => import('./components/appendix/frontend-engineering/SourceMapDemo.vue'),
  './components/appendix/frontend-engineering/AssetFingerprintDemo.vue': () => import('./components/appendix/frontend-engineering/AssetFingerprintDemo.vue'),
  './components/appendix/frontend-routing/HashVsHistoryDemo.vue': () => import('./components/appendix/frontend-routing/HashVsHistoryDemo.vue'),
  './components/appendix/frontend-routing/DynamicRoutesDemo.vue': () => import('./components/appendix/frontend-routing/DynamicRoutesDemo.vue'),
  './components/appendix/frontend-routing/MpaRoutingDemo.vue': () => import('./components/appendix/frontend-routing/MpaRoutingDemo.vue'),
  './components/appendix/frontend-routing/NestedRoutesDemo.vue': () => import('./components/appendix/frontend-routing/NestedRoutesDemo.vue'),
  './components/appendix/frontend-routing/RouteGuardsDemo.vue': () => import('./components/appendix/frontend-routing/RouteGuardsDemo.vue'),
  './components/appendix/frontend-routing/RouteMatchingDemo.vue': () => import('./components/appendix/frontend-routing/RouteMatchingDemo.vue'),
  './components/appendix/frontend-routing/RouterArchitectureDemo.vue': () => import('./components/appendix/frontend-routing/RouterArchitectureDemo.vue'),
  './components/appendix/frontend-routing/RoutingModesDemo.vue': () => import('./components/appendix/frontend-routing/RoutingModesDemo.vue'),
  './components/appendix/frontend-routing/SpaNavigationDemo.vue': () => import('./components/appendix/frontend-routing/SpaNavigationDemo.vue'),
  './components/appendix/agent-intro/AgentWorkflowDemo.vue': () => import('./components/appendix/agent-intro/AgentWorkflowDemo.vue'),
  './components/appendix/agent-intro/AgentLevelDemo.vue': () => import('./components/appendix/agent-intro/AgentLevelDemo.vue'),
  './components/appendix/agent-intro/AgentArchitectureDemo.vue': () => import('./components/appendix/agent-intro/AgentArchitectureDemo.vue'),
  './components/appendix/agent-intro/AgentTaskFlowDemo.vue': () => import('./components/appendix/agent-intro/AgentTaskFlowDemo.vue'),
  './components/appendix/agent-intro/FrameworkComparisonDemo.vue': () => import('./components/appendix/agent-intro/FrameworkComparisonDemo.vue'),
  './components/appendix/agent-intro/FrameworkSelectionDemo.vue': () => import('./components/appendix/agent-intro/FrameworkSelectionDemo.vue'),
  './components/appendix/agent-intro/AgentChallengesDemo.vue': () => import('./components/appendix/agent-intro/AgentChallengesDemo.vue'),
  './components/appendix/agent-intro/AgentFutureDemo.vue': () => import('./components/appendix/agent-intro/AgentFutureDemo.vue'),
  './components/appendix/agent-intro/AgentQuickStartDemo.vue': () => import('./components/appendix/agent-intro/AgentQuickStartDemo.vue'),
  './components/appendix/agent-intro/AgentToolUseDemo.vue': () => import('./components/appendix/agent-intro/AgentToolUseDemo.vue'),
  './components/appendix/agent-intro/AgentPlanningDemo.vue': () => import('./components/appendix/agent-intro/AgentPlanningDemo.vue'),
  './components/appendix/agent-intro/AgentMemoryDemo.vue': () => import('./components/appendix/agent-intro/AgentMemoryDemo.vue'),
  './components/appendix/agent-intro/AgentMultiToolPrinciple.vue': () => import('./components/appendix/agent-intro/AgentMultiToolPrinciple.vue'),
  './components/appendix/agent-intro/AgentMemoryPrinciple.vue': () => import('./components/appendix/agent-intro/AgentMemoryPrinciple.vue'),
  './components/appendix/database-intro/DatabaseIndexDemo.vue': () => import('./components/appendix/database-intro/DatabaseIndexDemo.vue'),
  './components/appendix/database-intro/RelationalDataDemo.vue': () => import('./components/appendix/database-intro/RelationalDataDemo.vue'),
  './components/appendix/database-intro/SqlPlaygroundDemo.vue': () => import('./components/appendix/database-intro/SqlPlaygroundDemo.vue'),
  './components/appendix/ide-intro/VirtualVSCodeDemo.vue': () => import('./components/appendix/ide-intro/VirtualVSCodeDemo.vue'),
  './components/appendix/ide-intro/IdeArchitectureDemo.vue': () => import('./components/appendix/ide-intro/IdeArchitectureDemo.vue'),
  './components/appendix/ide-intro/AiHelpDemo.vue': () => import('./components/appendix/ide-intro/AiHelpDemo.vue'),
  './components/appendix/browser-devtools/BrowserDevToolsDemo.vue': () => import('./components/appendix/browser-devtools/BrowserDevToolsDemo.vue'),
  './components/appendix/browser-devtools/BrowserDevToolsLiveDemo.vue': () => import('./components/appendix/browser-devtools/BrowserDevToolsLiveDemo.vue'),
  './components/appendix/browser-devtools/DevToolsElementsDemo.vue': () => import('./components/appendix/browser-devtools/DevToolsElementsDemo.vue'),
  './components/appendix/browser-devtools/DevToolsConsoleDemo.vue': () => import('./components/appendix/browser-devtools/DevToolsConsoleDemo.vue'),
  './components/appendix/browser-devtools/DevToolsNetworkDemo.vue': () => import('./components/appendix/browser-devtools/DevToolsNetworkDemo.vue'),
  './components/appendix/browser-devtools/DevToolsSourcesDemo.vue': () => import('./components/appendix/browser-devtools/DevToolsSourcesDemo.vue'),
  './components/appendix/browser-devtools/DevToolsApplicationDemo.vue': () => import('./components/appendix/browser-devtools/DevToolsApplicationDemo.vue'),
  './components/appendix/tracking-design/TrackingOverviewDemo.vue': () => import('./components/appendix/tracking-design/TrackingOverviewDemo.vue'),
  './components/appendix/tracking-design/TrackingTypesDemo.vue': () => import('./components/appendix/tracking-design/TrackingTypesDemo.vue'),
  './components/appendix/tracking-design/TrackingMethodsComparisonDemo.vue': () => import('./components/appendix/tracking-design/TrackingMethodsComparisonDemo.vue'),
  './components/appendix/tracking-design/DataModelDesignDemo.vue': () => import('./components/appendix/tracking-design/DataModelDesignDemo.vue'),
  './components/appendix/tracking-design/DataCollectionDemo.vue': () => import('./components/appendix/tracking-design/DataCollectionDemo.vue'),
  './components/appendix/tracking-design/DataPipelineDemo.vue': () => import('./components/appendix/tracking-design/DataPipelineDemo.vue'),
  './components/appendix/tracking-design/PrivacyComplianceDemo.vue': () => import('./components/appendix/tracking-design/PrivacyComplianceDemo.vue'),
  './components/appendix/tracking-design/RealWorldCaseDemo.vue': () => import('./components/appendix/tracking-design/RealWorldCaseDemo.vue'),
  './components/appendix/tracking-design/ToolSelectionDemo.vue': () => import('./components/appendix/tracking-design/ToolSelectionDemo.vue'),
  './components/appendix/operations/MonitoringDashboardDemo.vue': () => import('./components/appendix/operations/MonitoringDashboardDemo.vue'),
  './components/appendix/operations/AlertFlowDemo.vue': () => import('./components/appendix/operations/AlertFlowDemo.vue'),
  './components/appendix/operations/TraceVisualizationDemo.vue': () => import('./components/appendix/operations/TraceVisualizationDemo.vue'),
  './components/appendix/operations/IncidentResponseDemo.vue': () => import('./components/appendix/operations/IncidentResponseDemo.vue'),
  './components/appendix/operations/CapacityPlanningDemo.vue': () => import('./components/appendix/operations/CapacityPlanningDemo.vue'),
  './components/appendix/backend-languages/BackendLanguagesDemo.vue': () => import('./components/appendix/backend-languages/BackendLanguagesDemo.vue'),
  './components/appendix/backend-languages/PerformanceBenchmarkDemo.vue': () => import('./components/appendix/backend-languages/PerformanceBenchmarkDemo.vue'),
  './components/appendix/backend-languages/SyntaxComparisonDemo.vue': () => import('./components/appendix/backend-languages/SyntaxComparisonDemo.vue'),
  './components/appendix/backend-languages/ConcurrencyModelDemo.vue': () => import('./components/appendix/backend-languages/ConcurrencyModelDemo.vue'),
  './components/appendix/backend-languages/LanguageSelectorDemo.vue': () => import('./components/appendix/backend-languages/LanguageSelectorDemo.vue'),
  './components/appendix/backend-languages/DeveloperEfficiencyDemo.vue': () => import('./components/appendix/backend-languages/DeveloperEfficiencyDemo.vue'),
  './components/appendix/backend-languages/LanguageEcosystemDemo.vue': () => import('./components/appendix/backend-languages/LanguageEcosystemDemo.vue'),
  './components/appendix/backend-languages/MemoryManagementDemo.vue': () => import('./components/appendix/backend-languages/MemoryManagementDemo.vue'),
  './components/appendix/backend-languages/LanguageScopeDemo.vue': () => import('./components/appendix/backend-languages/LanguageScopeDemo.vue'),
  './components/appendix/concurrency-models/ProcessThreadCoroutineDemo.vue': () => import('./components/appendix/concurrency-models/ProcessThreadCoroutineDemo.vue'),
  './components/appendix/concurrency-models/ProcessIsolationDemo.vue': () => import('./components/appendix/concurrency-models/ProcessIsolationDemo.vue'),
  './components/appendix/concurrency-models/ThreadSchedulingDemo.vue': () => import('./components/appendix/concurrency-models/ThreadSchedulingDemo.vue'),
  './components/appendix/concurrency-models/CoroutineLightweightDemo.vue': () => import('./components/appendix/concurrency-models/CoroutineLightweightDemo.vue'),
  './components/appendix/concurrency-models/AsyncAwaitDemo.vue': () => import('./components/appendix/concurrency-models/AsyncAwaitDemo.vue'),
  './components/appendix/concurrency-models/EventLoopDemo.vue': () => import('./components/appendix/concurrency-models/EventLoopDemo.vue'),
  './components/appendix/concurrency-models/ConcurrentVsParallelDemo.vue': () => import('./components/appendix/concurrency-models/ConcurrentVsParallelDemo.vue'),
  './components/appendix/concurrency-models/GoroutineGreenThreadDemo.vue': () => import('./components/appendix/concurrency-models/GoroutineGreenThreadDemo.vue'),
  './components/appendix/component-state-management/ComponentHierarchyDemo.vue': () => import('./components/appendix/component-state-management/ComponentHierarchyDemo.vue'),
  './components/appendix/component-state-management/PropsFlowDemo.vue': () => import('./components/appendix/component-state-management/PropsFlowDemo.vue'),
  './components/appendix/component-state-management/EventBusDemo.vue': () => import('./components/appendix/component-state-management/EventBusDemo.vue'),
  './components/appendix/component-state-management/StateManagementComparisonDemo.vue': () => import('./components/appendix/component-state-management/StateManagementComparisonDemo.vue'),
  './components/appendix/component-state-management/ReduxFlowDemo.vue': () => import('./components/appendix/component-state-management/ReduxFlowDemo.vue'),
  './components/appendix/component-state-management/VuexPiniaDemo.vue': () => import('./components/appendix/component-state-management/VuexPiniaDemo.vue'),
  './components/appendix/component-state-management/MobxReactivityDemo.vue': () => import('./components/appendix/component-state-management/MobxReactivityDemo.vue'),
  './components/appendix/component-state-management/ZustandJotaiDemo.vue': () => import('./components/appendix/component-state-management/ZustandJotaiDemo.vue'),
  './components/appendix/scheduled-tasks/CronExpressionDemo.vue': () => import('./components/appendix/scheduled-tasks/CronExpressionDemo.vue'),
  './components/appendix/scheduled-tasks/TaskSchedulerDemo.vue': () => import('./components/appendix/scheduled-tasks/TaskSchedulerDemo.vue'),
  './components/appendix/scheduled-tasks/BatchProcessingDemo.vue': () => import('./components/appendix/scheduled-tasks/BatchProcessingDemo.vue'),
  './components/appendix/scheduled-tasks/JobQueueDemo.vue': () => import('./components/appendix/scheduled-tasks/JobQueueDemo.vue'),
  './components/appendix/scheduled-tasks/RetryMechanismDemo.vue': () => import('./components/appendix/scheduled-tasks/RetryMechanismDemo.vue'),
  './components/appendix/scheduled-tasks/DistributedLockDemo.vue': () => import('./components/appendix/scheduled-tasks/DistributedLockDemo.vue'),
  './components/appendix/scheduled-tasks/TaskMonitoringDemo.vue': () => import('./components/appendix/scheduled-tasks/TaskMonitoringDemo.vue'),
  './components/appendix/scheduled-tasks/SchedulingConflictDemo.vue': () => import('./components/appendix/scheduled-tasks/SchedulingConflictDemo.vue'),
  './components/appendix/cloud-services/CloudServicesMapDemo.vue': () => import('./components/appendix/cloud-services/CloudServicesMapDemo.vue'),
  './components/appendix/cloud-services/AwsVsAliyunDemo.vue': () => import('./components/appendix/cloud-services/AwsVsAliyunDemo.vue'),
  './components/appendix/cloud-services/ComputeServicesDemo.vue': () => import('./components/appendix/cloud-services/ComputeServicesDemo.vue'),
  './components/appendix/cloud-services/StorageServicesDemo.vue': () => import('./components/appendix/cloud-services/StorageServicesDemo.vue'),
  './components/appendix/cloud-services/NetworkServicesDemo.vue': () => import('./components/appendix/cloud-services/NetworkServicesDemo.vue'),
  './components/appendix/cloud-services/SecurityServicesDemo.vue': () => import('./components/appendix/cloud-services/SecurityServicesDemo.vue'),
  './components/appendix/cloud-services/PricingModelDemo.vue': () => import('./components/appendix/cloud-services/PricingModelDemo.vue'),
  './components/appendix/cloud-services/ServiceSelectionDemo.vue': () => import('./components/appendix/cloud-services/ServiceSelectionDemo.vue'),
  './components/appendix/cloud-services/DatabaseServicesDemo.vue': () => import('./components/appendix/cloud-services/DatabaseServicesDemo.vue'),
  './components/appendix/cloud-services/K8sServicesDemo.vue': () => import('./components/appendix/cloud-services/K8sServicesDemo.vue'),
  './components/appendix/cloud-services/CloudServicesOverview.vue': () => import('./components/appendix/cloud-services/CloudServicesOverview.vue'),
  './components/appendix/cloud-services/ProviderComparison.vue': () => import('./components/appendix/cloud-services/ProviderComparison.vue'),
  './components/appendix/cloud-services/PricingCalculator.vue': () => import('./components/appendix/cloud-services/PricingCalculator.vue'),
  './components/appendix/cloud-services/ComputeInstanceDemo.vue': () => import('./components/appendix/cloud-services/ComputeInstanceDemo.vue'),
  './components/appendix/cloud-services/StorageTypeDemo.vue': () => import('./components/appendix/cloud-services/StorageTypeDemo.vue'),
  './components/appendix/cloud-services/ApiCallDemo.vue': () => import('./components/appendix/cloud-services/ApiCallDemo.vue'),
  './components/appendix/cloud-services/CloudHistoryDemo.vue': () => import('./components/appendix/cloud-services/CloudHistoryDemo.vue'),
  './components/appendix/cloud-services/DeployWorkflowDemo.vue': () => import('./components/appendix/cloud-services/DeployWorkflowDemo.vue'),
  './components/appendix/cloud-services/RegionLatencyDemo.vue': () => import('./components/appendix/cloud-services/RegionLatencyDemo.vue'),
  './components/appendix/cloud-iam/IAMStructure.vue': () => import('./components/appendix/cloud-iam/IAMStructure.vue'),
  './components/appendix/cloud-iam/PolicyEditorDemo.vue': () => import('./components/appendix/cloud-iam/PolicyEditorDemo.vue'),
  './components/appendix/cloud-iam/IamRamComparisonDemo.vue': () => import('./components/appendix/cloud-iam/IamRamComparisonDemo.vue'),
  './components/appendix/cloud-iam/IdentityProviderDemo.vue': () => import('./components/appendix/cloud-iam/IdentityProviderDemo.vue'),
  './components/appendix/cloud-iam/RolePolicyDemo.vue': () => import('./components/appendix/cloud-iam/RolePolicyDemo.vue'),
  './components/appendix/cloud-iam/PermissionHierarchyDemo.vue': () => import('./components/appendix/cloud-iam/PermissionHierarchyDemo.vue'),
  './components/appendix/cloud-iam/AccessKeyManagementDemo.vue': () => import('./components/appendix/cloud-iam/AccessKeyManagementDemo.vue'),
  './components/appendix/cloud-iam/MfaSecurityDemo.vue': () => import('./components/appendix/cloud-iam/MfaSecurityDemo.vue'),
  './components/appendix/cloud-iam/CrossAccountAccessDemo.vue': () => import('./components/appendix/cloud-iam/CrossAccountAccessDemo.vue'),
  './components/appendix/cloud-iam/BestPracticesDemo.vue': () => import('./components/appendix/cloud-iam/BestPracticesDemo.vue'),
  './components/appendix/gateway-proxy/ReverseProxyDemo.vue': () => import('./components/appendix/gateway-proxy/ReverseProxyDemo.vue'),
  './components/appendix/gateway-proxy/ApiGatewayDemo.vue': () => import('./components/appendix/gateway-proxy/ApiGatewayDemo.vue'),
  './components/appendix/gateway-proxy/NginxArchitectureDemo.vue': () => import('./components/appendix/gateway-proxy/NginxArchitectureDemo.vue'),
  './components/appendix/gateway-proxy/RoutingRulesDemo.vue': () => import('./components/appendix/gateway-proxy/RoutingRulesDemo.vue'),
  './components/appendix/gateway-proxy/RateLimitingDemo.vue': () => import('./components/appendix/gateway-proxy/RateLimitingDemo.vue'),
  './components/appendix/gateway-proxy/AuthMiddlewareDemo.vue': () => import('./components/appendix/gateway-proxy/AuthMiddlewareDemo.vue'),
  './components/appendix/gateway-proxy/LoadBalancingDemo.vue': () => import('./components/appendix/gateway-proxy/LoadBalancingDemo.vue'),
  './components/appendix/gateway-proxy/SslTerminationDemo.vue': () => import('./components/appendix/gateway-proxy/SslTerminationDemo.vue'),
  './components/appendix/load-balancing/LoadBalancerTypesDemo.vue': () => import('./components/appendix/load-balancing/LoadBalancerTypesDemo.vue'),
  './components/appendix/load-balancing/HealthCheckDemo.vue': () => import('./components/appendix/load-balancing/HealthCheckDemo.vue'),
  './components/appendix/load-balancing/SessionPersistenceDemo.vue': () => import('./components/appendix/load-balancing/SessionPersistenceDemo.vue'),
  './components/appendix/load-balancing/WeightedRoutingDemo.vue': () => import('./components/appendix/load-balancing/WeightedRoutingDemo.vue'),
  './components/appendix/load-balancing/BlueGreenDeploymentDemo.vue': () => import('./components/appendix/load-balancing/BlueGreenDeploymentDemo.vue'),
  './components/appendix/load-balancing/CanaryReleaseDemo.vue': () => import('./components/appendix/load-balancing/CanaryReleaseDemo.vue'),
  './components/appendix/load-balancing/AutoScalingDemo.vue': () => import('./components/appendix/load-balancing/AutoScalingDemo.vue'),
  './components/appendix/load-balancing/MultiRegionDemo.vue': () => import('./components/appendix/load-balancing/MultiRegionDemo.vue'),
  './components/appendix/backend-layered-architecture/LayeredArchitectureDemo.vue': () => import('./components/appendix/backend-layered-architecture/LayeredArchitectureDemo.vue'),
  './components/appendix/backend-layered-architecture/ControllerLayerDemo.vue': () => import('./components/appendix/backend-layered-architecture/ControllerLayerDemo.vue'),
  './components/appendix/backend-layered-architecture/ServiceLayerDemo.vue': () => import('./components/appendix/backend-layered-architecture/ServiceLayerDemo.vue'),
  './components/appendix/backend-layered-architecture/RepositoryLayerDemo.vue': () => import('./components/appendix/backend-layered-architecture/RepositoryLayerDemo.vue'),
  './components/appendix/backend-layered-architecture/DomainModelDemo.vue': () => import('./components/appendix/backend-layered-architecture/DomainModelDemo.vue'),
  './components/appendix/backend-layered-architecture/DtoFlowDemo.vue': () => import('./components/appendix/backend-layered-architecture/DtoFlowDemo.vue'),
  './components/appendix/backend-layered-architecture/DependencyDirectionDemo.vue': () => import('./components/appendix/backend-layered-architecture/DependencyDirectionDemo.vue'),
  './components/appendix/backend-layered-architecture/CleanArchitectureDemo.vue': () => import('./components/appendix/backend-layered-architecture/CleanArchitectureDemo.vue'),
  './components/appendix/browser-rendering-pipeline/DomToRenderTreeDemo.vue': () => import('./components/appendix/browser-rendering-pipeline/DomToRenderTreeDemo.vue'),
  './components/appendix/browser-rendering-pipeline/LayoutReflowDemo.vue': () => import('./components/appendix/browser-rendering-pipeline/LayoutReflowDemo.vue'),
  './components/appendix/browser-rendering-pipeline/PaintLayerDemo.vue': () => import('./components/appendix/browser-rendering-pipeline/PaintLayerDemo.vue'),
  './components/appendix/browser-rendering-pipeline/CompositeDemo.vue': () => import('./components/appendix/browser-rendering-pipeline/CompositeDemo.vue'),
  './components/appendix/browser-rendering-pipeline/MacroMicroTaskDemo.vue': () => import('./components/appendix/browser-rendering-pipeline/MacroMicroTaskDemo.vue'),
  './components/appendix/browser-rendering-pipeline/RenderingPerformanceDemo.vue': () => import('./components/appendix/browser-rendering-pipeline/RenderingPerformanceDemo.vue'),
  './components/appendix/browser-rendering-pipeline/RenderingPipelineDemo.vue': () => import('./components/appendix/browser-rendering-pipeline/RenderingPipelineDemo.vue'),
  './components/appendix/javascript-intro/JSEventLoopDemo.vue': () => import('./components/appendix/javascript-intro/JSEventLoopDemo.vue'),
  './components/appendix/cache-design/CacheArchitectureOverview.vue': () => import('./components/appendix/cache-design/CacheArchitectureOverview.vue'),
  './components/appendix/cache-design/CacheHierarchyDemo.vue': () => import('./components/appendix/cache-design/CacheHierarchyDemo.vue'),
  './components/appendix/cache-design/CachePatternComparisonDemo.vue': () => import('./components/appendix/cache-design/CachePatternComparisonDemo.vue'),
  './components/appendix/cache-design/EcommerceCacheArchitectureDemo.vue': () => import('./components/appendix/cache-design/EcommerceCacheArchitectureDemo.vue'),
  './components/appendix/cache-design/CacheMonitoringDashboardDemo.vue': () => import('./components/appendix/cache-design/CacheMonitoringDashboardDemo.vue'),
  './components/appendix/cache-design/CachePerformanceComparisonDemo.vue': () => import('./components/appendix/cache-design/CachePerformanceComparisonDemo.vue'),
  './components/appendix/cache-design/CacheConsistencyDemo.vue': () => import('./components/appendix/cache-design/CacheConsistencyDemo.vue'),
  './components/appendix/cloud-storage-cdn/EdgeNodeDistributionDemo.vue': () => import('./components/appendix/cloud-storage-cdn/EdgeNodeDistributionDemo.vue'),
  './components/appendix/cloud-storage-cdn/CachePolicyDemo.vue': () => import('./components/appendix/cloud-storage-cdn/CachePolicyDemo.vue'),
  './components/appendix/cloud-storage-cdn/TrafficSchedulingDemo.vue': () => import('./components/appendix/cloud-storage-cdn/TrafficSchedulingDemo.vue'),
  './components/appendix/cloud-storage-cdn/HttpsOptimizationDemo.vue': () => import('./components/appendix/cloud-storage-cdn/HttpsOptimizationDemo.vue'),
  './components/appendix/cloud-storage-cdn/AccessAnalyticsDemo.vue': () => import('./components/appendix/cloud-storage-cdn/AccessAnalyticsDemo.vue'),
  './components/appendix/cloud-storage-cdn/ObjectStorageDemo.vue': () => import('./components/appendix/cloud-storage-cdn/ObjectStorageDemo.vue'),
  './components/appendix/cloud-storage-cdn/CdnAccelerationDemo.vue': () => import('./components/appendix/cloud-storage-cdn/CdnAccelerationDemo.vue'),
  './components/appendix/cloud-storage-cdn/UploadProcessDemo.vue': () => import('./components/appendix/cloud-storage-cdn/UploadProcessDemo.vue'),
  './components/appendix/api-design/ApiRequestDemo.vue': () => import('./components/appendix/api-design/ApiRequestDemo.vue'),
  './components/appendix/api-design/RestfulUrlDemo.vue': () => import('./components/appendix/api-design/RestfulUrlDemo.vue'),
  './components/appendix/api-design/StatusCodeDemo.vue': () => import('./components/appendix/api-design/StatusCodeDemo.vue'),
  './components/appendix/api-design/ErrorHandlingDemo.vue': () => import('./components/appendix/api-design/ErrorHandlingDemo.vue'),
  './components/appendix/api-design/ApiVersioningDemo.vue': () => import('./components/appendix/api-design/ApiVersioningDemo.vue'),
  './components/appendix/api-design/ApiStyleCompare.vue': () => import('./components/appendix/api-design/ApiStyleCompare.vue'),
  './components/appendix/api-design/ResponseStructureDemo.vue': () => import('./components/appendix/api-design/ResponseStructureDemo.vue'),
  './components/appendix/api-design/DataFieldDesignDemo.vue': () => import('./components/appendix/api-design/DataFieldDesignDemo.vue'),
  './components/appendix/api-design/ErrorResponseDesignDemo.vue': () => import('./components/appendix/api-design/ErrorResponseDesignDemo.vue'),
  './components/appendix/database-intro/DatabaseEvolutionDemo.vue': () => import('./components/appendix/database-intro/DatabaseEvolutionDemo.vue'),
  './components/appendix/database-intro/DatabaseRelationDemo.vue': () => import('./components/appendix/database-intro/DatabaseRelationDemo.vue'),
  './components/appendix/database-intro/BPlusTreeDemo.vue': () => import('./components/appendix/database-intro/BPlusTreeDemo.vue'),
  './components/appendix/database-intro/TransactionACIDDemo.vue': () => import('./components/appendix/database-intro/TransactionACIDDemo.vue'),
  './components/appendix/database-intro/QueryOptimizationDemo.vue': () => import('./components/appendix/database-intro/QueryOptimizationDemo.vue'),
  './components/appendix/queue-design/MQArchitectureDemo.vue': () => import('./components/appendix/queue-design/MQArchitectureDemo.vue'),
  './components/appendix/queue-design/ProducerConsumerDemo.vue': () => import('./components/appendix/queue-design/ProducerConsumerDemo.vue'),
  './components/appendix/queue-design/ReliabilityDemo.vue': () => import('./components/appendix/queue-design/ReliabilityDemo.vue'),
  './components/appendix/queue-design/IdempotenceDemo.vue': () => import('./components/appendix/queue-design/IdempotenceDemo.vue'),
  './components/appendix/queue-design/MQComparisonDemo.vue': () => import('./components/appendix/queue-design/MQComparisonDemo.vue'),
  './components/appendix/javascript-intro/VariableBoxDemo.vue': () => import('./components/appendix/javascript-intro/VariableBoxDemo.vue'),
  './components/appendix/javascript-intro/ReferenceDemo.vue': () => import('./components/appendix/javascript-intro/ReferenceDemo.vue'),
  './components/appendix/javascript-intro/FunctionMachineDemo.vue': () => import('./components/appendix/javascript-intro/FunctionMachineDemo.vue'),
  './components/appendix/javascript-intro/ScopeDemo.vue': () => import('./components/appendix/javascript-intro/ScopeDemo.vue'),
  './components/appendix/javascript-intro/VariableScopeDemo.vue': () => import('./components/appendix/javascript-intro/VariableScopeDemo.vue'),
  './components/appendix/javascript-intro/DataTypeDemo.vue': () => import('./components/appendix/javascript-intro/DataTypeDemo.vue'),
  './components/appendix/javascript-intro/ClosureDemo.vue': () => import('./components/appendix/javascript-intro/ClosureDemo.vue'),
  './components/appendix/javascript-intro/ThisContextDemo.vue': () => import('./components/appendix/javascript-intro/ThisContextDemo.vue'),
  './components/appendix/javascript-intro/PrototypeDemo.vue': () => import('./components/appendix/javascript-intro/PrototypeDemo.vue'),
  './components/appendix/javascript-intro/AsyncDemo.vue': () => import('./components/appendix/javascript-intro/AsyncDemo.vue'),
  './components/appendix/javascript-intro/DOMTreeDemo.vue': () => import('./components/appendix/javascript-intro/DOMTreeDemo.vue'),
  './components/appendix/javascript-intro/AsyncRestaurantDemo.vue': () => import('./components/appendix/javascript-intro/AsyncRestaurantDemo.vue'),
  './components/appendix/js-runtime/RuntimeEnvironmentDemo.vue': () => import('./components/appendix/js-runtime/RuntimeEnvironmentDemo.vue'),
  './components/appendix/js-runtime/CallStackDemo.vue': () => import('./components/appendix/js-runtime/CallStackDemo.vue'),
  './components/appendix/js-runtime/TaskQueueDemo.vue': () => import('./components/appendix/js-runtime/TaskQueueDemo.vue'),
  './components/appendix/js-runtime/MemoryLeakDemo.vue': () => import('./components/appendix/js-runtime/MemoryLeakDemo.vue'),
  './components/appendix/js-runtime/GarbageCollectionDemo.vue': () => import('./components/appendix/js-runtime/GarbageCollectionDemo.vue'),
  './components/appendix/development-tools/EnvVarOverviewDemo.vue': () => import('./components/appendix/development-tools/EnvVarOverviewDemo.vue'),
  './components/appendix/development-tools/PathSearchDemo.vue': () => import('./components/appendix/development-tools/PathSearchDemo.vue'),
  './components/appendix/development-tools/EnvScopeDemo.vue': () => import('./components/appendix/development-tools/EnvScopeDemo.vue'),
  './components/appendix/development-tools/EnvExportDemo.vue': () => import('./components/appendix/development-tools/EnvExportDemo.vue'),
  './components/appendix/development-tools/ApiKeyDangerDemo.vue': () => import('./components/appendix/development-tools/ApiKeyDangerDemo.vue'),
  './components/appendix/development-tools/DotEnvDemo.vue': () => import('./components/appendix/development-tools/DotEnvDemo.vue'),
  './components/appendix/development-tools/ServerSecretDemo.vue': () => import('./components/appendix/development-tools/ServerSecretDemo.vue'),
  './components/appendix/ports-localhost/PortAnalogyDemo.vue': () => import('./components/appendix/ports-localhost/PortAnalogyDemo.vue'),
  './components/appendix/ports-localhost/LocalhostLoopbackDemo.vue': () => import('./components/appendix/ports-localhost/LocalhostLoopbackDemo.vue'),
  './components/appendix/ports-localhost/PortConflictDemo.vue': () => import('./components/appendix/ports-localhost/PortConflictDemo.vue'),
  './components/appendix/ports-localhost/CommonPortsDemo.vue': () => import('./components/appendix/ports-localhost/CommonPortsDemo.vue'),
  './components/appendix/ports-localhost/DevServerFlowDemo.vue': () => import('./components/appendix/ports-localhost/DevServerFlowDemo.vue'),
  './components/appendix/ports-localhost/PortTroubleshootDemo.vue': () => import('./components/appendix/ports-localhost/PortTroubleshootDemo.vue'),
  './components/appendix/development-tools/PackageManagerOverviewDemo.vue': () => import('./components/appendix/development-tools/PackageManagerOverviewDemo.vue'),
  './components/appendix/development-tools/PackageInstallDemo.vue': () => import('./components/appendix/development-tools/PackageInstallDemo.vue'),
  './components/appendix/development-tools/DependencyTreeDemo.vue': () => import('./components/appendix/development-tools/DependencyTreeDemo.vue'),
  './components/appendix/development-tools/SSHAuthDemo.vue': () => import('./components/appendix/development-tools/SSHAuthDemo.vue'),
  './components/appendix/development-tools/RegexDemo.vue': () => import('./components/appendix/development-tools/RegexDemo.vue'),
  './components/appendix/typescript-intro/TypeAnnotationDemo.vue': () => import('./components/appendix/typescript-intro/TypeAnnotationDemo.vue'),
  './components/appendix/typescript-intro/InterfaceDemo.vue': () => import('./components/appendix/typescript-intro/InterfaceDemo.vue'),
  './components/appendix/typescript-intro/GenericDemo.vue': () => import('./components/appendix/typescript-intro/GenericDemo.vue'),
  './components/appendix/typescript-intro/TypeInferenceDemo.vue': () => import('./components/appendix/typescript-intro/TypeInferenceDemo.vue'),
  './components/appendix/server-backend/SerializationDemo.vue': () => import('./components/appendix/server-backend/SerializationDemo.vue'),
  './components/appendix/server-backend/HttpProtocolDemo.vue': () => import('./components/appendix/server-backend/HttpProtocolDemo.vue'),
  './components/appendix/data/SqlDemo.vue': () => import('./components/appendix/data/SqlDemo.vue'),
  './components/appendix/data/DataModelsDemo.vue': () => import('./components/appendix/data/DataModelsDemo.vue'),
  './components/appendix/data/ABTestingDemo.vue': () => import('./components/appendix/data/ABTestingDemo.vue'),
  './components/appendix/data/DescriptiveStatsDemo.vue': () => import('./components/appendix/data/DescriptiveStatsDemo.vue'),
  './components/appendix/data/DataAggregationDemo.vue': () => import('./components/appendix/data/DataAggregationDemo.vue'),
  './components/appendix/data/FunnelAnalysisDemo.vue': () => import('./components/appendix/data/FunnelAnalysisDemo.vue'),
  './components/appendix/data/RetentionAnalysisDemo.vue': () => import('./components/appendix/data/RetentionAnalysisDemo.vue'),
  './components/appendix/data/DataTrackingDemo.vue': () => import('./components/appendix/data/DataTrackingDemo.vue'),
  './components/appendix/engineering-excellence/CodeSmellDemo.vue': () => import('./components/appendix/engineering-excellence/CodeSmellDemo.vue'),
  './components/appendix/engineering-excellence/RefactoringDemo.vue': () => import('./components/appendix/engineering-excellence/RefactoringDemo.vue'),
  './components/appendix/engineering-excellence/TestPyramidDemo.vue': () => import('./components/appendix/engineering-excellence/TestPyramidDemo.vue'),
  './components/appendix/engineering-excellence/TDDCycleDemo.vue': () => import('./components/appendix/engineering-excellence/TDDCycleDemo.vue'),
  './components/appendix/engineering-excellence/DesignPatternCatalogDemo.vue': () => import('./components/appendix/engineering-excellence/DesignPatternCatalogDemo.vue'),
  './components/appendix/engineering-excellence/PatternPlaygroundDemo.vue': () => import('./components/appendix/engineering-excellence/PatternPlaygroundDemo.vue'),
  './components/appendix/engineering-excellence/WebSecurityDemo.vue': () => import('./components/appendix/engineering-excellence/WebSecurityDemo.vue'),
  './components/appendix/engineering-excellence/SecurityChecklistDemo.vue': () => import('./components/appendix/engineering-excellence/SecurityChecklistDemo.vue'),
  './components/appendix/engineering-excellence/DocStructureDemo.vue': () => import('./components/appendix/engineering-excellence/DocStructureDemo.vue'),
  './components/appendix/engineering-excellence/TechWritingPracticeDemo.vue': () => import('./components/appendix/engineering-excellence/TechWritingPracticeDemo.vue'),
  './components/appendix/engineering-excellence/OpenSourceWorkflowDemo.vue': () => import('./components/appendix/engineering-excellence/OpenSourceWorkflowDemo.vue'),
  './components/appendix/engineering-excellence/LicenseComparisonDemo.vue': () => import('./components/appendix/engineering-excellence/LicenseComparisonDemo.vue'),
  './components/appendix/engineering-excellence/TechRadarDemo.vue': () => import('./components/appendix/engineering-excellence/TechRadarDemo.vue'),
  './components/appendix/engineering-excellence/DecisionMatrixDemo.vue': () => import('./components/appendix/engineering-excellence/DecisionMatrixDemo.vue'),
  './components/appendix/rag/RAGPipelineDemo.vue': () => import('./components/appendix/rag/RAGPipelineDemo.vue'),
  './components/appendix/rag/ChunkingStrategyDemo.vue': () => import('./components/appendix/rag/ChunkingStrategyDemo.vue'),
  './components/appendix/rag/RetrievalDemo.vue': () => import('./components/appendix/rag/RetrievalDemo.vue'),
  './components/appendix/rag/RAGArchitectureDemo.vue': () => import('./components/appendix/rag/RAGArchitectureDemo.vue'),
  './components/appendix/rag/RAGvsFineTuningDemo.vue': () => import('./components/appendix/rag/RAGvsFineTuningDemo.vue'),
  './components/appendix/embedding-vector/EmbeddingConceptDemo.vue': () => import('./components/appendix/embedding-vector/EmbeddingConceptDemo.vue'),
  './components/appendix/embedding-vector/VectorSimilarityDemo.vue': () => import('./components/appendix/embedding-vector/VectorSimilarityDemo.vue'),
  './components/appendix/embedding-vector/VectorIndexDemo.vue': () => import('./components/appendix/embedding-vector/VectorIndexDemo.vue'),
  './components/appendix/embedding-vector/VectorDatabaseDemo.vue': () => import('./components/appendix/embedding-vector/VectorDatabaseDemo.vue'),
  './components/appendix/embedding-vector/EmbeddingPipelineDemo.vue': () => import('./components/appendix/embedding-vector/EmbeddingPipelineDemo.vue'),
  './components/appendix/ai-native-app/AINativeArchDemo.vue': () => import('./components/appendix/ai-native-app/AINativeArchDemo.vue'),
  './components/appendix/ai-native-app/AIDesignPrincipleDemo.vue': () => import('./components/appendix/ai-native-app/AIDesignPrincipleDemo.vue'),
  './components/appendix/ai-native-app/PromptDesignDemo.vue': () => import('./components/appendix/ai-native-app/PromptDesignDemo.vue'),
  './components/appendix/ai-native-app/AIUXPatternDemo.vue': () => import('./components/appendix/ai-native-app/AIUXPatternDemo.vue'),
  './components/appendix/ai-native-app/AIAppFlowDemo.vue': () => import('./components/appendix/ai-native-app/AIAppFlowDemo.vue'),
  './components/appendix/infrastructure-as-code/IaCConceptDemo.vue': () => import('./components/appendix/infrastructure-as-code/IaCConceptDemo.vue'),
  './components/appendix/infrastructure-as-code/TerraformWorkflowDemo.vue': () => import('./components/appendix/infrastructure-as-code/TerraformWorkflowDemo.vue'),
  './components/appendix/infrastructure-as-code/IaCToolComparisonDemo.vue': () => import('./components/appendix/infrastructure-as-code/IaCToolComparisonDemo.vue'),
  './components/appendix/infrastructure-as-code/ConfigDriftDemo.vue': () => import('./components/appendix/infrastructure-as-code/ConfigDriftDemo.vue'),
  './components/appendix/infrastructure-as-code/IaCBestPracticeDemo.vue': () => import('./components/appendix/infrastructure-as-code/IaCBestPracticeDemo.vue'),
  './components/appendix/dns-https/DnsResolutionDemo.vue': () => import('./components/appendix/dns-https/DnsResolutionDemo.vue'),
  './components/appendix/dns-https/DnsRecordTypeDemo.vue': () => import('./components/appendix/dns-https/DnsRecordTypeDemo.vue'),
  './components/appendix/dns-https/HttpsHandshakeDemo.vue': () => import('./components/appendix/dns-https/HttpsHandshakeDemo.vue'),
  './components/appendix/dns-https/CertificateChainDemo.vue': () => import('./components/appendix/dns-https/CertificateChainDemo.vue'),
  './components/appendix/dns-https/DnsHttpsComparisonDemo.vue': () => import('./components/appendix/dns-https/DnsHttpsComparisonDemo.vue'),
  './components/appendix/model-finetuning/FinetuningPipelineDemo.vue': () => import('./components/appendix/model-finetuning/FinetuningPipelineDemo.vue'),
  './components/appendix/model-finetuning/TrainingDataDemo.vue': () => import('./components/appendix/model-finetuning/TrainingDataDemo.vue'),
  './components/appendix/model-finetuning/LoRADemo.vue': () => import('./components/appendix/model-finetuning/LoRADemo.vue'),
  './components/appendix/model-finetuning/ModelQuantizationDemo.vue': () => import('./components/appendix/model-finetuning/ModelQuantizationDemo.vue'),
  './components/appendix/model-finetuning/ModelServingDemo.vue': () => import('./components/appendix/model-finetuning/ModelServingDemo.vue'),
  './components/appendix/incident-response/SeverityLevelDemo.vue': () => import('./components/appendix/incident-response/SeverityLevelDemo.vue'),
  './components/appendix/incident-response/IncidentTimelineDemo.vue': () => import('./components/appendix/incident-response/IncidentTimelineDemo.vue'),
  './components/appendix/incident-response/IncidentCommandDemo.vue': () => import('./components/appendix/incident-response/IncidentCommandDemo.vue'),
  './components/appendix/incident-response/AlertEscalationDemo.vue': () => import('./components/appendix/incident-response/AlertEscalationDemo.vue'),
  './components/appendix/incident-response/PostmortemDemo.vue': () => import('./components/appendix/incident-response/PostmortemDemo.vue'),
  './components/appendix/async-task-queues/AsyncTaskFlowDemo.vue': () => import('./components/appendix/async-task-queues/AsyncTaskFlowDemo.vue'),
  './components/appendix/async-task-queues/TaskWorkerDemo.vue': () => import('./components/appendix/async-task-queues/TaskWorkerDemo.vue'),
  './components/appendix/async-task-queues/TaskRetryDemo.vue': () => import('./components/appendix/async-task-queues/TaskRetryDemo.vue'),
  './components/appendix/async-task-queues/AsyncComparisonDemo.vue': () => import('./components/appendix/async-task-queues/AsyncComparisonDemo.vue'),
  './components/appendix/file-storage/FileStorageTypeDemo.vue': () => import('./components/appendix/file-storage/FileStorageTypeDemo.vue'),
  './components/appendix/file-storage/FileUploadFlowDemo.vue': () => import('./components/appendix/file-storage/FileUploadFlowDemo.vue'),
  './components/appendix/file-storage/CDNAccelerationDemo.vue': () => import('./components/appendix/file-storage/CDNAccelerationDemo.vue'),
  './components/appendix/rate-limiting/RateLimitAlgorithmDemo.vue': () => import('./components/appendix/rate-limiting/RateLimitAlgorithmDemo.vue'),
  './components/appendix/rate-limiting/BackpressureDemo.vue': () => import('./components/appendix/rate-limiting/BackpressureDemo.vue'),
  './components/appendix/search-engines/InvertedIndexDemo.vue': () => import('./components/appendix/search-engines/InvertedIndexDemo.vue'),
  './components/appendix/search-engines/SearchRelevanceDemo.vue': () => import('./components/appendix/search-engines/SearchRelevanceDemo.vue'),
  './components/appendix/data-visualization/ChartTypeSelectorDemo.vue': () => import('./components/appendix/data-visualization/ChartTypeSelectorDemo.vue'),
  './components/appendix/data-visualization/DashboardLayoutDemo.vue': () => import('./components/appendix/data-visualization/DashboardLayoutDemo.vue'),
  './components/appendix/data-governance/DataQualityDemo.vue': () => import('./components/appendix/data-governance/DataQualityDemo.vue'),
  './components/appendix/data-governance/DataGovernanceFrameworkDemo.vue': () => import('./components/appendix/data-governance/DataGovernanceFrameworkDemo.vue'),
  './components/appendix/data-governance/DataLineageDemo.vue': () => import('./components/appendix/data-governance/DataLineageDemo.vue'),
  './components/appendix/distributed-systems/CAPTheoremDemo.vue': () => import('./components/appendix/distributed-systems/CAPTheoremDemo.vue'),
  './components/appendix/distributed-systems/ConsistencyModelsDemo.vue': () => import('./components/appendix/distributed-systems/ConsistencyModelsDemo.vue'),
  './components/appendix/distributed-systems/DistributedChallengesDemo.vue': () => import('./components/appendix/distributed-systems/DistributedChallengesDemo.vue'),
  './components/appendix/high-availability/AvailabilityCalculatorDemo.vue': () => import('./components/appendix/high-availability/AvailabilityCalculatorDemo.vue'),
  './components/appendix/high-availability/FailoverStrategyDemo.vue': () => import('./components/appendix/high-availability/FailoverStrategyDemo.vue'),
  './components/appendix/monolith-to-microservices/ArchEvolutionDemo.vue': () => import('./components/appendix/monolith-to-microservices/ArchEvolutionDemo.vue'),
  './components/appendix/system-design-methodology/SystemDesignStepsDemo.vue': () => import('./components/appendix/system-design-methodology/SystemDesignStepsDemo.vue'),
  './components/appendix/system-design-methodology/CapacityEstimationDemo.vue': () => import('./components/appendix/system-design-methodology/CapacityEstimationDemo.vue'),
  './components/appendix/docker-containers/DockerArchitectureDemo.vue': () => import('./components/appendix/docker-containers/DockerArchitectureDemo.vue'),
  './components/appendix/docker-containers/DockerLifecycleDemo.vue': () => import('./components/appendix/docker-containers/DockerLifecycleDemo.vue'),
  './components/appendix/linux-basics/LinuxFileSystemDemo.vue': () => import('./components/appendix/linux-basics/LinuxFileSystemDemo.vue'),
  './components/appendix/linux-basics/LinuxCommandDemo.vue': () => import('./components/appendix/linux-basics/LinuxCommandDemo.vue'),
  './components/appendix/linux-basics/LinuxPermissionsDemo.vue': () => import('./components/appendix/linux-basics/LinuxPermissionsDemo.vue'),
  './components/appendix/kubernetes/K8sArchitectureDemo.vue': () => import('./components/appendix/kubernetes/K8sArchitectureDemo.vue'),
  './components/appendix/kubernetes/K8sWorkloadsDemo.vue': () => import('./components/appendix/kubernetes/K8sWorkloadsDemo.vue'),
  './components/appendix/neural-networks/NeuronDemo.vue': () => import('./components/appendix/neural-networks/NeuronDemo.vue'),
  './components/appendix/neural-networks/NetworkLayersDemo.vue': () => import('./components/appendix/neural-networks/NetworkLayersDemo.vue'),
  './components/appendix/neural-networks/NetworkArchitectureDemo.vue': () => import('./components/appendix/neural-networks/NetworkArchitectureDemo.vue'),
  './components/appendix/project-architecture/ArchitectureComparisonDemo.vue': () => import('./components/appendix/project-architecture/ArchitectureComparisonDemo.vue')
}
const appendixComponentRegistrations = [
  ['WebTerminal', './components/appendix/terminal-intro/WebTerminal.vue'],
  ['TerminalGrid', './components/appendix/terminal-intro/TerminalGrid.vue'],
  ['CellInspector', './components/appendix/terminal-intro/CellInspector.vue'],
  ['EscapeSequences', './components/appendix/terminal-intro/EscapeSequences.vue'],
  ['EscapeParserDemo', './components/appendix/terminal-intro/EscapeParserDemo.vue'],
  ['CookedRawDemo', './components/appendix/terminal-intro/CookedRawDemo.vue'],
  ['InputVisualizer', './components/appendix/terminal-intro/InputVisualizer.vue'],
  ['SignalsDemo', './components/appendix/terminal-intro/SignalsDemo.vue'],
  ['FlowDiagram', './components/appendix/terminal-intro/FlowDiagram.vue'],
  ['BufferSwitchDemo', './components/appendix/terminal-intro/BufferSwitchDemo.vue'],
  ['AdvancedTUIDemo', './components/appendix/terminal-intro/AdvancedTUIDemo.vue'],
  ['ArchitectureDemo', './components/appendix/terminal-intro/ArchitectureDemo.vue'],
  ['TerminalDefinition', './components/appendix/terminal-intro/TerminalDefinition.vue'],
  ['TerminalOSDemo', './components/appendix/terminal-intro/TerminalOSDemo.vue'],
  ['TerminalHandsOn', './components/appendix/terminal-intro/TerminalHandsOn.vue'],
  ['ApiQuickStartDemo', './components/appendix/api-intro/ApiQuickStartDemo.vue'],
  ['ApiConceptDemo', './components/appendix/api-intro/ApiConceptDemo.vue'],
  ['RequestResponseFlow', './components/appendix/api-intro/RequestResponseFlow.vue'],
  ['ApiMethodDemo', './components/appendix/api-intro/ApiMethodDemo.vue'],
  ['ApiDocumentDemo', './components/appendix/api-intro/ApiDocumentDemo.vue'],
  ['ApiPlayground', './components/appendix/api-intro/ApiPlayground.vue'],
  ['RealWorldApiDemo', './components/appendix/api-intro/RealWorldApiDemo.vue'],
  ['FunctionApiDemo', './components/appendix/api-intro/FunctionApiDemo.vue'],
  ['ApiTypesComparison', './components/appendix/api-intro/ApiTypesComparison.vue'],
  ['ApiFunctionVsHttp', './components/appendix/api-intro/ApiFunctionVsHttp.vue'],
  ['DocumentTypesComparison', './components/appendix/api-intro/DocumentTypesComparison.vue'],
  ['HttpMethodsDemo', './components/appendix/api-intro/HttpMethodsDemo.vue'],
  ['StatusCodeCategories', './components/appendix/api-intro/StatusCodeCategories.vue'],
  ['EmbeddingDemo', './components/appendix/llm-intro/EmbeddingDemo.vue'],
  ['LinearAttentionDemo', './components/appendix/llm-intro/LinearAttentionDemo.vue'],
  ['LlmQuickStartDemo', './components/appendix/llm-intro/LlmQuickStartDemo.vue'],
  ['MoEDemo', './components/appendix/llm-intro/MoEDemo.vue'],
  ['NextTokenPrediction', './components/appendix/llm-intro/NextTokenPrediction.vue'],
  ['RNNvsTransformer', './components/appendix/llm-intro/RNNvsTransformer.vue'],
  ['ThinkingModelDemo', './components/appendix/llm-intro/ThinkingModelDemo.vue'],
  ['TokenizationDemo', './components/appendix/llm-intro/TokenizationDemo.vue'],
  ['TokenizerToMatrix', './components/appendix/llm-intro/TokenizerToMatrix.vue'],
  ['TrainingInferenceDemo', './components/appendix/llm-intro/TrainingInferenceDemo.vue'],
  ['AttentionDemo', './components/appendix/vlm-intro/AttentionDemo.vue'],
  ['FeatureAlignmentDemo', './components/appendix/vlm-intro/FeatureAlignmentDemo.vue'],
  ['LinearProjectionDemo', './components/appendix/vlm-intro/LinearProjectionDemo.vue'],
  ['ModelArchitectureComparisonDemo', './components/appendix/vlm-intro/ModelArchitectureComparisonDemo.vue'],
  ['PatchifyDemo', './components/appendix/vlm-intro/PatchifyDemo.vue'],
  ['PositionalEmbeddingDemo', './components/appendix/vlm-intro/PositionalEmbeddingDemo.vue'],
  ['ProjectorDemo', './components/appendix/vlm-intro/ProjectorDemo.vue'],
  ['TrainingPipelineDemo', './components/appendix/vlm-intro/TrainingPipelineDemo.vue'],
  ['VLMInferenceDemo', './components/appendix/vlm-intro/VLMInferenceDemo.vue'],
  ['ViTOutputDemo', './components/appendix/vlm-intro/ViTOutputDemo.vue'],
  ['VlmQuickStartDemo', './components/appendix/vlm-intro/VlmQuickStartDemo.vue'],
  ['ImageGenArchitecture', './components/appendix/image-gen-intro/ImageGenArchitecture.vue'],
  ['LatentSpaceViz', './components/appendix/image-gen-intro/LatentSpaceViz.vue'],
  ['DiffusionProcessDemo', './components/appendix/image-gen-intro/DiffusionProcessDemo.vue'],
  ['FlowMatchingDemo', './components/appendix/image-gen-intro/FlowMatchingDemo.vue'],
  ['PromptVisualizer', './components/appendix/image-gen-intro/PromptVisualizer.vue'],
  ['ImageGenQuickStartDemo', './components/appendix/image-gen-intro/ImageGenQuickStartDemo.vue'],
  ['AudioWaveformDemo', './components/appendix/audio-intro/AudioWaveformDemo.vue'],
  ['AudioTokenizationDemo', './components/appendix/audio-intro/AudioTokenizationDemo.vue'],
  ['SpectrogramViz', './components/appendix/audio-intro/SpectrogramViz.vue'],
  ['AutoregressiveAudioDemo', './components/appendix/audio-intro/AutoregressiveAudioDemo.vue'],
  ['AudioQuickStartDemo', './components/appendix/audio-intro/AudioQuickStartDemo.vue'],
  ['MelSpectrogramDemo', './components/appendix/audio-intro/MelSpectrogramDemo.vue'],
  ['TTSPipelineDemo', './components/appendix/audio-intro/TTSPipelineDemo.vue'],
  ['VoiceCloningDemo', './components/appendix/audio-intro/VoiceCloningDemo.vue'],
  ['ASRvsTTSDemo', './components/appendix/audio-intro/ASRvsTTSDemo.vue'],
  ['EmotionControlDemo', './components/appendix/audio-intro/EmotionControlDemo.vue'],
  ['WebTechTriad', './components/appendix/web-basics/WebTechTriad.vue'],
  ['UrlToBrowserDemo', './components/appendix/web-basics/UrlToBrowserDemo.vue'],
  ['UrlToBrowserQuickStart', './components/appendix/url-to-browser/UrlToBrowserQuickStart.vue'],
  ['GitCommitFlow', './components/appendix/git-intro/GitCommitFlow.vue'],
  ['GitBranchVisual', './components/appendix/git-intro/GitBranchVisual.vue'],
  ['GitSyncDemo', './components/appendix/git-intro/GitSyncDemo.vue'],
  ['GitCommandCheatsheet', './components/appendix/git-intro/GitCommandCheatsheet.vue'],
  ['NetworkLayers', './components/appendix/web-basics/NetworkLayers.vue'],
  ['TcpUdpComparison', './components/appendix/web-basics/TcpUdpComparison.vue'],
  ['SubnetCalculator', './components/appendix/web-basics/SubnetCalculator.vue'],
  ['NetworkTroubleshooting', './components/appendix/web-basics/NetworkTroubleshooting.vue'],
  ['TransistorDemo', './components/appendix/computer-fundamentals/TransistorDemo.vue'],
  ['LogicGateDemo', './components/appendix/computer-fundamentals/LogicGateDemo.vue'],
  ['BinaryAdditionRulesDemo', './components/appendix/computer-fundamentals/BinaryAdditionRulesDemo.vue'],
  ['HalfAdderDemo', './components/appendix/computer-fundamentals/HalfAdderDemo.vue'],
  ['FullAdderDemo', './components/appendix/computer-fundamentals/FullAdderDemo.vue'],
  ['AdderDemo', './components/appendix/computer-fundamentals/AdderDemo.vue'],
  ['AdderChainDemo', './components/appendix/computer-fundamentals/AdderChainDemo.vue'],
  ['CompleteAdderDemo', './components/appendix/computer-fundamentals/CompleteAdderDemo.vue'],
  ['FunctionalUnitDemo', './components/appendix/computer-fundamentals/FunctionalUnitDemo.vue'],
  ['CpuArchitectureDemo', './components/appendix/computer-fundamentals/CpuArchitectureDemo.vue'],
  ['MinCpuDemo', './components/appendix/computer-fundamentals/MinCpuDemo.vue'],
  ['RegisterDemo', './components/appendix/computer-fundamentals/RegisterDemo.vue'],
  ['PipelineDemo', './components/appendix/computer-fundamentals/PipelineDemo.vue'],
  ['ControllerDemo', './components/appendix/computer-fundamentals/ControllerDemo.vue'],
  ['BusSystemDemo', './components/appendix/computer-fundamentals/BusSystemDemo.vue'],
  ['InstructionFormatDemo', './components/appendix/computer-fundamentals/InstructionFormatDemo.vue'],
  ['AddressingModeDemo', './components/appendix/computer-fundamentals/AddressingModeDemo.vue'],
  ['CacheDemo', './components/appendix/computer-fundamentals/CacheDemo.vue'],
  ['IOMethodDemo', './components/appendix/computer-fundamentals/IOMethodDemo.vue'],
  ['PSWFlagDemo', './components/appendix/computer-fundamentals/PSWFlagDemo.vue'],
  ['FlipFlopDemo', './components/appendix/computer-fundamentals/FlipFlopDemo.vue'],
  ['ProcessDemo', './components/appendix/computer-fundamentals/ProcessDemo.vue'],
  ['MemoryDemo', './components/appendix/computer-fundamentals/MemoryDemo.vue'],
  ['FilesystemDemo', './components/appendix/computer-fundamentals/FilesystemDemo.vue'],
  ['EncodingDemo', './components/appendix/computer-fundamentals/EncodingDemo.vue'],
  ['StorageDemo', './components/appendix/computer-fundamentals/StorageDemo.vue'],
  ['TransmissionDemo', './components/appendix/computer-fundamentals/TransmissionDemo.vue'],
  ['DataStructureDemo', './components/appendix/computer-fundamentals/DataStructureDemo.vue'],
  ['AlgorithmDemo', './components/appendix/computer-fundamentals/AlgorithmDemo.vue'],
  ['LanguageMapDemo', './components/appendix/computer-fundamentals/LanguageMapDemo.vue'],
  ['TypeSystemDemo', './components/appendix/computer-fundamentals/TypeSystemDemo.vue'],
  ['CompilerDemo', './components/appendix/computer-fundamentals/CompilerDemo.vue'],
  ['StaticVsDynamicDemo', './components/appendix/computer-fundamentals/StaticVsDynamicDemo.vue'],
  ['StrongVsWeakDemo', './components/appendix/computer-fundamentals/StrongVsWeakDemo.vue'],
  ['TypeInferenceFlowDemo', './components/appendix/computer-fundamentals/TypeInferenceFlowDemo.vue'],
  ['LexerTokenDemo', './components/appendix/computer-fundamentals/LexerTokenDemo.vue'],
  ['CompileVsInterpretDemo', './components/appendix/computer-fundamentals/CompileVsInterpretDemo.vue'],
  ['CodeToInstructionDemo', './components/appendix/computer-fundamentals/CodeToInstructionDemo.vue'],
  ['CISCvsRISCDemo', './components/appendix/computer-fundamentals/CISCvsRISCDemo.vue'],
  ['TypeSafetyPracticeDemo', './components/appendix/computer-fundamentals/TypeSafetyPracticeDemo.vue'],
  ['GenericTypeDemo', './components/appendix/computer-fundamentals/GenericTypeDemo.vue'],
  ['ASTVisualizerDemo', './components/appendix/computer-fundamentals/ASTVisualizerDemo.vue'],
  ['CodeOptimizationDemo', './components/appendix/computer-fundamentals/CodeOptimizationDemo.vue'],
  ['CFNetworkLayers', './components/appendix/computer-fundamentals/NetworkLayers.vue'],
  ['CFSubnetCalculator', './components/appendix/computer-fundamentals/SubnetCalculator.vue'],
  ['CFTcpUdpComparison', './components/appendix/computer-fundamentals/TcpUdpComparison.vue'],
  ['OSArchitectureDemo', './components/appendix/computer-fundamentals/OSArchitectureDemo.vue'],
  ['ProgramLaunchDemo', './components/appendix/computer-fundamentals/ProgramLaunchDemo.vue'],
  ['DataLifecycleDemo', './components/appendix/computer-fundamentals/DataLifecycleDemo.vue'],
  ['EncodingStorageTransmissionDemo', './components/appendix/computer-fundamentals/EncodingStorageTransmissionDemo.vue'],
  ['NetworkOverviewDemo', './components/appendix/computer-fundamentals/NetworkOverviewDemo.vue'],
  ['PhysicalLayerDemo', './components/appendix/computer-fundamentals/PhysicalLayerDemo.vue'],
  ['DataLinkLayerDemo', './components/appendix/computer-fundamentals/DataLinkLayerDemo.vue'],
  ['TransportLayerDemo', './components/appendix/computer-fundamentals/TransportLayerDemo.vue'],
  ['ApplicationLayerDemo', './components/appendix/computer-fundamentals/ApplicationLayerDemo.vue'],
  ['DataStructureOverviewDemo', './components/appendix/computer-fundamentals/DataStructureOverviewDemo.vue'],
  ['LinearStructuresDemo', './components/appendix/computer-fundamentals/LinearStructuresDemo.vue'],
  ['HashTableDemo', './components/appendix/computer-fundamentals/HashTableDemo.vue'],
  ['TreeStructureDemo', './components/appendix/computer-fundamentals/TreeStructureDemo.vue'],
  ['DataStructureSelectorDemo', './components/appendix/computer-fundamentals/DataStructureSelectorDemo.vue'],
  ['AlgorithmOverviewDemo', './components/appendix/computer-fundamentals/AlgorithmOverviewDemo.vue'],
  ['RecursiveThinkingDemo', './components/appendix/computer-fundamentals/RecursiveThinkingDemo.vue'],
  ['GreedyThinkingDemo', './components/appendix/computer-fundamentals/GreedyThinkingDemo.vue'],
  ['AlgorithmParadigmDemo', './components/appendix/computer-fundamentals/AlgorithmParadigmDemo.vue'],
  ['LanguageEvolutionDemo', './components/appendix/computer-fundamentals/LanguageEvolutionDemo.vue'],
  ['ProgrammingParadigmDemo', './components/appendix/computer-fundamentals/ProgrammingParadigmDemo.vue'],
  ['LanguageScenarioDemo', './components/appendix/computer-fundamentals/LanguageScenarioDemo.vue'],
  ['ProgrammingLanguageComparisonDemo', './components/appendix/computer-fundamentals/ProgrammingLanguageComparisonDemo.vue'],
  ['CompilerAnalogyDemo', './components/appendix/computer-fundamentals/CompilerAnalogyDemo.vue'],
  ['SearchAlgorithmDemo', './components/appendix/computer-fundamentals/SearchAlgorithmDemo.vue'],
  ['SortingAlgorithmDemo', './components/appendix/computer-fundamentals/SortingAlgorithmDemo.vue'],
  ['NetworkPrincipleDemo', './components/appendix/computer-fundamentals/NetworkPrincipleDemo.vue'],
  ['DataEncodingBasicsDemo', './components/appendix/computer-fundamentals/DataEncodingBasicsDemo.vue'],
  ['StorageHierarchyDemo', './components/appendix/computer-fundamentals/StorageHierarchyDemo.vue'],
  ['GraphStructureDemo', './components/appendix/computer-fundamentals/GraphStructureDemo.vue'],
  ['LanguageTypeModelDemo', './components/appendix/computer-fundamentals/LanguageTypeModelDemo.vue'],
  ['CompilationPracticeDemo', './components/appendix/computer-fundamentals/CompilationPracticeDemo.vue'],
  ['DeveloperSkillShiftDemo', './components/appendix/computer-fundamentals/DeveloperSkillShiftDemo.vue'],
  ['ComputerFieldMapDemo', './components/appendix/computer-fundamentals/ComputerFieldMapDemo.vue'],
  ['FrontendTriadDemo', './components/appendix/computer-fundamentals/FrontendTriadDemo.vue'],
  ['FrontendFrameworkDemo', './components/appendix/computer-fundamentals/FrontendFrameworkDemo.vue'],
  ['BackendCoreDemo', './components/appendix/computer-fundamentals/BackendCoreDemo.vue'],
  ['ProgrammingLanguageMapDemo', './components/appendix/computer-fundamentals/ProgrammingLanguageMapDemo.vue'],
  ['LanguageSelectionDemo', './components/appendix/computer-fundamentals/LanguageSelectionDemo.vue'],
  ['FullstackSkillDemo', './components/appendix/computer-fundamentals/FullstackSkillDemo.vue'],
  ['AIvsTraditionalDemo', './components/appendix/computer-fundamentals/AIvsTraditionalDemo.vue'],
  ['CareerPathDemo', './components/appendix/computer-fundamentals/CareerPathDemo.vue'],
  ['LearningStrategyDemo', './components/appendix/computer-fundamentals/LearningStrategyDemo.vue'],
  ['VibeCodingFlowDemo', './components/appendix/computer-fundamentals/VibeCodingFlowDemo.vue'],
  ['PowerOnDemo', './components/appendix/computer-fundamentals/PowerOnDemo.vue'],
  ['BootProcessDemo', './components/appendix/computer-fundamentals/BootProcessDemo.vue'],
  ['BiosUefiDemo', './components/appendix/computer-fundamentals/BiosUefiDemo.vue'],
  ['BiosUefiInteractiveDemo', './components/appendix/computer-fundamentals/BiosUefiInteractiveDemo.vue'],
  ['AppLaunchDemo', './components/appendix/computer-fundamentals/AppLaunchDemo.vue'],
  ['DesktopDemo', './components/appendix/computer-fundamentals/DesktopDemo.vue'],
  ['OSBootInteractiveDemo', './components/appendix/computer-fundamentals/OSBootInteractiveDemo.vue'],
  ['BrowserArchitectureDemo', './components/appendix/computer-fundamentals/BrowserArchitectureDemo.vue'],
  ['URLRequestDemo', './components/appendix/computer-fundamentals/URLRequestDemo.vue'],
  ['RenderingDemo', './components/appendix/computer-fundamentals/RenderingDemo.vue'],
  ['FullProcessDemo', './components/appendix/computer-fundamentals/FullProcessDemo.vue'],
  ['GarbledTextDemo', './components/appendix/data-encoding/GarbledTextDemo.vue'],
  ['CharacterEncodingExplorer', './components/appendix/data-encoding/CharacterEncodingExplorer.vue'],
  ['StoragePyramidDemo', './components/appendix/data-encoding/StoragePyramidDemo.vue'],
  ['DataTransmissionDemo', './components/appendix/data-encoding/DataTransmissionDemo.vue'],
  ['PhotoUploadJourneyDemo', './components/appendix/data-encoding/PhotoUploadJourneyDemo.vue'],
  ['ImageEncodingDemo', './components/appendix/data-encoding/ImageEncodingDemo.vue'],
  ['AudioEncodingDemo', './components/appendix/data-encoding/AudioEncodingDemo.vue'],
  ['DeploymentOverviewDemo', './components/appendix/deployment/DeploymentOverviewDemo.vue'],
  ['DeploymentBuildDemo', './components/appendix/deployment/DeploymentBuildDemo.vue'],
  ['DeploymentServerDemo', './components/appendix/deployment/DeploymentServerDemo.vue'],
  ['DeploymentDnsDemo', './components/appendix/deployment/DeploymentDnsDemo.vue'],
  ['DeploymentHttpsDemo', './components/appendix/deployment/DeploymentHttpsDemo.vue'],
  ['DeploymentCicdDemo', './components/appendix/deployment/DeploymentCicdDemo.vue'],
  ['DeploymentMonitorDemo', './components/appendix/deployment/DeploymentMonitorDemo.vue'],
  ['CssBoxModel', './components/appendix/web-basics/CssBoxModel.vue'],
  ['CssFlexbox', './components/appendix/web-basics/CssFlexbox.vue'],
  ['CssLayoutDemo', './components/appendix/web-basics/CssLayoutDemo.vue'],
  ['CssPlaygroundDemo', './components/appendix/web-basics/CssPlaygroundDemo.vue'],
  ['CssCommonProperties', './components/appendix/web-basics/CssCommonProperties.vue'],
  ['CssSelectorsDemo', './components/appendix/web-basics/CssSelectorsDemo.vue'],
  ['DomManipulator', './components/appendix/web-basics/DomManipulator.vue'],
  ['SemanticTagsDemo', './components/appendix/web-basics/SemanticTagsDemo.vue'],
  ['DnsLookupDemo', './components/appendix/web-basics/DnsLookupDemo.vue'],
  ['TcpHandshakeDemo', './components/appendix/web-basics/TcpHandshakeDemo.vue'],
  ['UrlParserDemo', './components/appendix/web-basics/UrlParserDemo.vue'],
  ['HttpExchangeDemo', './components/appendix/web-basics/HttpExchangeDemo.vue'],
  ['BrowserRenderingDemo', './components/appendix/web-basics/BrowserRenderingDemo.vue'],
  ['AccessibilityDemo', './components/appendix/browser-frontend/AccessibilityDemo.vue'],
  ['InternationalizationDemo', './components/appendix/browser-frontend/InternationalizationDemo.vue'],
  ['FrontendEvolutionDemo', './components/appendix/web-basics/FrontendEvolutionDemo.vue'],
  ['SliceRequestDemo', './components/appendix/web-basics/SliceRequestDemo.vue'],
  ['ResponsiveGridDemo', './components/appendix/web-basics/ResponsiveGridDemo.vue'],
  ['JQueryVsStateDemo', './components/appendix/web-basics/JQueryVsStateDemo.vue'],
  ['VueReactComparisonDemo', './components/appendix/web-basics/VueReactComparisonDemo.vue'],
  ['RoutingModeDemo', './components/appendix/web-basics/RoutingModeDemo.vue'],
  ['SpaStatePreservationDemo', './components/appendix/web-basics/SpaStatePreservationDemo.vue'],
  ['BundlerSizeDemo', './components/appendix/web-basics/BundlerSizeDemo.vue'],
  ['RenderingStrategyDemo', './components/appendix/web-basics/RenderingStrategyDemo.vue'],
  ['BigFrontendScopeDemo', './components/appendix/web-basics/BigFrontendScopeDemo.vue'],
  ['AiEvolutionDemo', './components/appendix/ai-history/AiEvolutionDemo.vue'],
  ['FoundationDemo', './components/appendix/ai-history/FoundationDemo.vue'],
  ['ExpertSystemWaveDemo', './components/appendix/ai-history/ExpertSystemWaveDemo.vue'],
  ['AIErasComparisonDemo', './components/appendix/ai-history/AIErasComparisonDemo.vue'],
  ['RuleBasedVsLearningDemo', './components/appendix/ai-history/RuleBasedVsLearningDemo.vue'],
  ['PerceptronDemo', './components/appendix/ai-history/PerceptronDemo.vue'],
  ['AIEvolutionTimelineDemo', './components/appendix/ai-history/AIEvolutionTimelineDemo.vue'],
  ['CombinatorialExplosionDemo', './components/appendix/ai-history/CombinatorialExplosionDemo.vue'],
  ['NeuralNetworkVisualizationDemo', './components/appendix/ai-history/NeuralNetworkVisualizationDemo.vue'],
  ['BackpropagationDemo', './components/appendix/ai-history/BackpropagationDemo.vue'],
  ['AttentionMechanismDemo', './components/appendix/ai-history/AttentionMechanismDemo.vue'],
  ['DiscriminativeVsGenerativeDemo', './components/appendix/ai-history/DiscriminativeVsGenerativeDemo.vue'],
  ['GPTEvolutionDemo', './components/appendix/ai-history/GPTEvolutionDemo.vue'],
  ['TransformerQuickStartDemo', './components/appendix/transformer-attention/TransformerQuickStartDemo.vue'],
  ['RnnVsTransformerDemo', './components/appendix/transformer-attention/RnnVsTransformerDemo.vue'],
  ['SelfAttentionDemo', './components/appendix/transformer-attention/SelfAttentionDemo.vue'],
  ['QKVMechanismDemo', './components/appendix/transformer-attention/QKVMechanismDemo.vue'],
  ['MultiHeadAttentionDemo', './components/appendix/transformer-attention/MultiHeadAttentionDemo.vue'],
  ['TransformerArchitectureDemo', './components/appendix/transformer-attention/TransformerArchitectureDemo.vue'],
  ['PositionalEncodingDemo', './components/appendix/transformer-attention/PositionalEncodingDemo.vue'],
  ['AttentionDecompositionDemo', './components/appendix/transformer-attention/AttentionDecompositionDemo.vue'],
  ['McpVisualDemo', './components/appendix/ai-protocols/McpVisualDemo.vue'],
  ['A2AVisualDemo', './components/appendix/ai-protocols/A2AVisualDemo.vue'],
  ['McpDetailedDemo', './components/appendix/ai-protocols/McpDetailedDemo.vue'],
  ['A2ADetailedDemo', './components/appendix/ai-protocols/A2ADetailedDemo.vue'],
  ['ProtocolComparisonDemo', './components/appendix/ai-protocols/ProtocolComparisonDemo.vue'],
  ['ProtocolWorkflowDemo', './components/appendix/ai-protocols/ProtocolWorkflowDemo.vue'],
  ['ImperativeVsDeclarativeDemo', './components/appendix/web-basics/ImperativeVsDeclarativeDemo.vue'],
  ['ComponentReusabilityDemo', './components/appendix/web-basics/ComponentReusabilityDemo.vue'],
  ['FrameworkMotivationDemo', './components/appendix/framework-nature/FrameworkMotivationDemo.vue'],
  ['ManualVsAutoSyncDemo', './components/appendix/framework-nature/ManualVsAutoSyncDemo.vue'],
  ['ReactivityMechanismDemo', './components/appendix/framework-nature/ReactivityMechanismDemo.vue'],
  ['VirtualDomDiffDemo', './components/appendix/framework-nature/VirtualDomDiffDemo.vue'],
  ['FrameworkSpectrumDemo', './components/appendix/framework-nature/FrameworkSpectrumDemo.vue'],
  ['DataUIGapDemo', './components/appendix/framework-nature/DataUIGapDemo.vue'],
  ['DeclarativeFormulaDemo', './components/appendix/framework-nature/DeclarativeFormulaDemo.vue'],
  ['DomOperationCostDemo', './components/appendix/framework-nature/DomOperationCostDemo.vue'],
  ['ComponentTreeDemo', './components/appendix/framework-nature/ComponentTreeDemo.vue'],
  ['WhatIsDomDemo', './components/appendix/framework-nature/WhatIsDomDemo.vue'],
  ['WhyNoAutoSyncDemo', './components/appendix/framework-nature/WhyNoAutoSyncDemo.vue'],
  ['BackendEvolutionDemo', './components/appendix/backend-evolution/BackendEvolutionDemo.vue'],
  ['BackendQuickStartDemo', './components/appendix/backend-evolution/BackendQuickStartDemo.vue'],
  ['EvolutionIntroDemo', './components/appendix/backend-evolution/EvolutionIntroDemo.vue'],
  ['PhysicalServerDemo', './components/appendix/backend-evolution/PhysicalServerDemo.vue'],
  ['MonolithDemo', './components/appendix/backend-evolution/MonolithDemo.vue'],
  ['ContainerDockerDemo', './components/appendix/backend-evolution/ContainerDockerDemo.vue'],
  ['MicroservicesDemo', './components/appendix/backend-evolution/MicroservicesDemo.vue'],
  ['KubernetesDemo', './components/appendix/backend-evolution/KubernetesDemo.vue'],
  ['ServerlessDemo', './components/appendix/backend-evolution/ServerlessDemo.vue'],
  ['ArchitectureComparisonDemo', './components/appendix/backend-evolution/ArchitectureComparisonDemo.vue'],
  ['DeploymentFlowDemo', './components/appendix/backend-evolution/DeploymentFlowDemo.vue'],
  ['TechStackTimelineDemo', './components/appendix/backend-evolution/TechStackTimelineDemo.vue'],
  ['ScalingStrategyDemo', './components/appendix/backend-evolution/ScalingStrategyDemo.vue'],
  ['MonolithVsMicroserviceDemo', './components/appendix/backend-evolution/MonolithVsMicroserviceDemo.vue'],
  ['CgiQueueDemo', './components/appendix/backend-evolution/CgiQueueDemo.vue'],
  ['MonolithReleaseRiskDemo', './components/appendix/backend-evolution/MonolithReleaseRiskDemo.vue'],
  ['MicroserviceLatencyDemo', './components/appendix/backend-evolution/MicroserviceLatencyDemo.vue'],
  ['CacheHitRatioDemo', './components/appendix/backend-evolution/CacheHitRatioDemo.vue'],
  ['ServerlessCostAutoScaleDemo', './components/appendix/backend-evolution/ServerlessCostAutoScaleDemo.vue'],
  ['PerformanceMetricsDemo', './components/appendix/frontend-performance/PerformanceMetricsDemo.vue'],
  ['PerformanceOverviewDemo', './components/appendix/frontend-performance/PerformanceOverviewDemo.vue'],
  ['ReflowRepaintDemo', './components/appendix/frontend-performance/ReflowRepaintDemo.vue'],
  ['ImageOptimizationDemo', './components/appendix/frontend-performance/ImageOptimizationDemo.vue'],
  ['LazyLoadingDemo', './components/appendix/frontend-performance/LazyLoadingDemo.vue'],
  ['CachingStrategyDemo', './components/appendix/frontend-performance/CachingStrategyDemo.vue'],
  ['CriticalRenderingPathDemo', './components/appendix/frontend-performance/CriticalRenderingPathDemo.vue'],
  ['VirtualScrollingDemo', './components/appendix/frontend-performance/VirtualScrollingDemo.vue'],
  ['CanvasBasicsDemo', './components/appendix/canvas-intro/CanvasBasicsDemo.vue'],
  ['CoordinateSystemDemo', './components/appendix/canvas-intro/CoordinateSystemDemo.vue'],
  ['AnimationLoopDemo', './components/appendix/canvas-intro/AnimationLoopDemo.vue'],
  ['EventHandlingDemo', './components/appendix/canvas-intro/EventHandlingDemo.vue'],
  ['ParticleSystemDemo', './components/appendix/canvas-intro/ParticleSystemDemo.vue'],
  ['PerformanceDemo', './components/appendix/canvas-intro/PerformanceDemo.vue'],
  ['CacheArchitectureDemo', './components/appendix/cache-design/CacheArchitectureDemo.vue'],
  ['LocalityPrincipleDemo', './components/appendix/cache-design/LocalityPrincipleDemo.vue'],
  ['CacheLifecycleDemo', './components/appendix/cache-design/CacheLifecycleDemo.vue'],
  ['LocalVsDistributedCacheDemo', './components/appendix/cache-design/LocalVsDistributedCacheDemo.vue'],
  ['MultiLevelCacheDemo', './components/appendix/cache-design/MultiLevelCacheDemo.vue'],
  ['CachePatternsDemo', './components/appendix/cache-design/CachePatternsDemo.vue'],
  ['CacheProblemsDemo', './components/appendix/cache-design/CacheProblemsDemo.vue'],
  ['ProductCacheDemo', './components/appendix/cache-design/ProductCacheDemo.vue'],
  ['AuthEvolutionDemo', './components/appendix/auth-design/AuthEvolutionDemo.vue'],
  ['AuthBasicsDemo', './components/appendix/auth-design/AuthBasicsDemo.vue'],
  ['AuthInteractiveLoginDemo', './components/appendix/auth-design/AuthInteractiveLoginDemo.vue'],
  ['AuthNvsAuthZDemo', './components/appendix/auth-design/AuthNvsAuthZDemo.vue'],
  ['SessionCookieDemo', './components/appendix/auth-design/SessionCookieDemo.vue'],
  ['JWTWorkflowDemo', './components/appendix/auth-design/JWTWorkflowDemo.vue'],
  ['SessionVsJWTDemo', './components/appendix/auth-design/SessionVsJWTDemo.vue'],
  ['OAuth2FlowDemo', './components/appendix/auth-design/OAuth2FlowDemo.vue'],
  ['PasswordHashingDemo', './components/appendix/auth-design/PasswordHashingDemo.vue'],
  ['CSRFDefenseDemo', './components/appendix/auth-design/CSRFDefenseDemo.vue'],
  ['MessageQueueDemo', './components/appendix/queue-design/MessageQueueDemo.vue'],
  ['PeakShavingDemo', './components/appendix/queue-design/PeakShavingDemo.vue'],
  ['MessageQueueComponentsDemo', './components/appendix/queue-design/MessageQueueComponentsDemo.vue'],
  ['PointToPointVsPubSubDemo', './components/appendix/queue-design/PointToPointVsPubSubDemo.vue'],
  ['MessageQueueComparisonDemo', './components/appendix/queue-design/MessageQueueComparisonDemo.vue'],
  ['CouplingDemo', './components/appendix/queue-design/CouplingDemo.vue'],
  ['DecouplingDemo', './components/appendix/queue-design/DecouplingDemo.vue'],
  ['PubSubDemo', './components/appendix/queue-design/PubSubDemo.vue'],
  ['DeadLetterQueueDemo', './components/appendix/queue-design/DeadLetterQueueDemo.vue'],
  ['DelayedMessageDemo', './components/appendix/queue-design/DelayedMessageDemo.vue'],
  ['SeckillSystemDemo', './components/appendix/queue-design/SeckillSystemDemo.vue'],
  ['PromptQuickStartDemo', './components/appendix/prompt-engineering/PromptQuickStartDemo.vue'],
  ['PromptComparisonDemo', './components/appendix/prompt-engineering/PromptComparisonDemo.vue'],
  ['FewShotDemo', './components/appendix/prompt-engineering/FewShotDemo.vue'],
  ['ChainOfThoughtDemo', './components/appendix/prompt-engineering/ChainOfThoughtDemo.vue'],
  ['PromptTemplatesDemo', './components/appendix/prompt-engineering/PromptTemplatesDemo.vue'],
  ['PromptRobustnessDemo', './components/appendix/prompt-engineering/PromptRobustnessDemo.vue'],
  ['PromptSecurityDemo', './components/appendix/prompt-engineering/PromptSecurityDemo.vue'],
  ['TrainingProcessDemo', './components/appendix/prompt-engineering/TrainingProcessDemo.vue'],
  ['AgentContextFlow', './components/appendix/context-engineering/AgentContextFlow.vue'],
  ['IntroProblemReasonSolution', './components/appendix/context-engineering/IntroProblemReasonSolution.vue'],
  ['ContextWindowVisualizer', './components/appendix/context-engineering/ContextWindowVisualizer.vue'],
  ['SlidingWindowDemo', './components/appendix/context-engineering/SlidingWindowDemo.vue'],
  ['SelectiveContextDemo', './components/appendix/context-engineering/SelectiveContextDemo.vue'],
  ['RAGSimulationDemo', './components/appendix/context-engineering/RAGSimulationDemo.vue'],
  ['ContextCompressionDemo', './components/appendix/context-engineering/ContextCompressionDemo.vue'],
  ['MemoryPalaceDemo', './components/appendix/context-engineering/MemoryPalaceDemo.vue'],
  ['MemoryPalaceActionDemo', './components/appendix/context-engineering/MemoryPalaceActionDemo.vue'],
  ['KVCacheDemo', './components/appendix/context-engineering/KVCacheDemo.vue'],
  ['LostInMiddleDemo', './components/appendix/context-engineering/LostInMiddleDemo.vue'],
  ['BuildPipelineDemo', './components/appendix/frontend-engineering/BuildPipelineDemo.vue'],
  ['BundlerComparisonDemo', './components/appendix/frontend-engineering/BundlerComparisonDemo.vue'],
  ['TreeShakingDemo', './components/appendix/frontend-engineering/TreeShakingDemo.vue'],
  ['CodeSplittingDemo', './components/appendix/frontend-engineering/CodeSplittingDemo.vue'],
  ['HotReloadDemo', './components/appendix/frontend-engineering/HotReloadDemo.vue'],
  ['DependencyGraphDemo', './components/appendix/frontend-engineering/DependencyGraphDemo.vue'],
  ['SourceMapDemo', './components/appendix/frontend-engineering/SourceMapDemo.vue'],
  ['AssetFingerprintDemo', './components/appendix/frontend-engineering/AssetFingerprintDemo.vue'],
  ['HashVsHistoryDemo', './components/appendix/frontend-routing/HashVsHistoryDemo.vue'],
  ['DynamicRoutesDemo', './components/appendix/frontend-routing/DynamicRoutesDemo.vue'],
  ['MpaRoutingDemo', './components/appendix/frontend-routing/MpaRoutingDemo.vue'],
  ['NestedRoutesDemo', './components/appendix/frontend-routing/NestedRoutesDemo.vue'],
  ['RouteGuardsDemo', './components/appendix/frontend-routing/RouteGuardsDemo.vue'],
  ['RouteMatchingDemo', './components/appendix/frontend-routing/RouteMatchingDemo.vue'],
  ['RouterArchitectureDemo', './components/appendix/frontend-routing/RouterArchitectureDemo.vue'],
  ['RoutingModesDemo', './components/appendix/frontend-routing/RoutingModesDemo.vue'],
  ['SpaNavigationDemo', './components/appendix/frontend-routing/SpaNavigationDemo.vue'],
  ['AgentWorkflowDemo', './components/appendix/agent-intro/AgentWorkflowDemo.vue'],
  ['AgentLevelDemo', './components/appendix/agent-intro/AgentLevelDemo.vue'],
  ['AgentArchitectureDemo', './components/appendix/agent-intro/AgentArchitectureDemo.vue'],
  ['AgentTaskFlowDemo', './components/appendix/agent-intro/AgentTaskFlowDemo.vue'],
  ['FrameworkComparisonDemo', './components/appendix/agent-intro/FrameworkComparisonDemo.vue'],
  ['FrameworkSelectionDemo', './components/appendix/agent-intro/FrameworkSelectionDemo.vue'],
  ['AgentChallengesDemo', './components/appendix/agent-intro/AgentChallengesDemo.vue'],
  ['AgentFutureDemo', './components/appendix/agent-intro/AgentFutureDemo.vue'],
  ['AgentQuickStartDemo', './components/appendix/agent-intro/AgentQuickStartDemo.vue'],
  ['AgentToolUseDemo', './components/appendix/agent-intro/AgentToolUseDemo.vue'],
  ['AgentPlanningDemo', './components/appendix/agent-intro/AgentPlanningDemo.vue'],
  ['AgentMemoryDemo', './components/appendix/agent-intro/AgentMemoryDemo.vue'],
  ['AgentMultiToolPrinciple', './components/appendix/agent-intro/AgentMultiToolPrinciple.vue'],
  ['AgentMemoryPrinciple', './components/appendix/agent-intro/AgentMemoryPrinciple.vue'],
  ['DatabaseIndexDemo', './components/appendix/database-intro/DatabaseIndexDemo.vue'],
  ['RelationalDataDemo', './components/appendix/database-intro/RelationalDataDemo.vue'],
  ['SqlPlaygroundDemo', './components/appendix/database-intro/SqlPlaygroundDemo.vue'],
  ['VirtualVSCodeDemo', './components/appendix/ide-intro/VirtualVSCodeDemo.vue'],
  ['DemoIde', './components/appendix/ide-intro/VirtualVSCodeDemo.vue'],
  ['IdeArchitectureDemo', './components/appendix/ide-intro/IdeArchitectureDemo.vue'],
  ['AiHelpDemo', './components/appendix/ide-intro/AiHelpDemo.vue'],
  ['BrowserDevToolsDemo', './components/appendix/browser-devtools/BrowserDevToolsDemo.vue'],
  ['BrowserDevToolsLiveDemo', './components/appendix/browser-devtools/BrowserDevToolsLiveDemo.vue'],
  ['DevToolsElementsDemo', './components/appendix/browser-devtools/DevToolsElementsDemo.vue'],
  ['DevToolsConsoleDemo', './components/appendix/browser-devtools/DevToolsConsoleDemo.vue'],
  ['DevToolsNetworkDemo', './components/appendix/browser-devtools/DevToolsNetworkDemo.vue'],
  ['DevToolsSourcesDemo', './components/appendix/browser-devtools/DevToolsSourcesDemo.vue'],
  ['DevToolsApplicationDemo', './components/appendix/browser-devtools/DevToolsApplicationDemo.vue'],
  ['TrackingOverviewDemo', './components/appendix/tracking-design/TrackingOverviewDemo.vue'],
  ['TrackingTypesDemo', './components/appendix/tracking-design/TrackingTypesDemo.vue'],
  ['TrackingMethodsComparisonDemo', './components/appendix/tracking-design/TrackingMethodsComparisonDemo.vue'],
  ['DataModelDesignDemo', './components/appendix/tracking-design/DataModelDesignDemo.vue'],
  ['DataCollectionDemo', './components/appendix/tracking-design/DataCollectionDemo.vue'],
  ['DataPipelineDemo', './components/appendix/tracking-design/DataPipelineDemo.vue'],
  ['PrivacyComplianceDemo', './components/appendix/tracking-design/PrivacyComplianceDemo.vue'],
  ['RealWorldCaseDemo', './components/appendix/tracking-design/RealWorldCaseDemo.vue'],
  ['ToolSelectionDemo', './components/appendix/tracking-design/ToolSelectionDemo.vue'],
  ['MonitoringDashboardDemo', './components/appendix/operations/MonitoringDashboardDemo.vue'],
  ['AlertFlowDemo', './components/appendix/operations/AlertFlowDemo.vue'],
  ['TraceVisualizationDemo', './components/appendix/operations/TraceVisualizationDemo.vue'],
  ['IncidentResponseDemo', './components/appendix/operations/IncidentResponseDemo.vue'],
  ['CapacityPlanningDemo', './components/appendix/operations/CapacityPlanningDemo.vue'],
  ['BackendLanguagesDemo', './components/appendix/backend-languages/BackendLanguagesDemo.vue'],
  ['PerformanceBenchmarkDemo', './components/appendix/backend-languages/PerformanceBenchmarkDemo.vue'],
  ['SyntaxComparisonDemo', './components/appendix/backend-languages/SyntaxComparisonDemo.vue'],
  ['ConcurrencyModelDemo', './components/appendix/backend-languages/ConcurrencyModelDemo.vue'],
  ['LanguageSelectorDemo', './components/appendix/backend-languages/LanguageSelectorDemo.vue'],
  ['DeveloperEfficiencyDemo', './components/appendix/backend-languages/DeveloperEfficiencyDemo.vue'],
  ['LanguageEcosystemDemo', './components/appendix/backend-languages/LanguageEcosystemDemo.vue'],
  ['MemoryManagementDemo', './components/appendix/backend-languages/MemoryManagementDemo.vue'],
  ['LanguageScopeDemo', './components/appendix/backend-languages/LanguageScopeDemo.vue'],
  ['ProcessThreadCoroutineDemo', './components/appendix/concurrency-models/ProcessThreadCoroutineDemo.vue'],
  ['ProcessIsolationDemo', './components/appendix/concurrency-models/ProcessIsolationDemo.vue'],
  ['ThreadSchedulingDemo', './components/appendix/concurrency-models/ThreadSchedulingDemo.vue'],
  ['CoroutineLightweightDemo', './components/appendix/concurrency-models/CoroutineLightweightDemo.vue'],
  ['AsyncAwaitDemo', './components/appendix/concurrency-models/AsyncAwaitDemo.vue'],
  ['EventLoopDemo', './components/appendix/concurrency-models/EventLoopDemo.vue'],
  ['ConcurrentVsParallelDemo', './components/appendix/concurrency-models/ConcurrentVsParallelDemo.vue'],
  ['GoroutineGreenThreadDemo', './components/appendix/concurrency-models/GoroutineGreenThreadDemo.vue'],
  ['ComponentHierarchyDemo', './components/appendix/component-state-management/ComponentHierarchyDemo.vue'],
  ['PropsFlowDemo', './components/appendix/component-state-management/PropsFlowDemo.vue'],
  ['EventBusDemo', './components/appendix/component-state-management/EventBusDemo.vue'],
  ['StateManagementComparisonDemo', './components/appendix/component-state-management/StateManagementComparisonDemo.vue'],
  ['ReduxFlowDemo', './components/appendix/component-state-management/ReduxFlowDemo.vue'],
  ['VuexPiniaDemo', './components/appendix/component-state-management/VuexPiniaDemo.vue'],
  ['MobxReactivityDemo', './components/appendix/component-state-management/MobxReactivityDemo.vue'],
  ['ZustandJotaiDemo', './components/appendix/component-state-management/ZustandJotaiDemo.vue'],
  ['CronExpressionDemo', './components/appendix/scheduled-tasks/CronExpressionDemo.vue'],
  ['TaskSchedulerDemo', './components/appendix/scheduled-tasks/TaskSchedulerDemo.vue'],
  ['BatchProcessingDemo', './components/appendix/scheduled-tasks/BatchProcessingDemo.vue'],
  ['JobQueueDemo', './components/appendix/scheduled-tasks/JobQueueDemo.vue'],
  ['RetryMechanismDemo', './components/appendix/scheduled-tasks/RetryMechanismDemo.vue'],
  ['DistributedLockDemo', './components/appendix/scheduled-tasks/DistributedLockDemo.vue'],
  ['TaskMonitoringDemo', './components/appendix/scheduled-tasks/TaskMonitoringDemo.vue'],
  ['SchedulingConflictDemo', './components/appendix/scheduled-tasks/SchedulingConflictDemo.vue'],
  ['CloudServicesMapDemo', './components/appendix/cloud-services/CloudServicesMapDemo.vue'],
  ['AwsVsAliyunDemo', './components/appendix/cloud-services/AwsVsAliyunDemo.vue'],
  ['ComputeServicesDemo', './components/appendix/cloud-services/ComputeServicesDemo.vue'],
  ['StorageServicesDemo', './components/appendix/cloud-services/StorageServicesDemo.vue'],
  ['NetworkServicesDemo', './components/appendix/cloud-services/NetworkServicesDemo.vue'],
  ['SecurityServicesDemo', './components/appendix/cloud-services/SecurityServicesDemo.vue'],
  ['PricingModelDemo', './components/appendix/cloud-services/PricingModelDemo.vue'],
  ['ServiceSelectionDemo', './components/appendix/cloud-services/ServiceSelectionDemo.vue'],
  ['DatabaseServicesDemo', './components/appendix/cloud-services/DatabaseServicesDemo.vue'],
  ['K8sServicesDemo', './components/appendix/cloud-services/K8sServicesDemo.vue'],
  ['CloudServicesOverview', './components/appendix/cloud-services/CloudServicesOverview.vue'],
  ['ProviderComparison', './components/appendix/cloud-services/ProviderComparison.vue'],
  ['PricingCalculator', './components/appendix/cloud-services/PricingCalculator.vue'],
  ['ComputeInstanceDemo', './components/appendix/cloud-services/ComputeInstanceDemo.vue'],
  ['StorageTypeDemo', './components/appendix/cloud-services/StorageTypeDemo.vue'],
  ['ApiCallDemo', './components/appendix/cloud-services/ApiCallDemo.vue'],
  ['CloudHistoryDemo', './components/appendix/cloud-services/CloudHistoryDemo.vue'],
  ['DeployWorkflowDemo', './components/appendix/cloud-services/DeployWorkflowDemo.vue'],
  ['RegionLatencyDemo', './components/appendix/cloud-services/RegionLatencyDemo.vue'],
  ['IAMStructure', './components/appendix/cloud-iam/IAMStructure.vue'],
  ['PolicyEditorDemo', './components/appendix/cloud-iam/PolicyEditorDemo.vue'],
  ['IamRamComparisonDemo', './components/appendix/cloud-iam/IamRamComparisonDemo.vue'],
  ['IdentityProviderDemo', './components/appendix/cloud-iam/IdentityProviderDemo.vue'],
  ['RolePolicyDemo', './components/appendix/cloud-iam/RolePolicyDemo.vue'],
  ['PermissionHierarchyDemo', './components/appendix/cloud-iam/PermissionHierarchyDemo.vue'],
  ['AccessKeyManagementDemo', './components/appendix/cloud-iam/AccessKeyManagementDemo.vue'],
  ['MfaSecurityDemo', './components/appendix/cloud-iam/MfaSecurityDemo.vue'],
  ['CrossAccountAccessDemo', './components/appendix/cloud-iam/CrossAccountAccessDemo.vue'],
  ['BestPracticesDemo', './components/appendix/cloud-iam/BestPracticesDemo.vue'],
  ['ReverseProxyDemo', './components/appendix/gateway-proxy/ReverseProxyDemo.vue'],
  ['ApiGatewayDemo', './components/appendix/gateway-proxy/ApiGatewayDemo.vue'],
  ['NginxArchitectureDemo', './components/appendix/gateway-proxy/NginxArchitectureDemo.vue'],
  ['RoutingRulesDemo', './components/appendix/gateway-proxy/RoutingRulesDemo.vue'],
  ['RateLimitingDemo', './components/appendix/gateway-proxy/RateLimitingDemo.vue'],
  ['AuthMiddlewareDemo', './components/appendix/gateway-proxy/AuthMiddlewareDemo.vue'],
  ['LoadBalancingDemo', './components/appendix/gateway-proxy/LoadBalancingDemo.vue'],
  ['SslTerminationDemo', './components/appendix/gateway-proxy/SslTerminationDemo.vue'],
  ['LoadBalancerTypesDemo', './components/appendix/load-balancing/LoadBalancerTypesDemo.vue'],
  ['HealthCheckDemo', './components/appendix/load-balancing/HealthCheckDemo.vue'],
  ['SessionPersistenceDemo', './components/appendix/load-balancing/SessionPersistenceDemo.vue'],
  ['WeightedRoutingDemo', './components/appendix/load-balancing/WeightedRoutingDemo.vue'],
  ['BlueGreenDeploymentDemo', './components/appendix/load-balancing/BlueGreenDeploymentDemo.vue'],
  ['CanaryReleaseDemo', './components/appendix/load-balancing/CanaryReleaseDemo.vue'],
  ['AutoScalingDemo', './components/appendix/load-balancing/AutoScalingDemo.vue'],
  ['MultiRegionDemo', './components/appendix/load-balancing/MultiRegionDemo.vue'],
  ['LayeredArchitectureDemo', './components/appendix/backend-layered-architecture/LayeredArchitectureDemo.vue'],
  ['ControllerLayerDemo', './components/appendix/backend-layered-architecture/ControllerLayerDemo.vue'],
  ['ServiceLayerDemo', './components/appendix/backend-layered-architecture/ServiceLayerDemo.vue'],
  ['RepositoryLayerDemo', './components/appendix/backend-layered-architecture/RepositoryLayerDemo.vue'],
  ['DomainModelDemo', './components/appendix/backend-layered-architecture/DomainModelDemo.vue'],
  ['DtoFlowDemo', './components/appendix/backend-layered-architecture/DtoFlowDemo.vue'],
  ['DependencyDirectionDemo', './components/appendix/backend-layered-architecture/DependencyDirectionDemo.vue'],
  ['CleanArchitectureDemo', './components/appendix/backend-layered-architecture/CleanArchitectureDemo.vue'],
  ['DomToRenderTreeDemo', './components/appendix/browser-rendering-pipeline/DomToRenderTreeDemo.vue'],
  ['LayoutReflowDemo', './components/appendix/browser-rendering-pipeline/LayoutReflowDemo.vue'],
  ['PaintLayerDemo', './components/appendix/browser-rendering-pipeline/PaintLayerDemo.vue'],
  ['CompositeDemo', './components/appendix/browser-rendering-pipeline/CompositeDemo.vue'],
  ['MacroMicroTaskDemo', './components/appendix/browser-rendering-pipeline/MacroMicroTaskDemo.vue'],
  ['RenderingPerformanceDemo', './components/appendix/browser-rendering-pipeline/RenderingPerformanceDemo.vue'],
  ['RenderingPipelineDemo', './components/appendix/browser-rendering-pipeline/RenderingPipelineDemo.vue'],
  ['EventLoopDemo', './components/appendix/javascript-intro/JSEventLoopDemo.vue'],
  ['CacheArchitectureOverview', './components/appendix/cache-design/CacheArchitectureOverview.vue'],
  ['CacheHierarchyDemo', './components/appendix/cache-design/CacheHierarchyDemo.vue'],
  ['CachePatternComparisonDemo', './components/appendix/cache-design/CachePatternComparisonDemo.vue'],
  ['EcommerceCacheArchitectureDemo', './components/appendix/cache-design/EcommerceCacheArchitectureDemo.vue'],
  ['CacheMonitoringDashboardDemo', './components/appendix/cache-design/CacheMonitoringDashboardDemo.vue'],
  ['CachePerformanceComparisonDemo', './components/appendix/cache-design/CachePerformanceComparisonDemo.vue'],
  ['CacheConsistencyDemo', './components/appendix/cache-design/CacheConsistencyDemo.vue'],
  ['EdgeNodeDistributionDemo', './components/appendix/cloud-storage-cdn/EdgeNodeDistributionDemo.vue'],
  ['CachePolicyDemo', './components/appendix/cloud-storage-cdn/CachePolicyDemo.vue'],
  ['TrafficSchedulingDemo', './components/appendix/cloud-storage-cdn/TrafficSchedulingDemo.vue'],
  ['HttpsOptimizationDemo', './components/appendix/cloud-storage-cdn/HttpsOptimizationDemo.vue'],
  ['AccessAnalyticsDemo', './components/appendix/cloud-storage-cdn/AccessAnalyticsDemo.vue'],
  ['ObjectStorageDemo', './components/appendix/cloud-storage-cdn/ObjectStorageDemo.vue'],
  ['CdnAccelerationDemo', './components/appendix/cloud-storage-cdn/CdnAccelerationDemo.vue'],
  ['UploadProcessDemo', './components/appendix/cloud-storage-cdn/UploadProcessDemo.vue'],
  ['ApiRequestDemo', './components/appendix/api-design/ApiRequestDemo.vue'],
  ['RestfulUrlDemo', './components/appendix/api-design/RestfulUrlDemo.vue'],
  ['StatusCodeDemo', './components/appendix/api-design/StatusCodeDemo.vue'],
  ['ErrorHandlingDemo', './components/appendix/api-design/ErrorHandlingDemo.vue'],
  ['ApiVersioningDemo', './components/appendix/api-design/ApiVersioningDemo.vue'],
  ['ApiStyleCompare', './components/appendix/api-design/ApiStyleCompare.vue'],
  ['ResponseStructureDemo', './components/appendix/api-design/ResponseStructureDemo.vue'],
  ['DataFieldDesignDemo', './components/appendix/api-design/DataFieldDesignDemo.vue'],
  ['ErrorResponseDesignDemo', './components/appendix/api-design/ErrorResponseDesignDemo.vue'],
  ['DatabaseEvolutionDemo', './components/appendix/database-intro/DatabaseEvolutionDemo.vue'],
  ['DatabaseRelationDemo', './components/appendix/database-intro/DatabaseRelationDemo.vue'],
  ['BPlusTreeDemo', './components/appendix/database-intro/BPlusTreeDemo.vue'],
  ['TransactionACIDDemo', './components/appendix/database-intro/TransactionACIDDemo.vue'],
  ['QueryOptimizationDemo', './components/appendix/database-intro/QueryOptimizationDemo.vue'],
  ['MQArchitectureDemo', './components/appendix/queue-design/MQArchitectureDemo.vue'],
  ['ProducerConsumerDemo', './components/appendix/queue-design/ProducerConsumerDemo.vue'],
  ['ReliabilityDemo', './components/appendix/queue-design/ReliabilityDemo.vue'],
  ['IdempotenceDemo', './components/appendix/queue-design/IdempotenceDemo.vue'],
  ['MQComparisonDemo', './components/appendix/queue-design/MQComparisonDemo.vue'],
  ['VariableBoxDemo', './components/appendix/javascript-intro/VariableBoxDemo.vue'],
  ['ReferenceDemo', './components/appendix/javascript-intro/ReferenceDemo.vue'],
  ['FunctionMachineDemo', './components/appendix/javascript-intro/FunctionMachineDemo.vue'],
  ['ScopeDemo', './components/appendix/javascript-intro/ScopeDemo.vue'],
  ['VariableScopeDemo', './components/appendix/javascript-intro/VariableScopeDemo.vue'],
  ['DataTypeDemo', './components/appendix/javascript-intro/DataTypeDemo.vue'],
  ['ClosureDemo', './components/appendix/javascript-intro/ClosureDemo.vue'],
  ['ThisContextDemo', './components/appendix/javascript-intro/ThisContextDemo.vue'],
  ['PrototypeDemo', './components/appendix/javascript-intro/PrototypeDemo.vue'],
  ['AsyncDemo', './components/appendix/javascript-intro/AsyncDemo.vue'],
  ['DOMTreeDemo', './components/appendix/javascript-intro/DOMTreeDemo.vue'],
  ['AsyncRestaurantDemo', './components/appendix/javascript-intro/AsyncRestaurantDemo.vue'],
  ['JSEventLoopDemo', './components/appendix/javascript-intro/JSEventLoopDemo.vue'],
  ['RuntimeEnvironmentDemo', './components/appendix/js-runtime/RuntimeEnvironmentDemo.vue'],
  ['CallStackDemo', './components/appendix/js-runtime/CallStackDemo.vue'],
  ['TaskQueueDemo', './components/appendix/js-runtime/TaskQueueDemo.vue'],
  ['MemoryLeakDemo', './components/appendix/js-runtime/MemoryLeakDemo.vue'],
  ['GarbageCollectionDemo', './components/appendix/js-runtime/GarbageCollectionDemo.vue'],
  ['EnvVarOverviewDemo', './components/appendix/development-tools/EnvVarOverviewDemo.vue'],
  ['PathSearchDemo', './components/appendix/development-tools/PathSearchDemo.vue'],
  ['EnvScopeDemo', './components/appendix/development-tools/EnvScopeDemo.vue'],
  ['EnvExportDemo', './components/appendix/development-tools/EnvExportDemo.vue'],
  ['ApiKeyDangerDemo', './components/appendix/development-tools/ApiKeyDangerDemo.vue'],
  ['DotEnvDemo', './components/appendix/development-tools/DotEnvDemo.vue'],
  ['ServerSecretDemo', './components/appendix/development-tools/ServerSecretDemo.vue'],
  ['PortAnalogyDemo', './components/appendix/ports-localhost/PortAnalogyDemo.vue'],
  ['LocalhostLoopbackDemo', './components/appendix/ports-localhost/LocalhostLoopbackDemo.vue'],
  ['PortConflictDemo', './components/appendix/ports-localhost/PortConflictDemo.vue'],
  ['CommonPortsDemo', './components/appendix/ports-localhost/CommonPortsDemo.vue'],
  ['DevServerFlowDemo', './components/appendix/ports-localhost/DevServerFlowDemo.vue'],
  ['PortTroubleshootDemo', './components/appendix/ports-localhost/PortTroubleshootDemo.vue'],
  ['PackageManagerOverviewDemo', './components/appendix/development-tools/PackageManagerOverviewDemo.vue'],
  ['PackageInstallDemo', './components/appendix/development-tools/PackageInstallDemo.vue'],
  ['DependencyTreeDemo', './components/appendix/development-tools/DependencyTreeDemo.vue'],
  ['SSHAuthDemo', './components/appendix/development-tools/SSHAuthDemo.vue'],
  ['RegexDemo', './components/appendix/development-tools/RegexDemo.vue'],
  ['TypeAnnotationDemo', './components/appendix/typescript-intro/TypeAnnotationDemo.vue'],
  ['InterfaceDemo', './components/appendix/typescript-intro/InterfaceDemo.vue'],
  ['GenericDemo', './components/appendix/typescript-intro/GenericDemo.vue'],
  ['TypeInferenceDemo', './components/appendix/typescript-intro/TypeInferenceDemo.vue'],
  ['SerializationDemo', './components/appendix/server-backend/SerializationDemo.vue'],
  ['HttpProtocolDemo', './components/appendix/server-backend/HttpProtocolDemo.vue'],
  ['RequestJourneyFlow', './components/appendix/server-backend/RequestJourneyFlow.vue'],
  ['RequestTimeline', './components/appendix/server-backend/RequestTimeline.vue'],
  ['OAuth2ModesDemo', './components/appendix/auth-design/OAuth2FlowDemo.vue'],
  ['AuthDatabaseDemo', './components/appendix/auth-design/AuthEvolutionDemo.vue'],
  ['CompleteAuthSystemDemo', './components/appendix/auth-design/JWTWorkflowDemo.vue'],
  ['XSSDefenseDemo', './components/appendix/auth-design/CSRFDefenseDemo.vue'],
  ['PollingDemo', './components/appendix/browser-frontend/PollingDemo.vue'],
  ['SSEDemo', './components/appendix/browser-frontend/SSEDemo.vue'],
  ['WebSocketDemo', './components/appendix/browser-frontend/WebSocketDemo.vue'],
  ['SqlDemo', './components/appendix/data/SqlDemo.vue'],
  ['DataModelsDemo', './components/appendix/data/DataModelsDemo.vue'],
  ['ABTestingDemo', './components/appendix/data/ABTestingDemo.vue'],
  ['DescriptiveStatsDemo', './components/appendix/data/DescriptiveStatsDemo.vue'],
  ['DataAggregationDemo', './components/appendix/data/DataAggregationDemo.vue'],
  ['FunnelAnalysisDemo', './components/appendix/data/FunnelAnalysisDemo.vue'],
  ['RetentionAnalysisDemo', './components/appendix/data/RetentionAnalysisDemo.vue'],
  ['DataTrackingDemo', './components/appendix/data/DataTrackingDemo.vue'],
  ['CodeSmellDemo', './components/appendix/engineering-excellence/CodeSmellDemo.vue'],
  ['RefactoringDemo', './components/appendix/engineering-excellence/RefactoringDemo.vue'],
  ['TestPyramidDemo', './components/appendix/engineering-excellence/TestPyramidDemo.vue'],
  ['TDDCycleDemo', './components/appendix/engineering-excellence/TDDCycleDemo.vue'],
  ['DesignPatternCatalogDemo', './components/appendix/engineering-excellence/DesignPatternCatalogDemo.vue'],
  ['PatternPlaygroundDemo', './components/appendix/engineering-excellence/PatternPlaygroundDemo.vue'],
  ['WebSecurityDemo', './components/appendix/engineering-excellence/WebSecurityDemo.vue'],
  ['SecurityChecklistDemo', './components/appendix/engineering-excellence/SecurityChecklistDemo.vue'],
  ['DocStructureDemo', './components/appendix/engineering-excellence/DocStructureDemo.vue'],
  ['TechWritingPracticeDemo', './components/appendix/engineering-excellence/TechWritingPracticeDemo.vue'],
  ['OpenSourceWorkflowDemo', './components/appendix/engineering-excellence/OpenSourceWorkflowDemo.vue'],
  ['LicenseComparisonDemo', './components/appendix/engineering-excellence/LicenseComparisonDemo.vue'],
  ['TechRadarDemo', './components/appendix/engineering-excellence/TechRadarDemo.vue'],
  ['DecisionMatrixDemo', './components/appendix/engineering-excellence/DecisionMatrixDemo.vue'],
  ['RAGPipelineDemo', './components/appendix/rag/RAGPipelineDemo.vue'],
  ['ChunkingStrategyDemo', './components/appendix/rag/ChunkingStrategyDemo.vue'],
  ['RetrievalDemo', './components/appendix/rag/RetrievalDemo.vue'],
  ['RAGArchitectureDemo', './components/appendix/rag/RAGArchitectureDemo.vue'],
  ['RAGvsFineTuningDemo', './components/appendix/rag/RAGvsFineTuningDemo.vue'],
  ['EmbeddingConceptDemo', './components/appendix/embedding-vector/EmbeddingConceptDemo.vue'],
  ['VectorSimilarityDemo', './components/appendix/embedding-vector/VectorSimilarityDemo.vue'],
  ['VectorIndexDemo', './components/appendix/embedding-vector/VectorIndexDemo.vue'],
  ['VectorDatabaseDemo', './components/appendix/embedding-vector/VectorDatabaseDemo.vue'],
  ['EmbeddingPipelineDemo', './components/appendix/embedding-vector/EmbeddingPipelineDemo.vue'],
  ['AINativeArchDemo', './components/appendix/ai-native-app/AINativeArchDemo.vue'],
  ['AIDesignPrincipleDemo', './components/appendix/ai-native-app/AIDesignPrincipleDemo.vue'],
  ['PromptDesignDemo', './components/appendix/ai-native-app/PromptDesignDemo.vue'],
  ['AIUXPatternDemo', './components/appendix/ai-native-app/AIUXPatternDemo.vue'],
  ['AIAppFlowDemo', './components/appendix/ai-native-app/AIAppFlowDemo.vue'],
  ['IaCConceptDemo', './components/appendix/infrastructure-as-code/IaCConceptDemo.vue'],
  ['TerraformWorkflowDemo', './components/appendix/infrastructure-as-code/TerraformWorkflowDemo.vue'],
  ['IaCToolComparisonDemo', './components/appendix/infrastructure-as-code/IaCToolComparisonDemo.vue'],
  ['ConfigDriftDemo', './components/appendix/infrastructure-as-code/ConfigDriftDemo.vue'],
  ['IaCBestPracticeDemo', './components/appendix/infrastructure-as-code/IaCBestPracticeDemo.vue'],
  ['DnsResolutionDemo', './components/appendix/dns-https/DnsResolutionDemo.vue'],
  ['DnsRecordTypeDemo', './components/appendix/dns-https/DnsRecordTypeDemo.vue'],
  ['HttpsHandshakeDemo', './components/appendix/dns-https/HttpsHandshakeDemo.vue'],
  ['CertificateChainDemo', './components/appendix/dns-https/CertificateChainDemo.vue'],
  ['DnsHttpsComparisonDemo', './components/appendix/dns-https/DnsHttpsComparisonDemo.vue'],
  ['FinetuningPipelineDemo', './components/appendix/model-finetuning/FinetuningPipelineDemo.vue'],
  ['TrainingDataDemo', './components/appendix/model-finetuning/TrainingDataDemo.vue'],
  ['LoRADemo', './components/appendix/model-finetuning/LoRADemo.vue'],
  ['ModelQuantizationDemo', './components/appendix/model-finetuning/ModelQuantizationDemo.vue'],
  ['ModelServingDemo', './components/appendix/model-finetuning/ModelServingDemo.vue'],
  ['SeverityLevelDemo', './components/appendix/incident-response/SeverityLevelDemo.vue'],
  ['IncidentTimelineDemo', './components/appendix/incident-response/IncidentTimelineDemo.vue'],
  ['IncidentCommandDemo', './components/appendix/incident-response/IncidentCommandDemo.vue'],
  ['AlertEscalationDemo', './components/appendix/incident-response/AlertEscalationDemo.vue'],
  ['PostmortemDemo', './components/appendix/incident-response/PostmortemDemo.vue'],
  ['AsyncTaskFlowDemo', './components/appendix/async-task-queues/AsyncTaskFlowDemo.vue'],
  ['TaskWorkerDemo', './components/appendix/async-task-queues/TaskWorkerDemo.vue'],
  ['TaskRetryDemo', './components/appendix/async-task-queues/TaskRetryDemo.vue'],
  ['AsyncComparisonDemo', './components/appendix/async-task-queues/AsyncComparisonDemo.vue'],
  ['FileStorageTypeDemo', './components/appendix/file-storage/FileStorageTypeDemo.vue'],
  ['FileUploadFlowDemo', './components/appendix/file-storage/FileUploadFlowDemo.vue'],
  ['CDNAccelerationDemo', './components/appendix/file-storage/CDNAccelerationDemo.vue'],
  ['RateLimitAlgorithmDemo', './components/appendix/rate-limiting/RateLimitAlgorithmDemo.vue'],
  ['BackpressureDemo', './components/appendix/rate-limiting/BackpressureDemo.vue'],
  ['InvertedIndexDemo', './components/appendix/search-engines/InvertedIndexDemo.vue'],
  ['SearchRelevanceDemo', './components/appendix/search-engines/SearchRelevanceDemo.vue'],
  ['ChartTypeSelectorDemo', './components/appendix/data-visualization/ChartTypeSelectorDemo.vue'],
  ['DashboardLayoutDemo', './components/appendix/data-visualization/DashboardLayoutDemo.vue'],
  ['DataQualityDemo', './components/appendix/data-governance/DataQualityDemo.vue'],
  ['DataGovernanceFrameworkDemo', './components/appendix/data-governance/DataGovernanceFrameworkDemo.vue'],
  ['DataLineageDemo', './components/appendix/data-governance/DataLineageDemo.vue'],
  ['CAPTheoremDemo', './components/appendix/distributed-systems/CAPTheoremDemo.vue'],
  ['ConsistencyModelsDemo', './components/appendix/distributed-systems/ConsistencyModelsDemo.vue'],
  ['DistributedChallengesDemo', './components/appendix/distributed-systems/DistributedChallengesDemo.vue'],
  ['AvailabilityCalculatorDemo', './components/appendix/high-availability/AvailabilityCalculatorDemo.vue'],
  ['FailoverStrategyDemo', './components/appendix/high-availability/FailoverStrategyDemo.vue'],
  ['ArchEvolutionDemo', './components/appendix/monolith-to-microservices/ArchEvolutionDemo.vue'],
  ['SystemDesignStepsDemo', './components/appendix/system-design-methodology/SystemDesignStepsDemo.vue'],
  ['CapacityEstimationDemo', './components/appendix/system-design-methodology/CapacityEstimationDemo.vue'],
  ['DockerArchitectureDemo', './components/appendix/docker-containers/DockerArchitectureDemo.vue'],
  ['DockerLifecycleDemo', './components/appendix/docker-containers/DockerLifecycleDemo.vue'],
  ['LinuxFileSystemDemo', './components/appendix/linux-basics/LinuxFileSystemDemo.vue'],
  ['LinuxCommandDemo', './components/appendix/linux-basics/LinuxCommandDemo.vue'],
  ['LinuxPermissionsDemo', './components/appendix/linux-basics/LinuxPermissionsDemo.vue'],
  ['K8sArchitectureDemo', './components/appendix/kubernetes/K8sArchitectureDemo.vue'],
  ['K8sWorkloadsDemo', './components/appendix/kubernetes/K8sWorkloadsDemo.vue'],
  ['NeuronDemo', './components/appendix/neural-networks/NeuronDemo.vue'],
  ['NetworkLayersDemo', './components/appendix/neural-networks/NetworkLayersDemo.vue'],
  ['NetworkArchitectureDemo', './components/appendix/neural-networks/NetworkArchitectureDemo.vue'],
  ['ProjectArchitectureComparisonDemo', './components/appendix/project-architecture/ArchitectureComparisonDemo.vue']
]

function registerAppendixComponents(app) {
  const registered = new Set()

  for (const [name, path] of appendixComponentRegistrations) {
    if (registered.has(name)) continue

    const loader = appendixComponentModules[path]
    if (!loader) {
      if (import.meta.env.DEV) {
        console.warn(`Appendix component not found: ${name} at ${path}`)
      }
      continue
    }

    app.component(name, defineAsyncComponent(loader))
    registered.add(name)
  }
}

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.use(ElementPlus)
    app.component(
      'CopyOrDownloadAsMarkdownButtons',
      CopyOrDownloadAsMarkdownButtons
    )
    app.component('HomeFeatures', HomeFeatures)
    app.component('WelcomeScreen', WelcomeScreen)
    app.component('NavGrid', NavGrid)
    app.component('NavCard', NavCard)
    app.component('CategoryIndex', CategoryIndex)
    app.component('ArticleGrid', ArticleGrid)
    app.component('RelatedArticlesSection', RelatedArticlesSection)
    app.component('RelatedArticles', RelatedArticlesSection)
    app.component('StepBar', StepBar)
    app.component('ChapterIntroduction', ChapterIntroduction)
    app.component('ReadingProgress', ReadingProgress)
    app.component('SummaryCard', SummaryCard)
    app.component('Tabs', Tabs)
    app.component('TabItem', TabItem)
    registerAppendixComponents(app)
















    // API Intro Components Registration














    // LLM Intro Components Registration











    // VLM Intro Components Registration












    // Image Gen Intro Components Registration







    // Audio Intro Components Registration











    // Web Basics Components Registration














    // Computer Fundamentals Components Registration





















    // app.component('EvolutionFlowDemo', EvolutionFlowDemo)


























    // Computer Fundamentals Additional Components Registration
































    // Vibe Coding Fullstack Components Registration
























    // Data Encoding Components Registration








    // Deployment appendix





















    // Browser & Frontend Components Registration (a11y & i18n)



























    // Transformer & Attention Components Registration









    // AI Protocols Components Registration









































    // Frontend Performance Components









    // Canvas Intro Components Registration







    // Cache Design Components Registration









    // Auth Design Components Registration











    // Queue Design Components Registration












    // Prompt Engineering Components Registration









    // Context Engineering Components Registration












    // Frontend Engineering Components Registration









    // Frontend Routing Components Registration










    // Agent Intro Components Registration















    // Database Intro Components Registration




    // IDE Intro Components Registration












    // Tracking Design Components Registration










    // Operations Components Registration






    // Backend Languages Components Registration











    // Concurrency Models Components Registration









    // Component State Management Components Registration









    // Scheduled Tasks Components Registration









    // Cloud Services Components Registration











    // Cloud Services Simple Components Registration (new)










    // Cloud IAM Simple Components Registration (new)



    // Cloud IAM Components Registration









    // Gateway Proxy Components Registration









    // Load Balancing Components Registration









    // Backend Layered Architecture Components Registration









    // Browser Rendering Pipeline Components Registration









    // Cache Design Extra Components Registration






    // Cloud Storage CDN Extra Components Registration






    // API Design Components Registration










    // Database Intro Extra Components Registration






    // Queue Design Extra Components Registration






    // JavaScript Intro Components Registration














    // JavaScript Runtime Components Registration






    // Development Tools Components Registration








    // Ports & Localhost Components Registration












    // TypeScript Intro Components Registration





    // Server & Backend Components Registration



    // Data Components Registration









    // Engineering Excellence Components Registration















    // RAG Components Registration






    // Embedding & Vector Components Registration






    // AI Native App Components Registration






    // Infrastructure as Code Components Registration






    // DNS & HTTPS Components Registration






    // Model Finetuning Components Registration






    // Incident Response Components Registration






    // // Async Task Queues Components Registration
    // Async Task Queues Components Registration





    // // File Storage Components Registration
    // File Storage Components Registration




    // // Rate Limiting Components Registration



    // Search Engines Components Registration



    // Data Visualization Components Registration



    // Data Governance Components Registration




    // Distributed Systems Components Registration




    // High Availability Components Registration



    // Monolith to Microservices Components Registration


    // System Design Methodology Components Registration



    // Docker Containers Components Registration



    // Linux Basics Components Registration




    // Kubernetes Components Registration



    // Neural Networks Components Registration




    // Project Architecture Components Registration


    // Appendix Navigation Component Registration
    app.component('AppendixFlowMap', AppendixFlowMap)
  },
  setup() {
    const route = useRoute()
    const { frontmatter } = useData()
    let viewer = null
    let mermaidViewer = null
    let mermaidViewerWrapper = null
    let mermaidViewerObjectUrl = null
    let mermaidApi = null
    let themeObserver = null
    let currentMermaidTheme = null
    const COLLAPSIBLE_CODE_MIN_LINES = 14

    // Skip browser-only initialization during SSR
    if (import.meta.env.SSR) {
      return
    }

    const getMermaidTheme = () =>
      document.documentElement.classList.contains('dark') ? 'dark' : 'default'

    const loadMermaid = async () => {
      if (mermaidApi) return mermaidApi
      const mermaidModule = await import('mermaid')
      mermaidApi = mermaidModule.default ?? mermaidModule
      return mermaidApi
    }

    const renderMermaidDiagrams = async (force = false) => {
      const mermaidBlocks = document.querySelectorAll(
        '.vp-doc div.language-mermaid, .vp-doc .mermaid-diagram[data-source]'
      )

      if (!mermaidBlocks.length) return

      const mermaid = await loadMermaid()
      const nextTheme = getMermaidTheme()

      if (force || currentMermaidTheme !== nextTheme) {
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'loose',
          theme: nextTheme
        })
        currentMermaidTheme = nextTheme
      }

      let index = 0
      for (const block of mermaidBlocks) {
        let source = ''
        let container = block

        if (block.classList.contains('language-mermaid')) {
          source = block.querySelector('code')?.textContent?.trim() ?? ''
          if (!source) continue

          container = document.createElement('div')
          container.className = 'mermaid-diagram'
          container.dataset.source = source
          block.replaceWith(container)
        } else {
          source = block.dataset.source ?? ''
          if (!source) continue
        }

        try {
          const diagramId = `mermaid-${route.path.replace(/\W+/g, '-')}-${Date.now()}-${index}`
          const { svg, bindFunctions } = await mermaid.render(diagramId, source)
          container.innerHTML = svg
          container.classList.remove('mermaid-diagram-error')
          container.setAttribute('role', 'button')
          container.setAttribute('tabindex', '0')
          container.setAttribute(
            'aria-label',
            'Open Mermaid diagram in fullscreen viewer'
          )
          container.onclick = (event) => {
            if (event.target.closest?.('a')) return
            openMermaidViewer(container)
          }
          container.onkeydown = (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              openMermaidViewer(container)
            }
          }
          bindFunctions?.(container)
        } catch (error) {
          console.error('Mermaid render failed:', error)
          container.innerHTML = ''
          container.classList.add('mermaid-diagram-error')
        }

        index += 1
      }
    }

    const cleanupMermaidViewer = () => {
      if (mermaidViewer) {
        mermaidViewer.destroy()
        mermaidViewer = null
      }

      if (mermaidViewerWrapper) {
        mermaidViewerWrapper.remove()
        mermaidViewerWrapper = null
      }

      if (mermaidViewerObjectUrl) {
        URL.revokeObjectURL(mermaidViewerObjectUrl)
        mermaidViewerObjectUrl = null
      }

      document.body.classList.remove('mermaid-viewer-open')
      document.body.classList.remove('viewer-ready')
    }

    const openMermaidViewer = (container) => {
      const svg = container.querySelector('svg')
      if (!svg) return

      cleanupMermaidViewer()

      const serializer = new XMLSerializer()
      let svgMarkup = serializer.serializeToString(svg)

      if (!svgMarkup.includes('xmlns="http://www.w3.org/2000/svg"')) {
        svgMarkup = svgMarkup.replace(
          '<svg',
          '<svg xmlns="http://www.w3.org/2000/svg"'
        )
      }

      const blob = new Blob([svgMarkup], {
        type: 'image/svg+xml;charset=utf-8'
      })
      mermaidViewerObjectUrl = URL.createObjectURL(blob)

      mermaidViewerWrapper = document.createElement('div')
      mermaidViewerWrapper.className = 'mermaid-viewer-source'

      const previewImage = document.createElement('img')
      previewImage.src = mermaidViewerObjectUrl
      previewImage.alt = 'Mermaid diagram preview'
      mermaidViewerWrapper.append(previewImage)
      document.body.append(mermaidViewerWrapper)

      mermaidViewer = new Viewer(mermaidViewerWrapper, {
        button: true,
        navbar: false,
        title: false,
        toolbar: true,
        tooltip: true,
        movable: true,
        zoomable: true,
        rotatable: false,
        scalable: false,
        transition: false,
        fullscreen: true,
        keyboard: true,
        url: 'src',
        shown() {
          document.body.classList.add('mermaid-viewer-open')
          document.body.classList.add('viewer-ready')
        },
        viewed() {
          requestAnimationFrame(() => {
            const imageData = mermaidViewer?.imageData
            const viewerData = mermaidViewer?.viewerData
            if (!imageData || !viewerData) return

            const widthScale = (viewerData.width * 0.94) / imageData.width
            const heightScale = (viewerData.height * 0.94) / imageData.height
            const targetScale = Math.min(widthScale, heightScale)

            if (targetScale > 1.02) {
              mermaidViewer.zoomTo(imageData.ratio * targetScale, false)
            }
          })
        },
        hidden() {
          cleanupMermaidViewer()
        }
      })

      mermaidViewer.view(0)
    }

    const initRenderedMermaidFeatures = async (force = false) => {
      await renderMermaidDiagrams(force)
    }

    const getCodeToggleLabels = () => {
      const isChineseRoute =
        route.path.startsWith('/zh-cn/') || route.path.startsWith('/zh-tw/')

      return isChineseRoute
        ? {
            expand: '展开代码',
            collapse: '收起代码'
          }
        : {
            expand: 'Expand code',
            collapse: 'Collapse code'
          }
    }

    const getCodeLineCount = (source) => {
      const normalized = source.replace(/\s+$/, '')
      if (!normalized) return 0
      return normalized.split('\n').length
    }

    const updateCodeToggleButton = (block, button, lineCount) => {
      const labels = getCodeToggleLabels()
      const isCollapsed = block.classList.contains('is-code-collapsed')
      const nextLabel = isCollapsed ? labels.expand : labels.collapse

      button.textContent = `${nextLabel} (${lineCount} 行)`
      button.setAttribute('aria-expanded', String(!isCollapsed))
      button.setAttribute('title', nextLabel)
    }

    const initCollapsibleCodeBlocks = () => {
      const codeBlocks = document.querySelectorAll(
        '.vp-doc div[class*="language-"]:not(.language-mermaid)'
      )

      codeBlocks.forEach((block) => {
        const pre = block.querySelector('pre')
        const code = pre?.querySelector('code')
        if (!pre || !code) return

        const lineCount = getCodeLineCount(code.textContent ?? '')
        const existingToggle = block.querySelector('.code-collapse-toggle')

        if (lineCount < COLLAPSIBLE_CODE_MIN_LINES) {
          block.classList.remove('is-collapsible-code', 'is-code-collapsed')
          existingToggle?.remove()
          return
        }

        block.classList.add('is-collapsible-code')

        let toggle = existingToggle
        if (!toggle) {
          toggle = document.createElement('button')
          toggle.type = 'button'
          toggle.className = 'code-collapse-toggle'
          toggle.addEventListener('click', () => {
            block.classList.toggle('is-code-collapsed')
            updateCodeToggleButton(block, toggle, lineCount)
          })
          block.append(toggle)
        }

        block.classList.add('is-code-collapsed')
        updateCodeToggleButton(block, toggle, lineCount)
      })
    }

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
            return (
              !image.classList.contains('no-viewer') &&
              !image.classList.contains('nav-title-logo')
            )
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
      if (img.classList.contains('nav-title-logo')) return
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

    onMounted(async () => {
      initViewer()
      initTypewriter()
      optimizeImages()
      await initRenderedMermaidFeatures(true)
      initCollapsibleCodeBlocks()

      themeObserver = new MutationObserver(() => {
        const nextTheme = getMermaidTheme()
        if (nextTheme === currentMermaidTheme) return
        nextTick(async () => {
          await initRenderedMermaidFeatures(true)
        })
      })

      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
      })
    })

    watch(
      () => route.path,
      () =>
        nextTick(async () => {
          cleanupMermaidViewer()
          initViewer()
          initTypewriter()
          optimizeImages()
          await initRenderedMermaidFeatures(true)
          initCollapsibleCodeBlocks()
        })
    )

    onBeforeUnmount(() => {
      cleanupMermaidViewer()
      if (themeObserver) {
        themeObserver.disconnect()
        themeObserver = null
      }
    })
  }
}
