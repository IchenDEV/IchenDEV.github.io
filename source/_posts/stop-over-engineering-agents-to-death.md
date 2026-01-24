---
title: 停止用工程化扼杀 Agent
date: 2026-01-23 13:51:00
updated: 2026-01-23 13:51:00
tags:
  - AI
  - Agent
  - LLM
  - AGI
categories:
  - [gallery]
featured_image: /gallery/stop-over-engineering-agents-to-death/cover.png
author: chenli & gpt5.2 & claude 4.5
---

# 停止用工程化扼杀 Agent

## ——从第一性原理重新思考智能体设计，我们需要赋能，而非控制

过去一年，Agent 的演进路径高度一致：通过工程化手段提升稳定性与可控性。

更复杂的 prompt，更精细的 workflow，更多 planner、critic、memory、tool、guardrail。

这些手段让 Agent 更容易进入生产环境，也更容易被评估和部署。但我们需要直面一个现实：**这种路线在提高可控性的同时，正在系统性地扼杀 Agent 的核心能力。**

要理解为什么，我们需要回到第一性原理。

---

## 一、第一性原理：Agent 是什么

在讨论如何设计 Agent 之前，我们需要问一个更根本的问题：**Agent 的本质是什么？**

从第一性原理出发，我们剥离所有工程实现细节，只保留最基本的定义：

**Agent 是一个在环境中自主行动以达成目标的系统。**

这个定义包含四个基本要素：

### 1. 环境（Environment）

Agent 存在于某个环境中。环境可以是：
- 物理世界（机器人）
- 数字系统（代码仓库、数据库、网络）
- 人类社会（对话、协作）
- 混合空间（自动驾驶）

**环境的本质特征：**
- 有状态（可观测）
- 会变化（动态性）
- 给反馈（Agent 的行动会改变环境）

### 2. 感知（Perception）

Agent 需要感知环境的状态。感知不是被动接收，而是主动构建对环境的理解。

**关键认知：**感知不等于数据输入。感知是从原始信号中提取意义的过程。

人类看到一个场景，不只是获得像素数据，而是理解"这是一个房间，有桌子，桌子上有咖啡杯，杯子是空的"。这个理解过程就是感知。

### 3. 行动（Action）

Agent 可以采取行动改变环境状态。行动的价值在于：
- 实现目标
- 获取新信息（探索性行动）
- 测试假设（实验性行动）

**关键认知：**行动不只是执行，而是 Agent 与环境交互的方式。

### 4. 目标（Goal）

Agent 的行动是有目的的。目标可以是：
- 明确的（完成特定任务）
- 模糊的（优化某个指标）
- 层次化的（高层目标分解为子目标）

**关键认知：**目标不是外部指令，而是 Agent 内部维持的状态。

---

## 二、第一性推导：智能从何而来

有了这四个基本要素，我们可以推导出：**什么样的系统能够表现出智能？**

### 推导 1：智能需要内部模型

Agent 不可能直接"看到"环境的真实状态。它只能通过有限的观测构建对环境的内部表示。

**例子：**你在黑暗房间里，用手电筒照亮一小块区域。你看到一个桌角。你的大脑立即构建一个假设："这里有一张桌子"。这个"桌子"是你的内部模型，不是直接观测。

**推论：**智能 Agent 必须维持一个**世界模型**（World Model），这个模型是对环境状态的内部表示。

世界模型的核心功能：
- 整合多次观测（而非只保留最近的观测）
- 填补未观测到的信息（推理）
- 预测未来状态（规划的基础）

### 推导 2：智能需要因果理解

Agent 不仅要知道"环境是什么状态"，还要理解"为什么是这个状态"以及"我的行动会导致什么变化"。

**例子：**你看到咖啡杯翻倒，水洒在桌上。你不只是记录"杯子倒了，水在桌上"，而是理解因果关系："因为杯子倒了，所以水洒了"。这让你能够预测："如果我扶起杯子，水还会继续洒"。

**推论：**智能 Agent 必须构建**因果模型**（Causal Model），理解行动与结果的关系。

因果模型的核心功能：
- 预测行动后果（"如果我做 A，会发生 B"）
- 反向推理（"要达成 B，我需要做 A"）
- 归因分析（"为什么失败了？"）

### 推导 3：智能需要持续更新

