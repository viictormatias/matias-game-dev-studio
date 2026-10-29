# Codificação de arquivos no Windows

**O que aconteceu (29/10/2026):** edições feitas via PowerShell salvaram `App.tsx`, `Sidebar.tsx` e
`Topbar.tsx` com BOM e mojibake: `—` virou `â€”`, `‹` virou `ÔÇ╣` e `…` virou `ÔÇª`. Os cards
ganharam BOM e o `workspace.json` perdeu acentos (`An�lise`). A interface mostrava símbolos quebrados.

**Regra:**

- Nunca grave arquivos com `Set-Content`, `Out-File` ou `>` do Windows PowerShell 5.1.
- Use a ferramenta de edição do agente, ou Python com `encoding="utf-8"` e `newline="\n"`.
- Sempre UTF-8 **sem BOM** e finais de linha LF.

**Verificação rápida:**

```bash
grep -rlE 'â€|ÔÇ|Ôû|┬|├' src context workspace          # mojibake (terminalAppearance.ts tem caracteres de caixa legítimos)
python -c "import json;json.load(open('workspace/workspace.json',encoding='utf-8'))"   # falha se houver BOM
```
