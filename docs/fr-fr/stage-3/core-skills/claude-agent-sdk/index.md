# Guide complet du SDK Claude Agent

## Introduction

Vous avez peut-être déjà utilisé l'API de base de Claude : vous envoyez un message, vous obtenez une réponse, comme dans une conversation. Mais si vous voulez que Claude vous aide à lire des fichiers, exécuter des commandes, chercher du code, corriger des bugs, vérifier le résultat lui-même et continuer à itérer, ce type de "travail autonome" n'est pas quelque chose que l'API de base peut faire.

Le SDK Claude Agent est construit exactement pour ce scénario. Il empaquette toutes les capacités de Claude Code - lecture et écriture de fichiers, exécution de commandes, recherche de code, édition de fichiers, navigation web - dans une bibliothèque programmable. Vous n'avez pas besoin d'écrire vous-même la boucle d'appel d'outils. Claude peut exécuter des outils de manière autonome et itérer de manière autonome jusqu'à ce que la tâche soit véritablement terminée.

Résumé en une phrase : le SDK de base est "vous demandez, il répond" ; le SDK Agent est "vous assignez, il travaille."

---

## Quelle est la différence avec le SDK de base ?

Regardez d'abord le code, et la différence est évidente :

```python
# SDK anthropic de base : vous devez écrire votre propre boucle pour gérer les appels d'outils
import anthropic

client = anthropic.Anthropic()
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Fix the bug in auth.py"}],
    tools=[...]  # Vous devez définir les outils vous-même
)
# Claude demande à appeler un outil
while response.stop_reason == "tool_use":
    result = your_tool_executor(response.tool_use)  # Vous devez l'exécuter vous-même
    response = client.messages.create(tool_result=result, **params)  # Vous devez le renvoyer vous-même
```

```python
# SDK Agent : un bloc et c'est fait, Claude lit les fichiers, trouve les bugs et édite le code par lui-même
from claude_agent_sdk import query, ClaudeAgentOptions

async for message in query(
    prompt="Fix the bug in auth.py",
    options=ClaudeAgentOptions(allowed_tools=["Read", "Edit", "Bash"]),
):
    print(message)  # Claude lit les fichiers, localise les problèmes et édite le code par lui-même
```

La différence est claire :

| Élément de comparaison | SDK anthropic de base | SDK Claude Agent |
|--------|-------------------|-----------------|
| Exécution des outils | Vous l'implémentez | Claude le gère |
| Boucle d'outils | Vous l'implémentez | Boucle d'agent intégrée |
| Outils intégrés | Aucun, tous auto-définis | Lecture/écriture de fichiers, Bash, recherche, et plus prêts à l'emploi |
| Gestion du contexte | Vous le maintenez | Compression et gestion automatiques |
| Meilleur pour | Chat, génération, utilisation simple d'outils | Accomplir de manière autonome des tâches complexes |

---

## En quoi diffère-t-il des autres frameworks d'agents ?

Il existe de nombreux frameworks d'agents sur le marché - LangChain, LlamaIndex, CrewAI, AutoGPT, et d'autres. Qu'est-ce qui rend le SDK Claude Agent unique par rapport à eux ?

> Pour une comparaison détaillée, voir l'annexe : [Comparaison des frameworks d'agents mainstream](/fr-fr/appendix/8-artificial-intelligence/ai-agents.html)

En bref :

| Framework | Scénario le mieux adapté |
|------|-------------|
| **SDK Claude Agent** | Laisser Claude accomplir de manière autonome du codage, des opérations sur les fichiers et l'exécution de commandes |
| **LangChain** | Construire des applications IA générales complexes avec des flux hautement personnalisés |
| **CrewAI** | Simuler des scénarios de collaboration multi-rôles (équipes virtuelles, jeu de rôle) |
| **LlamaIndex** | Construire des systèmes de Q&A sur base de connaissances connectant les données d'entreprise aux LLM |

---

## Installation et configuration

### Installation

Python nécessite 3.10+, et TypeScript nécessite Node.js 18+ :

```bash
# Python
pip install claude-agent-sdk

# TypeScript
npm install @anthropic-ai/claude-agent-sdk
```