环境是动态的，Agent 的初始模型必然不完美。智能的关键在于：**从经验中学习，持续改进模型。**

**例子：**你第一次使用新软件，不知道某个按钮的功能。你点击它，观察结果，更新你对这个按钮的理解。下次遇到类似情况，你的行动会更准确。

**推论：**智能 Agent 必须具备**学习机制**（Learning Mechanism），从行动反馈中更新内部模型。

学习机制的核心功能：
- 发现错误（"我的预测不对"）
- 更新模型（"原来是这样工作的"）
- 泛化经验（"这个模式在其他情况下也适用"）

### 推导 4：智能需要目标维持

Agent 在复杂环境中行动时，往往需要多个步骤才能达成目标。如果每一步都需要外部指令，Agent 就不是自主的。

**例子：**你的目标是"做一顿晚餐"。这需要很多步骤：检查食材、决定菜单、准备食材、烹饪。你不需要有人每一步都告诉你"现在切菜"、"现在开火"。你自己知道当前目标，并分解为子任务。

**推论：**智能 Agent 必须**内部维持目标**（Goal Maintenance），并能够将高层目标分解为可执行的行动序列。

目标维持的核心功能：
- 记住长期目标（不会因为执行细节而遗忘）
- 动态调整计划（环境变化时重新规划）
- 判断何时目标已达成

---

## 三、从第一性原理看当前 Agent 设计的问题

现在我们用第一性原理审视当前主流的 Agent 工程实践，就会发现系统性的问题。

### 问题 1：用短期上下文替代世界模型

**当前实践：**
大多数 Agent 只保留最近 N 轮对话或最近的状态快照作为"上下文"。

**从第一性原理分析：**
这违背了"智能需要内部模型"的基本原理。

想象一个人，每隔 5 分钟就失去之前的所有记忆，只记得最近 5 分钟发生的事。这个人能够：
- 执行简单指令："帮我拿那个杯子"
- 无法执行复杂任务："帮我解决这个持续一周的项目问题"

短期上下文让 Agent 变成了"失忆症患者"。它不是在理解环境，而是在对最近的刺激做出反应。

**实例：**

用户第一天问："我在做一个 React 项目，用的 TypeScript"
Agent 回答："好的，我了解了"

用户第二天问："之前那个项目，帮我添加一个登录功能"
Agent："请问是什么项目？用的什么技术栈？"

Agent 没有世界模型，所以无法维持对"项目"的持续理解。

### 问题 2：用预设流程替代因果推理

**当前实践：**
将任务分解为固定步骤：步骤 1 → 步骤 2 → 步骤 3，每个步骤预定义。

**从第一性原理分析：**
这违背了"智能需要因果理解"的基本原理。

预设流程的本质是：**工程师替 Agent 完成了因果推理**。工程师分析任务，得出"要做 A，应该先 B 再 C"，然后把这个结论硬编码进系统。

Agent 不再需要理解"为什么先 B 再 C"，它只需要执行。

**后果：**
当环境变化，B 的假设不再成立时，Agent 无法调整，因为它从未理解过 B 和 C 的因果关系。

**实例：**

流程：
```
步骤 1：分析用户需求
步骤 2：查找相关代码文件
步骤 3：修改代码
步骤 4：运行测试
```

假设步骤 2 找到了错误的文件（关键词匹配失败），步骤 3 就会修改错误的代码，步骤 4 测试失败。

有因果理解的 Agent 会在步骤 4 后推理："测试失败 → 可能修改错了地方 → 重新检查步骤 2"

预设流程的 Agent 只会报错："任务失败"。

### 问题 3：用规则库替代学习机制

**当前实践：**
遇到新问题，工程师分析原因，添加新规则或新的 prompt 条款。

**从第一性原理分析：**
这违背了"智能需要持续更新"的基本原理。

规则库的增长模式是：
1. Agent 遇到问题 A，失败
2. 工程师分析，添加规则："遇到 A 时，执行 X"
3. Agent 遇到问题 B，失败
4. 工程师分析，添加规则："遇到 B 时，执行 Y"
5. ...循环...

**问题：**
- Agent 自己没有学习，所有学习由工程师代劳
- 规则库线性增长，无法覆盖所有情况
- Agent 无法泛化经验到新情况

**对比自然智能：**

人类学会骑自行车后，不需要有人告诉他如何骑摩托车。他能够泛化平衡、转向的经验。

