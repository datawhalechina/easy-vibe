---
title: 'B2B Industry Application Scenario Reference'
description: 'This document summarizes practical LLM applications in B2B enterprise scenarios, including specific directions in industries such as manufacturing, intelligent customer service, education, intelligent programming, healthcare, cybersecurity, financial services, and enterprise operations. It provides practical references for developers building AI applications for enterprise customers.'
---

<script setup>
import { computed, ref } from 'vue'

const duration = 'Approx. <strong>6 hours</strong>'

const interestPoint = ref('')
const purpose = ref('')

const topicPool = {
  'manufacturing': [
    { title: 'AI-Assisted Design Platform for New Energy Bus Exterior', desc: 'Image generation model-based exterior concept design' },
    { title: 'Intelligent Drawing Design & Review Assistant', desc: 'Build enterprise design specification knowledge base using RAG technology' },
    { title: 'Automatic Technical Documentation Generation & Management', desc: 'Auto-generate product specifications and operation manuals based on LLM' },
    { title: 'Production Equipment Inspection Report Auto-Generation Assistant', desc: 'Voice description of equipment status, structured inspection report generation' },
    { title: 'Industrial Equipment Fault Diagnosis Q&A Assistant', desc: 'Build vector knowledge base from historical fault cases' }
  ],
  'customer-service': [
    { title: 'Multi-Channel Intelligent Customer Service Auto-Reply & Ticket Generation System', desc: 'Connect multi-channel messages, LLM understands intent and generates responses' },
    { title: 'Potential Customer Mining & Follow-up Suggestion Assistant', desc: 'Analyze historical conversation records, identify high-intent customers' },
    { title: 'Enterprise Internal Knowledge Intelligent Retrieval & Q&A Butler', desc: 'Build vector knowledge base from internal documents' },
    { title: 'Customer Service Conversation Smart Summary & Ticket Generation Tool', desc: 'Auto-generate conversation summaries and extract key information' },
    { title: 'Golden Script Recommendation Knowledge Base System for Customer Service', desc: 'Analyze excellent cases, extract golden script templates' }
  ],
  'education': [
    { title: 'Personalized Language Learning Path Planning & Intelligent Tutoring System', desc: 'Assess learner level, plan daily learning tasks' },
    { title: 'Lesson Plan Auto-Writing & Teaching Resource Push Platform', desc: 'Generate lesson plan framework based on course outline' },
    { title: 'Homework Auto-Grading & Learning Diagnosis Analysis System', desc: 'Auto-grade subjective questions and generate grading suggestions' },
    { title: 'Job Competency Model Construction & Learning Map', desc: 'Analyze job JD to extract capability requirements' },
    { title: 'Foreign Language One-on-One Scenario-Based Practical Practice', desc: 'LLM plays different roles for oral dialogue practice' }
  ],
  'programming': [
    { title: 'Intelligent Code Completion & Bug Auto-Fix Assistant', desc: 'IDE plugin provides real-time code completion suggestions' },
    { title: 'Low-Code Application Building & Process Automation Platform', desc: 'Natural language requirements converted to low-code configuration' },
    { title: 'Unit Test Case Generation System', desc: 'AST parses source code, generates boundary condition test cases' },
    { title: 'Code Intelligent Analysis & Language Migration Tool', desc: 'Analyze code quality and provide optimization suggestions' },
    { title: 'Frontend UI Code Auto-Generation Tool', desc: 'Design draft image recognition, generate responsive CSS' }
  ],
  'healthcare': [
    { title: 'Medical Test Report Intelligent Interpretation Assistant', desc: 'OCR recognizes key indicators, interpret abnormal values' },
    { title: 'Knowledge Retrieval-Based Health Consultation Expert', desc: 'Build medical knowledge graph, RAG retrieval for answers' },
    { title: 'Clinical Research Data Decision Analysis Platform', desc: 'Integrate EMR data, assist generating statistical analysis code' },
    { title: 'Medical Imaging Report Auto-Generation Tool', desc: 'Describe imaging features, auto-generate structured reports' },
    { title: 'Chronic Disease Management Medication Reminder Intelligent Assistant', desc: 'Generate personalized medication reminders, support contraindication checks' }
  ],
  'security': [
    { title: 'Code Security Vulnerability Detection & Fix Engine', desc: 'SAST scans code, analyzes vulnerability principles' },
    { title: 'AI-Generated Phishing Email Intelligent Identification & Blocking System', desc: 'Analyze email content, identify AI-generated phishing emails' },
    { title: 'Security Operations Daily Report Auto-Generation Assistant', desc: 'Log aggregation, auto-extract key events' },
    { title: 'Penetration Test Report Intelligent Generation Assistant', desc: 'Auto-generate reports from vulnerability descriptions' },
    { title: 'Threat Intelligence Intelligent Query & Analysis Assistant', desc: 'Connect multi-source threat intelligence, interpret intelligence content' }
  ],
  'finance': [
    { title: 'Credit Due Diligence Report Intelligent Generation Assistant', desc: 'Input financial data, auto-generate credit due diligence report' },
    { title: 'Private Bank Wealth Management Intelligent Advisor', desc: 'Analyze client risk preference, generate asset allocation suggestions' },
    { title: 'IPO Prospectus Intelligent Generation & Compliance Verification Assistant', desc: 'Modular templates, auto-fill business descriptions' },
    { title: 'Enterprise Financial Report Auto-Generation & Business Anomaly Early Warning System', desc: 'Auto-generate financial analysis and management discussion' },
    { title: 'Insurance Agent Intelligent Script Practice Coach', desc: 'Simulate dialogue, evaluate script compliance and persuasiveness' }
  ],
  'enterprise': [
    { title: 'Enterprise Contract Full Lifecycle Compliance Review & Modification Suggestion Platform', desc: 'Compare clauses with regulation database, generate compliance review report' },
    { title: 'Sales Conversation Speech-to-Text & Script Recommendation', desc: 'ASR transcription, analyze conversation and recommend golden scripts' },
    { title: 'Marketing Content Intelligent Generation & Design System', desc: 'Generate marketing copy and selling point extraction' },
    { title: 'Competitor Ad Placement Analysis Platform', desc: 'Collect competitor ads, analyze placement strategies' },
    { title: 'Network-Wide Hot Topic Intelligent Analysis & Content Recommendation System', desc: 'Analyze hot trends and recommend topic angles' }
  ],
  'content': [
    { title: 'Film & Novel Content Creation Assistance Platform', desc: 'Provide story outlines, character settings, dialogue generation' },
    { title: 'Enterprise Brand Story & PR Soft Article Intelligent Writing Assistant', desc: 'Input brand keywords, generate multi-style copy' },
    { title: 'Virtual Digital Human Live Streaming Interaction & Streaming Management System', desc: 'Digital human + TTS voice + LLM dialogue' },
    { title: 'Short Video Script Generation & Intelligent Editing', desc: 'Generate short video scripts and storyboards' },
    { title: 'Marketing Content Intelligent Generation & Design System', desc: 'Generate marketing copy and selling point extraction' }
  ],
  'government': [
    { title: '12345 Government Service Hotline Intelligent Voice Navigation & Auto-Dispatch System', desc: 'Speech recognition, understand requests and intelligently dispatch' },
    { title: 'Government Service Hall Intelligent Guidance & Policy Q&A Robot', desc: 'Government knowledge base RAG retrieval' },
    { title: 'Enterprise Policy Intelligent Matching & Precision Push Platform', desc: 'Enterprise profile auto-match applicable policies' },
    { title: 'Administrative Approval Materials Intelligent Pre-Review & Compliance Verification Assistant', desc: 'OCR recognition and key information extraction' },
    { title: 'City Grid Event Intelligent Identification & Dispatch Management Platform', desc: 'Identify event types and dispatch' }
  ],
  'legal': [
    { title: 'Contract Risk Vulnerability One-Click "Bug Hunter" Agent', desc: 'Identify potential issues against risk checklist' },
    { title: 'Similar Case Win Rate AI Intelligent Assessment Consultant', desc: 'Case feature extraction, similar case retrieval matching' },
    { title: 'Legal Regulation Change Real-Time Monitoring & Business Impact Analysis Radar', desc: 'Parse change content and assess business impact' },
    { title: 'Legal Letter AIGC Auto-Drafting Tool', desc: 'Input factual statements, generate standard legal letters' },
    { title: 'Complex Legal Terms "Translation" to Plain Language Explanation Plugin', desc: 'Generate easy-to-understand explanations' }
  ],
  'travel': [
    { title: 'AIGC-Based Lazy Travel Guide Generator', desc: 'Generate daily itinerary arrangements' },
    { title: 'Network-Wide Flight & Hotel Price Trend Prediction & Low-Price Auto-Lock Robot', desc: 'ML model predicts price trends' },
    { title: 'Visa Materials Intelligent Pre-Review & Auto-Fill Form Assistant', desc: 'OCR recognize information completeness check' },
    { title: 'Outbound Travel Real-Time Voice Translation & Menu Visual Translation Butler', desc: 'Offline voice translation, menu image OCR' },
    { title: 'Travel Footprint Auto-Generate Beautiful Travel Notes & Social Copy Assistant', desc: 'Photo information extraction, generate travel note copy' }
  ],
  'emotion': [
    { title: 'LLM-Based 24-Hour Deep Companion Virtual Partner', desc: 'Memory system stores conversation history' },
    { title: 'Multimodal Emotion Recognition & Psychological Counseling AI Consultant', desc: 'Voice tone analysis + text emotion recognition' },
    { title: 'Alzheimer Elderly AI Cognitive Training & Memory Wake-Up Digital Human', desc: 'Cognitive game training, old photos trigger memory' },
    { title: 'AIGC Simulated Social Practice Coach for Social Anxiety People', desc: 'Virtual social scenario simulation' },
    { title: 'All-Day Mood Monitoring & AI Positive Emotion Incentive Assistant', desc: 'Analyze mood trends and generate incentive content' }
  ],
  'entertainment': [
    { title: 'LLM-Driven Open World Game NPC Autonomous Decision Engine', desc: 'NPC behavior tree fused with LLM decisions' },
    { title: 'Immersive Script Murder AIGC Story Deduction & DM Control Assistance Tool', desc: 'Player choices trigger story branches' },
    { title: 'Interactive Novel Ending Generative Modifier', desc: 'Reader choices affect story direction' },
    { title: 'Esports Game CV Visual Analysis & AI Intelligent Commentator', desc: 'Real-time game footage analysis' },
    { title: 'Multi-Role TTS Voice Synthesis Audiobook Auto-Generation System', desc: 'Text role allocation, personalized voice generation' }
  ],
  'ecommerce': [
    { title: 'High Conversion AIGC Product Detail Page Batch Production Tool', desc: 'Generate selling point copy and scene descriptions' },
    { title: 'Clothing Virtual Model AI Intelligent Try-On & Display Video Generation Factory', desc: 'Virtual model try-on effect generation' },
    { title: 'Cross-Border Ecommerce Multi-Language LLM Localization Translation & Polishing Assistant', desc: 'Product description multi-language translation' },
    { title: '24/7 AIGC Digital Human Live Streaming Sales System', desc: 'Digital human + real-time script generation' },
    { title: 'Market Trend AI Insight & Hit Product Prediction Engine', desc: 'Insight trend hotspots, product selection suggestions' }
  ],
  'energy': [
    { title: 'Household Electricity Behavior AI Analysis & Energy Saving Strategy Consultant', desc: 'Electricity usage pattern analysis, generate energy saving suggestions' },
    { title: 'Photovoltaic Component Defect Drone CV Visual Recognition System', desc: 'Drone inspection shooting, thermal infrared image analysis' },
    { title: 'Electricity Spot Trading Price AI Trend Prediction & Auto-Profit Strategy Agent', desc: 'Price prediction model, strategy generation' },
    { title: 'Enterprise Full-Link Carbon Emission AI Auto-Calculation & ESG Report Generation Assistant', desc: 'Carbon emission factor calculation, ESG report generation' },
    { title: 'Power Grid Extreme Weather Load AI Prediction & Emergency Dispatch Command System', desc: 'Load prediction model, dispatch strategy generation' }
  ],
  'av-media': [
    { title: 'Long Video Highlight AI Identification & Short Video Auto-Clipping Tool', desc: 'Video content analysis, keyframe recognition' },
    { title: 'Video Background Noise AI Intelligent Separation & Voice Enhancement Assistant', desc: 'Audio separation model, remove background noise' },
    { title: 'Old Image 4K Super-Resolution Repair & AI Intelligent Colorization Workstation', desc: 'Video super-resolution model, AI auto-colorization' },
    { title: 'Text to Realistic TTS Voice & Emotion Control System', desc: 'Multi-voice TTS model, emotion control' },
    { title: 'Meeting Recording AI Intelligent Transcription & Action Item Extraction Assistant', desc: 'Multi-person meeting voice separation transcription' }
  ],
  'ai-marketing': [
    { title: 'Xiaohongshu Hit Copy AIGC Auto-Writing Engine', desc: 'Generate planting copy, emoji optimization' },
    { title: 'Marketing Poster AI Intelligent Layout & Multi-Size Adaptation Tool', desc: 'Poster template intelligent matching' },
    { title: 'Brand LOGO Creative AIGC Generation & VI System Building Platform', desc: 'LOGO creative generation, VI specification generation' },
    { title: 'Network-Wide Hot Topic AI Tracking & Trend Marketing Creative Generation Assistant', desc: 'Analyze marketing angles, creative solution generation' },
    { title: 'Short Video Script Creative AIGC Generation & Storyboard Guidance Assistant', desc: 'Script and storyboard generation, shooting suggestions' }
  ],
  'data-intelligence': [
    { title: 'Natural Language to SQL Statement Auto-Generation Tool', desc: 'Natural language query converted to SQL' },
    { title: 'Enterprise Data Asset Catalog Intelligent Inventory & Classification System', desc: 'Metadata collection, auto-classification' },
    { title: 'Data Quality Anomaly Auto-Detection & Repair Suggestion Engine', desc: 'Rule engine + ML model detect anomalies' },
    { title: 'Intelligent Report Generation & Visualization Configuration Assistant', desc: 'Conversational report configuration generation' },
    { title: 'Data Metric Definition Intelligent Q&A Assistant', desc: 'Build knowledge base from metric definition documents' }
  ]
}

