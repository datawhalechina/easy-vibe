# 上下文工程入门 (Context Engineering)

> 💡 **学习指南**：上下文是 AI 理解当前对话的"记忆"。本章节将通过详细的可视化演示和交互式实验，带你掌握上下文窗口管理、记忆系统设计、上下文压缩等核心技能。了解上下文工程，让你的 AI 不仅能"看见"更多信息，还能"理解"得更好。

## 0. 引言：什么是上下文工程？

**上下文工程**是指在与大语言模型交互时，如何有效地组织、管理和优化输入信息，以在有限的上下文窗口内实现最佳效果的技术。

### 0.1 为什么需要上下文工程？

**问题场景**：

当你问 AI 一个问题时，它需要"记住"很多信息：
- 📋 **你的问题**（当前在问什么）
- 📜 **对话历史**（之前说了什么）
- 📚 **背景知识**（需要知道的资料）
- 🎯 **任务要求**（期望的输出格式）

**上下文窗口的限制**：📦

大语言模型的"上下文窗口"（Context Window）就像一个**短期记忆容量**。它决定了模型一次性能"看到"多少文本。

**实际影响**：

```
❌ 上下文太小 → AI "忘记"了重要信息
❌ 上下文太乱 → AI "迷失"在海量文字中
✅ 上下文工程 → 在有限空间内，呈现最相关的信息
```

### 0.2 上下文工程 vs 提示词工程

| 维度 | 提示词工程 | 上下文工程 |
|------|-----------|-----------|
| **关注点** | 如何表达需求 | 如何组织信息 |
| **优化目标** | 让 AI 理解指令 | 让 AI 找到答案 |
| **主要技术** | 角色设定、任务描述 | 记忆管理、压缩、优先级排序 |
| **典型场景** | 单次问答 | 长对话、知识检索 |
| **核心挑战** | 指令清晰度 | 信息密度和相关性 |

**简单理解**：
- 📝 **提示词工程**：教 AI "怎么做"（How to do）
- 📦 **上下文工程**：给 AI "什么材料"（What to use）

---

## 1. 理解上下文窗口

### 1.1 什么是上下文窗口？

**上下文窗口**是大语言模型一次性能处理的最大文本长度。

<ContextWindowDemo />

**为什么有这个限制**？

- 💾 **计算成本**：处理更多文本需要更多计算资源
- ⏱️ **推理速度**：上下文越长，生成速度越慢
- 🎯 **性能权衡**：长上下文模型更贵、更慢
- 🧠 **注意力机制**：Transformer 的注意力复杂度是 O(n²)

**历史演进**：

```
2020年: GPT-3     →  2K tokens   (约 3 页 A4 纸)
2022年: GPT-3.5   →  4K tokens   (约 6 页 A4 纸)
2023年: GPT-4     →  8K tokens   (约 12 页 A4 纸)
2023年: Claude 2  →  100K tokens (约 150 页 A4 纸)
2024年: Gemini    →  1M tokens   (约 1500 页 A4 纸)
```

### 1.2 Token 换算：如何计算？

**什么是 Token？**

Token 是文本的最小单位，可以是：
- 一个完整的单词（如 `hello`）
- 一个单词的一部分（如 `ing`）
- 一个汉字或标点符号

**实用换算表**：

| 文本类型 | Token 数量 | 说明 |
|---------|-----------|------|
| 1 个英文单词 | ~1.3 tokens | 平均值 |
| 1 个汉字 | ~1-2 tokens | 取决于编码 |
| 1 页 A4 纸（英文） | ~500 tokens | 单倍行距 |
| 1 页 A4 纸（中文） | ~800 tokens | 单倍行距 |
| 1 本书（300 页） | ~150K tokens | 技术类书籍 |

**代码示例**：

```python
import tiktoken

# 计算 Token 数量
encoder = tiktoken.encoding_for_model("gpt-4")

text = "上下文工程是 AI 系统的核心技术"
tokens = encoder.encode(text)
print(f"Token 数量: {len(tokens)}")  # 输出: Token 数量: 18
print(f"Tokens: {tokens}")          # 输出: Tokens: [32456, 124, 892, ...]

# 解码回文本
decoded = encoder.decode(tokens)
print(f"解码文本: {decoded}")       # 输出: 解码文本: 上下文工程是 AI 系统的核心技术
```

**实用技巧**：

1. **预留余量**：上下文窗口的 70-80% 用于输入，20-30% 用于输出
2. **精确计算**：使用模型对应的 Tokenizer（不同模型不同）
3. **估算规则**：中文按 1.5 tokens/字，英文按 1.3 tokens/词

### 1.3 上下文窗口的实际影响

**场景 1：对话系统**

```
用户：你好，我是小明，喜欢吃苹果
AI：你好小明！很高兴认识你。

用户：我姓什么？
AI：你姓小明。

用户：（50 轮对话后）
用户：我姓什么？
AI：对不起，我不确定你姓什么（上下文窗口溢出）
```

**场景 2：长文档分析**

```
任务：分析一份 100 页的合同，找出所有风险条款

问题：合同超过上下文窗口

方案 1：分成小块分析 → 看不到整体逻辑 ❌
方案 2：只用长上下文模型 → 成本很高 ✅
方案 3：用压缩 + 记忆系统 → 智能处理 ✅✅
```