当前 Agent 学会处理"用户询问退款"后，遇到"用户询问换货"时，需要工程师添加新规则。它无法泛化"理解用户意图，提供解决方案"的经验。

### 问题 4：用外部调度替代目标维持

**当前实践：**
任务由外部系统（orchestrator）分解为子任务，分配给 Agent，Agent 执行完成后返回结果。

**从第一性原理分析：**
这违背了"智能需要目标维持"的基本原理。

在这种设计中，Agent 不知道自己在做什么，只知道"当前任务是 X"。

**例子：**

外部系统分配任务：
```
任务 1："读取 config.json"
任务 2："提取数据库配置"
任务 3："连接数据库"
任务 4："查询用户表"
```

Agent 执行每个任务，但它不知道整体目标是什么。

如果任务 1 失败（文件不存在），Agent 报错，等待人工处理。

有目标维持的 Agent 会理解："我的目标是连接数据库并查询用户表。配置文件不存在，我可以尝试其他方式获取配置：环境变量、默认值、询问用户。"

---

## 四、第一性原理指导的设计：认知闭环

从第一性原理出发，我们可以推导出 Agent 的核心架构：

**Agent 必须是一个认知闭环（Cognitive Loop）：**

```
感知环境 → 更新世界模型 → 基于模型推理 → 选择行动 → 执行行动 → 观察反馈 → 感知环境 ...
```

这个闭环有几个关键特征：

### 1. 持续的世界模型

Agent 维持一个对环境、任务、历史的持续表示。每次新观测都整合进这个模型，而不是替代它。

**实现含义：**
```python
class CognitiveAgent:
    def __init__(self):
        self.world_model = WorldModel()  # 持续存在的世界模型
        
    def perceive(self, observation):
        # 不是替换，而是整合
        self.world_model.integrate(observation)
        
    def act(self):
        # 基于完整的世界模型决策
        return self.decide_action(self.world_model)
```

**反例（短期上下文）：**
```python
def handle_query(query, last_3_turns):
    # 只看最近 3 轮，没有持续的世界模型
    context = last_3_turns
    return generate_response(query, context)
```

### 2. 因果推理能力

Agent 不只是匹配模式，而是推理因果关系。

**实现含义：**
```python
class CognitiveAgent:
    def plan_action(self, goal):
        # 因果推理："如果我做 A，会导致 B，B 会帮助达成目标"
        causal_chain = self.reason_causally(goal, self.world_model)
        return self.select_action_from_chain(causal_chain)
    
    def diagnose_failure(self, action, expected, actual):
        # 反向因果推理："为什么 A 没有导致 B？"
        return self.identify_broken_assumption(action, expected, actual)
```

**反例（规则匹配）：**
```python
def decide_action(situation):
    for rule in rule_base:
        if rule.matches(situation):
            return rule.action
    return default_action
```

### 3. 学习机制

Agent 从每次行动的反馈中学习，更新内部模型。

**实现含义：**
```python
class CognitiveAgent:
    def execute_and_learn(self, action):
        result = self.execute(action)
        
        # 学习：预测与现实的差异
        prediction = self.world_model.predict_outcome(action)
        discrepancy = self.compare(prediction, result)
        
        if discrepancy.significant:
            # 更新模型
            self.world_model.update(action, result, discrepancy)
            
        return result
```

**反例（静态规则）：**
```python
def execute_action(action):
    result = action.run()
    if result.failed:
        log_error(result)  # 只是记录，没有学习
    return result
```

### 4. 目标维持

Agent 内部维持目标，并能够在多步骤中持续追求这个目标。

**实现含义：**
```python
class CognitiveAgent:
    def __init__(self, goal):
        self.goal = goal  # 内部维持
        self.goal_stack = [goal]  # 支持子目标
        
    def pursue_goal(self):
        while not self.goal_achieved():
            # 基于当前世界模型和目标，决定下一步
            action = self.decide_next_action(
                self.goal_stack[-1], 
                self.world_model
            )
            result = self.execute_and_learn(action)
            
            # 目标可能需要调整
            if result.suggests_goal_adjustment:
                self.adjust_goal(result)
```

**反例（外部调度）：**
```python
def execute_task(task):
    # 只知道当前任务，不知道整体目标
    return run_task(task)
```

---

## 五、Claude Code：第一性原理的自然实现

