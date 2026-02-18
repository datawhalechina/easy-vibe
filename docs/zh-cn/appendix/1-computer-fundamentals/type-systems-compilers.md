# 类型系统与编译原理入门

::: tip 🎯 核心问题
**编程语言如何理解你的代码？** 当你写下 `int x = 10 + 5;` 时，编译器需要理解每个字符的含义、检查类型是否正确、优化代码、最终生成机器能执行的指令。本章带你理解这个神奇的过程。
:::

---

## 0. 想象你在翻译一本书：

- **识别单词**：把句子拆成一个个单词（词法分析）
- **理解语法**：判断句子是否符合语法规则（语法分析）
- **理解含义**：确保句子意思正确（语义分析）
- **优化表达**：让句子更简洁（代码优化）
- **翻译输出**：翻译成目标语言（代码生成）

**编译器就是编程语言的"翻译官"**，将人类可读的代码转换为机器可执行的指令。

<TypeSystemDemo />

---

## 1. 类型系统基础

### 1.1 什么是类型？

::: tip 💡 类型的本质
类型是对数据的**分类**，规定了数据可以进行的操作。

就像现实世界：
- **整数**：可以加减乘除，但不能分割
- **字符串**：可以拼接、截取，但不能直接运算
- **布尔**：只有 true/false，用于逻辑判断
:::

**基本数据类型**：

| 类型 | 表示 | 占用空间 | 取值范围 |
|------|------|---------|---------|
| **整数** | int | 4 字节 | -2^31 到 2^31-1 |
| **浮点数** | float | 4 字节 | 约 ±3.4 × 10^38 |
| **双精度** | double | 8 字节 | 约 ±1.8 × 10^308 |
| **字符** | char | 1 字节 | 0 到 255 |
| **布尔** | bool | 1 字节 | true/false |

### 1.2 静态类型 vs 动态类型

::: tip 💡 核心区别
**静态类型**：变量类型在**编译时**确定
**动态类型**：变量类型在**运行时**确定
:::

**静态类型示例（Java）**：

```java
String name = "Alice";  // 编译时确定 name 是 String 类型
name = 123;             // 编译错误！类型不匹配
```

**动态类型示例（Python）**：

```python
name = "Alice"  # 运行时 name 是 str 类型
name = 123      # 运行时 name 变成 int 类型
print(type(name))  # <class 'int'>
```

**对比分析**：

| 特性 | 静态类型 | 动态类型 |
|------|---------|---------|
| **类型检查时机** | 编译时 | 运行时 |
| **错误发现** | 早（编译期） | 晚（运行时） |
| **代码灵活性** | 低 | 高 |
| **执行性能** | 高（编译优化） | 低（运行时检查） |
| **IDE 支持** | 好（自动补全） | 差（运行时才知道类型） |
| **代表语言** | Java, C++, Rust, TypeScript | Python, JavaScript, Ruby |

### 1.3 强类型 vs 弱类型

::: tip 💡 核心区别
**强类型**：不允许隐式类型转换
**弱类型**：允许隐式类型转换
:::

**弱类型示例（JavaScript）**：

```javascript
console.log("1" + 1)    // "11" - 字符串拼接
console.log("1" - 1)    // 0    - 自动转数字
console.log([] + [])    // ""   - 空数组转空字符串
console.log(true + 1)   // 2    - 布尔转数字
```

**强类型示例（Python）**：

```python
"1" + 1   # TypeError: can only concatenate str to str
"1" - 1   # TypeError: unsupported operand type(s)
```

**类型系统四象限**：

| | 强类型 | 弱类型 |
|---|--------|--------|
| **静态** | Java, Rust, Haskell | C, C++ |
| **动态** | Python, Ruby | JavaScript, PHP |

### 1.4 类型推断

现代语言可以**自动推断**变量类型，结合静态类型的安全性和动态类型的简洁性：

```typescript
// TypeScript
let x = 1;           // 推断为 number
let arr = [1, 2, 3]; // 推断为 number[]
let fn = (x) => x;   // 推断为 (x: any) => any

// Rust
let x = 1;           // 推断为 i32
let s = "hello";     // 推断为 &str
let v = vec![1, 2];  // 推断为 Vec<i32>
```

---

## 2. 编译原理基础

### 2.1 编译器的任务