---

## 2. 记忆管理系统

### 2.1 为什么需要记忆系统？

**人类记忆的类比**：

人类有三个记忆系统：
1. **感觉记忆**：瞬间记忆（0.5-3 秒）
2. **短期记忆**：工作记忆（15-30 秒，7±2 个项目）
3. **长期记忆**：永久存储

**AI 的记忆系统**：

```
人类记忆                    AI 记忆
─────────────────────────────────────────
感觉记忆  →  当前输入        User Query
短期记忆  →  上下文窗口      Context Window
长期记忆  →  向量数据库/文件   Vector DB / Files
```

**核心问题**：上下文窗口 = 短期记忆

- ⚠️ 容量有限（4K-200K tokens）
- ⚠️ 会丢失旧信息
- ⚠️ 每次对话都要重新发送

**解决方案**：设计智能的记忆管理系统

### 2.2 三层记忆架构

**完整架构**：

```
┌─────────────────────────────────────┐
│     第 0 层：实时输入                │  当前问题
│     - 用户的新问题                   │
│     - 最新的反馈                     │  临时存储
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│     第 1 层：即时上下文              │  当前会话（最近 N 轮）
│     - 最近的对话                     │
│     - 当前任务信息                   │  高细节
│     - 临时数据                       │  快速访问
│                                      │  每次对话都发送
└─────────────────────────────────────┘
              ↓ 归档
┌─────────────────────────────────────┐
│     第 2 层：短期记忆                │  会话摘要（最近 1-7 天）
│     - 任务目标                       │
│     - 工作进度                       │  中等细节
│     - 关键事实                       │  压缩存储
│     - 待办事项                       │  需要时检索
└─────────────────────────────────────┘
              ↓ 归档
┌─────────────────────────────────────┐
│     第 3 层：长期记忆                │  用户档案（长期保存）
│     - 用户偏好                       │
│     - 历史记录                       │  低细节
│     - 知识库                         │  按需访问
│     - 个性化设置                     │  向量索引
└─────────────────────────────────────┘
```

**各层特点对比**：

| 层级 | 容量 | 访问速度 | 信息密度 | 持久化 | 更新频率 | 成本 |
|------|------|---------|---------|--------|---------|------|
| **实时输入** | 极小 | ⚡⚡⚡⚡⚡ | 原始 | 否 | 每次交互 | 极低 |
| **即时上下文** | 小（4K-32K） | ⚡⚡⚡⚡ | 高 | 否 | 每轮对话 | 高（每次发送） |
| **短期记忆** | 中（100K-1M） | ⚡⚡⚡ | 中 | 是 | 每天归档 | 中 |
| **长期记忆** | 大（1G+） | ⚡⚡ | 低 | 是 | 按需更新 | 低 |

### 2.3 即时上下文管理

**策略 1：滑动窗口（Sliding Window）**

只保留最近 N 轮对话

**工作原理**：

```python
# 示例：保留最近 10 轮对话
conversation_history = [
    {"role": "user", "content": "第一轮对话"},
    {"role": "assistant", "content": "回复"},
    # ... 更多对话
    {"role": "user", "content": "第20轮对话"},
    {"role": "assistant", "content": "回复"}
]

# 滑动窗口：只保留最后 10 轮
MAX_HISTORY = 10
recent_context = conversation_history[-MAX_HISTORY:]
```

**可视化演示**：

```
原始对话历史（20 轮）:
[1][2][3][4][5][6][7][8][9][10][11][12][13][14][15][16][17][18][19][20]
                                    ↑
                            滑动窗口开始
                                    ↓
保留的上下文（10 轮）:
          [11][12][13][14][15][16][17][18][19][20]
```

**优点**：
- ✅ 简单易实现
- ✅ 保证上下文不超限
- ✅ 始终有最新信息

**缺点**：
- ❌ 可能丢失早期重要信息（如用户姓名、任务目标）
- ❌ 无法追溯完整对话历史
- ❌ 长对话中 AI 会"忘记"初始设定

**策略 2：智能窗口（Smart Window）**

结合关键信息提取的滑动窗口

```python
def smart_window_management(history, window_size=10):
    """
    智能窗口管理：保留最近的对话 + 关键事实
    """
    # 1. 提取关键事实（从全部历史）
    key_facts = extract_key_facts(history)
    # 例如：
    # {
    #   "user_name": "小明",
    #   "goal": "开发一个博客系统",
    #   "tech_stack": "Python + FastAPI",
    #   "preferences": {"style": "简洁"}
    # }

    # 2. 获取最近的对话
    recent_conversation = history[-window_size:]

    # 3. 组合上下文
    context = [
        {
            "role": "system",
            "content": f"""关键信息请记住：
            - 用户姓名：{key_facts['user_name']}
            - 目标：{key_facts['goal']}
            - 技术栈：{key_facts['tech_stack']}
            - 偏好：{key_facts['preferences']}
            """
        },
        *recent_conversation
    ]

    return context
```

**策略 3：摘要式窗口（Summary Window）**

定期生成摘要，释放空间

