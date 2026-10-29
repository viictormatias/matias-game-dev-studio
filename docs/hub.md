# Game Dev Studio hub (multi-engine)

Este repositório é o hub do estúdio. Cada jogo fica em `projects/<jogo>/` e pode
usar uma engine diferente. O Workspace mostra os relatórios de todos.

## Estrutura por jogo

```
projects/<jogo>/
  README.md      brief: ideia, escopo, engine escolhida
  plan.md        marcos e tarefas
  engine/        projeto da engine (Unity, Godot ou Unreal)
```

Projetos de engine são grandes e geram muitos arquivos. Mantenha `engine/` como
repositório git próprio (ou ignore-o aqui) e use `.gitignore` da engine:

| Engine | Pasta ignorada | Observação |
| --- | --- | --- |
| Unity | `Library/`, `Temp/`, `Logs/`, `obj/` | Versionar `Assets/`, `Packages/`, `ProjectSettings/` |
| Godot | `.godot/` | Texto puro, ótimo para agentes e git |
| Unreal | `Binaries/`, `Intermediate/`, `Saved/`, `DerivedDataCache/` | Usar Git LFS para `.uasset` |

## Escolha de engine

| Engine | Quando usar | Ponte para agente |
| --- | --- | --- |
| Unity | Primeiro jogo, 2D/3D, muito material | Unity MCP (comunidade) |
| Godot | 2D, protótipos rápidos, jogos leves | Godot MCP (comunidade) |
| Unreal | 3D de alta fidelidade | VibeUE |

Links e requisitos estão em `workspace/2026-09-15_creative-mcp/report.html`.
Confirme a versão suportada da engine antes de conectar qualquer MCP.