### Authentification

Définissez simplement la variable d'environnement de la clé API :

```bash
export ANTHROPIC_API_KEY=your-api-key
```

L'authentification via plateforme cloud est également supportée :
- AWS Bedrock : définir `CLAUDE_CODE_USE_BEDROCK=1` + identifiants AWS
- Google Vertex AI : définir `CLAUDE_CODE_USE_VERTEX=1` + identifiants GCP
- Microsoft Azure : définir `CLAUDE_CODE_USE_FOUNDRY=1` + identifiants Azure

### Point de terminaison API personnalisé

Si vous utilisez un proxy, une passerelle ou un point de terminaison API auto-hébergé, vous pouvez changer l'URL API par défaut via le paramètre `env` :

```python
from claude_agent_sdk import query, ClaudeAgentOptions

async for message in query(
    prompt="Hello",
    options=ClaudeAgentOptions(
        env={
            "ANTHROPIC_BASE_URL": "https://your-proxy.example.com",
            "ANTHROPIC_API_KEY": "your-api-key",
        }
    ),
):
    print(message)
```

`ClaudeAgentOptions` n'a pas de paramètre `base_url` direct, mais le champ `env` peut passer des variables d'environnement arbitraires dans le CLI Claude Code sous-jacent. Variables d'environnement courantes :

| Variable d'environnement | Utilité |
|---------|------|
| `ANTHROPIC_BASE_URL` | Point de terminaison API personnalisé (proxy, passerelle) |
| `ANTHROPIC_API_KEY` | Clé API |
| `ANTHROPIC_AUTH_TOKEN` | Jeton d'authentification alternatif |
| `ANTHROPIC_CUSTOM_HEADERS` | En-têtes de requête personnalisés |

---

## Concepts fondamentaux

Le principe d'exécution du SDK Agent peut être résumé en une phrase : **collecter le contexte -> exécuter des actions -> vérifier les résultats -> répéter**.

C'est exactement ainsi que travaillent les développeurs humains : d'abord lire le code, puis modifier le code, puis exécuter les tests et vérifier les résultats. Si c'est faux, continuer à itérer. Le SDK Agent automatise cette boucle.

### Deux modes d'utilisation

**Mode 1 : fonction `query()` - sans état, adaptée aux tâches ponctuelles**

```python
import asyncio
from claude_agent_sdk import query, ClaudeAgentOptions

async def main():
    async for message in query(
        prompt="What files are in this directory?",
        options=ClaudeAgentOptions(allowed_tools=["Bash", "Glob"]),
    ):
        if hasattr(message, "result"):
            print(message.result)

asyncio.run(main())
```

**Mode 2 : `ClaudeSDKClient` - avec état, adapté aux conversations multi-tours**

Utilisez-le lorsque vous devez préserver le contexte et interagir sur plusieurs tours. Par exemple, demandez d'abord à Claude de lire un module, puis demandez-lui de trouver tous les sites d'appel de ce module - au deuxième tour, il se souvient encore de ce qu'il a lu au premier tour.

```python
import asyncio
from claude_agent_sdk import query, ClaudeAgentOptions

async def main():
    session_id = None

    # Tour 1 : lire le module d'authentification
    async for message in query(
        prompt="Read the authentication module code",
        options=ClaudeAgentOptions(allowed_tools=["Read", "Glob"]),
    ):
        if hasattr(message, "subtype") and message.subtype == "init":
            session_id = message.session_id

    # Tour 2 : continuer sur la base du contexte précédent
    async for message in query(
        prompt="Find all places that call it",
        options=ClaudeAgentOptions(resume=session_id),
    ):
        if hasattr(message, "result"):
            print(message.result)

asyncio.run(main())
```

---

## Outils intégrés : prêts à l'emploi

C'est l'un des meilleurs aspects du SDK Agent - vous n'avez pas besoin d'implémenter vous-même des outils, Claude peut les utiliser directement :