```python
class SummaryWindow:
    def __init__(self, max_messages=20, summary_interval=10):
        self.history = []
        self.max_messages = max_messages
        self.summary_interval = summary_interval
        self.summaries = []

    def add_message(self, role, content):
        self.history.append({"role": role, "content": content})

        # 检查是否需要摘要
        if len(self.history) >= self.max_messages:
            self._compress_history()

    def _compress_history(self):
        """
        压缩历史：将旧消息转为摘要
        """
        # 1. 保留最近的消息
        keep_recent = self.history[-self.summary_interval:]

        # 2. 将旧消息摘要化
        old_messages = self.history[:-self.summary_interval]
        summary = generate_summary(old_messages)

        # 3. 保存摘要
        self.summaries.append(summary)

        # 4. 更新历史
        self.history = keep_recent

    def get_context(self):
        """
        获取完整上下文：摘要 + 最近对话
        """
        context = []

        # 添加所有摘要
        for summary in self.summaries:
            context.append({
                "role": "system",
                "content": f"[对话摘要] {summary}"
            })

        # 添加最近的对话
        context.extend(self.history)

        return context

# 使用示例
window = SummaryWindow(max_messages=20, summary_interval=10)

window.add_message("user", "我是小明")
window.add_message("assistant", "你好小明！")
# ... 更多对话

# 当消息达到 20 条时，自动压缩前 10 条为摘要
context = window.get_context()
```

### 2.4 短期记忆管理

**目标**：管理当前会话的重要信息（1-7 天）

**存储什么？**

```python
short_term_memory = {
    # 会话信息
    "session_id": "sess_20250115_001",

    # 用户目标
    "user_goal": {
        "primary": "开发一个博客系统",
        "sub_goals": [
            "设计数据库架构",
            "实现后端 API",
            "开发前端界面"
        ],
        "constraints": ["时间: 2周", "预算: $0"]
    },

    # 工作进度
    "progress": {
        "completed": ["需求分析", "技术选型"],
        "in_progress": ["数据库设计"],
        "pending": ["API 开发", "前端开发"]
    },

    # 关键事实
    "key_facts": {
        "user_name": "小明",
        "tech_stack": ["Python", "FastAPI", "Vue.js"],
        "database": "PostgreSQL",
        "deployment": "Docker"
    },

    # 临时数据
    "temp_data": {
        "last_code_snippet": "...",
        "recent_errors": ["Error 1", "Error 2"]
    },

    # 元数据
    "created_at": "2025-01-15T10:00:00",
    "updated_at": "2025-01-15T15:30:00",
    "message_count": 45
}
```

**自动更新机制**：

```python
class ShortTermMemoryManager:
    def __init__(self, ttl=7*24*3600):  # 7 天过期
        self.memory = {}  # {session_id: memory_data}
        self.ttl = ttl

    def update(self, session_id, updates):
        """
        更新短期记忆
        """
        if session_id not in self.memory:
            self.memory[session_id] = {
                "session_id": session_id,
                "created_at": datetime.now(),
                "updated_at": datetime.now()
            }

        # 更新字段
        for key, value in updates.items():
            if key == "progress":
                # 智能合并进度
                self._merge_progress(session_id, value)
            else:
                self.memory[session_id][key] = value

        # 更新时间戳
        self.memory[session_id]["updated_at"] = datetime.now()

    def _merge_progress(self, session_id, new_progress):
        """
        智能合并进度信息
        """
        current = self.memory[session_id].get("progress", {})

        for status in ["completed", "in_progress", "pending"]:
            if status in new_progress:
                current[status] = current.get(status, [])
                current[status].extend(new_progress[status])
                # 去重
                current[status] = list(set(current[status]))

        self.memory[session_id]["progress"] = current

    def get(self, session_id):
        """
        获取短期记忆
        """
        if session_id not in self.memory:
            return None

        # 检查是否过期
        memory = self.memory[session_id]
        age = (datetime.now() - memory["updated_at"]).total_seconds()

        if age > self.ttl:
            # 过期，删除
            del self.memory[session_id]
            return None

        return memory

    def cleanup_expired(self):
        """
        清理过期的记忆
        """
        now = datetime.now()
        expired = []

        for session_id, memory in self.memory.items():
            age = (now - memory["updated_at"]).total_seconds()
            if age > self.ttl:
                expired.append(session_id)

        for session_id in expired:
            del self.memory[session_id]

        return len(expired)
```

### 2.5 长期记忆管理

**目标**：永久保存用户画像、历史记录、知识库

**存储结构**：

```python
long_term_memory = {
    # 用户画像
    "user_profile": {
        "user_id": "user_12345",
        "name": "小明",
        "preferences": {
            "communication_style": "简洁",
            "coding_style": "Pythonic",
            "learning_style": "实战导向"
        },
        "expertise": ["Python", "Web 开发", "AI"],
        "goals_history": [
            {
                "goal": "学习 FastAPI",
                "achieved": True,
                "date": "2024-12-01"
            },
            {
                "goal": "开发博客系统",
                "achieved": False,
                "date": "2025-01-15"
            }
        ]
    },

    # 知识库（向量存储）
    "knowledge_base": {
        "documents": [
            {
                "id": "doc_001",
                "content": "FastAPI 是一个现代、快速的 Web 框架...",
                "embedding": [0.1, 0.2, ...],  # 向量
                "metadata": {
                    "topic": "FastAPI",
                    "importance": "high"
                }
            }
        ]
    },

    # 技能映射
    "skill_map": {
        "Python": {
            "level": "advanced",
            "last_practiced": "2025-01-10",
            "related_projects": ["博客系统", "API 服务"]
        }
    },

    # 交互历史摘要
    "interaction_history": {
        "total_sessions": 50,
        "total_messages": 1234,
        "favorite_topics": ["Web 开发", "AI 应用"],
        "success_rate": 0.85
    }
}
```

