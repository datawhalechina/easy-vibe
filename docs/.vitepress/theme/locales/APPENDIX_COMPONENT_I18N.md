# Appendix Component I18n Migration

This document tracks the reusable i18n strategy for appendix Vue components.
Markdown pages should carry long-form translated prose. Vue components should
only own interaction state and read user-visible labels from structured locale
dictionaries.

## Pattern

- Component code imports `useI18n` and the section locale index.
- Locale lookup falls back in this order: current locale, `en`, `zh-cn`.
- Components use `t('section.key')` for scalar labels and `messages.section`
  for structured arrays such as tabs, terms, diagrams, and summary flows.
- Interpolated labels use braces, for example `t('adderChain.bitButton', { bit })`.

Example:

```js
import { useI18n } from '../../../composables/useI18n.js'
import { computerFundamentalsLocale } from '../../../locales/computer-fundamentals/index.js'

const { t, messages } = useI18n(computerFundamentalsLocale)
```

## Current Scope

The first migrated section is `computer-fundamentals`, with locale files in:

- `docs/.vitepress/theme/locales/computer-fundamentals/index.js`
- `docs/.vitepress/theme/locales/computer-fundamentals/zh-cn.js`
- `docs/.vitepress/theme/locales/computer-fundamentals/en.js`

`ai-history` also has a section locale:

- `docs/.vitepress/theme/locales/ai-history/index.js`
- `docs/.vitepress/theme/locales/ai-history/zh-cn.js`
- `docs/.vitepress/theme/locales/ai-history/en.js`

Single-component sections with locale files:

- `docs/.vitepress/theme/locales/monolith-to-microservices/index.js`
- `docs/.vitepress/theme/locales/monolith-to-microservices/zh-cn.js`
- `docs/.vitepress/theme/locales/monolith-to-microservices/en.js`
- `docs/.vitepress/theme/locales/project-architecture/index.js`
- `docs/.vitepress/theme/locales/project-architecture/zh-cn.js`
- `docs/.vitepress/theme/locales/project-architecture/en.js`

Infrastructure sections with locale files:

- `docs/.vitepress/theme/locales/docker-containers/index.js`
- `docs/.vitepress/theme/locales/docker-containers/zh-cn.js`
- `docs/.vitepress/theme/locales/docker-containers/en.js`
- `docs/.vitepress/theme/locales/kubernetes/index.js`
- `docs/.vitepress/theme/locales/kubernetes/zh-cn.js`
- `docs/.vitepress/theme/locales/kubernetes/en.js`
- `docs/.vitepress/theme/locales/search-engines/index.js`
- `docs/.vitepress/theme/locales/search-engines/zh-cn.js`
- `docs/.vitepress/theme/locales/search-engines/en.js`
- `docs/.vitepress/theme/locales/data-visualization/index.js`
- `docs/.vitepress/theme/locales/data-visualization/zh-cn.js`
- `docs/.vitepress/theme/locales/data-visualization/en.js`
- `docs/.vitepress/theme/locales/high-availability/index.js`
- `docs/.vitepress/theme/locales/high-availability/zh-cn.js`
- `docs/.vitepress/theme/locales/high-availability/en.js`
- `docs/.vitepress/theme/locales/system-design-methodology/index.js`
- `docs/.vitepress/theme/locales/system-design-methodology/zh-cn.js`
- `docs/.vitepress/theme/locales/system-design-methodology/en.js`
- `docs/.vitepress/theme/locales/server-backend/index.js`
- `docs/.vitepress/theme/locales/server-backend/zh-cn.js`
- `docs/.vitepress/theme/locales/server-backend/en.js`
- `docs/.vitepress/theme/locales/data-governance/index.js`
- `docs/.vitepress/theme/locales/data-governance/zh-cn.js`
- `docs/.vitepress/theme/locales/data-governance/en.js`
- `docs/.vitepress/theme/locales/distributed-systems/index.js`
- `docs/.vitepress/theme/locales/distributed-systems/zh-cn.js`
- `docs/.vitepress/theme/locales/distributed-systems/en.js`
- `docs/.vitepress/theme/locales/file-storage/index.js`
- `docs/.vitepress/theme/locales/file-storage/zh-cn.js`
- `docs/.vitepress/theme/locales/file-storage/en.js`
- `docs/.vitepress/theme/locales/neural-networks/index.js`
- `docs/.vitepress/theme/locales/neural-networks/zh-cn.js`
- `docs/.vitepress/theme/locales/neural-networks/en.js`
- `docs/.vitepress/theme/locales/linux-basics/index.js`
- `docs/.vitepress/theme/locales/linux-basics/zh-cn.js`
- `docs/.vitepress/theme/locales/linux-basics/en.js`
- `docs/.vitepress/theme/locales/rate-limiting/index.js`
- `docs/.vitepress/theme/locales/rate-limiting/zh-cn.js`
- `docs/.vitepress/theme/locales/rate-limiting/en.js`
- `docs/.vitepress/theme/locales/async-task-queues/index.js`
- `docs/.vitepress/theme/locales/async-task-queues/zh-cn.js`
- `docs/.vitepress/theme/locales/async-task-queues/en.js`
- `docs/.vitepress/theme/locales/git-intro/index.js`
- `docs/.vitepress/theme/locales/git-intro/zh-cn.js`
- `docs/.vitepress/theme/locales/git-intro/en.js`
- `docs/.vitepress/theme/locales/typescript-intro/index.js`
- `docs/.vitepress/theme/locales/typescript-intro/zh-cn.js`
- `docs/.vitepress/theme/locales/typescript-intro/en.js`
- `docs/.vitepress/theme/locales/ide-intro/index.js`
- `docs/.vitepress/theme/locales/ide-intro/zh-cn.js`
- `docs/.vitepress/theme/locales/ide-intro/en.js`
- `docs/.vitepress/theme/locales/ai-native-app/index.js`
- `docs/.vitepress/theme/locales/ai-native-app/zh-cn.js`
- `docs/.vitepress/theme/locales/ai-native-app/en.js`
- `docs/.vitepress/theme/locales/web-basics/index.js`
- `docs/.vitepress/theme/locales/web-basics/zh-cn.js`
- `docs/.vitepress/theme/locales/web-basics/en.js`
- `docs/.vitepress/theme/locales/cloud-services/index.js`
- `docs/.vitepress/theme/locales/cloud-services/zh-cn.js`
- `docs/.vitepress/theme/locales/cloud-services/en.js`
- `docs/.vitepress/theme/locales/backend-evolution/index.js`
- `docs/.vitepress/theme/locales/backend-evolution/zh-cn.js`
- `docs/.vitepress/theme/locales/backend-evolution/en.js`
- `docs/.vitepress/theme/locales/queue-design/index.js`
- `docs/.vitepress/theme/locales/queue-design/zh-cn.js`
- `docs/.vitepress/theme/locales/queue-design/en.js`
- `docs/.vitepress/theme/locales/agent-intro/index.js`
- `docs/.vitepress/theme/locales/agent-intro/zh-cn.js`
- `docs/.vitepress/theme/locales/agent-intro/en.js`
- `docs/.vitepress/theme/locales/engineering-excellence/index.js`
- `docs/.vitepress/theme/locales/engineering-excellence/zh-cn.js`
- `docs/.vitepress/theme/locales/engineering-excellence/en.js`
- `docs/.vitepress/theme/locales/api-intro/index.js`
- `docs/.vitepress/theme/locales/api-intro/zh-cn.js`
- `docs/.vitepress/theme/locales/api-intro/en.js`
- `docs/.vitepress/theme/locales/cache-design/index.js`
- `docs/.vitepress/theme/locales/cache-design/zh-cn.js`
- `docs/.vitepress/theme/locales/cache-design/en.js`
- `docs/.vitepress/theme/locales/image-gen-intro/index.js`
- `docs/.vitepress/theme/locales/image-gen-intro/zh-cn.js`
- `docs/.vitepress/theme/locales/image-gen-intro/en.js`
- `docs/.vitepress/theme/locales/javascript-intro/index.js`
- `docs/.vitepress/theme/locales/javascript-intro/zh-cn.js`
- `docs/.vitepress/theme/locales/javascript-intro/en.js`
- `docs/.vitepress/theme/locales/development-tools/index.js`
- `docs/.vitepress/theme/locales/development-tools/zh-cn.js`
- `docs/.vitepress/theme/locales/development-tools/en.js`
- `docs/.vitepress/theme/locales/context-engineering/index.js`
- `docs/.vitepress/theme/locales/context-engineering/zh-cn.js`
- `docs/.vitepress/theme/locales/context-engineering/en.js`
- `docs/.vitepress/theme/locales/framework-nature/index.js`
- `docs/.vitepress/theme/locales/framework-nature/zh-cn.js`
- `docs/.vitepress/theme/locales/framework-nature/en.js`
- `docs/.vitepress/theme/locales/vlm-intro/index.js`
- `docs/.vitepress/theme/locales/vlm-intro/zh-cn.js`
- `docs/.vitepress/theme/locales/vlm-intro/en.js`
- `docs/.vitepress/theme/locales/audio-intro/index.js`
- `docs/.vitepress/theme/locales/audio-intro/zh-cn.js`
- `docs/.vitepress/theme/locales/audio-intro/en.js`
- `docs/.vitepress/theme/locales/auth-design/index.js`
- `docs/.vitepress/theme/locales/auth-design/zh-cn.js`
- `docs/.vitepress/theme/locales/auth-design/en.js`
- `docs/.vitepress/theme/locales/backend-languages/index.js`
- `docs/.vitepress/theme/locales/backend-languages/zh-cn.js`
- `docs/.vitepress/theme/locales/backend-languages/en.js`
- `docs/.vitepress/theme/locales/cloud-iam/index.js`
- `docs/.vitepress/theme/locales/cloud-iam/zh-cn.js`
- `docs/.vitepress/theme/locales/cloud-iam/en.js`
- `docs/.vitepress/theme/locales/frontend-routing/index.js`
- `docs/.vitepress/theme/locales/frontend-routing/zh-cn.js`
- `docs/.vitepress/theme/locales/frontend-routing/en.js`
- `docs/.vitepress/theme/locales/embedding-vector/index.js`
- `docs/.vitepress/theme/locales/embedding-vector/zh-cn.js`
- `docs/.vitepress/theme/locales/embedding-vector/en.js`
- `docs/.vitepress/theme/locales/api-design/index.js`
- `docs/.vitepress/theme/locales/api-design/zh-cn.js`
- `docs/.vitepress/theme/locales/api-design/en.js`

These `computer-fundamentals` appendix pages now have their component text
externalized:

- `transistor-to-cpu`
- `programming-languages`
- `operating-systems`
- `algorithm-thinking`
- `compilers`
- `data-structures`
- `power-on-to-web`
- `type-systems`
- `computer-organization`
- `vibe-coding-fullstack`

The migrated component set is:

- `TransistorDemo.vue`
- `LogicGateDemo.vue`
- `BinaryAdditionRulesDemo.vue`
- `HalfAdderDemo.vue`
- `FullAdderDemo.vue`
- `AdderChainDemo.vue`
- `CompleteAdderDemo.vue`
- `FunctionalUnitDemo.vue`
- `RegisterDemo.vue`
- `FlipFlopDemo.vue`
- `MinCpuDemo.vue`
- `CpuArchitectureDemo.vue`
- `LanguageMapDemo.vue`
- `OSArchitectureDemo.vue`
- `ProcessDemo.vue`
- `MemoryDemo.vue`
- `FilesystemDemo.vue`
- `ProgramLaunchDemo.vue`
- `AlgorithmDemo.vue`
- `SearchAlgorithmDemo.vue`
- `SortingAlgorithmDemo.vue`
- `RecursiveThinkingDemo.vue`
- `GreedyThinkingDemo.vue`
- `AlgorithmParadigmDemo.vue`
- `CompilerDemo.vue`
- `LexerTokenDemo.vue`
- `ASTVisualizerDemo.vue`
- `CompilerAnalogyDemo.vue`
- `CompileVsInterpretDemo.vue`
- `CodeOptimizationDemo.vue`
- `CompilationPracticeDemo.vue`
- `DataStructureOverviewDemo.vue`
- `DataStructureDemo.vue`
- `LinearStructuresDemo.vue`
- `HashTableDemo.vue`
- `TreeStructureDemo.vue`
- `GraphStructureDemo.vue`
- `DataStructureSelectorDemo.vue`
- `PowerOnDemo.vue`
- `BiosUefiInteractiveDemo.vue`
- `OSBootInteractiveDemo.vue`
- `BrowserArchitectureDemo.vue`
- `URLRequestDemo.vue`
- `RenderingDemo.vue`
- `FullProcessDemo.vue`
- `TypeSystemDemo.vue`
- `StaticVsDynamicDemo.vue`
- `StrongVsWeakDemo.vue`
- `TypeInferenceFlowDemo.vue`
- `GenericTypeDemo.vue`
- `TypeSafetyPracticeDemo.vue`
- `LanguageTypeModelDemo.vue`
- `CodeToInstructionDemo.vue`
- `InstructionFormatDemo.vue`
- `AddressingModeDemo.vue`
- `CISCvsRISCDemo.vue`
- `ControllerDemo.vue`
- `PSWFlagDemo.vue`
- `StorageHierarchyDemo.vue`
- `CacheDemo.vue`
- `BusSystemDemo.vue`
- `IOMethodDemo.vue`
- `NetworkOverviewDemo.vue`
- `PipelineDemo.vue`
- `VibeCodingFlowDemo.vue`
- `DeveloperSkillShiftDemo.vue`
- `ComputerFieldMapDemo.vue`
- `FrontendTriadDemo.vue`
- `FrontendFrameworkDemo.vue`
- `BackendCoreDemo.vue`
- `ProgrammingLanguageMapDemo.vue`
- `LanguageSelectionDemo.vue`
- `FullstackSkillDemo.vue`
- `AIvsTraditionalDemo.vue`
- `CareerPathDemo.vue`
- `LearningStrategyDemo.vue`
- `ExpertSystemWaveDemo.vue`
- `RuleBasedVsLearningDemo.vue`
- `ArchEvolutionDemo.vue`
- `project-architecture/ArchitectureComparisonDemo.vue`
- `docker-containers/DockerArchitectureDemo.vue`
- `docker-containers/DockerLifecycleDemo.vue`
- `kubernetes/K8sArchitectureDemo.vue`
- `kubernetes/K8sWorkloadsDemo.vue`
- `search-engines/InvertedIndexDemo.vue`
- `search-engines/SearchRelevanceDemo.vue`
- `data-visualization/ChartTypeSelectorDemo.vue`
- `data-visualization/DashboardLayoutDemo.vue`
- `high-availability/AvailabilityCalculatorDemo.vue`
- `high-availability/FailoverStrategyDemo.vue`
- `system-design-methodology/SystemDesignStepsDemo.vue`
- `system-design-methodology/CapacityEstimationDemo.vue`
- `server-backend/HttpProtocolDemo.vue`
- `server-backend/SerializationDemo.vue`
- `data-governance/DataQualityDemo.vue`
- `data-governance/DataGovernanceFrameworkDemo.vue`
- `data-governance/DataLineageDemo.vue`
- `distributed-systems/CAPTheoremDemo.vue`
- `distributed-systems/ConsistencyModelsDemo.vue`
- `distributed-systems/DistributedChallengesDemo.vue`
- `file-storage/FileStorageTypeDemo.vue`
- `file-storage/FileUploadFlowDemo.vue`
- `file-storage/CDNAccelerationDemo.vue`
- `neural-networks/NeuronDemo.vue`
- `neural-networks/NetworkLayersDemo.vue`
- `neural-networks/NetworkArchitectureDemo.vue`
- `linux-basics/LinuxFileSystemDemo.vue`
- `linux-basics/LinuxCommandDemo.vue`
- `linux-basics/LinuxPermissionsDemo.vue`
- `rate-limiting/RateLimitAlgorithmDemo.vue`
- `rate-limiting/RateLimiterDemo.vue`
- `rate-limiting/BackpressureDemo.vue`
- `async-task-queues/AsyncTaskFlowDemo.vue`
- `async-task-queues/TaskWorkerDemo.vue`
- `async-task-queues/TaskRetryDemo.vue`
- `async-task-queues/AsyncComparisonDemo.vue`
- `git-intro/GitCommandCheatsheet.vue`
- `git-intro/GitSyncDemo.vue`
- `git-intro/GitBranchVisual.vue`
- `git-intro/GitCommitFlow.vue`
- `typescript-intro/TypeAnnotationDemo.vue`
- `typescript-intro/InterfaceDemo.vue`
- `typescript-intro/GenericDemo.vue`
- `typescript-intro/TypeInferenceDemo.vue`
- `ide-intro/AiHelpDemo.vue`
- `ide-intro/IdeArchitectureDemo.vue`
- `ide-intro/VirtualVSCodeDemo.vue`
- `ai-native-app/AIAppFlowDemo.vue`
- `ai-native-app/AIDesignPrincipleDemo.vue`
- `ai-native-app/AINativeArchDemo.vue`
- `ai-native-app/AIUXPatternDemo.vue`
- `ai-native-app/PromptDesignDemo.vue`
- `web-basics/UrlParserDemo.vue`
- `web-basics/DnsLookupDemo.vue`
- `web-basics/TcpHandshakeDemo.vue`
- `web-basics/HttpExchangeDemo.vue`
- `web-basics/BrowserRenderingDemo.vue`
- `web-basics/CssBoxModel.vue`
- `web-basics/CssFlexbox.vue`
- `web-basics/DomManipulator.vue`
- `web-basics/WebTechTriad.vue`
- `web-basics/ImperativeVsDeclarativeDemo.vue`
- `web-basics/JQueryVsStateDemo.vue`
- `web-basics/RenderingStrategyDemo.vue`
- `web-basics/ResponsiveGridDemo.vue`
- `web-basics/RoutingModeDemo.vue`
- `web-basics/SliceRequestDemo.vue`
- `cloud-services/CloudServicesOverview.vue`
- `cloud-services/ComputeInstanceDemo.vue`
- `cloud-services/DeployWorkflowDemo.vue`
- `cloud-services/PricingCalculator.vue`
- `cloud-services/StorageTypeDemo.vue`
- `backend-evolution/EvolutionIntroDemo.vue`
- `backend-evolution/PhysicalServerDemo.vue`
- `backend-evolution/MonolithDemo.vue`
- `backend-evolution/ContainerDockerDemo.vue`
- `backend-evolution/MicroservicesDemo.vue`
- `backend-evolution/KubernetesDemo.vue`
- `backend-evolution/ServerlessDemo.vue`
- `backend-evolution/ArchitectureComparisonDemo.vue`
- `backend-evolution/TechStackTimelineDemo.vue`
- `queue-design/DecouplingDemo.vue`
- `queue-design/PeakShavingDemo.vue`
- `queue-design/ReliabilityDemo.vue`
- `queue-design/IdempotenceDemo.vue`
- `agent-intro/AgentQuickStartDemo.vue`
- `agent-intro/AgentWorkflowDemo.vue`
- `agent-intro/AgentToolUseDemo.vue`
- `agent-intro/AgentPlanningDemo.vue`
- `agent-intro/AgentMemoryDemo.vue`
- `agent-intro/AgentLevelDemo.vue`
- `agent-intro/AgentArchitectureDemo.vue`
- `agent-intro/FrameworkComparisonDemo.vue`
- `agent-intro/AgentChallengesDemo.vue`
- `agent-intro/AgentFutureDemo.vue`
- `engineering-excellence/CodeSmellDemo.vue`
- `engineering-excellence/RefactoringDemo.vue`
- `engineering-excellence/TestPyramidDemo.vue`
- `engineering-excellence/TDDCycleDemo.vue`
- `engineering-excellence/DesignPatternCatalogDemo.vue`
- `engineering-excellence/PatternPlaygroundDemo.vue`
- `engineering-excellence/TechRadarDemo.vue`
- `engineering-excellence/DecisionMatrixDemo.vue`
- `engineering-excellence/OpenSourceWorkflowDemo.vue`
- `engineering-excellence/LicenseComparisonDemo.vue`
- `engineering-excellence/WebSecurityDemo.vue`
- `engineering-excellence/SecurityChecklistDemo.vue`
- `engineering-excellence/DocStructureDemo.vue`
- `engineering-excellence/TechWritingPracticeDemo.vue`
- `api-intro/ApiTypesComparison.vue`
- `api-intro/ApiFunctionVsHttp.vue`
- `api-intro/DocumentTypesComparison.vue`
- `api-intro/HttpMethodsDemo.vue`
- `api-intro/StatusCodeCategories.vue`
- `api-intro/ApiDocumentDemo.vue`
- `api-intro/ApiPlayground.vue`
- `cache-design/CachePerformanceComparisonDemo.vue`
- `cache-design/CacheLifecycleDemo.vue`
- `cache-design/CacheProblemsDemo.vue`
- `cache-design/CacheConsistencyDemo.vue`
- `cache-design/EcommerceCacheArchitectureDemo.vue`
- `image-gen-intro/DiffusionProcessDemo.vue`
- `javascript-intro/VariableBoxDemo.vue`
- `javascript-intro/ScopeDemo.vue`
- `javascript-intro/DOMTreeDemo.vue`
- `javascript-intro/JSEventLoopDemo.vue`
- `audio-intro/ASRvsTTSDemo.vue`
- `audio-intro/AudioQuickStartDemo.vue`
- `audio-intro/AudioTokenizationDemo.vue`
- `audio-intro/AudioWaveformDemo.vue`
- `audio-intro/AutoregressiveAudioDemo.vue`
- `audio-intro/EmotionControlDemo.vue`
- `audio-intro/MelSpectrogramDemo.vue`
- `audio-intro/SpectrogramViz.vue`
- `audio-intro/TTSPipelineDemo.vue`
- `audio-intro/VoiceCloningDemo.vue`
- `auth-design/AuthBasicsDemo.vue`
- `auth-design/AuthEvolutionDemo.vue`
- `auth-design/AuthInteractiveLoginDemo.vue`
- `auth-design/AuthNvsAuthZDemo.vue`
- `auth-design/CSRFDefenseDemo.vue`
- `auth-design/JWTWorkflowDemo.vue`
- `auth-design/OAuth2FlowDemo.vue`
- `auth-design/PasswordHashingDemo.vue`
- `auth-design/SessionCookieDemo.vue`
- `auth-design/SessionVsJWTDemo.vue`
- `backend-languages/BackendLanguagesDemo.vue`
- `backend-languages/ConcurrencyModelDemo.vue`
- `backend-languages/DeveloperEfficiencyDemo.vue`
- `backend-languages/LanguageComparisonDemo.vue`
- `backend-languages/LanguageEcosystemDemo.vue`
- `backend-languages/LanguageSelectorDemo.vue`
- `backend-languages/LanguageScopeDemo.vue`
- `backend-languages/MemoryManagementDemo.vue`
- `backend-languages/PerformanceBenchmarkDemo.vue`
- `backend-languages/SyntaxComparisonDemo.vue`
- `cloud-iam/AccessKeyManagementDemo.vue`
- `cloud-iam/BestPracticesDemo.vue`
- `cloud-iam/CrossAccountAccessDemo.vue`
- `cloud-iam/IAMStructure.vue`
- `cloud-iam/IamRamComparisonDemo.vue`
- `cloud-iam/IdentityProviderDemo.vue`
- `cloud-iam/MfaSecurityDemo.vue`
- `cloud-iam/PermissionHierarchyDemo.vue`
- `cloud-iam/PolicyEditorDemo.vue`
- `cloud-iam/RolePolicyDemo.vue`
- `frontend-routing/DynamicRoutesDemo.vue`
- `frontend-routing/HashVsHistoryDemo.vue`
- `frontend-routing/MpaRoutingDemo.vue`
- `frontend-routing/NestedRoutesDemo.vue`
- `frontend-routing/RouteGuardsDemo.vue`
- `frontend-routing/RouteMatchingDemo.vue`
- `frontend-routing/RouterArchitectureDemo.vue`
- `frontend-routing/RoutingModesDemo.vue`
- `frontend-routing/SpaNavigationDemo.vue`
- `embedding-vector/EmbeddingConceptDemo.vue`
- `embedding-vector/EmbeddingPipelineDemo.vue`
- `embedding-vector/VectorDatabaseDemo.vue`
- `embedding-vector/VectorIndexDemo.vue`
- `embedding-vector/VectorSimilarityDemo.vue`
- `api-design/ApiRequestDemo.vue`
- `api-design/ApiStyleCompare.vue`
- `api-design/StatusCodeDemo.vue`
- `api-design/ErrorHandlingDemo.vue`
- `api-design/ResponseStructureDemo.vue`
- `api-design/DataFieldDesignDemo.vue`
- `api-design/ErrorResponseDesignDemo.vue`