| Outil | Capacité | Utilisation typique |
|------|------|---------|
| Read | Lire des fichiers | Voir le code, lire les configs |
| Write | Créer des fichiers | Générer de nouveaux fichiers |
| Edit | Éditions précises de fichiers | Corrections de bugs, refactoring |
| Bash | Exécuter des commandes terminal | Exécuter des tests, installer des dépendances, opérations git |
| Glob | Recherche de fichiers par motif | `**/*.py`, `src/**/*.ts` |
| Grep | Recherche de contenu par regex | Trouver des définitions de fonctions, TODOs |
| WebSearch | Chercher des pages web | Consulter la documentation, trouver des approches |
| WebFetch | Récupérer du contenu web | Lire la documentation en ligne |
| Task | Lancer des sous-agents | Paralléliser des sous-tâches |

Utilisez `allowed_tools` pour contrôler quels outils l'agent peut utiliser :

```python
# Agent en lecture seule : peut inspecter mais ne peut pas modifier
options = ClaudeAgentOptions(
    allowed_tools=["Read", "Glob", "Grep"],
    permission_mode="bypassPermissions"
)

# Agent complet : peut lire, écrire et exécuter des commandes
options = ClaudeAgentOptions(
    allowed_tools=["Read", "Write", "Edit", "Bash", "Glob", "Grep"]
)
```

---

## Fonctionnalités avancées

### Hooks : insérez votre propre logique aux points clés

Les Hooks vous permettent d'injecter du code personnalisé aux moments critiques de l'exécution de l'agent - par exemple, journalisation, interception d'opérations risquées et audit des modifications de fichiers.

Les types de hooks supportés incluent : `PreToolUse` (avant l'exécution de l'outil), `PostToolUse` (après l'exécution de l'outil), `Stop` (lorsque l'agent s'arrête), `SessionStart`, `SessionEnd`, et d'autres.

```python
from datetime import datetime
from claude_agent_sdk import query, ClaudeAgentOptions, HookMatcher

# Enregistrer un journal d'audit à chaque modification de fichier
async def log_file_change(input_data, tool_use_id, context):
    file_path = input_data.get("tool_input", {}).get("file_path", "unknown")
    with open("./audit.log", "a") as f:
        f.write(f"{datetime.now()}: modified {file_path}\n")
    return {}

async def main():
    async for message in query(
        prompt="Refactor utils.py for better readability",
        options=ClaudeAgentOptions(
            permission_mode="acceptEdits",
            hooks={
                "PostToolUse": [
                    HookMatcher(matcher="Edit|Write", hooks=[log_file_change])
                ]
            },
        ),
    ):
        if hasattr(message, "result"):
            print(message.result)
```

Utilisations concrètes :
- Journalisation d'audit : enregistrer chaque opération effectuée par l'agent
- Interception de sécurité : bloquer les modifications de fichiers critiques
- Notifications push : envoyer des messages lorsque les tâches de l'agent sont terminées
- Surveillance des coûts : compter les appels d'outils et l'utilisation de tokens

### Sous-agents : diviser les grandes tâches entre spécialistes

Lorsqu'une tâche est suffisamment complexe, vous pouvez définir plusieurs sous-agents spécialisés et laisser l'agent principal déléguer des sous-tâches à chacun. Chaque sous-agent a ses propres instructions et permissions d'outils, isolés les uns des autres.

```python
from claude_agent_sdk import query, ClaudeAgentOptions, AgentDefinition

async for message in query(
    prompt="Use the code-reviewer agent to review this project's code quality",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Glob", "Grep", "Task"],
        agents={
            "code-reviewer": AgentDefinition(
                description="Professional code reviewer responsible for quality and security reviews",
                prompt="Analyze code quality, identify potential issues, and provide improvement suggestions.",
                tools=["Read", "Glob", "Grep"],
            ),
            "test-writer": AgentDefinition(
                description="Testing specialist responsible for writing unit tests",
                prompt="Write unit tests for functions that are missing tests.",
                tools=["Read", "Write", "Bash"],
            ),
        },
    ),
):
    if hasattr(message, "result"):
        print(message.result)
```

Les messages des sous-agents incluent un champ `parent_tool_use_id`, facilitant le suivi de quels messages proviennent de quel sous-agent.

### Intégration MCP : se connecter au monde extérieur