**检索机制**：

```python
class LongTermMemoryManager:
    def __init__(self, vector_db):
        self.vector_db = vector_db  # 向量数据库
        self.profiles = {}  # 用户画像

    def store(self, user_id, content, metadata):
        """
        存储到长期记忆
        """
        # 1. 生成向量
        embedding = generate_embedding(content)

        # 2. 存储到向量数据库
        doc_id = self.vector_db.add(
            content=content,
            embedding=embedding,
            metadata={
                "user_id": user_id,
                **metadata
            }
        )

        return doc_id

    def retrieve(self, user_id, query, top_k=5):
        """
        从长期记忆检索相关信息
        """
        # 1. 生成查询向量
        query_embedding = generate_embedding(query)

        # 2. 向量检索
        results = self.vector_db.search(
            query_embedding,
            filter={"user_id": user_id},
            top_k=top_k
        )

        return results

    def update_profile(self, user_id, profile_data):
        """
        更新用户画像
        """
        if user_id not in self.profiles:
            self.profiles[user_id] = {}

        self.profiles[user_id].update(profile_data)

    def get_profile(self, user_id):
        """
        获取用户画像
        """
        return self.profiles.get(user_id, {})
```

### 2.6 记忆整合系统

**将三层记忆整合到一个系统**：

```python
class MemorySystem:
    def __init__(self):
        # 第 1 层：即时上下文
        self.immediate_context = ImmediateContext(max_messages=10)

        # 第 2 层：短期记忆
        self.short_term = ShortTermMemoryManager(ttl=7*24*3600)

        # 第 3 层：长期记忆
        self.long_term = LongTermMemoryManager(vector_db)

    def process_message(self, user_id, message):
        """
        处理新消息：更新三层记忆
        """
        # 1. 添加到即时上下文
        self.immediate_context.add_message("user", message)

        # 2. 提取并更新短期记忆
        key_info = extract_key_info(message)
        self.short_term.update(user_id, key_info)

        # 3. 重要信息存入长期记忆
        if is_important(message):
            self.long_term.store(
                user_id=user_id,
                content=message,
                metadata={"type": "important_fact", "timestamp": now()}
            )

    def build_context(self, user_id, query):
        """
        构建完整上下文
        """
        context_parts = []

        # 1. 从长期记忆检索相关信息
        long_term_info = self.long_term.retrieve(user_id, query, top_k=3)
        if long_term_info:
            context_parts.append({
                "role": "system",
                "content": f"[相关历史] {format_retrieved_info(long_term_info)}"
            })

        # 2. 从短期记忆获取会话信息
        short_term_info = self.short_term.get(user_id)
        if short_term_info:
            context_parts.append({
                "role": "system",
                "content": f"[当前会话] 目标：{short_term_info['user_goal']}\n进度：{short_term_info['progress']}"
            })

        # 3. 获取即时上下文
        immediate = self.immediate_context.get_context()
        context_parts.extend(immediate)

        return context_parts
```

---

## 3. 上下文压缩技术

### 3.1 为什么需要压缩？

**问题场景**：

```
任务：总结一份 100 页的报告

问题：
- 报告有 50K tokens
- 上下文窗口只有 8K tokens
- 无法一次性放入所有内容

解决方案：
压缩到 8K tokens 以内，同时保留关键信息
```

**压缩的权衡**：

| 压缩率 | 信息保留 | 适用场景 |
|--------|---------|---------|
| 0-20% | 90-100% | 不需要压缩 |
| 20-50% | 70-90% | 保留重要细节 |
| 50-80% | 40-70% | 快速浏览 |
| 80-95% | 10-40% | 极简摘要 |

### 3.2 压缩方法 1：摘要压缩（Summarization）

**原理**：用 LLM 生成文本摘要

**基础版本**：

```python
def compress_by_summarization(text, target_ratio=0.3):
    """
    将文本压缩到原长度的 30%
    """
    current_length = count_tokens(text)
    target_length = int(current_length * target_ratio)

    prompt = f"""
    将以下文本压缩到 {target_length} tokens 以内。
    保留所有关键信息，删除冗余内容。

    原文：
    {text}

    压缩后的文本：
    """

    compressed = llm_call(prompt, max_tokens=target_length)
    return compressed
```

**进阶版本：迭代式摘要**：

```python
def iterative_summarization(text, target_tokens):
    """
    迭代式摘要：逐步压缩到目标大小
    """
    current_text = text
    current_length = count_tokens(text)

    while current_length > target_tokens:
        # 每次压缩 50%
        compression_ratio = target_tokens / current_length

        prompt = f"""
        将以下文本压缩到原长度的 {compression_ratio*100:.0f}%。
        保留关键信息，删除冗余。

        原文：
        {current_text}

        压缩后：
        """

        current_text = llm_call(prompt)
        current_length = count_tokens(current_text)

        # 防止无限循环
        if current_length == count_tokens(text):
            break

    return current_text

# 示例
long_text = "..."  # 50K tokens
compressed = iterative_summarization(long_text, target_tokens=5000)
```