const recommendationMap = {
  'creative-content': {
    'increase-efficiency': ['content', 'av-media', 'ai-marketing', 'entertainment'],
    'reduce-cost': ['content', 'ecommerce', 'ai-marketing'],
    'improve-experience': ['entertainment', 'emotion', 'travel', 'content'],
    'innovate-business': ['ai-marketing', 'content', 'av-media', 'entertainment']
  },
  'tech-service': {
    'increase-efficiency': ['programming', 'enterprise', 'data-intelligence', 'customer-service'],
    'reduce-cost': ['programming', 'enterprise', 'manufacturing'],
    'improve-experience': ['customer-service', 'enterprise', 'programming'],
    'innovate-business': ['data-intelligence', 'programming', 'security', 'enterprise']
  },
  'data-intel': {
    'increase-efficiency': ['data-intelligence', 'finance', 'enterprise', 'manufacturing'],
    'reduce-cost': ['data-intelligence', 'manufacturing', 'energy'],
    'improve-experience': ['data-intelligence', 'customer-service', 'ecommerce'],
    'innovate-business': ['data-intelligence', 'finance', 'security', 'ai-marketing']
  },
  'user-service': {
    'increase-efficiency': ['customer-service', 'ecommerce', 'travel', 'enterprise'],
    'reduce-cost': ['customer-service', 'ecommerce', 'enterprise'],
    'improve-experience': ['customer-service', 'emotion', 'travel', 'ecommerce', 'entertainment'],
    'innovate-business': ['ecommerce', 'travel', 'emotion', 'entertainment']
  },
  'industry-solution': {
    'increase-efficiency': ['manufacturing', 'healthcare', 'finance', 'government'],
    'reduce-cost': ['manufacturing', 'energy', 'enterprise', 'finance'],
    'improve-experience': ['healthcare', 'education', 'government', 'travel'],
    'innovate-business': ['finance', 'security', 'legal', 'healthcare', 'government']
  }
}