Via le Model Context Protocol (MCP), votre agent peut se connecter à des systèmes externes comme des bases de données, des navigateurs et des API tierces. La communauté fournit déjà [des centaines de serveurs MCP](https://github.com/modelcontextprotocol/servers) que vous pouvez utiliser directement.

```python
# Connecter Playwright pour que l'agent puisse opérer un navigateur
async for message in query(
    prompt="Open example.com and describe what you see",
    options=ClaudeAgentOptions(
        mcp_servers={
            "playwright": {
                "command": "npx",
                "args": ["@playwright/mcp@latest"]
            }
        }
    ),
):
    if hasattr(message, "result"):
        print(message.result)
```

Scénarios d'intégration MCP courants :
- Playwright : automatisation de navigateur, scraping de pages, remplissage de formulaires
- PostgreSQL/MySQL : interrogation et opérations directes sur la base de données
- Slack/Email : envoi de notifications et messages
- GitHub : opérations sur PRs, Issues et dépôts

---

## Que pouvez-vous construire avec ? Scénarios pratiques

Après avoir compris les fonctionnalités, la question la plus importante est : que peut-on réellement faire avec ? Voici des scénarios réels validés par la communauté.

### Scénario 1 : Agent de correction automatique de bugs

Donnez-lui une description de bug, et il peut trouver le code, localiser le problème, le corriger et exécuter les tests pour vérifier :

```python
async for message in query(
    prompt="Users report occasional HTTP 500 errors during login. Investigate and fix code under src/auth/",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Edit", "Bash", "Glob", "Grep"],
        permission_mode="acceptEdits",
    ),
):
    print(message)
```

Claude grep les logs, lit le code associé, trouve le bug, modifie le code et exécute les tests pour confirmer la correction.

### Scénario 2 : Agent de revue de code

Construisez un agent de revue de code en lecture seule qui audite la qualité sans faire aucune modification :

```python
async for message in query(
    prompt="Review code under src/ with focus on security vulnerabilities, performance issues, and coding conventions",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Glob", "Grep"],
        permission_mode="bypassPermissions",
    ),
):
    if hasattr(message, "result"):
        print(message.result)
```

### Scénario 3 : Intégration CI/CD

Dans un pipeline CI, laissez l'agent analyser les tests en échec et tenter des corrections automatiques :

```python
async for message in query(
    prompt="Run npm test, analyze failing test cases, and fix the code so all tests pass",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Edit", "Bash", "Glob"],
        max_turns=20,
    ),
):
    print(message)
```

C'est un avantage majeur du SDK Agent par rapport au CLI - le CLI est bon lorsqu'un humain est assis au terminal, tandis que le SDK est idéal pour l'intégration dans des flux de travail automatisés.

### Scénario 4 : Agent de recherche

Laissez l'agent chercher sur le web, lire la documentation, synthétiser l'information et produire un rapport :

```python
async for message in query(
    prompt="Research mainstream Python Web frameworks in 2026. Compare FastAPI, Django, and Litestar, then write a technical selection report to report.md",
    options=ClaudeAgentOptions(
        allowed_tools=["WebSearch", "WebFetch", "Write"],
    ),
):
    print(message)
```

### Scénario 5 : Agent full-stack avec capacité de navigateur

En connectant Playwright via MCP, l'agent peut non seulement écrire du code mais aussi ouvrir un navigateur pour vérifier les résultats :

```python
async for message in query(
    prompt="Fix the homepage style issue, then open a browser and take screenshots to verify the result",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Edit", "Bash"],
        mcp_servers={
            "playwright": {
                "command": "npx",
                "args": ["@playwright/mcp@latest"]
            }
        },
    ),
):
    print(message)
```

### Référence rapide des scénarios

| Scénario | Outils principaux | Difficulté |
|------|---------|------|
| Correction automatique de bugs | Read, Edit, Bash, Grep | Débutant |
| Revue de code | Read, Glob, Grep | Débutant |
| Correction automatique CI/CD | Read, Edit, Bash | Intermédiaire |
| Rapport de recherche technique | WebSearch, WebFetch, Write | Débutant |
| Automatisation de navigateur | MCP (Playwright) | Intermédiaire |
| Collaboration multi-agents | Task + AgentDefinition | Avancé |
| Opérations de base de données | MCP (PostgreSQL/MySQL) | Intermédiaire |
| Assistant email/notification | MCP (Slack/Email) | Intermédiaire |

---

## Quand utiliser le SDK Agent ?

Tous les scénarios n'ont pas besoin du SDK Agent. Choisir le bon outil compte :

| Ce que vous voulez faire | Outil recommandé |
|-----------|---------|
| Chat simple, génération de texte, traduction | SDK `anthropic` de base |
| Utilisation d'outils ponctuelle (météo, calcul) | SDK `anthropic` de base |
| Accomplir de manière autonome des tâches de développement multi-étapes | SDK Agent |
| Intégrer dans des pipelines CI/CD | SDK Agent |
| Construire des applications qui opèrent sur un système de fichiers | SDK Agent |
| Développement interactif quotidien | CLI Claude Code |
| Tâches rapides ponctuelles | CLI Claude Code |

En bref : si votre tâche nécessite que Claude "travaille manuellement" par lui-même (lire des fichiers, éditer du code, exécuter des commandes), utilisez le SDK Agent. Si vous n'avez besoin que de Q&R, le SDK de base suffit.

---

## Pratique en entreprise : construire un pipeline de garde-fou de qualité du code

Les scénarios précédents utilisaient tous un agent pour un travail. Dans de vrais environnements d'entreprise, ce dont vous avez besoin est un pipeline complet - plusieurs agents chaînés, chaque étape avec des entrées/sorties claires, plus audit, rollback et notifications.

Nous allons maintenant construire un vrai scénario : après chaque soumission de PR, déclencher automatiquement **revue de code -> scan de sécurité -> correction automatique -> vérification des tests -> génération de rapport** comme un pipeline complet.

### Conception de l'architecture

```text
PR soumis
  |
  v
+---------------+    +---------------+    +---------------+
|  Code Review  |--->| Security Scan |--->|   Auto Fix    |
|    Agent      |    |    Agent      |    |    Agent      |
| (lecture seule)|    | (lecture seule)|    |  (inscriptible)|
+---------------+    +---------------+    +---------------+
                                              |
                                              v
                                       +---------------+    +---------------+
                                       | Test Verify   |--->| Report Build  |
                                       |    Agent      |    |    Agent      |
                                       |   (Bash)      |    |   (Write)    |
                                       +---------------+    +---------------+
                                                              |
                                                              v
                                                       Notification Slack
```

Idée centrale : **chaque agent fait une chose, les permissions sont minimisées, et les résultats sont passés séquentiellement**.

### Étape 1 : Définir le framework du pipeline

```python
import asyncio
import json
from datetime import datetime
from claude_agent_sdk import query, ClaudeAgentOptions, HookMatcher

# Journal d'audit : enregistrer chaque opération de chaque agent
audit_log = []

async def audit_hook(input_data, tool_use_id, context):
    audit_log.append({
        "time": datetime.now().isoformat(),
        "tool": input_data.get("tool_name"),
        "input": input_data.get("tool_input", {}),
    })
    return {}

# Configuration de hook partagée : tous les agents partagent la capacité d'audit
audit_hooks = {
    "PostToolUse": [HookMatcher(matcher=".*", hooks=[audit_hook])]
}
```

### Étape 2 : Agent de revue de code (lecture seule)

```python
async def run_code_review(pr_diff: str) -> str:
    """Agent en lecture seule, révise la qualité du code et produit un rapport structuré"""
    result_text = ""
    async for message in query(
        prompt=f"""Review the following PR diff from these dimensions:
1. Code conventions: naming, formatting, comments
2. Logic issues: edge cases, null pointer risks, race conditions
3. Performance risks: N+1 queries, memory leaks, unnecessary loops
4. Maintainability: oversized functions, unclear responsibilities, magic numbers

PR Diff:
{pr_diff}

Output JSON format: {{"issues": [{{"severity": "high/medium/low", "file": "...", "line": ..., "description": "..."}}], "summary": "..."}}""",
        options=ClaudeAgentOptions(
            allowed_tools=["Read", "Glob", "Grep"],
            permission_mode="bypassPermissions",
            hooks=audit_hooks,
            max_turns=10,
        ),
    ):
        if hasattr(message, "result"):
            result_text = message.result
    return result_text
```

### Étape 3 : Agent de scan de sécurité (lecture seule)

```python
async def run_security_scan() -> str:
    """Agent en lecture seule concentré sur la recherche de vulnérabilités"""
    result_text = ""
    async for message in query(
        prompt="""Scan the project code for security vulnerabilities:
1. SQL injection, XSS, CSRF
2. Hardcoded keys or credentials
3. Insecure dependency versions
4. Missing permission checks

Output JSON: {{"vulnerabilities": [{{"severity": "critical/high/medium", "type": "...", "file": "...", "description": "...", "fix_suggestion": "..."}}]}}""",
        options=ClaudeAgentOptions(
            allowed_tools=["Read", "Glob", "Grep", "Bash"],
            permission_mode="bypassPermissions",
            hooks=audit_hooks,
            max_turns=15,
        ),
    ):
        if hasattr(message, "result"):
            result_text = message.result
    return result_text
```

### Étape 4 : Agent de correction automatique (inscriptible)

```python
async def run_auto_fix(review_result: str, security_result: str) -> str:
    """Agent inscriptible qui corrige automatiquement le code selon les résultats de revue et de scan"""
    result_text = ""
    async for message in query(
        prompt=f"""Fix code according to the following review results:

Code review report:
{review_result}

Security scan report:
{security_result}

Fix rules:
1. Only fix issues with severity high or critical
2. Run related tests after each change to ensure no existing functionality is broken
3. Do not refactor unrelated code, apply minimal fixes only
4. Output the list of modified files after completion""",
        options=ClaudeAgentOptions(
            allowed_tools=["Read", "Edit", "Bash", "Glob", "Grep"],
            permission_mode="acceptEdits",
            hooks=audit_hooks,
            max_turns=30,
        ),
    ):
        if hasattr(message, "result"):
            result_text = message.result
    return result_text
```

### Étape 5 : Vérification des tests + génération de rapport

```python
async def run_test_and_report(fix_result: str) -> str:
    """Exécuter les tests et générer le rapport final"""
    result_text = ""
    async for message in query(
        prompt=f"""Execute these actions:
1. Run the full test suite (npm test or pytest)
2. Compute test pass rate
3. Generate a Markdown quality report into pr-report.md, including:
   - Count of issues found in code review and severity distribution
   - Number of security vulnerabilities
   - Auto-fix changes: {fix_result}
   - Test pass rate
   - Final conclusion: whether merge is recommended""",
        options=ClaudeAgentOptions(
            allowed_tools=["Read", "Bash", "Write", "Glob"],
            hooks=audit_hooks,
            max_turns=15,
        ),
    ):
        if hasattr(message, "result"):
            result_text = message.result
    return result_text
```

### Étape 6 : Chaîner tout le pipeline

```python
import subprocess

async def run_pipeline():
    """Pipeline complet de garde-fou qualité PR"""
    print("Etape 1/4 : revue de code...")
    pr_diff = subprocess.run(
        ["git", "diff", "main...HEAD"], capture_output=True, text=True
    ).stdout
    review_result = await run_code_review(pr_diff)

    print("Etape 2/4 : scan de sécurité...")
    security_result = await run_security_scan()

    print("Etape 3/4 : correction automatique...")
    fix_result = await run_auto_fix(review_result, security_result)

    print("Etape 4/4 : vérification des tests + génération de rapport...")
    report = await run_test_and_report(fix_result)

    # Sauvegarder le journal d'audit
    with open("audit-log.json", "w") as f:
        json.dump(audit_log, f, indent=2, ensure_ascii=False)

    print(f"Pipeline terminé, journal d'audit sauvegardé ({len(audit_log)} enregistrements d'opérations)")
    return report

asyncio.run(run_pipeline())
```

### Réflexion de conception en entreprise

Ce pipeline reflète plusieurs principes de conception en entreprise clés :

**Privilège minimum** : les agents de revue de code et de scan de sécurité sont en lecture seule et ne peuvent pas accidentellement modifier le code. Seul l'agent de correction automatique a la permission d'écriture, et même celle-ci est contrainte par `acceptEdits`.

**Auditable** : chaque étape de chaque agent est journalisée via les Hooks. Si quelque chose va mal, vous pouvez retracer quel agent a fait quoi et quand.

**Chaînage des résultats** : la sortie de chaque agent devient l'entrée de l'agent suivant. Les résultats de revue alimentent la correction automatique ; les résultats de correction alimentent la vérification des tests. Chaque étape a un contrat d'entrée/sortie clair.

**Contrôle des coûts** : chaque agent a une limite `max_turns` pour empêcher les boucles incontrôlées. En production, vous pouvez également ajouter `max_budget_usd` pour le contrôle budgétaire.

**Extensibilité** : vous voulez une autre étape, comme un "agent de vérification de documentation" ou "agent de benchmark de performance" ? Ajoutez une nouvelle fonction et insérez-la dans le pipeline.

Ce modèle peut être intégré directement dans GitHub Actions ou GitLab CI, déclenché automatiquement à chaque PR, atteignant véritablement des "garde-fous de qualité du code pilotés par l'IA."

---

## Gestion des erreurs

Le SDK Agent fournit des types d'exception clairs pour que vous puissiez construire une tolérance aux pannes robuste en production :

```python
from claude_agent_sdk import query, CLINotFoundError, ProcessError

try:
    async for msg in query(prompt="Analyze code"):
        print(msg)
except CLINotFoundError:
    print("Claude Code CLI n'est pas installe. Veuillez l'installer d'abord.")
except ProcessError as e:
    print(f"Processus quitte de maniere inattendue avec le code de sortie : {e.exit_code}")
```

---

## Résumé

La valeur centrale du SDK Claude Agent est de faire évoluer le "raisonnement du modèle" en "exécution contrôlée." Il ne génère pas seulement du texte. Il peut véritablement accomplir des tâches dans un système d'outils auditable et contraint.

Souvenez-vous de cette phrase du blog officiel d'Anthropic : la philosophie de conception du SDK Agent est "donner un ordinateur à l'agent et le laisser travailler comme un humain."

Une bonne application d'agent = conception d'outils claire + limites de tâches explicites + supervision humaine appropriée. Les outils donnent la capacité à l'agent, les limites lui donnent des contraintes, et la supervision vous donne confiance. Aucun des trois ne peut manquer.

---

## Références

### Ressources officielles

- [Documentation officielle du SDK Agent](https://platform.claude.com/docs/en/agent-sdk/overview) - la référence la plus autorisée
- [GitHub - claude-agent-sdk-python](https://github.com/anthropics/claude-code-sdk-python) - source du SDK Python
- [GitHub - claude-agent-sdk-typescript](https://github.com/anthropics/claude-agent-sdk-typescript) - source du SDK TypeScript
- [Projets de démonstration du SDK Agent](https://github.com/anthropics/claude-agent-sdk-demos) - assistant email, agent de recherche, et plus

### Blogs et tutoriels

- [Building agents with the Claude Agent SDK](https://claude.com/blog/building-agents-with-the-claude-agent-sdk) - blog d'ingénierie Anthropic sur la philosophie de conception et l'architecture
- [Claude Agent SDK Python Study Guide](https://redreamality.com/blog/claude-agent-sdk-python-) - tutoriel complet accessible en chinois depuis zéro
- [Tutoriel complet du SDK Claude Agent](https://blog.wenhaofree.com/en/posts/articles/claude-agent-sdk-tutorial/) - guide pratique des systèmes d'outils, de la Boucle Agent et de l'exécution contrôlée
- [12 scénarios pratiques du SDK Agent](https://skywork.ai/blog/claude-agent-sdk-use-cases-2025/) - couvre le codage, les données, l'automatisation, et plus
- [Tutoriel d'agent étape par étape](https://skywork.ai/blog/how-to-use-claude-agent-sdk-step-by-step-ai-agent-tutorial/) - tutoriel double piste TypeScript + Python