**分层摘要（Hierarchical Summarization）**：

```python
def hierarchical_summarization(text, levels=3):
    """
    分层摘要：生成不同详细程度的摘要
    """
    summaries = {}

    # 第 1 层：详细摘要（50%）
    summaries["detailed"] = summarize(text, target_ratio=0.5)

    # 第 2 层：简明摘要（20%）
    summaries["brief"] = summarize(
        summaries["detailed"],
        target_ratio=0.4
    )

    # 第 3 层：核心要点（5%）
    summaries["key_points"] = extract_key_points(
        summaries["brief"]
    )

    return summaries

# 使用示例
summaries = hierarchical_summarization(long_report)

# 根据任务选择合适详细程度
if task_type == "quick_overview":
    context = summaries["key_points"]  # 最简洁
elif task_type == "detailed_analysis":
    context = summaries["detailed"]    # 最详细
else:
    context = summaries["brief"]        # 中等
```

### 3.3 压缩方法 2：选择性保留（Selective Retention）

**原理**：根据重要性选择保留内容

**优先级规则**：

```python
IMPORTANCE_RULES = {
    # 最高优先级（必须保留）
    "user_question": 1,          # 用户当前问题
    "system_prompt": 2,          # 系统提示词
    "key_constraints": 3,        # 关键约束条件

    # 高优先级（尽量保留）
    "recent_conversation": 4,    # 最近对话
    "task_goal": 5,              # 任务目标
    "critical_facts": 6,         # 关键事实

    # 中等优先级（空间允许时保留）
    "background_info": 7,        # 背景信息
    "examples": 8,               # 示例代码
    "historical_context": 9,     # 历史上下文

    # 低优先级（可省略）
    "detailed_explanation": 10,  # 详细解释
    "redundant_info": 11,        # 冗余信息
}
```

**实现**：

```python
def selective_compression(context_items, budget):
    """
    根据优先级选择性保留内容
    """
    selected = []
    current_tokens = 0

    # 按优先级排序
    sorted_items = sorted(
        context_items,
        key=lambda x: IMPORTANCE_RULES.get(x["type"], 99)
    )

    for item in sorted_items:
        item_tokens = count_tokens(item["content"])

        if current_tokens + item_tokens <= budget:
            # 完全保留
            selected.append(item)
            current_tokens += item_tokens
        else:
            # 尝试压缩
            remaining_budget = budget - current_tokens
            compressed = compress_item(item, remaining_budget)

            if compressed:
                selected.append(compressed)
                current_tokens += count_tokens(compressed["content"])

            # 预算用完，停止
            break

    return selected

# 使用示例
context_items = [
    {"type": "user_question", "content": "如何优化这个函数？"},
    {"type": "background_info", "content": "这是一个..."},
    {"type": "examples", "content": "示例代码..."},
    # ... 更多项目
]

budget = 4000  # tokens
selected = selective_compression(context_items, budget)
```

### 3.4 压缩方法 3：结构化压缩（Structured Compression）

**原理**：保留结构，压缩细节

**示例：保留代码结构**

```python
def compress_code_structure(code, detail_level="medium"):
    """
    压缩代码，但保留结构
    """
    if detail_level == "high":
        # 保留完整代码
        return code

    elif detail_level == "medium":
        # 保留函数签名和注释，删除实现细节
        compressed = []
        for line in code.split('\n'):
            stripped = line.strip()

            # 保留空行、注释、函数/类定义
            if (not stripped or
                stripped.startswith('#') or
                stripped.startswith('def ') or
                stripped.startswith('class ')):
                compressed.append(line)
            # 跳过实现细节
            elif not line.startswith(' '):
                compressed.append(line)

        return '\n'.join(compressed)

    elif detail_level == "low":
        # 只保留结构（类名、函数名）
        parser = parse_code(code)
        structure = []

        for cls in parser.get_classes():
            structure.append(f"class {cls.name}")
            for method in cls.methods:
                structure.append(f"  def {method.name}({method.params})")

        return '\n'.join(structure)

# 示例
code = """
def calculate_sum(numbers):
    '''计算数字列表的总和'''
    total = 0
    for num in numbers:
        total += num
    return total

def calculate_average(numbers):
    '''计算数字列表的平均值'''
    if not numbers:
        return 0
    return calculate_sum(numbers) / len(numbers)
"""

print(compress_code_structure(code, detail_level="medium"))
# 输出：
# def calculate_sum(numbers):
#     '''计算数字列表的总和'''
# def calculate_average(numbers):
#     '''计算数字列表的平均值'''
```

### 3.5 压缩方法 4：语义压缩（Semantic Compression）

**原理**：提取语义信息，丢弃表面形式

**提取关键信息**：