const interestOptions = [
  { label: 'Creative Content Generation', value: 'creative-content', desc: 'Copy, images, video and other creative content' },
  { label: 'Technical Service Tools', value: 'tech-service', desc: 'Development tools, automation, code assistance' },
  { label: 'Data Intelligence Analysis', value: 'data-intel', desc: 'Data analysis, prediction, intelligent decision making' },
  { label: 'User Service Experience', value: 'user-service', desc: 'Customer service, marketing, user experience' },
  { label: 'Industry Solutions', value: 'industry-solution', desc: 'Deep applications for specific industries' }
]

const purposeOptions = [
  { label: 'Increase Efficiency', value: 'increase-efficiency', desc: 'Automation, accelerate process' },
  { label: 'Reduce Cost', value: 'reduce-cost', desc: 'Reduce manpower, optimize resources' },
  { label: 'Improve Experience', value: 'improve-experience', desc: 'User satisfaction, service quality' },
  { label: 'Business Innovation', value: 'innovate-business', desc: 'New products, new models' }
]

const industries = [
  { key: 'manufacturing', name: 'Manufacturing Industry', anchor: '#_1-manufacturing-industry' },
  { key: 'customer-service', name: 'Intelligent Customer Service', anchor: '#_2-intelligent-customer-service' },
  { key: 'education', name: 'Education Industry', anchor: '#_3-education-industry' },
  { key: 'programming', name: 'Intelligent Programming', anchor: '#_4-intelligent-programming' },
  { key: 'healthcare', name: 'Healthcare', anchor: '#_5-healthcare' },
  { key: 'security', name: 'Network Security', anchor: '#_6-network-security' },
  { key: 'finance', name: 'Finance & Insurance', anchor: '#_7-finance-insurance' },
  { key: 'enterprise', name: 'Enterprise Services', anchor: '#_8-enterprise-services' },
  { key: 'content', name: 'Content Production & Operations', anchor: '#_9-content-production-operations' },
  { key: 'government', name: 'Smart Government Management', anchor: '#_10-smart-government-management' },
  { key: 'legal', name: 'Legal Affairs & Contract Management', anchor: '#_11-legal-affairs-contract-management' },
  { key: 'travel', name: 'Travel & Transportation Services', anchor: '#_12-travel-transportation-services' },
  { key: 'emotion', name: 'Emotional Companionship', anchor: '#_13-emotional-companionship' },
  { key: 'entertainment', name: 'Leisure & Entertainment', anchor: '#_14-leisure-entertainment' },
  { key: 'ecommerce', name: 'Ecommerce Services', anchor: '#_15-ecommerce-services' },
  { key: 'energy', name: 'Energy', anchor: '#_16-energy' },
  { key: 'av-media', name: 'Audio & Video', anchor: '#_17-audio-video' },
  { key: 'ai-marketing', name: 'AI Marketing', anchor: '#_18-ai-marketing' },
  { key: 'data-intelligence', name: 'Data Intelligence', anchor: '#_19-data-intelligence' }
]

const recommendationTopics = computed(() => {
  if (!interestPoint.value || !purpose.value) return []
  
  const keys = recommendationMap[interestPoint.value]?.[purpose.value] || []
  const topics = []
  
  keys.forEach(key => {
    const industry = industries.find(item => item.key === key)
    const industryTopics = topicPool[key] || []
    
    if (industry && industryTopics.length > 0) {
      const count = Math.floor(Math.random() * 2) + 1
      const shuffled = [...industryTopics].sort(() => Math.random() - 0.5)
      const selected = shuffled.slice(0, Math.min(count, shuffled.length))
      
      selected.forEach(topic => {
        topics.push({
          ...topic,
          industryKey: key,
          industryName: industry.name,
          industryAnchor: industry.anchor
        })
      })
    }
  })
  
  return topics.sort(() => Math.random() - 0.5).slice(0, 8)
})

const currentSelection = computed(() => {
  const interest = interestOptions.find(i => i.value === interestPoint.value)
  const pur = purposeOptions.find(p => p.value === purpose.value)
  return {
    interest: interest?.label || '',
    purpose: pur?.label || ''
  }
})

const scrollToAnchor = (anchor) => {
  setTimeout(() => {
    let element = document.querySelector(anchor)
    
    if (!element) {
      const altAnchor = anchor.replace('#_', '#')
      element = document.querySelector(altAnchor)
    }
    
    if (!element) {
      const anchorText = decodeURIComponent(anchor.replace('#', '').replace(/^_/, ''))
      const headings = document.querySelectorAll('h2, h3')
      
      for (let heading of headings) {
        const headingText = heading.textContent.trim()
        const cleanHeading = headingText.replace(/^\d+\.\s*/, '')
        if (cleanHeading === anchorText || headingText.includes(anchorText)) {
          element = heading
          break
        }
      }
    }
    
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
      element.style.backgroundColor = '#f0f9ff'
      element.style.transition = 'background-color 0.3s'
      element.style.padding = '8px'
      element.style.borderRadius = '4px'
      setTimeout(() => {
        element.style.backgroundColor = ''
        element.style.padding = ''
      }, 2000)
    }
  }, 100)
}