::: tip 💡 编译器做什么？
编译器将**源代码**转换为**目标代码**，主要完成：

1. **理解代码**：分析源代码的结构和含义
2. **检查正确性**：发现语法和语义错误
3. **优化代码**：提高执行效率
4. **生成代码**：输出目标机器的指令
:::

<CompilerDemo />

### 2.2 词法分析（Lexical Analysis）

**任务**：将源代码分解为**词法单元（Token）**

**示例**：

```
源代码: int x = 10 + 5;

词法单元:
[int]   → 关键字
[x]     → 标识符
[=]     → 运算符
[10]    → 整数字面量
[+]     → 运算符
[5]     → 整数字面量
[;]     → 分隔符
```

**词法分析器的工作**：

| 输入 | 处理 | 输出 |
|------|------|------|
| `int` | 匹配关键字表 | `KEYWORD(int)` |
| `x` | 匹配标识符规则 | `IDENTIFIER(x)` |
| `10` | 匹配数字规则 | `NUMBER(10)` |

### 2.3 语法分析（Syntax Analysis）

**任务**：根据语法规则，将 Token 流组织成**语法树（AST）**

**示例**：

```
表达式: 1 + 2 * 3

语法树:
       +
      / \
     1   *
        / \
       2   3
```

::: tip 💡 为什么是这棵树？
根据运算优先级，`*` 优先级高于 `+`，所以 `2 * 3` 先结合。

如果表达式是 `(1 + 2) * 3`，语法树会变成：

```
       *
      / \
     +   3
    / \
   1   2
```
:::

**语法规则（文法）**：

```
表达式 → 表达式 + 项 | 表达式 - 项 | 项
项     → 项 * 因子 | 项 / 因子 | 因子
因子   → 数字 | (表达式)
```

### 2.4 语义分析（Semantic Analysis）

**任务**：检查语义正确性，进行类型检查

**主要工作**：

| 工作 | 说明 | 示例 |
|------|------|------|
| **类型检查** | 检查类型是否匹配 | `int x = "hello";` → 错误 |
| **作用域分析** | 检查变量是否声明 | 使用未声明变量 → 错误 |
| **符号表构建** | 记录所有标识符信息 | 变量名、类型、作用域 |
| **类型推断** | 推断表达式类型 | `1 + 2.0` → float |

**符号表示例**：

```
int x = 10;
float y = 3.14;
string name = "Alice";

符号表:
┌──────────┬────────┬─────────┐
│ 名称     │ 类型   │ 作用域  │
├──────────┼────────┼─────────┤
│ x        │ int    │ global  │
│ y        │ float  │ global  │
│ name     │ string │ global  │
└──────────┴────────┴─────────┘
```

### 2.5 中间代码生成

**任务**：生成平台无关的中间表示（IR）

**三地址码示例**：

```
源代码: int x = (a + b) * c;

三地址码:
t1 = a + b
t2 = t1 * c
x = t2
```

::: tip 💡 为什么需要中间代码？
1. **平台无关**：一次编写，多平台编译
2. **便于优化**：在 IR 层面进行优化
3. **支持多语言**：不同语言可以编译到同一 IR

例如 LLVM IR 支持 C、C++、Rust、Swift 等多种语言。
:::

### 2.6 代码优化

**任务**：提高代码执行效率

**常见优化技术**：

| 优化技术 | 说明 | 示例 |
|---------|------|------|
| **常量折叠** | 编译时计算常量表达式 | `10 + 5` → `15` |
| **死代码消除** | 删除不会执行的代码 | `if (false) { ... }` → 删除 |
| **内联展开** | 函数调用替换为函数体 | `add(1, 2)` → `1 + 2` |
| **循环优化** | 减少循环开销 | 循环展开、循环不变量外提 |
| **公共子表达式消除** | 避免重复计算 | `a+b` 计算一次，多次使用 |

**优化示例**：

```c
// 优化前
int x = 10 + 5;    // 常量折叠
int y = x * 2;     // x 已知为 15
if (false) {       // 死代码
    printf("never");
}

// 优化后
int x = 15;
int y = 30;
// if 语句被删除
```

### 2.7 目标代码生成

**任务**：生成目标机器的机器码

**汇编代码示例**：