```python
def semantic_compression(text):
    """
    语义压缩：提取关键信息
    """
    # 1. 识别关键实体
    entities = extract_entities(text)
    # 例如：人名、地名、技术名词、数字

    # 2. 识别关键关系
    relations = extract_relations(text)
    # 例如：A 包含 B、C 导致 D

    # 3. 生成结构化表示
    compressed = {
        "entities": entities,
        "relations": relations,
        "main_idea": extract_main_idea(text)
    }

    return compressed

# 示例
text = """
FastAPI 是一个现代、快速的 Web 框架，用于基于 Python
构建 API。它由 Sebastián Ramírez 创建，于 2018 年首次发布。
FastAPI 使用 Starlette 进行路由，使用 Pydantic 进行数据验证。
"""

compressed = semantic_compression(text)
# 输出：
# {
#   "entities": ["FastAPI", "Web 框架", "Python", "Sebastián Ramírez",
#               "2018", "Starlette", "Pydantic"],
#   "relations": [
#     "FastAPI 是 Web 框架",
#     "FastAPI 基于 Python",
#     "FastAPI 由 Sebastián Ramírez 创建",
#     "FastAPI 使用 Starlette 进行路由",
#     "FastAPI 使用 Pydantic 进行数据验证"
#   ],
#   "main_idea": "FastAPI 是一个现代的 Python Web 框架"
# }
```

### 3.6 压缩方法 5：增量压缩（Incremental Compression）

**原理**：逐步压缩，每步保留关键信息

```python
def incremental_compression(text, budget):
    """
    增量压缩：逐步压缩到目标大小
    """
    compression_steps = [
        ("删除冗余", remove_redundancy),
        ("合并重复", merge_duplicates),
        ("压缩长段落", compress_long_paragraphs),
        ("提取要点", extract_key_points),
        ("极致压缩", extreme_compression)
    ]

    current = text
    current_size = count_tokens(text)

    for step_name, compress_func in compression_steps:
        if current_size <= budget:
            print(f"在 '{step_name}' 前已满足要求")
            break

        print(f"执行: {step_name}")
        current = compress_func(current)
        current_size = count_tokens(current)

        print(f"  当前大小: {current_size} tokens")

        if current_size <= budget:
            print(f"✓ 在 '{step_name}' 完成压缩")
            break

    return current

def remove_redundancy(text):
    """删除冗余内容"""
    # 1. 删除重复的句子
    sentences = text.split('. ')
    seen = set()
    unique_sentences = []

    for sent in sentences:
        # 使用简单的相似度判断
        sent_hash = hash(sent.lower().strip())
        if sent_hash not in seen:
            seen.add(sent_hash)
            unique_sentences.append(sent)

    return '. '.join(unique_sentences)

def merge_duplicates(text):
    """合并重复的信息"""
    # 实现略...
    pass

def compress_long_paragraphs(text, max_length=100):
    """压缩过长的段落"""
    paragraphs = text.split('\n\n')
    compressed = []

    for para in paragraphs:
        if count_tokens(para) > max_length:
            # 生成摘要
            compressed.append(summarize(para, target_ratio=0.5))
        else:
            compressed.append(para)

    return '\n\n'.join(compressed)

# 使用示例
long_text = "..."  # 假设有 20K tokens
compressed = incremental_compression(long_text, budget=5000)
```

### 3.7 压缩质量评估

**如何判断压缩是否丢失重要信息？**

```python
def evaluate_compression(original, compressed):
    """
    评估压缩质量
    """
    metrics = {}

    # 1. 压缩率
    original_size = count_tokens(original)
    compressed_size = count_tokens(compressed)
    metrics["compression_ratio"] = compressed_size / original_size

    # 2. 信息保留率（使用 LLM 评估）
    metrics["info_retention"] = llm_evaluate_retention(original, compressed)

    # 3. 关键事实保留检查
    original_facts = extract_facts(original)
    compressed_facts = extract_facts(compressed)

    retained_facts = set(original_facts) & set(compressed_facts)
    metrics["fact_retention_rate"] = len(retained_facts) / len(original_facts)

    # 4. 一致性检查（LLM 判断）
    metrics["consistency"] = llm_check_consistency(original, compressed)

    # 综合评分
    weights = {
        "compression_ratio": 0.2,
        "info_retention": 0.4,
        "fact_retention_rate": 0.3,
        "consistency": 0.1
    }

    overall_score = sum(
        metrics[key] * weights[key]
        for key in metrics
    )

    return {
        "overall": overall_score,
        "metrics": metrics
    }

# 示例
evaluation = evaluate_compression(original_text, compressed_text)
print(f"压缩质量评分: {evaluation['overall']:.2f}/1.0")
print(f"信息保留率: {evaluation['metrics']['info_retention']:.2%}")
```

---

## 4. RAG：检索增强生成（简介）

### 4.1 什么是 RAG？

**RAG (Retrieval-Augmented Generation)** 检索增强生成，是一种结合信息检索和文本生成的技术。

< RAGPipelineDemo />

**核心思想**：

```
传统方法：
用户问题 → 直接问 LLM → 回答（可能过时或错误）

RAG 方法：
用户问题 → 检索相关文档 → 将文档加入上下文 → 问 LLM → 回答（基于真实数据）
```

### 4.2 为什么需要 RAG？

| 问题 | 传统方法 | RAG 方法 |
|------|---------|---------|
| 知识截止日期 | ❌ 模型知识有截止日期 | ✅ 实时更新知识库 |
| 私有数据 | ❌ 无法访问私有文档 | ✅ 支持企业内部文档 |
| 幻觉问题 | ❌ 容易胡编乱造 | ✅ 基于真实数据回答 |

### 4.3 RAG 的基本流程