const resetSelection = () => {
  interestPoint.value = ''
  purpose.value = ''
}
</script>

# B-End Industry Application Scenario Reference

## Chapter Overview

<ChapterIntroduction :duration="duration" :tags="['B-End Applications', 'Industry Applications', 'AI Scenarios', 'Landing Reference', 'Industry Solutions']" coreOutput="Understand 15+ B-End industry application scenarios" expectedOutput="Find project directions suitable for enterprise customers">

This document summarizes **LLM large model applications in B-End enterprise scenarios**. Unlike C-End which focuses on user experience and emotions, B-End products focus more on **solving actual business needs, improving efficiency, and reducing costs**. Each scenario has **actual landing feasibility**, covering the complete thinking from **requirement analysis to technical implementation**, suitable for AI application developers targeting enterprise customers.

</ChapterIntroduction>

## Industry Direction Quick Selection

<el-card shadow="hover" style="margin-top: 16px; margin-bottom: 24px; border-left: 5px solid #409EFF;">
  <div style="font-weight: 600; margin-bottom: 8px;">Find the application scenario suitable for you</div>
  <div style="color: #606266; font-size: 14px; line-height: 1.6; margin-bottom: 12px;">
    Select your interest direction and target purpose. The system recommends related industry scenarios. Click a row to jump to the corresponding chapter.
  </div>
  <el-row :gutter="16">
    <el-col :span="12">
      <el-select v-model="interestPoint" placeholder="Select interest direction" style="width: 100%;">
        <el-option
          v-for="item in interestOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
          <div style="font-weight: 500;">{{ item.label }}</div>
          <div style="font-size: 12px; color: #909399;">{{ item.desc }}</div>
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="12">
      <el-select v-model="purpose" placeholder="Select purpose" style="width: 100%;">
        <el-option
          v-for="item in purposeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
          <div style="font-weight: 500;">{{ item.label }}</div>
          <div style="font-size: 12px; color: #909399;">{{ item.desc }}</div>
        </el-option>
      </el-select>
    </el-col>
  </el-row>
  
  <div v-if="recommendationTopics.length > 0" style="margin-top: 16px;">
    <div style="font-weight: 600; margin-bottom: 10px; color: #409EFF;">
      {{ recommendationTopics.length }} recommended scenarios for you
      <span style="font-weight: normal; color: #909399; font-size: 13px; margin-left: 8px;">
        ({{ currentSelection.interest }} + {{ currentSelection.purpose }})
      </span>
    </div>
    <el-table
      :data="recommendationTopics"
      style="width: 100%; cursor: pointer;"
      @row-click="(row) => scrollToAnchor(row.industryAnchor)"
      highlight-current-row
    >
      <el-table-column prop="title" label="Application Scenario" min-width="300">
        <template #default="scope">
          <div style="font-weight: 500; color: #303133;">{{ scope.row.title }}</div>
          <div style="font-size: 12px; color: #909399; margin-top: 4px;">{{ scope.row.desc }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="industryName" label="Industry" width="180" align="center">
        <template #default="scope">
          <el-tag type="info" effect="light" size="small">{{ scope.row.industryName }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 10px; font-size: 12px; color: #909399;">
      💡 Click any row in the table to jump to the corresponding industry section
    </div>
  </div>

  <div v-else-if="!interestPoint || !purpose" style="margin-top: 14px; color: #909399; font-size: 13px;">
    <span v-if="!interestPoint && !purpose">💡 Please select both interest direction and purpose</span>
    <span v-else-if="!interestPoint">💡 Please select an interest direction</span>
    <span v-else>💡 Please select a purpose</span>
  </div>

  <div v-if="interestPoint || purpose" style="margin-top: 12px;">
    <el-button size="small" @click="resetSelection">Reset Selection</el-button>
  </div>
</el-card>

---

## Industry Quick Overview

### Mainstream Technology Choices

In AI application development, common technical directions include:

1. **LLM (Large Language Models)**: Strong in natural language tasks such as dialogue, text generation, summarization, and translation. Suitable for intelligent customer service, content creation, and knowledge Q&A applications.
2. **VLM (Vision-Language Models)**: Combines visual understanding and language reasoning to support image description, visual Q&A, and multimodal generation. Useful for medical imaging analysis, industrial inspection, and creative design scenarios.
3. **GenAI (Generative AI)**: Covers text generation, image generation (for example Stable Diffusion, DALL-E), video generation, and more. It rapidly produces creative outputs for design support, marketing asset creation, and training content.

### Selection Strategy

Learners can choose directions based on these dimensions:

1. **Interest-first**: Start from industries or technologies you are personally interested in to keep momentum.
   - Interested in creative design: Try content production or industrial design applications
   - Interested in technical challenge: Try cybersecurity or healthcare applications
   - Interested in social value: Try smart government or education applications
2. **Industry fit**: Match your background and resource advantages.
   - Manufacturing practitioners: Prioritize manufacturing and enterprise-service applications
   - Educators: Prioritize education and content production applications
   - Healthcare practitioners: Explore healthcare and health management applications
3. **Technical difficulty**: Pick complexity based on your current foundation.
   - Beginner: Intelligent customer service, content creation, basic Q&A systems
   - Intermediate: Industrial quality inspection, medical image analysis, coding assistants
   - Advanced: Financial risk control, cybersecurity, complex multimodal systems

---

## 1. Manufacturing Industry

> 💡 **Core Concept**: AI empowers traditional manufacturing to achieve intelligent transformation

| No. | Application Scenario Name | Application Scenario Function |
| :--: | ------------ | ------------ |
| 1 | New Energy Bus Exterior AI-Assisted Design Platform | Integrates image generation models for exterior concept design; generates multiple design schemes based on requirements |
| 2 | Intelligent Drawing Design & Review Assistant | Builds enterprise design specification knowledge base using RAG; provides intelligent review suggestions |
| 3 | Technical Documentation Auto-Generation System | LLM auto-generates product specifications, operation manuals; supports multi-format export |
| 4 | Production Equipment Inspection Report Auto-Generation | Voice input describes equipment status; structured inspection report auto-generated |
| 5 | Industrial Equipment Fault Diagnosis Q&A | Builds vector knowledge base from historical fault cases; provides intelligent diagnosis suggestions |
| 6 | LLM Information-Retrieval Data Warehouse | Uses Text-to-SQL to convert natural-language queries into database queries; Superset visualizes results; Doris or ClickHouse as OLAP engine |
| 7 | Industrial Equipment Fault-Diagnosis Knowledge Q&A Assistant | Builds a vector knowledge base from historical fault cases; LLM provides diagnosis suggestions and solution plans based on fault descriptions |
| 8 | Production Quality Inspection Report Generation and Defect Classification | OCR identifies defects in inspection photos; LLM generates structured quality reports and classifies defect type and severity |
| 9 | Inventory Counting Assistant and Inventory Report Generation | Inputs stocktaking data; LLM compares with system inventory and generates discrepancy reports with abnormal-inventory alerts |
| 10 | Process Optimization Suggestion Intelligent Q&A System | Builds a RAG knowledge base from process documents; LLM provides optimization suggestions based on production issues |

---

## 2. Intelligent Customer Service

> 💡 **Core Concept**: Empowers customer service with AI to achieve 24/7 intelligent response

| No. | Application Scenario Name | Application Scenario Function |
| :--: | ------------ | ------------ |
| 1 | Multi-Channel Intelligent Customer Service Auto-Reply | Connects to website, APP, WeChat, and other channels; LLM understands intent and generates responses |
| 2 | Potential Customer Mining & Follow-up Assistant | Analyzes historical conversation records; identifies high-intent leads for sales follow-up |
| 3 | Enterprise Internal Knowledge Intelligent Q&A | Builds vector knowledge base from internal documents; provides precise Q&A service for employees |
| 4 | Customer Service Conversation Smart Summary | Automatically generates conversation summaries; extracts key information and creates follow-up tickets |
| 5 | Golden Script Recommendation Knowledge Base | Analyzes excellent service cases; extracts golden scripts for team sharing and training |
| 6 | Customer Service Script Compliance Auto-Check Assistant | Customer-service staff input reply drafts; LLM checks script compliance and sensitive words in real time and provides revision suggestions |
| 7 | Customer Service Ticket Auto-Summary and Classification Tool | LLM summarizes long conversations and auto-classifies tags; Elasticsearch supports full-text ticket search |
| 8 | Customer Emotion Monitoring and Abnormality Alert Tool | Real-time analysis of voice tone and text sentiment; LLM identifies abnormal emotions and triggers alerts with WebSocket push |
| 9 | Golden Script Recommendation Knowledge-Base System for Customer Service | LLM analyzes excellent customer-service conversations, refines high-performing templates, and recommends scripts based on context |
| 10 | Intelligent Outbound-Call Conversation Analysis and QA Assistant | After outbound-call recording transcription, LLM extracts key information; automatically generates QA reports and improvement suggestions |

---

## 3. Education Industry

> 💡 **Core Concept**: Personalized learning powered by AI to achieve adaptive education

| No. | Application Scenario Name | Application Scenario Function |
| :--: | ------------ | ------------ |
| 1 | Personalized Language Learning Path Planning | Evaluates learner level; generates personalized daily/weekly learning task plans |
| 2 | Lesson Plan Auto-Generation Platform | Inputs course outline; AI generates complete lesson plans including teaching objectives and processes |
| 3 | Homework Auto-Grading & Learning Diagnosis | OCR recognizes handwritten answers; AI provides grading and improvement suggestions |
| 4 | Job Competency Model & Learning Map | Analyzes job requirements; generates competency models and corresponding learning paths |
| 5 | Foreign Language Oral Practice with AI | LLM plays role-play partners; simulates various real-life scenarios for speaking practice |
| 6 | School-Based Curriculum Construction and Courseware Production Tool | LLM analyzes school characteristics and student needs to generate curriculum frameworks; integrates PPT generation APIs for automatic courseware creation |
| 7 | College-Application Recommendation and Career Planning Platform | LLM analyzes candidate scores, ranking, interests, and other factors, then combines admissions data to recommend schools and majors |
| 8 | Youth Programming Code Assistant | LLM explains code logic and provides coding guidance; supports switching between block languages and Python |
| 9 | Knowledge-Point Mind Map Auto-Generation and Learning-Path Recommendation Tool | Input course topics; LLM automatically generates knowledge maps and recommends next-step learning content based on progress |
| 10 | Chinese/English Essay Auto-Scoring and Correction Engine | LLM scores from dimensions such as idea, structure, language, and diversity, and generates annotations with high-quality sample comparison |

---

## 4. Intelligent Programming

> 💡 **Core Concept**: AI assists development to improve programmer productivity

| No. | Application Scenario Name | Application Scenario Function |
| :--: | ------------ | ------------ |
| 1 | Intelligent Code Completion & Bug Fix | IDE plugin provides real-time code completion suggestions; automatically fixes simple bugs |
| 2 | Low-Code Application Builder | Natural language describes requirements; AI converts to low-code visual configurations |
| 3 | Unit Test Auto-Generation | Analyzes source code structure; generates boundary condition test cases automatically |
| 4 | Code Quality Analysis Tool | Analyzes code complexity, security vulnerabilities; provides optimization recommendations |
| 5 | UI Code Auto-Generation from Design | Uploads design draft images; AI generates responsive HTML/CSS code |
| 6 | Natural Language to SQL Auto-Generation Tool | LLM converts natural-language data requests to SQL and supports complex multi-table joins and aggregation queries |
| 7 | API Automated Testing and Documentation Generation Platform | LLM analyzes code comments and API definitions, auto-generates test cases and API docs, and integrates Postman for test execution |
| 8 | System Log Analysis and Fault Localization | ELK Stack collects log data; LLM extracts key anomaly information and locates root causes, then recommends fixes |
| 9 | Frontend UI Code Auto-Generation Tool | OCR recognizes layout structures from design images; LLM generates responsive CSS and component code with TailwindCSS integration |
| 10 | Intelligent Database Schema Design and Modeling Assistant | Input business requirement docs to LLM to auto-generate ER diagrams and schema definitions; supports exporting MySQL/PostgreSQL DDL scripts |

---

## 5. Healthcare

> 💡 **Core Concept**: AI assists medical diagnosis to improve healthcare service efficiency

| No. | Application Scenario Name | Application Scenario Function |
| :--: | ------------ | ------------ |
| 1 | Medical Test Report Interpretation | OCR recognizes test indicators; intelligently interprets abnormal values and gives suggestions |
| 2 | Health Consultation Expert | Builds medical knowledge graph; provides professional health Q&A based on user symptoms |
| 3 | Clinical Research Data Analysis Platform | Integrates EMR data; assists in generating statistical analysis code for research |
| 4 | Medical Imaging Report Auto-Generation | Describes imaging features; generates structured medical imaging reports |
| 5 | Chronic Disease Medication Reminder | Generates personalized medication plans; supports drug interaction and contraindication checks |
| 6 | Drug Package-Insert Intelligent Q&A Assistant | Upload package-insert images or input drug names; LLM answers dosage, side effects, and precautions |
| 7 | Disease Knowledge Popular-Science Article Generator | Input disease name and audience type; LLM generates easy-to-understand educational content and supports multiple versions |
| 8 | Medical Imaging Report Auto-Generation Tool | Radiologists describe imaging features; LLM auto-generates structured report content and supports common exam templates |
| 9 | Surgical Record Intelligent Generation and Archiving Assistant | Voice input records key surgical steps; LLM generates structured surgical records and auto-links surgery codes |
| 10 | Chronic Disease Medication Reminder Intelligent Assistant | Patients input medication lists; LLM generates personalized reminders and supports contraindication checking and interactive Q&A |

---

## 6. Network Security

> 💡 **Core Concept**: AI empowers security operations to achieve intelligent threat detection and response

| No. | Application Scenario Name | Application Scenario Function |
| :--: | ------------ | ------------ |
| 1 | Code Security Vulnerability Detection | Static analysis scans code; identifies and suggests fixes for security vulnerabilities |
| 2 | AI Phishing Email Detection | Analyzes email content; identifies AI-generated phishing emails |
| 3 | Security Operations Daily Report | Aggregates security logs; automatically extracts and generates daily reports |
| 4 | Penetration Test Report Generation | Inputs vulnerability descriptions; AI generates complete penetration test reports |
| 5 | Threat Intelligence Analysis Assistant | Connects to threat intelligence sources; interprets and analyzes potential threats |
| 6 | Malicious Code Protection and Privacy Compliance Monitoring | Sandboxes suspicious-file behavior; LLM identifies malicious features and generates signatures; scans sensitive data exposure |
| 7 | Security Configuration Compliance Checklist Generation Tool | Input target system type; LLM generates configuration checklists supporting standards such as MLPS 2.0 and CIS |
| 8 | Threat Intelligence Intelligent Query and Analysis Assistant | Connects multi-source threat intelligence (open-source/commercial); LLM interprets intelligence and links it with enterprise assets |
| 9 | Security Incident Postmortem Report Generation Assistant | After incidents, LLM auto-generates timeline-based postmortem reports with root-cause analysis and remediation suggestions |
| 10 | Global Threat Intelligence Monitoring and Alert Center | Crawlers collect global security news and vulnerability disclosures; LLM extracts key information, assesses impact, and sends alerts |

---

## 7. Finance & Insurance

> 💡 **Core Concept**: AI empowers financial services to achieve intelligent risk control and wealth management

| No. | Application Scenario Name | Application Scenario Function |
| :--: | ------------ | ------------ |
| 1 | Credit Due Diligence Report Generation | Inputs enterprise financial data; AI generates comprehensive credit due diligence reports |
| 2 | Private Bank Wealth Management Advisor | Analyzes client risk preference; generates personalized asset allocation strategies |
| 3 | IPO Prospectus Generation & Compliance Check | Uses modular templates; auto-fills business descriptions with compliance verification |
| 4 | Financial Report & Anomaly Warning | Auto-generates financial analysis reports; monitors business anomalies in real-time |
| 5 | Insurance Agent Practice Coach | Simulates customer scenarios; evaluates script compliance and persuasion skills |
| 6 | Compliance Case Intelligent Retrieval and Q&A Assistant | Builds knowledge bases from regulatory penalty cases; LLM answers compliance questions and provides relevant case references |
| 7 | Insurance Agent Intelligent Script Practice | LLM plays different customer personas for simulation and evaluates script compliance and persuasion with transcription analysis |
| 8 | Insurance Product Clause Analysis and Competitor Comparison Platform | Parses clauses structurally; LLM generates feature summaries and key cautions |
| 9 | Customer Script Emotion Recognition Service | Combines voice-emotion recognition with script-compliance checks and gives real-time coaching suggestions |
| 10 | Insurance Claim Progress Intelligent Query and Dialogue Assistant | Users input policy or case numbers; LLM queries claim status and answers claim-related questions |

---

## 8. Enterprise Services

> 💡 **Core Concept**: AI empowers enterprise operations to achieve efficiency improvement and cost reduction

| No. | Application Scenario Name | Application Scenario Function |
| :--: | ------------ | ------------ |
| 1 | Contract Compliance Review Platform | Compares contract clauses with regulations; generates compliance review reports |
| 2 | Sales Conversation Analysis & Script Recommendation | Transcribes sales calls; analyzes conversation and recommends improvement strategies |
| 3 | Marketing Content Auto-Generation | Generates marketing copy, social media posts, and advertising scripts |
| 4 | Competitor Ad Analysis Platform | Collects and analyzes competitor advertising strategies |
| 5 | Hot Topic Analysis & Content Recommendation | Analyzes trending topics; recommends content creation angles |
| 6 | Resume Intelligent Parsing and Job Matching System | Parses resume PDFs to extract key information; LLM matches suitable roles and generates interview suggestions; integrates with ATS systems |
| 7 | Employee Onboarding Guidance and Q&A Assistant | Uses RAG retrieval over onboarding docs; LLM answers common new-hire questions |
| 8 | Employee Performance Feedback and OKR Management Platform | Collects OKR data; LLM analyzes goal completion and generates feedback suggestions with 360-feedback integration |
| 9 | Intelligent Meeting Minutes and To-Do Management | Transcribes meeting recordings; LLM extracts key points and action items; auto-creates tasks in task systems |
| 10 | Invoice Recognition and Expense Reimbursement Auto-Processing | OCR recognizes invoice fields and automatically checks authenticity and reimbursement compliance; integrates with finance systems |

---

## 9. Content Production & Operations

> 💡 **Core Concept**: AI empowers content creation to achieve efficient and high-quality output

| No. | Application Scenario Name | Application Scenario Function |
| :--: | ------------ | ------------ |
| 1 | Film & Novel Creation Assistant | Generates story outlines, character settings, and dialogue scripts |
| 2 | Brand Story & PR Writing Assistant | Inputs brand keywords; generates multi-style PR articles |
| 3 | Digital Human Live Streaming System | Creates digital human anchors; generates real-time dialogue for live streaming |
| 4 | Short Video Script & Editing | Generates short video scripts; provides intelligent editing suggestions |
| 5 | Marketing Content Design System | Generates advertising copy and designs marketing materials |
| 6 | Intelligent Marketing Content Generation and Design System | Input product information; LLM generates marketing copy and selling-point extraction; integrates with template-design tools |
| 7 | Multi-Platform Ad ROI Real-Time Monitoring and Strategy Optimization System | Connect ad-platform APIs for data collection; LLM analyzes performance and generates optimization suggestions with anomaly alerts |
| 8 | Search-Engine Keyword and Traffic Analysis | Collect keyword-tool data; LLM analyzes trend and competition and recommends topic direction |
| 9 | Competitor Ad Placement Analysis Platform | Uses third-party data APIs to collect competitor ads; LLM analyzes placement strategy and creative patterns |
| 10 | Full-Network Hot Topic Analysis and Content Recommendation System | Collects trending data; LLM analyzes trend shifts and recommends content angles with calendar scheduling |

---

## 10. Smart Government

> 💡 **Core Concept**: AI empowers government services to achieve intelligent governance

| No. | Application Scenario Name | Application Scenario Function |
| :--: | ------------ | ------------ |
| 1 | 12345 Hotline Intelligent Routing | Voice recognition understands citizen requests; intelligently routes to departments |
| 2 | Government Service Q&A Robot | Builds government knowledge base; provides policy consultation services |
| 3 | Enterprise Policy Matching Platform | Analyzes enterprise profiles; intelligently matches applicable support policies |
| 4 | Approval Materials Pre-Review | OCR recognizes application materials; automatically checks completeness |
| 5 | City Grid Event Management | Identifies event types from reports; intelligently dispatches to responsible departments |
| 6 | Social Sentiment Big-Data Analysis and Risk Early Warning System | Fuses multiple sources such as hotlines, online sentiment, and field visits; LLM identifies risk hotspots |
| 7 | Government Archive Digitization Recognition and Intelligent Filing Platform | OCR recognizes archive text; LLM extracts key information and auto-classifies; supports full-text retrieval |
| 8 | Emergency Command and Rescue Resource Intelligent Dispatch Platform | Collects emergency-event data; LLM generates emergency response plans with resource-dispatch optimization |
| 9 | Grid-Based Atmospheric Pollution Monitoring and Precision Traceability System | Collects air-quality sensor data; CV identifies pollution sources; LLM analyzes trends and traces causes |
| 10 | Public-Safety Incident Intelligent Risk Warning Assistant | Integrates historical events and real-time reports; LLM estimates risk levels and outputs warning recommendations |

---

## 11. Legal Affairs

> 💡 **Core Concept**: AI empowers legal services to achieve intelligent contract review and case analysis

| No. | Application Scenario Name | Application Scenario Function |
| :--: | ------------ | ------------ |
| 1 | Contract Risk Vulnerability Detection | Compares contracts against risk checklists; identifies potential legal risks |
| 2 | Case Win Rate Analysis | Analyzes case features; retrieves similar cases and predicts outcomes |
| 3 | Legal Regulation Change Monitoring | Monitors regulatory updates; analyzes impact on business operations |
| 4 | Legal Letter Auto-Drafting | Inputs case facts; AI generates standard legal letters |
| 5 | Legal Terms Plain Language Explanation | Translates complex legal terms into easy-to-understand language |
| 6 | Courtroom Recording Real-Time Transcription and Dispute-Focus Extraction Recorder | ASR transcribes hearing audio; LLM extracts dispute focuses and key arguments with timestamps |
| 7 | Full-Network IP Infringement Clue Monitoring and Blockchain Evidence Preservation System | Monitors e-commerce and social media infringement; automatically collects and preserves evidence |
| 8 | LLM-Based IPO Prospectus Key-Data Consistency Check and Risk Alert Agent | Compares data across prospectus sections; LLM identifies inconsistencies and abnormal values with risk tags |
| 9 | Complex Legal Clause "Translation" Plugin in Plain Language | Users select legal clauses and LLM outputs understandable explanations |
| 10 | Case Evidence-Chain Intelligent Structuring and Visualization System | Upload evidence materials; LLM analyzes evidence relationships and timelines |

---

## 12. Travel & Transportation

> 💡 **Core Concept**: AI empowers travel services to achieve personalized travel planning

| No. | Application Scenario Name | Application Scenario Function |
| :--: | ------------ | ------------ |
| 1 | Lazy Travel Guide Generator | Inputs travel preferences; AI generates daily itinerary with recommendations |
| 2 | Flight & Hotel Price Prediction | Uses ML models to predict price trends; suggests optimal booking timing |
| 3 | Visa Materials Pre-Review | OCR recognizes visa materials; automatically checks for completeness |
| 4 | Real-Time Translation for Travel | Offline voice translation; recognizes and translates menu images abroad |
| 5 | Travel Notes Auto-Generation | Extracts information from travel photos; generates shareable travel journals |
| 6 | Data-Driven Hotel "Pitfall Avoidance" Analyzer Based on Real Reviews | Collects hotel review data; LLM extracts positive and negative keyword patterns |
| 7 | Immersive Destination VR Preview and Virtual Room Selection Platform | Collects 360-degree panoramas; VR enables immersive previews and virtual room tours |
| 8 | Travel Footprint Auto-Generated Travel Notes and Social Copy Assistant | Extracts time/location metadata from photos; LLM generates travel notes with template-based layout |
| 9 | Enterprise Travel Invoice Aggregation and Compliance Reimbursement Management Platform | Connects travel-platform APIs for automatic invoice collection and compliance checks |
| 10 | Scenic-Area Crowd Congestion Prediction and Off-Peak Route Navigation | Collects scenic-area crowd data; ML predicts congestion windows and recommends off-peak routes |

---

## 13. Emotional Companionship

> 💡 **Core Concept**: AI provides 24/7 emotional support and psychological companionship

| No. | Application Scenario Name | Application Scenario Function |
| :--: | ------------ | ------------ |
| 1 | Virtual Companion | LLM-based AI companion with memory system; provides emotional support |
| 2 | Emotional Recognition & Counseling | Analyzes voice tone and text emotion; provides professional psychological suggestions |
| 3 | Cognitive Training for Elderly | Provides cognitive games; uses old photos to trigger memory for dementia patients |
| 4 | Social Anxiety Practice Coach | Creates virtual social scenarios; helps practice social interactions |
| 5 | Mood Monitoring & Incentive Assistant | Analyzes mood patterns; generates positive encouragement content |
| 6 | Generative AI Customized Bedtime Story Machine for Children | Parents input themes/preferences; LLM generates customized stories with background music support |
| 7 | Deceased Digital-Life Reconstruction and LLM Cross-Time Dialogue System | Trains personalized models from pre-death voice/text data and generates memory-based conversations |
| 8 | MBTI-Based AI Personality Mirror and Empathetic Chatbot | Inputs MBTI results; LLM outputs personality analysis and empathetic responses with match suggestions |
| 9 | Privacy-Protected AI Confession Tree-Hole for Teenagers | Anonymous channel for emotional expression; LLM provides listening/suggestions with sensitive-word alerts |
| 10 | Self-Evolving AI Virtual Pet Growth System | Trains pet personality models and supports interaction-driven growth and virtual customization |

---

## 14. Leisure & Entertainment

> 💡 **Core Concept**: AI creates immersive entertainment experiences

| No. | Application Scenario Name | Application Scenario Function |
| :--: | ------------ | ------------ |
| 1 | Game NPC Autonomous Decision Engine | LLM-driven NPCs with autonomous decision-making capabilities |
| 2 | Script Murder Story Deduction | AI generates story branches based on player choices |
| 3 | Interactive Novel Story Generator | Reader choices affect story development |
| 4 | Esports Game Analysis & Commentary | Real-time game analysis with AI-powered commentary |
| 5 | Audiobook Auto-Generation | Converts text to audio with character-specific voices |
| 6 | Personalized Humor Content Recommendation Algorithm Engine | Builds user-interest profiles and recommends matching humor content |
| 7 | AI Smart Vocal Tuning and KTV Voice Enhancement Software | Performs denoising and vocal enhancement with AI tuning algorithms |
| 8 | Film/TV Character-Centric Plot Extraction and Editing Tool | Analyzes video content, extracts character-related clips, and auto-generates edited cuts |
| 9 | Multi-Role TTS Audiobook Auto-Generation System | Assigns text roles and generates personalized voices with background music/effects |
| 10 | Board-Game Reinforcement-Learning Review Coach | Analyzes game records, simulates AI opponents, and generates review suggestions |

---

## 15. Ecommerce Services

> 💡 **Core Concept**: AI empowers ecommerce to achieve intelligent operations

| No. | Application Scenario Name | Application Scenario Function |
| :--: | ------------ | ------------ |
| 1 | Product Detail Page Generator | Generates high-converting product descriptions and marketing copy |
| 2 | Virtual Try-On | AI generates virtual model try-on effects |
| 3 | Multi-Language Translation | Localizes product descriptions for international markets |
| 4 | Digital Human Live Streaming | AI-powered virtual streamers for 24/7 live commerce |
| 5 | Trend Analysis & Product Selection | Analyzes market trends; suggests trending products to sell |
| 6 | Full-Network Same-Product AI Price Comparison and Trend Prediction Plugin | Crawls e-commerce prices, displays comparison charts, and predicts price trends |
| 7 | Buyer-Show Image AI Selection and Short-Video Synthesis Platform | Scores buyer-show images, auto-recommends high-quality content, and synthesizes short videos from templates |
| 8 | LLM-Based Real-Time Sales Dialogue Voice Analysis and Golden-Script Recommendation | ASR transcribes calls and performs real-time script compliance checks with recommendation output |
| 9 | Market Trend AI Insight and Best-Seller Prediction Engine | Collects and analyzes social media and e-commerce data; LLM identifies trend hotspots and recommends product choices |
| 10 | Private-Domain User Profiling AI Clustering and Precision Operations System | Clusters user behavior data, generates profile tags, and triggers automated marketing flows |

---

## 16. Energy

> 💡 **Core Concept**: AI empowers energy management for intelligent grid operations

| No. | Application Scenario Name | Application Scenario Function |
| :--: | ------------ | ------------ |
| 1 | Home Energy Analysis | Analyzes household electricity usage patterns; provides energy-saving suggestions |
| 2 | Solar Panel Defect Detection | Drone-captured images analyzed by CV for defect identification |
| 3 | Electricity Price Prediction | ML predicts spot prices; generates trading strategies |
| 4 | Carbon Emission Calculation | Auto-calculates enterprise carbon footprint; generates ESG reports |
| 5 | Grid Load Prediction | Predicts grid load under extreme weather; generates dispatch plans |
| 6 | Gas-Station Violation AI Video Recognition and Alert Guard | Analyzes surveillance video and detects violations (calling/smoking, etc.) with alert pushes |
| 7 | Long-Distance Oil/Gas Pipeline Leak Acoustic AI Monitoring and Precision Positioning System | Collects acoustic-sensor data for leak detection and localization algorithms |
| 8 | Virtual Power Plant Resource Aggregation and AI Power-Trading Decision System | Connects distributed resources for aggregated optimization dispatch and strategy execution |
| 9 | Mine Personnel AI Position Tracking and Dangerous-Area Intrusion Alarm | Uses UWB/Bluetooth positioning for trajectory tracking and geofenced danger-zone alerts |
| 10 | Energy-Storage Battery Health AI Assessment and Thermal-Runaway Warning | Monitors battery runtime data, evaluates health status, and triggers thermal-risk alerts |

---

## 17. Audio & Video

> 💡 **Core Concept**: AI empowers audio/video production for efficient content creation

| No. | Application Scenario Name | Application Scenario Function |
| :--: | ------------ | ------------ |
| 1 | Video Highlight Detection | AI identifies highlights from long videos; auto-generates short clips |
| 2 | Audio Noise Reduction | Separates vocals from background noise; enhances audio quality |
| 3 | Video Restoration & Colorization | 4K super-resolution; AI adds color to black and white footage |
| 4 | Text-to-Speech with Emotion | Generates natural-sounding speech with emotional expression |
| 5 | Meeting Transcription | Multi-speaker voice separation; generates meeting transcripts with action items |
| 6 | Video Object Removal AI Engine | Uses object tracking and inpainting to remove unwanted objects with frame-level consistency |
| 7 | Copyright-Safe Background Music AIGC Auto-Composer | Uses music-generation models with controllable emotional style and copyright checks |
| 8 | Specific-Person Voice Clone and Voice Conversion Software | Trains timbre models from small voice samples and supports voice conversion |
| 9 | One-Click Script-to-Storyboard and AI Dynamic Preview Video Platform | Parses scripts into storyboards and auto-generates previsualization videos |
| 10 | Meeting Recording AI Smart Transcription and Core To-Do Extraction Assistant | Performs multi-speaker transcription and LLM-based to-do extraction with timestamps |

---

## 18. AI Marketing

> 💡 **Core Concept**: AI empowers marketing to achieve data-driven creative campaigns

| No. | Application Scenario Name | Application Scenario Function |
| :--: | ------------ | ------------ |
| 1 | Social Media Viral Copy Generator | Generates Xiaohongshu-style posts with optimized emojis |
| 2 | Marketing Poster Designer | AI designs posters with multi-size adaptation |
| 3 | Logo & Brand Design | Generates brand logos; creates complete VI systems |
| 4 | Trend Analysis & Content Ideas | Tracks trending topics; suggests marketing angles |
| 5 | Video Script Generator | Generates short video scripts with shooting suggestions |
| 6 | Competitor Marketing Strategy Deep Analysis and AI Weekly Report Generator | Collects/analyzes competitor content, extracts strategy insights, and auto-generates weekly reports |
| 7 | Search-Engine Keyword AI Layout and Traffic Article Batch Writing | Analyzes keywords, generates articles at scale, and gives SEO optimization recommendations |
| 8 | Personalized Marketing Email AI Writing Expert | Uses user-profile data for personalized content generation with A/B testing |
| 9 | Brand Reputation Full-Network Monitoring and Crisis AI Alert Radar | Collects network sentiment data, runs sentiment analysis, and pushes crisis alerts |
| 10 | Short-Video Script Creative AIGC Generation and Storyboard Guidance Assistant | Inputs themes and outputs scripts, storyboards, and practical shooting guidance |

---

## 19. Data Intelligence

> 💡 **Core Concept**: AI makes data accessible to everyone through natural language

| No. | Application Scenario Name | Application Scenario Function |
| :--: | ------------ | ------------ |
| 1 | Natural Language to SQL | Converts natural language queries to SQL statements |
| 2 | Data Asset Catalog | Auto-catalogs and classifies enterprise data assets |
| 3 | Data Quality Monitoring | Detects data anomalies; suggests fixes |
| 4 | Report Generator | Creates reports and dashboards through conversation |
| 5 | Metric Q&A Assistant | Answers questions about data metric definitions and calculations |
| 6 | Intelligent Data-Report Interpretation and Trend Analysis Assistant | Upload report images or input data; VLM interprets chart content and analyzes trends |
| 7 | Intelligent DB-Schema Interpretation and Query-Example Generation Assistant | Input table names or field descriptions; LLM generates schema explanations and sample SQL |
| 8 | Enterprise Master-Data Intelligent Alignment and AI Dedup Governance | Matches master data across sources, identifies duplicates, and supports merge-rule configuration |
| 9 | Data Requirement Doc to Test-Case Intelligent Conversion Tool | Input data requirement descriptions; LLM generates test scenarios and validation test cases |
| 10 | Data Metric-Definition Intelligent Q&A Assistant | Builds a knowledge base from metric-definition docs; LLM answers definition and calculation logic questions |