Claude Code 的设计，虽然没有明确声称遵循第一性原理，但实际上非常接近这个理想形态。

### 1. 持续的世界模型

Claude Code 在对话中逐步构建对代码库的理解：
- 项目结构
- 模块依赖关系
- 当前构建状态
- 历史修改记录

这些信息不是短期上下文，而是持续维持的世界模型。

**例证：**

对话开始时，用户说："这是一个 Node.js 项目，用的 Express 框架"

中间经过 20 轮对话，涉及各种文件修改、测试运行。

最后用户说："登录功能有问题"

Claude Code 能够立即定位到之前讨论过的认证中间件，而不是重新搜索"登录"关键词。因为它维持了对项目的持续理解。

### 2. 因果推理

Claude Code 不是执行预设流程，而是基于对系统的理解进行因果推理。

**例证：**

```
[观察] 3 个测试失败，都与日期格式有关
[推理] 可能原因：
  - 时区配置变了
  - 日期库升级了
  - 测试数据的日期格式假设错了
[决策] 先检查最近的配置变更（最可能的原因）
[行动] git log -- config/
[反馈] 发现昨天修改了时区配置
[确认] 这就是原因
[解决] 恢复时区配置或更新测试
```

这是因果推理链，不是预设流程。

### 3. 从反馈中学习

Claude Code 的每个行动都会获得真实反馈（编译结果、测试输出、命令执行结果），这些反馈会更新它的理解。

**例证：**

```
[初始假设] 修改 API 参数不会影响其他模块
[行动] 修改 /api/users 的参数验证
[反馈] 3 个集成测试失败
[学习] 原来下游服务依赖旧的参数格式
[更新模型] 这不是孤立的修改，是接口变更，需要兼容策略
[新行动] 添加参数转换层
```

这个过程中，Claude Code 从失败中学习，更新了对系统的理解。

### 4. 目标维持

Claude Code 维持一个清晰的高层目标（比如"让测试通过"），在达成这个目标的过程中，它可以灵活调整路径。

**例证：**

目标："修复登录 bug"

过程：
1. 运行测试，看具体错误
2. 发现是 JWT 验证失败
3. 检查 JWT 配置
4. 发现密钥配置错误
5. 修改配置
6. 重新运行测试
7. 还有一个测试失败
8. 检查这个测试
9. 发现是测试用例的问题
10. 修改测试用例
11. 所有测试通过
12. 目标达成

整个过程中，Claude Code 始终记得目标是"修复登录 bug"，并不断调整路径直到达成。

---

## 六、从第一性原理推导设计原则

基于第一性原理，我们可以推导出清晰的设计原则。

### 原则 1：优先构建世界模型，而非优化prompt

**第一性原理：**智能需要内部模型

**推论：**Agent 的能力上限取决于它的世界模型质量，而非 prompt 的复杂度。

**实践：**
- 为 Agent 提供持久化存储，维持长期记忆
- 让 Agent 能够整合多次观测，形成连贯理解
- 设计机制让 Agent 能够"回忆"相关经验

**反例：**
花费大量精力优化 prompt，试图在单次调用中"教会" Agent 所有知识。这违背了认知的本质——理解是逐步建立的，不是一次性输入的。

### 原则 2：赋予探索自由，而非规定执行路径

**第一性原理：**智能需要因果推理

**推论：**Agent 需要自由度来测试假设、探索可能性，才能建立因果理解。

**实践：**
- 给 Agent 一组工具和目标，让它自己选择使用顺序
- 允许 Agent "浪费"一些资源在探索性行动上
- 不要为每个情况预设"正确路径"

**反例：**
严格规定："遇到情况 A 必须先做 X 再做 Y"。这剥夺了 Agent 探索"先 Y 再 X 是否更好"的机会，也阻止了它理解 X 和 Y 的因果关系。

### 原则 3：用真实反馈训练，而非人工规则约束

**第一性原理：**智能需要持续更新

**推论：**Agent 应该从真实环境的反馈中学习，而不是从工程师添加的规则中"学习"。

**实践：**
- 让 Agent 的行动直接作用于真实环境
- 确保 Agent 能够观察到行动的后果
- 设计机制让 Agent 从失败中提取教训

**反例：**
Agent 在沙盒环境中执行，所有"危险"操作被拦截。Agent 永远学不会"这个操作是危险的"，因为它从未见过真实后果。