Non-Chinese locales currently fall back to English component text until dedicated
locale files are added.

## Audit Snapshot

Run:

```bash
node scripts/scan-appendix-component-i18n.mjs --json
```

Current scan summary:

```json
{
  "total": 575,
  "withChinese": 240,
  "withI18n": 321,
  "chineseWithoutI18n": 239,
  "computerFundamentals": {
    "total": 76,
    "withChinese": 0,
    "withI18n": 76,
    "chineseWithoutI18n": 0
  },
  "aiHistory": {
    "total": 13,
    "withChinese": 1,
    "withI18n": 11,
    "chineseWithoutI18n": 0
  },
  "monolithToMicroservices": {
    "total": 1,
    "withChinese": 0,
    "withI18n": 1,
    "chineseWithoutI18n": 0
  },
  "projectArchitecture": {
    "total": 1,
    "withChinese": 0,
    "withI18n": 1,
    "chineseWithoutI18n": 0
  },
  "dockerContainers": {
    "total": 2,
    "withChinese": 0,
    "withI18n": 2,
    "chineseWithoutI18n": 0
  },
  "kubernetes": {
    "total": 2,
    "withChinese": 0,
    "withI18n": 2,
    "chineseWithoutI18n": 0
  },
  "searchEngines": {
    "total": 2,
    "withChinese": 0,
    "withI18n": 2,
    "chineseWithoutI18n": 0
  },
  "dataVisualization": {
    "total": 2,
    "withChinese": 0,
    "withI18n": 2,
    "chineseWithoutI18n": 0
  },
  "highAvailability": {
    "total": 2,
    "withChinese": 0,
    "withI18n": 2,
    "chineseWithoutI18n": 0
  },
  "systemDesignMethodology": {
    "total": 2,
    "withChinese": 0,
    "withI18n": 2,
    "chineseWithoutI18n": 0
  },
  "serverBackend": {
    "total": 4,
    "withChinese": 0,
    "withI18n": 2,
    "chineseWithoutI18n": 0
  },
  "dataGovernance": {
    "total": 3,
    "withChinese": 0,
    "withI18n": 3,
    "chineseWithoutI18n": 0
  },
  "distributedSystems": {
    "total": 3,
    "withChinese": 0,
    "withI18n": 3,
    "chineseWithoutI18n": 0
  },
  "fileStorage": {
    "total": 3,
    "withChinese": 0,
    "withI18n": 3,
    "chineseWithoutI18n": 0
  },
  "neuralNetworks": {
    "total": 3,
    "withChinese": 0,
    "withI18n": 3,
    "chineseWithoutI18n": 0
  },
  "linuxBasics": {
    "total": 3,
    "withChinese": 0,
    "withI18n": 3,
    "chineseWithoutI18n": 0
  },
  "rateLimiting": {
    "total": 3,
    "withChinese": 0,
    "withI18n": 3,
    "chineseWithoutI18n": 0
  },
  "asyncTaskQueues": {
    "total": 4,
    "withChinese": 0,
    "withI18n": 4,
    "chineseWithoutI18n": 0
  },
  "gitIntro": {
    "total": 4,
    "withChinese": 0,
    "withI18n": 4,
    "chineseWithoutI18n": 0
  },
  "typescriptIntro": {
    "total": 4,
    "withChinese": 0,
    "withI18n": 4,
    "chineseWithoutI18n": 0
  },
  "ideIntro": {
    "total": 3,
    "withChinese": 0,
    "withI18n": 3,
    "chineseWithoutI18n": 0
  },
  "aiNativeApp": {
    "total": 5,
    "withChinese": 0,
    "withI18n": 5,
    "chineseWithoutI18n": 0
  },
  "webBasics": {
    "total": 17,
    "withChinese": 0,
    "withI18n": 15,
    "chineseWithoutI18n": 0
  },
  "cloudServices": {
    "total": 6,
    "withChinese": 0,
    "withI18n": 5,
    "chineseWithoutI18n": 0
  },
  "backendEvolution": {
    "total": 9,
    "withChinese": 0,
    "withI18n": 9,
    "chineseWithoutI18n": 0
  },
  "queueDesign": {
    "total": 4,
    "withChinese": 0,
    "withI18n": 4,
    "chineseWithoutI18n": 0
  },
  "agentIntro": {
    "total": 10,
    "withChinese": 0,
    "withI18n": 10,
    "chineseWithoutI18n": 0
  },
  "audioIntro": {
    "total": 10,
    "withChinese": 0,
    "withI18n": 10,
    "chineseWithoutI18n": 0
  },
  "engineeringExcellence": {
    "total": 14,
    "withChinese": 0,
    "withI18n": 14,
    "chineseWithoutI18n": 0
  },
  "apiIntro": {
    "total": 7,
    "withChinese": 0,
    "withI18n": 7,
    "chineseWithoutI18n": 0
  },
  "cacheDesign": {
    "total": 5,
    "withChinese": 0,
    "withI18n": 5,
    "chineseWithoutI18n": 0
  },
  "imageGenIntro": {
    "total": 1,
    "withChinese": 0,
    "withI18n": 1,
    "chineseWithoutI18n": 0
  },
  "javascriptIntro": {
    "total": 4,
    "withChinese": 0,
    "withI18n": 4,
    "chineseWithoutI18n": 0
  },
  "authDesign": {
    "total": 10,
    "withChinese": 0,
    "withI18n": 10,
    "chineseWithoutI18n": 0
  },
  "backendLanguages": {
    "total": 10,
    "withChinese": 0,
    "withI18n": 10,
    "chineseWithoutI18n": 0
  },
  "cloudIam": {
    "total": 10,
    "withChinese": 0,
    "withI18n": 10,
    "chineseWithoutI18n": 0
  },
  "frontendRouting": {
    "total": 9,
    "withChinese": 0,
    "withI18n": 9,
    "chineseWithoutI18n": 0
  },
  "embeddingVector": {
    "total": 5,
    "withChinese": 0,
    "withI18n": 5,
    "chineseWithoutI18n": 0
  },
  "apiDesign": {
    "total": 7,
    "withChinese": 0,
    "withI18n": 7,
    "chineseWithoutI18n": 0
  },
  "componentStateManagement": {
    "total": 8,
    "withChinese": 0,
    "withI18n": 8,
    "chineseWithoutI18n": 0
  },
  "topRemaining": [
    "llm-intro: 10/10",
    "tracking-design: 9/9",
    "backend-layered-architecture: 8/8",
    "cloud-topology: 8/8",
    "concurrency-models: 8/8",
    "data: 8/8"
  ]
}
```

The scan is intentionally conservative: it reports Vue components that still
contain Chinese text and do not yet import the component i18n layer. It is a
triage tool, not proof that every translated string is high quality.

Note: `ExpertSystemWaveDemo.vue` and `RuleBasedVsLearningDemo.vue` are registered
components but are not currently referenced by `ai-history.md`, so page HTML
cannot prove their rendered copy. Use lint, component Chinese-residue scan, and
the section scan (`ai-history.chineseWithoutI18n === 0`) as the authoritative
check for those two components.

The previous `computer-fundamentals` residue was legacy component code. The 28
files below were not found in any Markdown page under `docs/`, and have been
retired from the component directory and global registry:

- `AdderDemo.vue`
- `AlgorithmOverviewDemo.vue`
- `AppLaunchDemo.vue`
- `ApplicationLayerDemo.vue`
- `BIOSPostDemo.vue`
- `BiosUefiDemo.vue`
- `BootProcessDemo.vue`
- `DataEncodingBasicsDemo.vue`
- `DataLifecycleDemo.vue`
- `DataLinkLayerDemo.vue`
- `DesktopDemo.vue`
- `EncodingDemo.vue`
- `EncodingStorageTransmissionDemo.vue`
- `LanguageEvolutionDemo.vue`
- `LanguageScenarioDemo.vue`
- `NetworkLayers.vue`
- `NetworkLayersSimple.vue`
- `NetworkPrincipleDemo.vue`
- `PhysicalLayerDemo.vue`
- `ProgrammingLanguageComparisonDemo.vue`
- `ProgrammingParadigmDemo.vue`
- `SandToIntelligenceDemo.vue`
- `StorageDemo.vue`
- `SubnetCalculator.vue`
- `TcpUdpComparison.vue`
- `TcpUdpSimple.vue`
- `TransmissionDemo.vue`
- `TransportLayerDemo.vue`

