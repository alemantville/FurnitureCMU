# Labs: rules for AI agents

These rules apply to any work inside `labs/`. [[labs/README]] holds the conventions; follow it.

## Whose lab

- Work only inside the folder of the person you're working with: `labs/<firstname>/`. Read their name from the git branch (`Rita`, `Lucas`, `Ale` → `rita`, `lucas`, `ale`). If it isn't clear, ask before touching any file.
- Never edit, move or delete another collaborator's folder. To compare labs, read it only.

## Adding a lab

- Unzip the class download into `labs/<firstname>/` without renaming anything. If the zip has its own top-level `README.md`, merge its line into the person's README table instead of overwriting it.
- Add a row to the person's `README.md` labs table and, if they want a write-up, a vault note at `Notes/Labs/Lab NN - <title>.md` linked from that row.

## Changing a lab's code

- The person describes the change in their own words; you make it. Keep the file's shape: **knobs** at the top, then **the rule**, then the **scenarios** with their expectations.
- Before changing anything, say what you expect the change to do. After, run the file (`python <file>.py`, option 1) and report how many expectations hold.
- Never edit an expectation just to make it pass. If one stops holding, ask whether the rule or the expectation is wrong.
- Add one line to the person's **Idea log**: `idea → what changed → keep or drop`, leaving keep/drop for them to decide.

## Git

- Commit only that person's folder (and their `Notes/Labs` note), on their branch, with a message that starts with the lab number (`Lab 01: …`). Push only when they ask.
