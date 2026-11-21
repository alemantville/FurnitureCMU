# Labs

Our work from the class build labs. Each collaborator has one folder, and each lab sits inside it with the same path the class zip uses, so the same lab can be compared side by side.

## Layout

```
labs/
├── README.md            ← this file: the conventions
├── CLAUDE.md            ← rules for AI agents working in labs/
├── rita/
│   ├── README.md        ← my labs table + idea log
│   └── 01-lab-exercise-1-ideate-on-a-rule/
│       └── letting-go-of-furniture/
│           ├── README.md
│           └── letting_go_price.py
├── lucas/
└── ale/
```

## Conventions

1. **Your folder is your first name in lowercase** (`rita`, `lucas`, `ale`). Only change files inside your own folder.
2. **Add a lab by unzipping the class download into your folder as-is**: `NN-lab-exercise-N-<slug>/<project-slug>/`. Don't rename the folders or files, so every collaborator's copy of a lab has the same path.
3. **Your `README.md`** has two parts: a table of your labs (lab, folder, the rule, link to the vault note), and an **Idea log** with one line per idea: `idea → what changed → keep or drop`.
4. **Change the code by asking the AI agent**, in your own words, as the class asks. Then run it (`python <file>.py`) and check how many expectations hold before you commit.
5. **Longer write-ups go in the vault** at `Notes/Labs/Lab NN - <title>.md`, linked from your README.
6. **Git:** work on your own branch (`Rita`, `Lucas`, `Ale`), commit only your folder, and open a pull request to `main`. Commit messages start with the lab number, e.g. `Lab 01: designer brands keep 25% more`.
7. Don't commit generated files (`__pycache__/`, `.DS_Store`); `.gitignore` covers them.