The previous `web-basics` residue also included unused legacy component code.
The 15 files below were not found in any Markdown page under `docs/`, and have
been retired from the component directory and global registry:

- `BigFrontendScopeDemo.vue`
- `BundlerSizeDemo.vue`
- `CssCommonProperties.vue`
- `CssLayoutDemo.vue`
- `CssPlaygroundDemo.vue`
- `CssSelectorsDemo.vue`
- `DeploymentArchitecture.vue`
- `NetworkLayers.vue`
- `NetworkTroubleshooting.vue`
- `SemanticTagsDemo.vue`
- `SpaStatePreservationDemo.vue`
- `SubnetCalculator.vue`
- `TcpUdpComparison.vue`
- `UrlToBrowserDemo.vue`
- `VueReactComparisonDemo.vue`

The previous `queue-design` residue also included unused legacy component code.
The 12 files below were not found in Markdown pages or non-self code references,
and have been retired from the component directory and global registry:

- `CouplingDemo.vue`
- `DeadLetterQueueDemo.vue`
- `DelayedMessageDemo.vue`
- `MQArchitectureDemo.vue`
- `MQComparisonDemo.vue`
- `MessageQueueComparisonDemo.vue`
- `MessageQueueComponentsDemo.vue`
- `MessageQueueDemo.vue`
- `PointToPointVsPubSubDemo.vue`
- `ProducerConsumerDemo.vue`
- `PubSubDemo.vue`
- `SeckillSystemDemo.vue`

The previous `agent-intro` residue also included unused legacy component code.
The 4 files below were not found in Markdown pages or non-self code references,
and have been retired from the component directory and global registry:

- `AgentTaskFlowDemo.vue`
- `FrameworkSelectionDemo.vue`
- `AgentMultiToolPrinciple.vue`
- `AgentMemoryPrinciple.vue`

The previous `api-intro` residue also included unused legacy component code.
The 6 files below were not found in Markdown pages or non-self code references,
and have been retired from the component directory and global registry:

- `ApiQuickStartDemo.vue`
- `ApiConceptDemo.vue`
- `RequestResponseFlow.vue`
- `ApiMethodDemo.vue`
- `RealWorldApiDemo.vue`
- `FunctionApiDemo.vue`

The previous `cache-design` residue also included unused legacy component code.
The 10 files below were not found in Markdown pages or non-self code references,
and have been retired from the component directory and global registry:

- `CacheArchitectureDemo.vue`
- `LocalityPrincipleDemo.vue`
- `LocalVsDistributedCacheDemo.vue`
- `MultiLevelCacheDemo.vue`
- `CachePatternsDemo.vue`
- `ProductCacheDemo.vue`
- `CacheArchitectureOverview.vue`
- `CacheHierarchyDemo.vue`
- `CachePatternComparisonDemo.vue`
- `CacheMonitoringDashboardDemo.vue`

The previous `image-gen-intro` residue also included unused legacy component code.
The 12 files below were not found in Markdown pages or non-self code references,
and have been retired from the component directory and global registry:

- `CFGScaleDemo.vue`
- `ControlNetDemo.vue`
- `FlowMatchingDemo.vue`
- `ImageGenArchitecture.vue`
- `ImageGenQuickStartDemo.vue`
- `LatentSpaceViz.vue`
- `LoRADemo.vue`
- `PromptEngineeringDemo.vue`
- `PromptVisualizer.vue`
- `SamplerComparisonDemo.vue`
- `UNetDenoiseDemo.vue`
- `VaeEncoderDemo.vue`

The previous `javascript-intro` residue also included unused legacy component
code. The 9 files below were not found in Markdown pages or non-self code
references, and have been retired from the component directory and global
registry:

- `AsyncDemo.vue`
- `AsyncRestaurantDemo.vue`
- `ClosureDemo.vue`
- `DataTypeDemo.vue`
- `FunctionMachineDemo.vue`
- `PrototypeDemo.vue`
- `ReferenceDemo.vue`
- `ThisContextDemo.vue`
- `VariableScopeDemo.vue`

The `development-tools` section now has all 12 Markdown-referenced components
externalized through `development-tools` locale dictionaries. Unlike the earlier
interrupted audit, these components are all referenced by localized Markdown
pages and must remain registered globally:

- `EnvVarOverviewDemo.vue`
- `PathSearchDemo.vue`
- `EnvScopeDemo.vue`
- `EnvExportDemo.vue`
- `ApiKeyDangerDemo.vue`
- `DotEnvDemo.vue`
- `ServerSecretDemo.vue`
- `PackageManagerOverviewDemo.vue`
- `PackageInstallDemo.vue`
- `DependencyTreeDemo.vue`
- `SSHAuthDemo.vue`
- `RegexDemo.vue`

Latest source scan after `development-tools`:

```json
{
  "total": 578,
  "withChinese": 336,
  "withI18n": 227,
  "chineseWithoutI18n": 335,
  "developmentTools": 0
}
```

The `context-engineering` section now has all 11 Markdown-referenced components
externalized through `context-engineering` locale dictionaries:

- `AgentContextFlow.vue`
- `IntroProblemReasonSolution.vue`
- `ContextWindowVisualizer.vue`
- `KVCacheDemo.vue`
- `SlidingWindowDemo.vue`
- `LostInMiddleDemo.vue`
- `SelectiveContextDemo.vue`
- `RAGSimulationDemo.vue`
- `ContextCompressionDemo.vue`
- `MemoryPalaceDemo.vue`
- `MemoryPalaceActionDemo.vue`

Latest source scan after `context-engineering`:

```json
{
  "total": 578,
  "withChinese": 325,
  "withI18n": 238,
  "chineseWithoutI18n": 324,
  "contextEngineering": 0
}
```

The `framework-nature` section now has all 11 Markdown-referenced components
externalized through `framework-nature` locale dictionaries:

- `ComponentTreeDemo.vue`
- `DataUIGapDemo.vue`
- `DeclarativeFormulaDemo.vue`
- `DomOperationCostDemo.vue`
- `FrameworkMotivationDemo.vue`
- `FrameworkSpectrumDemo.vue`
- `ManualVsAutoSyncDemo.vue`
- `ReactivityMechanismDemo.vue`
- `VirtualDomDiffDemo.vue`
- `WhatIsDomDemo.vue`
- `WhyNoAutoSyncDemo.vue`

Latest source scan after `framework-nature`:

```json
{
  "total": 578,
  "withChinese": 314,
  "withI18n": 249,
  "chineseWithoutI18n": 313,
  "frameworkNature": 0
}
```

The `vlm-intro` section now has all 11 appendix components externalized through
`vlm-intro` locale dictionaries:

- `AttentionDemo.vue`
- `FeatureAlignmentDemo.vue`
- `LinearProjectionDemo.vue`
- `ModelArchitectureComparisonDemo.vue`
- `PatchifyDemo.vue`
- `PositionalEmbeddingDemo.vue`
- `ProjectorDemo.vue`
- `TrainingPipelineDemo.vue`
- `VLMInferenceDemo.vue`
- `ViTOutputDemo.vue`
- `VlmQuickStartDemo.vue`

Latest source scan after `vlm-intro`:

```json
{
  "total": 578,
  "withChinese": 303,
  "withI18n": 260,
  "chineseWithoutI18n": 302,
  "vlmIntro": 0
}
```

## Priority Order

1. Migrate remaining high-volume appendix sections next:
   `llm-intro`, `api-design`, `tracking-design`, and
   `backend-layered-architecture`.
2. For each section, create a section locale folder and keep component arrays
   in the dictionary instead of hardcoding labels in Vue files.
3. Treat `llm-intro` as a dedicated migration batch. It contains long teaching
   copy, code examples, token data, and multi-step animation state, so migrate
   it component by component rather than as a quick static-array pass.
4. Add real `ja-jp`, `ko-kr`, `es-es`, `fr-fr`, `de-de`, `ar-sa`, `vi-vn`, and
   `zh-tw` dictionaries only after the English fallback is structurally stable.

## Verification

For a component batch:

```bash
npx eslint docs/.vitepress/theme/components/appendix/<section>/*.vue docs/.vitepress/theme/locales/<section>/*.js
node scripts/scan-appendix-component-i18n.mjs --details
```

For the completed `development-tools` section:

```bash
node --check docs/.vitepress/theme/locales/development-tools/zh-cn.js
node --check docs/.vitepress/theme/locales/development-tools/en.js
rg -n "[\p{Han}]" docs/.vitepress/theme/components/appendix/development-tools/*.vue || true
npx eslint docs/.vitepress/theme/components/appendix/development-tools/*.vue docs/.vitepress/theme/locales/development-tools/*.js
VITEPRESS_BUILD_LOCALES=ko-kr BUILD_LOCALE_GROUP_SIZE=1 npm run build:locales
git checkout -- docs/public/sitemap.xml
```

For the completed `context-engineering` section:

```bash
node --check docs/.vitepress/theme/locales/context-engineering/zh-cn.js
node --check docs/.vitepress/theme/locales/context-engineering/en.js
rg -n "[\p{Han}]" docs/.vitepress/theme/components/appendix/context-engineering/*.vue || true
npx eslint docs/.vitepress/theme/components/appendix/context-engineering/*.vue docs/.vitepress/theme/locales/context-engineering/*.js
VITEPRESS_BUILD_LOCALES=ko-kr BUILD_LOCALE_GROUP_SIZE=1 npm run build:locales
git checkout -- docs/public/sitemap.xml
```

For the completed `framework-nature` section:

```bash
node --check docs/.vitepress/theme/locales/framework-nature/zh-cn.js
node --check docs/.vitepress/theme/locales/framework-nature/en.js
rg -n "[\p{Han}]" docs/.vitepress/theme/components/appendix/framework-nature/*.vue || true
npx eslint docs/.vitepress/theme/components/appendix/framework-nature/*.vue docs/.vitepress/theme/locales/framework-nature/*.js
VITEPRESS_BUILD_LOCALES=ko-kr BUILD_LOCALE_GROUP_SIZE=1 npm run build:locales
git checkout -- docs/public/sitemap.xml
```

For the completed `vlm-intro` section:

```bash
node --check docs/.vitepress/theme/locales/vlm-intro/zh-cn.js
node --check docs/.vitepress/theme/locales/vlm-intro/en.js
rg -n "[\p{Han}]" docs/.vitepress/theme/components/appendix/vlm-intro/*.vue || true
npx eslint docs/.vitepress/theme/components/appendix/vlm-intro/*.vue docs/.vitepress/theme/locales/vlm-intro/*.js
VITEPRESS_BUILD_LOCALES=ko-kr BUILD_LOCALE_GROUP_SIZE=1 npm run build:locales
git checkout -- docs/public/sitemap.xml
```

For the completed `embedding-vector` section:

```bash
node --check docs/.vitepress/theme/locales/embedding-vector/zh-cn.js
node --check docs/.vitepress/theme/locales/embedding-vector/en.js
rg -n "[\p{Han}]" docs/.vitepress/theme/components/appendix/embedding-vector/*.vue || true
npx eslint docs/.vitepress/theme/components/appendix/embedding-vector/*.vue docs/.vitepress/theme/locales/embedding-vector/*.js
node scripts/scan-appendix-component-i18n.mjs --json
VITEPRESS_BUILD_LOCALES=ko-kr BUILD_LOCALE_GROUP_SIZE=1 npm run build:locales
git checkout -- docs/public/sitemap.xml
```

The section should report:

```json
{
  "section": "embedding-vector",
  "total": 5,
  "withChinese": 0,
  "withI18n": 5,
  "chineseWithoutI18n": 0
}
```

For the completed `api-design` section, the currently verified component set is:

- `ApiRequestDemo.vue`
- `ApiStyleCompare.vue`
- `StatusCodeDemo.vue`
- `ErrorHandlingDemo.vue`
- `ResponseStructureDemo.vue`
- `DataFieldDesignDemo.vue`
- `ErrorResponseDesignDemo.vue`

Current source-level check:

```bash
node --check docs/.vitepress/theme/locales/api-design/zh-cn.js
node --check docs/.vitepress/theme/locales/api-design/en.js
rg -n "[\p{Han}]" docs/.vitepress/theme/components/appendix/api-design/*.vue || true
npx eslint docs/.vitepress/theme/components/appendix/api-design/*.vue docs/.vitepress/theme/locales/api-design/*.js docs/.vitepress/theme/index.js
node scripts/scan-appendix-component-i18n.mjs --json
VITEPRESS_BUILD_LOCALES=ko-kr BUILD_LOCALE_GROUP_SIZE=1 npm run build:locales
git checkout -- docs/public/sitemap.xml
```

The section currently reports:

```json
{
  "section": "api-design",
  "total": 7,
  "withChinese": 0,
  "withI18n": 7,
  "chineseWithoutI18n": 0
}
```

The previous `api-design` residue also included unused legacy component code.
The 3 files below were not found in Markdown pages or non-self code references,
and have been retired from the component directory and global registry:

- `ApiVersioningDemo.vue`
- `RestfulApiFlow.vue`
- `RestfulUrlDemo.vue`

For the completed `api-intro` section, the current verified source-level check
is:

```bash
node --check docs/.vitepress/theme/locales/api-intro/zh-cn.js
node --check docs/.vitepress/theme/locales/api-intro/en.js
npx eslint docs/.vitepress/theme/components/appendix/api-intro/*.vue docs/.vitepress/theme/locales/api-intro/*.js docs/.vitepress/theme/index.js
rg -n "[\p{Han}]" docs/.vitepress/theme/components/appendix/api-intro/*.vue || true
node scripts/scan-appendix-component-i18n.mjs --json
```

The section should report:

```json
{
  "section": "api-intro",
  "total": 7,
  "withChinese": 0,
  "withI18n": 7,
  "chineseWithoutI18n": 0
}
```

The page-level fallback check is:

```bash
VITEPRESS_BUILD_LOCALES=ko-kr BUILD_LOCALE_GROUP_SIZE=1 npm run build:locales
rg -n "Function API vs HTTP API|API Playground|How to Read Different Doc Types" docs/.vitepress/dist/ko-kr/appendix/4-server-and-backend/api-intro.html
git checkout -- docs/public/sitemap.xml
```

For the completed `cache-design` section, the current verified source-level
check is:

```bash
node --check docs/.vitepress/theme/locales/cache-design/zh-cn.js
node --check docs/.vitepress/theme/locales/cache-design/en.js
npx eslint docs/.vitepress/theme/components/appendix/cache-design/*.vue docs/.vitepress/theme/locales/cache-design/*.js docs/.vitepress/theme/index.js
rg -n "[\p{Han}]" docs/.vitepress/theme/components/appendix/cache-design/*.vue || true
node scripts/scan-appendix-component-i18n.mjs --json
```

The section should report:

```json
{
  "section": "cache-design",
  "total": 5,
  "withChinese": 0,
  "withI18n": 5,
  "chineseWithoutI18n": 0
}
```

The page-level fallback check is:

```bash
VITEPRESS_BUILD_LOCALES=ko-kr BUILD_LOCALE_GROUP_SIZE=1 npm run build:locales
rg -n "Cache Lifecycle Demo|Three Common Cache Problems|E-commerce Cache Architecture Demo" docs/.vitepress/dist/ko-kr/appendix/4-server-and-backend/caching.html
git checkout -- docs/public/sitemap.xml
```

For the completed `image-gen-intro` section, the current verified source-level
check is:

```bash
node --check docs/.vitepress/theme/locales/image-gen-intro/zh-cn.js
node --check docs/.vitepress/theme/locales/image-gen-intro/en.js
npx eslint docs/.vitepress/theme/components/appendix/image-gen-intro/*.vue docs/.vitepress/theme/locales/image-gen-intro/*.js docs/.vitepress/theme/index.js
rg -n "[\p{Han}]" docs/.vitepress/theme/components/appendix/image-gen-intro/*.vue || true
node scripts/scan-appendix-component-i18n.mjs --json
```

The section should report:

```json
{
  "section": "image-gen-intro",
  "total": 1,
  "withChinese": 0,
  "withI18n": 1,
  "chineseWithoutI18n": 0
}
```

The page-level fallback check is:

```bash
VITEPRESS_BUILD_LOCALES=ko-kr BUILD_LOCALE_GROUP_SIZE=1 npm run build:locales
rg -n "Start denoising|Focus:" docs/.vitepress/dist/ko-kr/appendix/8-artificial-intelligence/image-generation.html
git checkout -- docs/public/sitemap.xml
```

For the completed `javascript-intro` section, the current verified source-level
check is:

```bash
node --check docs/.vitepress/theme/locales/javascript-intro/zh-cn.js
node --check docs/.vitepress/theme/locales/javascript-intro/en.js
npx eslint docs/.vitepress/theme/components/appendix/javascript-intro/*.vue docs/.vitepress/theme/locales/javascript-intro/*.js docs/.vitepress/theme/index.js
rg -n "[\p{Han}]" docs/.vitepress/theme/components/appendix/javascript-intro/*.vue || true
node scripts/scan-appendix-component-i18n.mjs --json
```

The section should report:

```json
{
  "section": "javascript-intro",
  "total": 4,
  "withChinese": 0,
  "withI18n": 4,
  "chineseWithoutI18n": 0
}
```

The page-level fallback check is:

```bash
VITEPRESS_BUILD_LOCALES=ko-kr BUILD_LOCALE_GROUP_SIZE=1 npm run build:locales
rg -n "Variables Are Named Boxes|Scope: where variables are visible|DOM Tree: the Webpage JavaScript Sees|Event Loop: How JavaScript Executes Code" docs/.vitepress/dist/ko-kr/appendix/3-browser-and-frontend/javascript-deep-dive.html docs/.vitepress/dist/ko-kr/appendix/3-browser-and-frontend/browser-as-os-rendering.html docs/.vitepress/dist/ko-kr/appendix/4-server-and-backend/concurrency-async.html
git checkout -- docs/public/sitemap.xml
```

For `ai-native-app`, the current verified source-level check is:

```bash
npx eslint docs/.vitepress/theme/components/appendix/ai-native-app/*.vue docs/.vitepress/theme/locales/ai-native-app/*.js
rg -n "[\p{Han}]" docs/.vitepress/theme/components/appendix/ai-native-app || true
node scripts/scan-appendix-component-i18n.mjs --json
```

The section should report:

```json
{
  "section": "ai-native-app",
  "total": 5,
  "withChinese": 0,
  "withI18n": 5,
  "chineseWithoutI18n": 0
}
```

The page-level fallback check is:

```bash
VITEPRESS_BUILD_LOCALES=ko-kr BUILD_LOCALE_GROUP_SIZE=1 npm run build:locales
node - <<'NODE'
const fs = require('fs')
const html = fs.readFileSync(
  'docs/.vitepress/dist/ko-kr/appendix/8-artificial-intelligence/ai-native-app-design.html',
  'utf8'
)
const present = [
  'Traditional Apps vs AI-Native Apps',
  'AI-Native Design Principles',
  'Prompt Engineering Lab',
  'AI-Native Interaction Patterns',
  'AI Application Request Flow'
]
const absent = [
  '传统应用 vs AI 原生应用',
  'AI 原生设计原则',
  'Prompt 工程实验室',
  'AI 原生交互模式',
  'AI 应用请求处理流程'
]
let ok = true
for (const s of present) ok = html.includes(s) && ok
for (const s of absent) ok = !html.includes(s) && ok
process.exit(ok ? 0 : 1)
NODE
git checkout -- docs/public/sitemap.xml
```

For the `web-basics` network components used by
`computer-networks.html`, the current verified source-level check is:

```bash
npx eslint docs/.vitepress/theme/components/appendix/web-basics/UrlParserDemo.vue docs/.vitepress/theme/components/appendix/web-basics/DnsLookupDemo.vue docs/.vitepress/theme/components/appendix/web-basics/TcpHandshakeDemo.vue docs/.vitepress/theme/components/appendix/web-basics/HttpExchangeDemo.vue docs/.vitepress/theme/components/appendix/web-basics/BrowserRenderingDemo.vue docs/.vitepress/theme/locales/web-basics/*.js
rg -n "[\p{Han}]" docs/.vitepress/theme/components/appendix/web-basics/UrlParserDemo.vue docs/.vitepress/theme/components/appendix/web-basics/DnsLookupDemo.vue docs/.vitepress/theme/components/appendix/web-basics/TcpHandshakeDemo.vue docs/.vitepress/theme/components/appendix/web-basics/HttpExchangeDemo.vue docs/.vitepress/theme/components/appendix/web-basics/BrowserRenderingDemo.vue || true
node scripts/scan-appendix-component-i18n.mjs --json
```

The page-level fallback check is:

```bash
VITEPRESS_BUILD_LOCALES=ko-kr BUILD_LOCALE_GROUP_SIZE=1 npm run build:locales
node - <<'NODE'
const fs = require('fs')
const html = fs.readFileSync(
  'docs/.vitepress/dist/ko-kr/appendix/1-computer-fundamentals/computer-networks.html',
  'utf8'
)
const present = [
  'URL Parsing -- Translating human text into structured information',
  'DNS Lookup -- Finding coordinates in the address book',
  'TCP Three-Way Handshake -- Establishing a reliable channel',
  'HTTP Request and Response -- Sending a note to buy a package',
  'Browser Rendering -- Turning plain text into a polished page'
]
const absent = [
  'URL 解析 -- 把人类文字翻译成结构化信息',
  'DNS 解析 -- 查地址簿找坐标',
  'TCP 三次握手 -- 建立可靠通话渠道',
  'HTTP 请求与响应 -- 寄纸条买包裹',
  '浏览器渲染 -- 干瘪文字拆解组装变成精美画面'
]
let ok = true
for (const s of present) ok = html.includes(s) && ok
for (const s of absent) ok = !html.includes(s) && ok
process.exit(ok ? 0 : 1)
NODE
git checkout -- docs/public/sitemap.xml
```

For the completed `web-basics` section, the current verified source-level check
is:

