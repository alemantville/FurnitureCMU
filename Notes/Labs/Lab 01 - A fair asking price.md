# Lab 01 · Ideate on a rule · A fair asking price

From `my-labs.zip` → `01-lab-exercise-1-ideate-on-a-rule/letting-go-of-furniture/letting_go_price.py`. Class notes: [[Notes/C3-02 Functional Prototyping notes]].

A seller takes a photo, and the app suggests what to ask. Too high and nothing sells; too low and the seller feels cheated. The rule decides that price and the one sentence that explains it. In the happy path it is the **€45** suggestion on step 6 ([[6. Price]]).

## Knobs

| Knob | Value | Meaning |
| --- | --- | --- |
| New price | sofa €600 · chair €80 · table €250 · wardrobe €400 | what the item costs new |
| Condition keeps | like new 70% · good 50% · worn 30% | share of the new price the condition keeps |
| Yearly loss | 15% | value lost every year |
| Round to | €5 | asks in steps of €5 |
| Lowest price | €5 | never suggests less: nothing is free |
| Designer brands | ikea, habitat, made, vitra | names that hold value |
| Designer keeps more | +25% | applied before the years are taken off |

## The rule

`price = new price × condition keeps × (1 + 25% if designer) × (1 − 15%)^years`, rounded to €5, never below €5.

The sentence the seller sees, e.g. *"€600 new, good keeps 50%, a vitra name adds 25%, minus 15% a year for 8 years."*

## Expectations

| Item | Condition | Years | Brand | Expected | The moment |
| --- | --- | --- | --- | --- | --- |
| sofa | like new | 1 | no brand | €350–450 | An almost new sofa keeps most of its value |
| chair | good | 3 | no brand | €25–40 | An ordinary chair |
| sofa | good | 8 | no brand | €70–110 | A good sofa after eight years |
| wardrobe | good | 5 | no brand | €80–120 | A wardrobe holds its value |
| table | worn | 12 | no brand | €5–20 | Old and worn, but never free |
| chair | worn | 20 | no brand | €5–10 | A very old chair still asks something |
| sofa | like new | 1 | vitra | €400–500 | A designer sofa keeps even more |
| sofa | good | 8 | vitra | €90–130 | A designer sofa after eight years |

## Idea log

- Designer brands keep value → a brand name adds 25% before the yearly loss; menu option 3 shows the same items at two prices (no brand vs designer) → keep / drop: _
