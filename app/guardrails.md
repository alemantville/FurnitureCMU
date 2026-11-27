# Guardrails that run themselves

Pick one for today. All go in the project, so every teammate and every agent session gets them.

**How this repo differs from the generic version**

- Claude Code sessions start in the **vault root** (`FurnitureCMU/`), but the Next.js app and its `package.json` live in **`app/`**. Plain `npm run …` from the root fails with `ENOENT … package.json`, so every command below uses `npm --prefix app`.
- The app needs **Node ≥ 20.19** (Tailwind 4 loads ES modules). The system Node here is 20.18, so commands run through **fnm with Node 26**: `fnm exec --using=26 npm.cmd …`. On Windows, fnm needs `npm.cmd`, not `npm`.
- `.claude/settings.json` goes in the **vault root**, next to the existing `.claude/launch.json`.
- `.env` files belong in `app/` (`app/.gitignore` already ignores `.env*`).

## A · Block reading secrets and wiping folders (Claude Code)

Create `.claude/settings.json` in the vault root:

```json
{
  "permissions": {
    "deny": [
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./app/.env)",
      "Read(./app/.env.*)",
      "Bash(rm -rf:*)",
      "PowerShell(Remove-Item:*)"
    ]
  }
}
```

The `rm -rf` rule only covers the Bash tool. On Windows Claude Code also has a PowerShell tool, so the last line blocks `Remove-Item` there too. Check that it took effect by asking Claude to delete a throwaway folder: it should be refused.

## B · Lint after every edit (Claude Code hook)

Add to the same file:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "cd \"$CLAUDE_PROJECT_DIR\" && fnm exec --using=26 npm.cmd --prefix app run lint --silent"
          }
        ]
      }
    ]
  }
}
```

To check it's loaded, run `claude` in a terminal and type `/hooks`. Lint errors now show up for the agent right after its edit, so it fixes them itself.

**Before you turn this on:** `app` lint currently fails with 2 existing errors in shadcn-generated files (`components/ui/carousel.tsx:98` and `hooks/use-mobile.ts:14`, both `react-hooks/set-state-in-effect`). Fix those first, or the hook will report them after every edit, including edits to markdown notes.

## C · One script that checks everything (any tool)

In `app/package.json` (it already has `lint` and `typecheck`):

```json
"scripts": {
  "check": "npm run lint && npm run typecheck && npm run build"
}
```

Run it from the vault root:

```powershell
fnm exec --using=26 npm.cmd --prefix app run check
```

Add a line to the root `CLAUDE.md`: "Before saying done on any change in `app/`, run `fnm exec --using=26 npm.cmd --prefix app run check` and show the output."

Cursor and Cline users: use C, plus the tool's own rules file for the CLAUDE.md line.