```
用户问题
  ↓
文档检索（向量数据库）
  ↓
上下文构建
  ↓
LLM 生成答案
  ↓
返回结果
```

**简单示例**：

```python
# 伪代码
def rag_query(question):
    # 1. 检索相关文档
    docs = vector_db.search(question, top_k=3)

    # 2. 构建上下文
    context = "\n\n".join([doc["content"] for doc in docs])

    # 3. 生成答案
    prompt = f"""
    基于以下文档回答问题：

    文档：
    {context}

    问题：{question}

    答案：
    """

    answer = llm_call(prompt)
    return answer
```

---

## 5. 实战技巧

### 5.1 上下文模板化

使用模板组织上下文，提高一致性和效率。

**标准上下文模板**：

```markdown
# 系统角色
{role_definition}

# 任务目标
{objective}

# 背景信息
{background}

# 约束条件
{constraints}

# 参考文档
{documents}

# 历史对话
{conversation_history}

# 当前问题
{current_question}

# 输出要求
{output_requirements}
```

### 5.2 动态上下文调整

根据任务类型动态调整上下文策略。

```python
CONTEXT_STRATEGIES = {
    "code_review": {
        "priority": ["code", "requirements", "standards"],
        "format": "structured",
        "compression": "low"
    },

    "qa": {
        "priority": ["knowledge_base", "user_query", "conversation_history"],
        "format": "concise",
        "compression": "medium"
    },

    "creative_writing": {
        "priority": ["prompt", "style_examples", "genre_rules"],
        "format": "narrative",
        "compression": "minimal"
    }
}
```

### 5.3 上下文质量检查

```python
def check_context_quality(context):
    """
    检查上下文质量
    """
    checks = {
        "length": count_tokens(context) < MAX_CONTEXT,
        "relevance": calculate_relevance(context) > 0.7,
        "clarity": check_structure(context),
        "completeness": has_required_elements(context)
    }

    return all(checks.values()), checks
```

---

## 6. 总结：上下文工程的核心原则

### 6.1 设计原则

1. **质量 > 数量**
   - 不是上下文越长越好
   - 相关性比全面性更重要
   - 精心组织比堆砌信息有效

2. **分层记忆**
   - 即时上下文：当前会话
   - 短期记忆：会话摘要
   - 长期记忆：用户档案

3. **智能压缩**
   - 根据重要性选择保留内容
   - 使用多种压缩方法
   - 评估压缩质量

4. **动态调整**
   - 根据任务类型选择策略
   - 根据预算压缩内容
   - 持续监控和优化

### 6.2 实践建议

**上下文工程检查清单**：

```
□ 明确任务类型（问答、分析、创作等）
□ 确定预算限制（上下文窗口大小）
□ 设计记忆系统（三层架构）
□ 选择合适的压缩策略
□ 组织上下文结构（清晰的格式）
□ 评估上下文质量（相关性、完整性）
□ 监控效果（准确率、成本、延迟）
□ 持续优化（迭代改进）
```

### 6.3 常见陷阱

| 陷阱 | 表现 | 解决方案 |
|------|------|---------|
| **上下文过载** | 塞入太多信息 | 精准选择，动态压缩 |
| **信息混乱** | 没有清晰结构 | 使用模板，结构化组织 |
| **过度压缩** | 丢失关键信息 | 分层压缩，保留要点 |
| **忽视记忆** | 不使用长期记忆 | 设计三层记忆系统 |
| **静态不变** | 一套模板用所有场景 | 动态调整，因任务而异 |

---

## 7. Agent 上下文工程

> 💡 **特别说明**：Agent 系统对上下文工程有特殊要求。与普通聊天机器人不同，Agent 需要通过 50+ 次工具调用完成任务，每次迭代都会增加上下文长度。本章节基于 Manus 等实战经验，介绍 Agent 上下文工程的关键技术。

### 7.1 Agent 与普通应用的区别

**Agent 的特殊性**：

- ❌ **聊天机器人**：单轮或几轮对话，上下文短，不需要优化
- ✅ **AI Agent**：多轮迭代完成任务，上下文长，必须精心设计

**为什么 Agent 需要特殊的上下文工程？**

```
Agent 的一个任务可能需要 50+ 次工具调用：

迭代 1：输入（系统提示 + 工具定义）→ 输出（search 调用）
迭代 2：输入（+ 第一次动作 + 观察）→ 输出（read_page 调用）
迭代 3：输入（+ 第二次动作 + 观察）→ 输出（think 调用）
...
迭代 50：输入（+ 第49次动作 + 观察）→ 输出（最终答案）

如果上下文管理不当：
💰 成本爆炸：每次都重新计算整个上下文
🐌 速度变慢：上下文越长，推理越慢
📉 性能下降：模型在超长上下文中"迷失"
```

<AgentContextFlow />

### 7.2 核心指标：KV 缓存命中率

**什么是 KV 缓存？**

KV (Key-Value) 缓存是 LLM 推理的优化技术：
- 相同的前缀可以被缓存
- 缓存的部分不需要重新计算
- 大幅降低成本和延迟

**成本对比**（以 Claude 为例）：
- 未缓存输入：`$3.00 / 百万 tokens`
- 缓存输入：`$0.30 / 百万 tokens`
- **节省 90%** 🎉

**Agent 的输入输出比**：