```bash
npx eslint docs/.vitepress/theme/components/appendix/web-basics/*.vue docs/.vitepress/theme/locales/web-basics/*.js
rg -n "[\p{Han}]" docs/.vitepress/theme/components/appendix/web-basics/*.vue || true
node scripts/scan-appendix-component-i18n.mjs --json
```

The section should report:

```json
{
  "section": "web-basics",
  "total": 17,
  "withChinese": 0,
  "withI18n": 15,
  "chineseWithoutI18n": 0
}
```

The page-level fallback check for `html-css-layout.html` and
`frontend-frameworks.html` is:

```bash
VITEPRESS_BUILD_LOCALES=ko-kr BUILD_LOCALE_GROUP_SIZE=1 npm run build:locales
node - <<'NODE'
const fs = require('fs')
const checks = [
  {
    file: 'docs/.vitepress/dist/ko-kr/appendix/3-browser-and-frontend/html-css-layout.html',
    present: ['CSS Box Model', 'Flexbox Layout', 'DOM Manipulation Demo', 'HTML / CSS / JavaScript Collaboration'],
    absent: ['CSS 盒模型', 'Flexbox 布局', 'DOM 操作演示', 'HTML / CSS / JavaScript 协作演示']
  },
  {
    file: 'docs/.vitepress/dist/ko-kr/appendix/3-browser-and-frontend/frontend-frameworks.html',
    present: ['Imperative vs Declarative', 'What is jQuery? Understand it with a cart count', 'Rendering Strategies: CSR / SSR / SSG', 'Responsive Layout: one codebase, many screens', 'Routing Mode: full-page reload vs partial switch', 'Image slicing era: more requests means slower loading'],
    absent: ['命令式 vs 声明式', '什么是 jQuery？用“购物车数量”秒懂', '渲染策略：CSR / SSR / SSG', '响应式布局：一套代码，多种屏幕', '路由方式：整页刷新 vs 局部切换', '切图时代：请求数越多越慢']
  }
]
let ok = true
for (const check of checks) {
  const html = fs.readFileSync(check.file, 'utf8')
  for (const text of check.present) ok = html.includes(text) && ok
  for (const text of check.absent) ok = !html.includes(text) && ok
}
process.exit(ok ? 0 : 1)
NODE
git checkout -- docs/public/sitemap.xml
```

For the active `cloud-services` components used by
`cloud-platforms.html`, the current verified source-level check is:

```bash
npx eslint docs/.vitepress/theme/components/appendix/cloud-services/CloudServicesOverview.vue docs/.vitepress/theme/components/appendix/cloud-services/ComputeInstanceDemo.vue docs/.vitepress/theme/components/appendix/cloud-services/DeployWorkflowDemo.vue docs/.vitepress/theme/components/appendix/cloud-services/PricingCalculator.vue docs/.vitepress/theme/components/appendix/cloud-services/StorageTypeDemo.vue docs/.vitepress/theme/locales/cloud-services/*.js
rg -n "[\p{Han}]" docs/.vitepress/theme/components/appendix/cloud-services/CloudServicesOverview.vue docs/.vitepress/theme/components/appendix/cloud-services/ComputeInstanceDemo.vue docs/.vitepress/theme/components/appendix/cloud-services/DeployWorkflowDemo.vue docs/.vitepress/theme/components/appendix/cloud-services/PricingCalculator.vue docs/.vitepress/theme/components/appendix/cloud-services/StorageTypeDemo.vue || true
VITEPRESS_BUILD_LOCALES=ko-kr BUILD_LOCALE_GROUP_SIZE=1 npm run build:locales
git checkout -- docs/public/sitemap.xml
```

`cloud-platforms.md` currently references only these five components across
locales:

- `CloudServicesOverview`
- `ComputeInstanceDemo`
- `StorageTypeDemo`
- `PricingCalculator`
- `DeployWorkflowDemo`

The previous `cloud-services` residue came from unused legacy component code.
The 14 files below were not found in Markdown pages or non-self code references,
and have been retired from the component directory and global registry:

- `ApiCallDemo.vue`
- `AwsVsAliyunDemo.vue`
- `CloudHistoryDemo.vue`
- `CloudServicesMapDemo.vue`
- `ComputeServicesDemo.vue`
- `DatabaseServicesDemo.vue`
- `K8sServicesDemo.vue`
- `NetworkServicesDemo.vue`
- `PricingModelDemo.vue`
- `ProviderComparison.vue`
- `RegionLatencyDemo.vue`
- `SecurityServicesDemo.vue`
- `ServiceSelectionDemo.vue`
- `StorageServicesDemo.vue`

For the completed `backend-evolution` section, the current verified
source-level check is:

```bash
npx eslint docs/.vitepress/theme/components/appendix/backend-evolution/*.vue docs/.vitepress/theme/locales/backend-evolution/*.js docs/.vitepress/theme/index.js
rg -n "[\p{Han}]" docs/.vitepress/theme/components/appendix/backend-evolution/*.vue || true
node scripts/scan-appendix-component-i18n.mjs --json
```

The section should report:

```json
{
  "section": "backend-evolution",
  "total": 9,
  "withChinese": 0,
  "withI18n": 9,
  "chineseWithoutI18n": 0
}
```

The page-level fallback check for `web-frameworks.html` is:

```bash
VITEPRESS_BUILD_LOCALES=ko-kr BUILD_LOCALE_GROUP_SIZE=1 npm run build:locales
node - <<'NODE'
const fs = require('fs')
const html = fs.readFileSync(
  'docs/.vitepress/dist/ko-kr/appendix/4-server-and-backend/web-frameworks.html',
  'utf8'
)
const present = [
  'Backend Architecture Evolution',
  'Physical Server Era Demo',
  'Monolithic Architecture Demo',
  'Docker Containerization Demo',
  'Microservices Architecture Demo',
  'Kubernetes Orchestration Demo',
  'Serverless Architecture Demo',
  'Architecture Evolution Comparison',
  'Technology Stack Evolution Timeline'
]
const absent = [
  '后端架构进化之旅',
  '物理服务器时代演示',
  '单体架构演示',
  'Docker 容器化演示',
  '微服务架构演示',
  'Kubernetes 编排演示',
  'Serverless 架构演示',
  '架构演进对比',
  '技术栈演进时间线'
]
let ok = true
for (const text of present) ok = html.includes(text) && ok
for (const text of absent) ok = !html.includes(text) && ok
process.exit(ok ? 0 : 1)
NODE
git checkout -- docs/public/sitemap.xml
```

The previous `backend-evolution` residue came from unused legacy component code.
The 10 files below were not found in Markdown pages or non-self code references,
and have been retired from the component directory and global registry:

- `BackendEvolutionDemo.vue`
- `BackendQuickStartDemo.vue`
- `CacheHitRatioDemo.vue`
- `CgiQueueDemo.vue`
- `DeploymentFlowDemo.vue`
- `MicroserviceLatencyDemo.vue`
- `MonolithReleaseRiskDemo.vue`
- `MonolithVsMicroserviceDemo.vue`
- `ScalingStrategyDemo.vue`
- `ServerlessCostAutoScaleDemo.vue`

For the completed `queue-design` section, the current verified source-level
check is:

```bash
npx eslint docs/.vitepress/theme/components/appendix/queue-design/*.vue docs/.vitepress/theme/locales/queue-design/*.js
rg -n "[\p{Han}]" docs/.vitepress/theme/components/appendix/queue-design/*.vue || true
node scripts/scan-appendix-component-i18n.mjs --json
```

The section should report:

```json
{
  "section": "queue-design",
  "total": 4,
  "withChinese": 0,
  "withI18n": 4,
  "chineseWithoutI18n": 0
}
```

The page-level fallback check for `message-queues.html` is:

```bash
VITEPRESS_BUILD_LOCALES=ko-kr BUILD_LOCALE_GROUP_SIZE=1 npm run build:locales
rg -n "System Decoupling Demo|Peak Shaving: flatten traffic spikes|Message Reliability Demo|Idempotence Demo|系统解耦演示|削峰填谷：把高峰|消息可靠性演示|幂等性演示" docs/.vitepress/dist/ko-kr/appendix/4-server-and-backend/message-queues.html
git checkout -- docs/public/sitemap.xml
```

For the small migrated sections, the current verified page-level check covers
`docker-containers`, `kubernetes`, `search-engines`, `data-visualization`,
`data-governance`, `distributed-systems`, `high-availability`,
`system-design-methodology`, `file-storage`, `neural-networks`, `linux-basics`,
`rate-limiting`, `async-task-queues`, `git-intro`, `typescript-intro`,
`ide-intro`, and the two `server-backend` pages:

```bash
VITEPRESS_BUILD_LOCALES=ko-kr BUILD_LOCALE_GROUP_SIZE=1 npm run build:locales
node - <<'NODE'
const fs = require('fs')
const checks = [
  {
    page: 'docs/.vitepress/dist/ko-kr/appendix/7-infrastructure-and-operations/docker-containers.html',
    present: ['Virtual Machines vs Containers', 'Docker Lifecycle', 'Common commands', 'Shared host OS kernel'],
    absent: ['虚拟机 vs 容器', 'Docker 生命周期', '常用命令', '共享宿主 OS 内核']
  },
  {
    page: 'docs/.vitepress/dist/ko-kr/appendix/7-infrastructure-and-operations/kubernetes.html',
    present: ['Kubernetes Architecture', 'K8s Core Resources', 'YAML example', 'Smallest scheduling unit'],
    absent: ['Kubernetes 架构', 'K8s 核心资源', 'YAML 示例', '最小调度单元']
  },
  {
    page: 'docs/.vitepress/dist/ko-kr/appendix/4-server-and-backend/search-engines.html',
    present: ['Inverted Index', 'Type a search term to see how an inverted index works', 'Source documents', 'Inverted index table'],
    absent: ['倒排索引表', '原始文档', '试试搜索：苹果', '命中文档']
  },
  {
    page: 'docs/.vitepress/dist/ko-kr/appendix/5-data/data-visualization.html',
    present: ['Chart Type Selector', 'Dashboard Layout Patterns', 'Recommended charts', 'Use cases:'],
    absent: ['图表类型选择器', '仪表盘布局模式', '推荐图表', '适用场景']
  },
  {
    page: 'docs/.vitepress/dist/ko-kr/appendix/5-data/data-governance.html',
    present: ['Data Quality Checker', 'Data Governance Framework', 'Data Lineage Tracing', 'Problem data', 'After governance', 'Data sources'],
    absent: ['数据质量检测器', '数据治理框架', '数据血缘追踪', '问题数据', '治理后', '数据源']
  },
  {
    page: 'docs/.vitepress/dist/ko-kr/appendix/6-architecture-and-system-design/distributed-systems.html',
    present: ['CAP Theorem Interactive Demo', 'Consistency Model Comparison', 'Eight Challenges in Distributed Systems', 'Typical systems:', 'Trade-off:', 'Scenario:'],
    absent: ['CAP 定理交互演示', '一致性模型对比', '分布式系统八大挑战', '典型系统', '权衡', '场景举例']
  },
  {
    page: 'docs/.vitepress/dist/ko-kr/appendix/6-architecture-and-system-design/high-availability.html',
    present: ['Availability Level Calculator', 'Failover Strategy Comparison', 'Yearly downtime', 'Typical scenarios:'],
    absent: ['可用性等级计算器', '故障转移策略对比', '每年停机', '典型场景']
  },
  {
    page: 'docs/.vitepress/dist/ko-kr/appendix/6-architecture-and-system-design/system-design-methodology.html',
    present: ['Four-Step System Design Method', 'Back-of-the-Envelope Estimator', 'Daily requests', 'Common estimation references'],
    absent: ['系统设计四步法', '信封背面估算器', '日请求量', '常用估算参考值']
  },
  {
    page: 'docs/.vitepress/dist/ko-kr/appendix/4-server-and-backend/http-protocol.html',
    present: ['HTTP Protocol Demo', 'HTTP request', 'TCP connection', 'Version comparison'],
    absent: ['HTTP 协议演示', 'HTTP 请求', 'TCP 连接', '版本对比']
  },
  {
    page: 'docs/.vitepress/dist/ko-kr/appendix/4-server-and-backend/serialization.html',
    present: ['Serialization Demo', 'In-memory object', 'Start serialization', 'Format comparison'],
    absent: ['序列化演示', '内存对象', '开始序列化', '格式对比']
  },
  {
    page: 'docs/.vitepress/dist/ko-kr/appendix/4-server-and-backend/file-storage.html',
    present: ['Storage Type Comparison', 'File Upload Method Comparison', 'How CDN Acceleration Works', 'Access method', 'Server proxy', 'With CDN'],
    absent: ['存储类型对比', '文件上传方式对比', 'CDN 加速原理', '访问方式', '服务端中转', '有 CDN']
  },
  {
    page: 'docs/.vitepress/dist/ko-kr/appendix/8-artificial-intelligence/neural-networks.html',
    present: ['How a Neuron Works', 'Common Neural Network Layer Types', 'Common Neural Network Architectures', 'Input × Weight', 'Core parameters:', 'Network structure'],
    absent: ['神经元工作原理', '神经网络常见层类型', '常见神经网络架构', '输入 × 权重', '核心参数：', '网络结构']
  },
  {
    page: 'docs/.vitepress/dist/ko-kr/appendix/7-infrastructure-and-operations/linux-basics.html',
    present: ['Linux Filesystem Hierarchy', 'Linux Command Cheat Sheet', 'Linux Permission Decoder', 'Root directory', 'File operations', 'Permission number, such as 755'],
    absent: ['Linux 文件系统层级', 'Linux 命令速查', 'Linux 权限解读器', '根目录', '文件操作', '权限数字（如 755）']
  },
  {
    page: 'docs/.vitepress/dist/ko-kr/appendix/4-server-and-backend/rate-limiting-backpressure.html',
    present: ['Rate Limiting Algorithm Comparison', 'Backpressure Control', 'Send request', 'Burst 10 requests', 'Token bucket', 'Produce rate:'],
    absent: ['限流算法对比', '背压控制 (Backpressure)', '发送请求', '突发 10 个请求', '令牌桶', '生产速率：']
  },
  {
    page: 'docs/.vitepress/dist/ko-kr/appendix/4-server-and-backend/async-task-queues.html',
    present: ['Popular Async Task Frameworks', 'Synchronous vs Asynchronous Processing', 'Task Retry and Backoff Strategies', 'Worker Pool Model', 'Submit order', 'Core features:'],
    absent: ['主流异步任务框架对比', '同步 vs 异步处理对比', '任务重试与退避策略', 'Worker 工作池模型', '提交订单', '核心特性：']
  },
  {
    page: 'docs/.vitepress/dist/ko-kr/appendix/2-development-tools/git-version-control.html',
    present: ['Local repository', 'Remote repository', 'Click the command buttons below in order'],
    absent: ['本地仓库', '远程仓库', '点击下方命令按钮，按顺序执行', '重置']
  },
  {
    page: 'docs/.vitepress/dist/ko-kr/appendix/3-browser-and-frontend/typescript.html',
    present: ['TypeScript Type Annotation Demo', 'Interface Demo', 'Generics Demo', 'Type Inference Demo', 'Change name (valid)', 'User Interface Definition', 'Generic Function Definition', 'Choose an example to see how type inference works:'],
    absent: ['TypeScript 类型注解演示', 'Interface 接口演示', '泛型 (Generics) 演示', '类型推断演示', '修改 name (正确)', 'User Interface 定义', '泛型函数定义', '选择一个示例看看类型推断是如何工作的：']
  },
  {
    page: 'docs/.vitepress/dist/ko-kr/appendix/2-development-tools/ide-basics.html',
    present: ['Demo: how do you ask AI about code you do not understand?'],
    absent: ['演示：遇到代码不懂怎么问 AI？', 'IDE 核心机制模拟器', '虚拟 IDE 交互演示', '开始自动导览', '悬停查看功能说明', 'VS Code 徽标：主菜单']
  }
]
let ok = true
for (const c of checks) {
  const html = fs.readFileSync(c.page, 'utf8')
  for (const s of c.present) ok = html.includes(s) && ok
  for (const s of c.absent) ok = !html.includes(s) && ok
}
process.exit(ok ? 0 : 1)
NODE
```

For the `transistor-to-cpu` Korean page:

```bash
VITEPRESS_BUILD_LOCALES=ko-kr BUILD_LOCALE_GROUP_SIZE=1 npm run build:locales
rg -n "cpuArchitecture\\.alu|行波进位加法器|完整加法器演示|加法器级联|半加器|全加器|多位加法器|核心思想|计算过程|本位|进位|溢出" docs/.vitepress/dist/ko-kr/appendix/1-computer-fundamentals/transistor-to-cpu.html
```

The `rg` command should produce no matches for component-origin Chinese text or
raw i18n keys. After any build, discard generated sitemap timestamp churn unless
the sitemap content itself is intentionally changed:

For `operating-systems`, use targeted checks for component-origin keys and
expected English fallback text:

```bash
VITEPRESS_BUILD_LOCALES=ko-kr BUILD_LOCALE_GROUP_SIZE=1 npm run build:locales
node - <<'NODE'
const fs = require('fs')
const html = fs.readFileSync(
  'docs/.vitepress/dist/ko-kr/appendix/1-computer-fundamentals/operating-systems.html',
  'utf8'
)
const needles = [
  'operatingSystems.',
  'Operating System',
  'The CPU switches tasks so fast',
  'Memory as the program sees it',
  'The file you see vs fragments on disk',
  'What is the computer doing after you double-click an icon?'
]
for (const needle of needles) {
  console.log(`${needle}: ${html.includes(needle) ? 'yes' : 'no'}`)
}
NODE
```

For `algorithm-thinking`, full HTML still includes Chinese navigation data from
VitePress, so verify raw keys and expected English fallback labels:

```bash
VITEPRESS_BUILD_LOCALES=ko-kr BUILD_LOCALE_GROUP_SIZE=1 npm run build:locales
node - <<'NODE'
const fs = require('fs')
const html = fs.readFileSync(
  'docs/.vitepress/dist/ko-kr/appendix/1-computer-fundamentals/algorithm-thinking.html',
  'utf8'
)
const checks = [
  'algorithmThinking.',
  'Algorithmic Thinking',
  'Search Algorithms',
  'Sorting Algorithms',
  'Recursive Thinking',
  'Greedy Algorithms',
  'Algorithm Design Paradigms'
]
for (const needle of checks) {
  console.log(`${needle}: ${html.includes(needle) ? 'yes' : 'no'}`)
}
NODE
```

For `data-structures`, verify all seven page components resolve through English
fallback on non-Chinese locales:

```bash
VITEPRESS_BUILD_LOCALES=ko-kr BUILD_LOCALE_GROUP_SIZE=1 npm run build:locales
node - <<'NODE'
const fs = require('fs')
const html = fs.readFileSync(
  'docs/.vitepress/dist/ko-kr/appendix/1-computer-fundamentals/data-structures.html',
  'utf8'
)
const bad = [
  '数据结构全景图',
  '线性结构的四种形态',
  '哈希表：超快的查找',
  '树形结构：层级关系的表示',
  '图结构：复杂关系的表示',
  '数据结构：数据的"容器"',
  '如何选择合适的数据结构？'
]
const good = [
  'Data Structure Overview',
  'Four Forms of Linear Structures',
  'Hash Tables: Super-Fast Lookup',
  'Tree Structures: Representing Hierarchies',
  'Graph Structures: Representing Complex Relationships',
  'Data Structures: Containers for Data',
  'How Do You Choose the Right Data Structure?'
]
for (const needle of bad) if (html.includes(needle)) console.log('BAD', needle)
for (const needle of good) if (!html.includes(needle)) console.log('MISSING', needle)
const raw = [...html.matchAll(/[>\s]dataStructures\.[^<\s]*/g)].map(m => m[0])
console.log('raw-like matches', raw.length)
NODE
```

For `computer-organization`, verify all fourteen page components resolve through
English fallback on non-Chinese locales:

```bash
VITEPRESS_BUILD_LOCALES=ko-kr BUILD_LOCALE_GROUP_SIZE=1 npm run build:locales
node - <<'NODE'
const fs = require('fs')
const html = fs.readFileSync(
  'docs/.vitepress/dist/ko-kr/appendix/1-computer-fundamentals/computer-organization.html',
  'utf8'
)
const checks = [
  ['has English code-to-instruction title', /From Code to Instructions/.test(html)],
  ['has English cache title', /Cache Principles/.test(html)],
  ['has English io title', /I\/O Method Comparison/.test(html)],
  ['has English controller title', /How the Controller Works/.test(html)],
  ['no original Chinese code title', !/从代码到指令/.test(html)],
  ['no original Chinese cache title', !/缓存 \(Cache\) 原理/.test(html)],
  ['no original Chinese io title', !/I\/O 方式对比/.test(html)],
  ['no raw keys', !/computerOrganization\./.test(html)]
]
for (const [name, ok] of checks) console.log(`${ok ? 'PASS' : 'FAIL'} ${name}`)
process.exit(checks.every(([, ok]) => ok) ? 0 : 1)
NODE
```

For `vibe-coding-fullstack`, verify all twelve page components resolve through
English fallback on non-Chinese locales:

```bash
VITEPRESS_BUILD_LOCALES=ko-kr BUILD_LOCALE_GROUP_SIZE=1 npm run build:locales
node - <<'NODE'
const fs = require('fs')
const html = fs.readFileSync(
  'docs/.vitepress/dist/ko-kr/appendix/1-computer-fundamentals/vibe-coding-fullstack.html',
  'utf8'
)
const checks = [
  ['has English skill shift title', /Changing Skill Importance/.test(html)],
  ['has English field map title', /Computer Field Map/.test(html)],
  ['has English framework title', /Frontend Framework Evolution/.test(html)],
  ['has English learning strategy title', /Vibe Coding Learning Strategy/.test(html)],
  ['no original Chinese field map title', !/计算机领域全景图/.test(html)],
  ['no original Chinese skill title', !/能力重要性变化/.test(html)],
  ['no original Chinese strategy title', !/Vibe Coding 学习策略/.test(html)],
  ['no raw keys', !/vibeCodingFullstack\./.test(html)]
]
for (const [name, ok] of checks) console.log(`${ok ? 'PASS' : 'FAIL'} ${name}`)
process.exit(checks.every(([, ok]) => ok) ? 0 : 1)
NODE
```