### 原则 4：让 Agent 维持目标，而非外部驱动任务

**第一性原理：**智能需要目标维持

**推论：**真正的自主性来自内部目标驱动，而非外部任务分配。

**实践：**
- 给 Agent 高层目标，而非详细任务列表
- 让 Agent 自己分解目标为子任务
- 允许 Agent 在过程中调整计划

**反例：**
外部系统把任务分解为 20 个步骤，逐个分配给 Agent。Agent 成了任务执行器，失去了自主性。

### 原则 5：设计护栏而非轨道

**第一性原理：**前面四个原理的综合

**推论：**工程约束应该定义"不可越界"而非"必须这样做"。

**实践：**
```python
# 护栏式设计
class Agent:
    def act(self):
        action = self.decide_action()  # 自由决策
        
        # 护栏：检查是否越界
        if self.violates_safety(action):
            return self.find_safe_alternative(action)
        
        return self.execute(action)

# 轨道式设计（反例）
class Agent:
    def act(self):
        # 只能在预设轨道上选择
        return self.predefined_actions[self.current_step]
```

**关键区别：**
- 护栏：99% 的行动空间是自由的，1% 是禁区
- 轨道：1% 的行动空间是允许的，99% 是禁区

---

## 七、从第一性原理看混合策略

并非所有任务都适合完全自主的认知闭环。第一性原理也能帮助我们理解何时需要约束。

### 何时需要强约束？

**分析：**某些环境的特征使得探索性学习不可行。

**特征 1：不可逆的高风险**

**例子：**金融交易、医疗决策、核电站控制

**第一性原理分析：**
学习机制依赖于"试错"，但在这些领域，"错"的代价是不可接受的。

**设计决策：**
这些场景应该使用强约束，但约束的设计应该基于对因果关系的深刻理解（人类专家的知识），而不是简单的规则堆砌。

**实现：**
```python
class ConstrainedAgent:
    def __init__(self, expert_causal_model):
        self.causal_model = expert_causal_model  # 专家知识
        self.world_model = WorldModel()  # 自己的理解
        
    def act(self):
        # 仍然维持认知闭环
        action = self.decide_action()
        
        # 但用专家因果模型验证安全性
        if self.expert_causal_model.predicts_harm(action):
            return self.find_safe_alternative()
        
        return action
```

### 何时可以放开约束？

**分析：**环境允许安全探索时，约束就是在扼杀智能。

**特征：可逆、低风险、快速反馈**

**例子：**
- 软件开发（代码可以回滚）
- 数据分析（分析错误可以重来）
- 游戏（游戏中的失败没有真实损失）
- 创意设计（方案可以迭代）

**第一性原理分析：**
在这些环境中，每次"错误"都是宝贵的学习信号。约束会降低学习效率。

**设计决策：**
最小化约束，最大化探索自由。

---

## 八、反思：我们为什么走向了过度工程化？

从第一性原理来看，当前的过度工程化是如何发生的？

### 原因 1：把 Agent 当作软件模块

传统软件工程的思维是：
- 系统可以分解为模块
- 每个模块有明确的输入输出
- 模块的行为应该是确定的、可预测的

这套方法论在构建确定性系统时非常有效，但**Agent 不是确定性系统**。

Agent 的本质是认知系统，它的"行为"取决于它的内部模型，而内部模型是动态的、演化的。

试图用确定性软件工程的方法约束 Agent，就像试图用机械工程的方法设计生物体。

### 原因 2：混淆了可控性与能力

工程化的目标是可控性：
- 确保系统按预期行为
- 降低意外情况
- 便于调试和维护

但**可控性和能力往往是权衡关系**。

一个完全可控的系统，其行为空间必然是有限的、预定义的。而智能的本质是处理新情况、发现新解法的能力。

过度追求可控性，会限制 Agent 的能力上限。

### 原因 3：低估了环境反馈的价值

传统软件不需要"学习"，它的行为由代码确定。所以工程师倾向于认为：
- Agent 的能力应该由设计决定
- 失败意味着设计缺陷，应该修复（添加规则）

但从第一性原理看，**失败是学习的必要条件**。

没有失败经验的 Agent，就像温室里的植物，无法应对真实环境的复杂性。

---

## 九、路径：从过度工程化回归第一性原理

如何将现有的 Agent 系统改造为符合第一性原理的设计？