```
输入/输出比 ≈ 100:1

每次迭代：
- 输入：系统提示 + 工具定义 + 历史动作 + 历史观察（长）
- 输出：一个工具调用（短）
```

**这意味着**：输入部分的缓存优化至关重要！

**提高缓存命中率的策略**：

1. **保持前缀稳定**：系统提示和工具定义不要频繁变化
2. **只追加不修改**：上下文应该只追加新的动作和观察
3. **确定性序列化**：保证键顺序、避免随机性

### 7.3 工具管理：遮蔽而非移除

**问题**：工具太多会让 Agent 变笨！

**为什么不能动态添加/删除工具？**

```python
# ❌ 动态移除工具的缺点
tools.remove("browser_search")  # 历史上下文还引用这个工具！

# 导致问题：
# 1. KV 缓存失效（工具定义在上下文前部）
# 2. 模型困惑（看到历史中的未定义工具）
# 3. 产生幻觉（编造工具调用）
```

**正确做法：Logits 遮蔽**

在模型生成 token 时，直接禁止某些 token 的生成概率：

```python
# Manus 的做法：工具命名分组

# 浏览器相关工具都以 browser_ 开头
"browser_search"
"browser_navigate"
"browser_click"

# 状态 1：刚接收用户输入
# → 强制使用 reply 模式
force_prefix = "assistant\n"

# 状态 2：执行工具中
# → 只允许浏览器工具
force_prefix = "assistant\n{\"name\": \"browser_"
```

**优势**：
- ✅ 工具定义保持稳定（缓存友好）
- ✅ 动态控制可用工具
- ✅ 避免模型困惑
- ✅ 不需要状态管理

### 7.4 外部记忆：文件系统作为上下文

**问题**：观察结果太大

Agent 与环境交互时，观察结果可能很大：
- 网页内容：10-100 KB
- PDF 文档：100-1000 KB
- 代码文件：10-100 KB

**解决方案**：文件系统作为终极上下文

```python
# ❌ 错误：把整个网页放入上下文
context.append(f"网页内容：{full_page_html}")  # 可能 100KB

# ✅ 正确：保存到文件，上下文只保留路径
file_path = agent.write_file("page.html", full_page_html)
context.append(f"网页已保存到：{file_path}")
```

**关键原则**：

1. **可恢复性**：保留恢复信息，而非内容本身
2. **按需读取**：Agent 学会按需读取文件
3. **结构化存储**：使用 todo.md 作为外部记忆

### 7.5 注意力管理：复述重要信息

**问题**："迷失在中间"

长任务中，Agent 容易：
- 🎯 忘记初始目标
- 🔄 陷入循环
- 📉 偏离主任务

**Manus 的创新：todo.md**

```markdown
## 任务：搜索 AI 文章并生成总结

### 步骤
- [x] 1. 搜索最新的 AI 技术文章
- [x] 2. 提取前 5 篇文章的标题和链接
- [ ] 3. 阅读每篇文章的摘要
- [ ] 4. 生成综合总结

### 进行中
- 正在阅读第 1 篇文章...
```

**为什么有效？**

1. 将目标推入近期注意力
2. 避免目标不一致
3. 简单但有效的自然语言注意力机制

### 7.6 错误处理：保留失败尝试

**直觉**：隐藏错误 ❌

```python
try:
    result = agent.call_tool("some_tool")
except Exception as e:
    pass  # 忽略错误
```

**正确做法**：保留错误信息 ✅

```python
try:
    result = agent.call_tool("some_tool")
except ToolError as e:
    # 保留错误信息
    context.append(f"""
    工具调用失败：
    工具：{tool_name}
    错误：{error_message}
    """)
```

**为什么这样有效？**

- 隐式学习：模型看到失败 → 自动更新"信念"
- 改进策略：避免重复错误
- 真正的智能：能从错误中学习

**关键洞察**（来自 Manus）：

> "根据我们的经验，改善代理行为最有效的方法之一出奇地简单：**将错误的尝试保留在上下文中**。"

### 7.7 Agent 上下文模板

**标准结构**：

```python
agent_context = f"""
# 系统提示（稳定，可缓存）
{system_prompt}

# 工具定义（稳定，可缓存）
{tool_definitions}

# 任务说明（相对稳定）
{task_description}

# 当前状态（频繁更新）
{current_state}

# 历史动作和观察（追加模式）
{history}
"""
```

**缓存策略**：

| 部分 | 频率 | 缓存策略 |
|------|------|----------|
| 系统提示 | 不变 | 完全缓存 |
| 工具定义 | 不变 | 完全缓存 |
| 任务说明 | 罕变 | 缓存直到修改 |
| 当前状态 | 实时 | 不缓存 |
| 历史动作 | 迭代 | 追加部分缓存 |

---

## 8. 记住

> **上下文质量 > 上下文数量**

更好的组织方式，比单纯的增加信息量更重要。

> **记忆系统是关键**

设计好即时、短期、长期三层记忆，让 AI 真正"记住"重要信息。

> **压缩是必要的艺术**

在有限的窗口内，用最精炼的方式呈现最相关的信息。

> **持续优化是关键**

没有万能的模板，只有不断迭代和优化的过程。

通过有效的上下文工程和记忆管理，你可以让 AI 在有限的能力下，发挥出最大的潜力！🚀