For `programming-languages`, inspect only the component fragment. The full HTML
contains embedded VitePress site data for every locale, so searching the whole
file produces unrelated Chinese matches from navigation, metadata, and footer
configuration.

```bash
VITEPRESS_BUILD_LOCALES=ko-kr BUILD_LOCALE_GROUP_SIZE=1 npm run build:locales
node - <<'NODE'
const fs = require('fs')
const html = fs.readFileSync(
  'docs/.vitepress/dist/ko-kr/appendix/1-computer-fundamentals/programming-languages.html',
  'utf8'
)
const start = html.indexOf('class="language-map-demo"')
const end = html.indexOf('</div></div><div class="tip custom-block"', start)
const chunk = html.slice(Math.max(0, start - 200), end > start ? end : start + 20000)
const needles = [
  '编程语言图谱',
  '演化历程',
  '编程范式',
  '语言对比',
  '如何选择',
  '核心思想',
  'languageMap.'
]
for (const needle of needles) {
  if (chunk.includes(needle)) console.log(`MATCH ${needle}`)
}
NODE
```

```bash
git checkout -- docs/public/sitemap.xml
```

## Retired Unused Components

`tracking-design` previously had nine Vue demos registered globally, but they
were not referenced by any Markdown page or utility script. They were removed
instead of migrated because keeping unreferenced demos would increase component
i18n scope without affecting rendered documentation:

- `TrackingOverviewDemo.vue`
- `TrackingTypesDemo.vue`
- `TrackingMethodsComparisonDemo.vue`
- `DataModelDesignDemo.vue`
- `DataCollectionDemo.vue`
- `DataPipelineDemo.vue`
- `PrivacyComplianceDemo.vue`
- `RealWorldCaseDemo.vue`
- `ToolSelectionDemo.vue`

`cloud-topology` previously had eight Vue demos in the appendix component tree,
but none were referenced by Markdown pages or the global component registry.
They were removed as stale files instead of migrated:

- `AvailabilityZoneDemo.vue`
- `ComputeTopologyDemo.vue`
- `DisasterRecoveryDemo.vue`
- `NetworkFlowDemo.vue`
- `ResourceTopologyDemo.vue`
- `StorageTopologyDemo.vue`
- `SubnetDesignDemo.vue`
- `VpcArchitectureDemo.vue`

`scheduled-tasks` previously had eight globally registered Vue demos, but the
only remaining references were commented archive notes, not rendered docs.
They were removed from the registry and archive notes instead of migrated:

- `CronExpressionDemo.vue`
- `TaskSchedulerDemo.vue`
- `BatchProcessingDemo.vue`
- `JobQueueDemo.vue`
- `RetryMechanismDemo.vue`
- `DistributedLockDemo.vue`
- `TaskMonitoringDemo.vue`
- `SchedulingConflictDemo.vue`

The remaining unreferenced appendix demos with Chinese hard-coded copy were
also removed after confirming their component names do not appear in docs,
scripts, tools, or the global registry:

- `ai-protocols/ProtocolWorkflowDemo.vue`
- `browser-frontend/A11yScreenReaderDemo.vue`
- `browser-frontend/I18nFormatDemo.vue`
- `data/SqlDemo.vue`
- `database-intro/DatabaseEvolutionDemo.vue`
- `database-intro/DatabaseIndexDemo.vue`
- `database-intro/RelationalDataDemo.vue`
- `frontend-performance/CachingStrategyDemo.vue`
- `frontend-performance/CriticalRenderingPathDemo.vue`
- `frontend-performance/LazyLoadingDemo.vue`
- `frontend-performance/ReflowRepaintDemo.vue`
- `gateway-proxy/RoutingRulesDemo.vue`
- `llm-intro/NextTokenPrediction.vue`
- `load-balancing/MultiRegionDemo.vue`
- `load-balancing/WeightedRoutingDemo.vue`
- `terminal-intro/WebTerminal.vue`
- `transformer-attention/AttentionDecompositionDemo.vue`

`ai-protocols` now has a section locale scaffold:

- `docs/.vitepress/theme/locales/ai-protocols/index.js`
- `docs/.vitepress/theme/locales/ai-protocols/zh-cn.js`
- `docs/.vitepress/theme/locales/ai-protocols/en.js`

Migrated:

- `ProtocolComparisonDemo.vue`
- `McpVisualDemo.vue`
- `A2AVisualDemo.vue`
- `McpDetailedDemo.vue`
- `A2ADetailedDemo.vue`

`frontend-performance` now has a section locale scaffold:

- `docs/.vitepress/theme/locales/frontend-performance/index.js`
- `docs/.vitepress/theme/locales/frontend-performance/zh-cn.js`
- `docs/.vitepress/theme/locales/frontend-performance/en.js`

Migrated:

- `PerformanceOverviewDemo.vue`
- `PerformanceMetricsDemo.vue`
- `ImageOptimizationDemo.vue`
- `VirtualScrollingDemo.vue`

`dns-https` now has a section locale scaffold:

- `docs/.vitepress/theme/locales/dns-https/index.js`
- `docs/.vitepress/theme/locales/dns-https/zh-cn.js`
- `docs/.vitepress/theme/locales/dns-https/en.js`

Migrated:

- `DnsResolutionDemo.vue`
- `DnsRecordTypeDemo.vue`
- `HttpsHandshakeDemo.vue`
- `CertificateChainDemo.vue`
- `DnsHttpsComparisonDemo.vue`

`incident-response` now has a section locale scaffold:

- `docs/.vitepress/theme/locales/incident-response/index.js`
- `docs/.vitepress/theme/locales/incident-response/zh-cn.js`
- `docs/.vitepress/theme/locales/incident-response/en.js`

Migrated:

- `SeverityLevelDemo.vue`
- `IncidentTimelineDemo.vue`
- `AlertEscalationDemo.vue`
- `IncidentCommandDemo.vue`
- `PostmortemDemo.vue`

`llm-intro` now has a section locale scaffold:

- `docs/.vitepress/theme/locales/llm-intro/index.js`
- `docs/.vitepress/theme/locales/llm-intro/zh-cn.js`
- `docs/.vitepress/theme/locales/llm-intro/en.js`

Migrated:

- `LlmQuickStartDemo.vue`
- `TokenizationDemo.vue`
- `EmbeddingDemo.vue`
- `TokenizerToMatrix.vue`
- `RNNvsTransformer.vue`
- `TrainingInferenceDemo.vue`
- `ThinkingModelDemo.vue`
- `LinearAttentionDemo.vue`
- `MoEDemo.vue`

`backend-layered-architecture` now has a section locale scaffold:

- `docs/.vitepress/theme/locales/backend-layered-architecture/index.js`
- `docs/.vitepress/theme/locales/backend-layered-architecture/zh-cn.js`
- `docs/.vitepress/theme/locales/backend-layered-architecture/en.js`

Migrated:

- `LayeredArchitectureDemo.vue`
- `ControllerLayerDemo.vue`
- `ServiceLayerDemo.vue`
- `RepositoryLayerDemo.vue`
- `DomainModelDemo.vue`
- `DtoFlowDemo.vue`
- `DependencyDirectionDemo.vue`
- `CleanArchitectureDemo.vue`

`cloud-storage-cdn` now has a section locale scaffold:

- `docs/.vitepress/theme/locales/cloud-storage-cdn/index.js`
- `docs/.vitepress/theme/locales/cloud-storage-cdn/zh-cn.js`
- `docs/.vitepress/theme/locales/cloud-storage-cdn/en.js`

Migrated:

- `ObjectStorageDemo.vue`
- `CdnAccelerationDemo.vue`
- `EdgeNodeDistributionDemo.vue`
- `CachePolicyDemo.vue`
- `UploadProcessDemo.vue`
- `TrafficSchedulingDemo.vue`
- `HttpsOptimizationDemo.vue`
- `AccessAnalyticsDemo.vue`

`ui-design-specs` has a section locale with all ten locales, one file each.
It backs the figures in the stage-2 frontend chapter `multi-product-ui`
(issue #156):

- `docs/.vitepress/theme/locales/ui-design-specs/index.js`
- `docs/.vitepress/theme/locales/ui-design-specs/zh-cn.js`
- `docs/.vitepress/theme/locales/ui-design-specs/en.js`
- `docs/.vitepress/theme/locales/ui-design-specs/zh-tw.js`
- `docs/.vitepress/theme/locales/ui-design-specs/ja-jp.js`
- `docs/.vitepress/theme/locales/ui-design-specs/ko-kr.js`
- `docs/.vitepress/theme/locales/ui-design-specs/es-es.js`
- `docs/.vitepress/theme/locales/ui-design-specs/fr-fr.js`
- `docs/.vitepress/theme/locales/ui-design-specs/de-de.js`
- `docs/.vitepress/theme/locales/ui-design-specs/ar-sa.js`
- `docs/.vitepress/theme/locales/ui-design-specs/vi-vn.js`

Rules that every locale file of this section must keep:

- Same keys, nesting and array lengths as `en.js`.
- Unchanged in every locale: `id`, `kind` and `rel` values, the role and
  level names that code looks rows up by (`Normal`, `Primary`, `Cancel`,
  `Destructive`, `Filled`, `Tonal`, `Outlined`, `Text`), `source.label`,
  `source.url`, numbers, and `{n}`-style placeholders.
- The localized chapter mirrors the zh-cn structure: same headings, list
  items, tables, links and figure tags. The repo checker's fenced-code and
  inline-code checks fail by design for this chapter, because the example
  prompts and the button-label examples are translated.

Components:

- `UiSpecHierarchyCompareDemo.vue`
- `UiSpecPageAnatomyDemo.vue`
- `UiSpecGroupingDemo.vue`
- `UiSpecButtonSpecDemo.vue`
- `UiSpecButtonStatesDemo.vue`
- `UiSpecLookalikeControlsDemo.vue`
- `UiSpecPageSkeletonDemo.vue`
- `UiSpecSpecMapDemo.vue`
- `UiSpecButtonDecisionDemo.vue`
- `UiSpecFluentButtonsDemo.vue`
- `UiSpecTokensDemo.vue`
- `UiSpecThreeLayersDemo.vue`
- `UiSpecTaskFlowLayoutDemo.vue`
- `UiSpecRoleSamplesDemo.vue`

Source-level check:

```bash
npx eslint docs/.vitepress/theme/components/appendix/ui-design-specs/*.vue docs/.vitepress/theme/locales/ui-design-specs/*.js docs/.vitepress/theme/index.js
rg -n "[\p{Han}]" docs/.vitepress/theme/components/appendix/ui-design-specs/*.vue || true
node scripts/scan-appendix-component-i18n.mjs --json
```

The section should report:

```json
{
  "section": "ui-design-specs",
  "total": 14,
  "withChinese": 0,
  "withI18n": 14,
  "chineseWithoutI18n": 0
}
```