### 步骤 1：识别并移除过度约束

**审查清单：**
```
□ 是否有"必须先 A 再 B"的强制流程？
  → 改为：给 Agent 目标和工具，让它选择顺序

□ 是否有大量 if-then 规则？
  → 改为：让 Agent 从真实反馈中学习模式

□ 是否只保留短期上下文？
  → 改为：提供持久化存储，让 Agent 维持长期记忆

□ 是否失败时立即回退或人工接管？
  → 改为：让 Agent 分析失败原因，尝试新策略

□ 是否所有决策都由外部系统控制？
  → 改为：让 Agent 内部维持目标，自主规划
```

### 步骤 2：构建世界模型基础设施

**技术实现：**
```python
class PersistentWorldModel:
    def __init__(self, storage):
        self.storage = storage  # 持久化存储
        self.current_session = {}
        
    def integrate_observation(self, observation):
        # 整合新观测到历史知识中
        relevant_history = self.storage.retrieve_relevant(observation)
        updated_understanding = self.merge(
            relevant_history,
            self.current_session,
            observation
        )
        self.storage.update(updated_understanding)
        self.current_session = updated_understanding
        
    def recall(self, query):
        # 从长期记忆中检索
        return self.storage.retrieve(query)
```

### 步骤 3：设计学习机制

**核心思路：**让 Agent 能够从每次交互中提取可泛化的经验

```python
class LearningAgent:
    def execute_and_learn(self, action):
        # 预测
        prediction = self.predict_outcome(action)
        
        # 执行
        actual_outcome = self.execute(action)
        
        # 学习
        if prediction != actual_outcome:
            pattern = self.extract_pattern(action, actual_outcome)
            self.world_model.update_causal_link(pattern)
            
        return actual_outcome
    
    def extract_pattern(self, action, outcome):
        # 提取可泛化的模式
        # 不只是记住"在情况 X 下，A 导致 Y"
        # 而是理解"A 导致 Y 的因果机制"
        return self.generalize(action, outcome)
```

### 步骤 4：实现目标维持

**技术实现：**
```python
class GoalMaintainingAgent:
    def __init__(self, high_level_goal):
        self.goal_stack = [high_level_goal]
        
    def pursue_goal(self):
        while self.goal_stack:
            current_goal = self.goal_stack[-1]
            
            if self.is_achieved(current_goal):
                self.goal_stack.pop()
                continue
            
            # 决定如何达成当前目标
            if self.can_directly_achieve(current_goal):
                action = self.plan_action(current_goal)
                result = self.execute_and_learn(action)
                self.evaluate_progress(current_goal, result)
            else:
                # 分解为子目标
                sub_goals = self.decompose(current_goal)
                self.goal_stack.extend(reversed(sub_goals))
```

---

## 十、结语：回归智能的本质

从第一性原理出发，我们看到：

**Agent 的本质是一个在环境中自主行动以达成目标的认知系统。**

认知系统的核心特征是：
- 维持对环境的内部模型
- 理解行动与后果的因果关系
- 从经验中持续学习
- 内部驱动地追求目标

当前大量的工程实践，虽然出发点是提高稳定性和可控性，却在系统性地破坏这些核心特征：

- 用短期上下文替代世界模型
- 用预设流程替代因果推理
- 用规则库替代学习机制
- 用外部调度替代目标维持

**这些做法让 Agent 从认知系统退化为执行系统。**

Claude Code 的成功不是因为更复杂的工程，而是因为它更接近第一性原理：

- 它维持对代码库的持续理解（世界模型）
- 它基于理解进行因果推理（而非匹配规则）
- 它从真实反馈中学习（而非依赖人工规则）
- 它内部驱动地追求目标（而非被动执行任务）

**我们需要停止用工程化手段扼杀 Agent。**

不是停止工程化，而是**重新定义工程化的目标**：

**旧目标：**通过约束让 Agent 更可控
**新目标：**通过基础设施让 Agent 更智能

差异在于：
- 旧目标用工程限制 Agent
- 新目标用工程赋能 Agent

当我们设计下一个 Agent 时，值得问自己：

**我在构建一个执行器，还是一个认知体？**
**我在用工程控制它，还是在用工程赋能它？**
**我的设计是否符合智能的第一性原理？**

答案将决定我们是在制造更精密的自动机，还是在创造真正的智能体。