```asm
; int x = 15;
mov     eax, 15
mov     dword ptr [x], eax

; int y = 30;
mov     eax, 30
mov     dword ptr [y], eax
```

**代码生成的主要任务**：

| 任务 | 说明 |
|------|------|
| **指令选择** | 选择合适的机器指令 |
| **寄存器分配** | 决定哪些变量放在寄存器 |
| **指令调度** | 安排指令顺序，提高流水线效率 |

---

## 3. 编译型 vs 解释型 vs JIT

### 3.1 编译型语言

**流程**：源代码 → 编译器 → 机器码 → 执行

```
main.c → [编译器] → main.exe → [CPU] → 执行
```

**特点**：
- ✅ 执行速度快
- ✅ 编译期发现错误
- ❌ 编译时间长
- ❌ 跨平台需要重新编译

**代表语言**：C, C++, Rust, Go

### 3.2 解释型语言

**流程**：源代码 → 解释器 → 逐行执行

```
main.py → [解释器] → 逐行解释执行
```

**特点**：
- ✅ 跨平台
- ✅ 开发调试快
- ❌ 执行速度慢
- ❌ 运行时才能发现错误

**代表语言**：Python, Ruby, PHP

### 3.3 JIT（即时编译）

**流程**：源代码 → 字节码 → JIT 编译 → 执行

```
源代码 → [编译器] → 字节码 → [JIT] → 机器码 → 执行
```

**工作原理**：
1. 先将源代码编译成字节码（中间代码）
2. 解释器逐行执行字节码
3. 发现热点代码（频繁执行），JIT 编译成机器码
4. 后续直接执行机器码

**特点**：
- ✅ 兼顾性能和跨平台
- ✅ 热点代码执行快
- ❌ 启动慢（需要预热）
- ❌ 内存占用大

**代表语言**：Java (JVM), JavaScript (V8), Python (PyPy)

---

## 4. 实践：手写简单解释器

### 4.1 目标

实现一个简单的计算器，支持加减乘除：

```
输入: 1 + 2 * 3
输出: 7
```

### 4.2 词法分析器

```python
import re

Token = namedtuple('Token', ['type', 'value'])

def tokenize(code):
    tokens = []
    for match in re.finditer(r'\d+|[+\-*/()]', code):
        value = match.group()
        if value.isdigit():
            tokens.append(Token('NUMBER', int(value)))
        else:
            tokens.append(Token(value, value))
    return tokens

# 测试
print(tokenize('1 + 2 * 3'))
# [Token(type='NUMBER', value=1), Token(type='+', value='+'), ...]
```

### 4.3 语法分析器

```python
class Parser:
    def __init__(self, tokens):
        self.tokens = tokens
        self.pos = 0
    
    def parse(self):
        return self.expr()
    
    def expr(self):
        result = self.term()
        while self.current() in ('+', '-'):
            op = self.consume()
            right = self.term()
            if op == '+':
                result += right
            else:
                result -= right
        return result
    
    def term(self):
        result = self.factor()
        while self.current() in ('*', '/'):
            op = self.consume()
            right = self.factor()
            if op == '*':
                result *= right
            else:
                result //= right
        return result
    
    def factor(self):
        token = self.consume()
        if token.type == 'NUMBER':
            return token.value
        elif token.value == '(':
            result = self.expr()
            self.consume()  # )
            return result
```

### 4.4 完整解释器

```python
def evaluate(code):
    tokens = tokenize(code)
    parser = Parser(tokens)
    return parser.parse()

print(evaluate('1 + 2 * 3'))      # 7
print(evaluate('(1 + 2) * 3'))    # 9
print(evaluate('10 - 2 * 3'))     # 4
```

---

## 5. 总结

::: tip 📚 核心要点
1. **类型系统**：静态/动态、强/弱类型，影响代码安全和灵活性
2. **编译流程**：词法分析 → 语法分析 → 语义分析 → 中间代码 → 优化 → 代码生成
3. **执行方式**：编译型快但需编译，解释型慢但灵活，JIT 兼顾两者
4. **实践价值**：理解编译原理有助于写出更好的代码
:::

**下一步学习**：
- [编程语言图谱](./programming-languages) - 了解更多编程语言
- [数据结构](./data-structures) - 理解数据的组织方式
- [算法思维入门](./algorithm-thinking) - 学习解决问题的方法
