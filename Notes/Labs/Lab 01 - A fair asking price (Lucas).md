# Lab 01 · Ideate on a rule · A fair asking price (Lucas)

From `my-labs.zip` → `01-lab-exercise-1-ideate-on-a-rule/letting-go-of-furniture/letting_go_price.py`, in [[labs/lucas/README]]. Class notes: [[Notes/C3-02 Functional Prototyping notes]]. Rita's version of the same lab: [[Notes/Labs/Lab 01 - A fair asking price]].

A seller takes a photo, and the app suggests what to ask. Too high and nothing sells; too low and the seller feels cheated. In this version the price isn't calculated from a formula: the team writes down what it expects each item to sell for, and the app asks the middle of that range.

## Knobs

| Knob | Value | Meaning |
| --- | --- | --- |
| New price | sofa €500 · chair €80 · table €250 · wardrobe €400 · bed €600 · desk €180 · bookshelf €120 | what the item costs new (shown in the sentence) |
| Condition keeps | like new 70% · good 50% · worn 30% | listed, not used by the rule |
| Round to | €5 | asks in steps of €5 |
| Area | from Nominatim | the listing shows the area, never the street |

## The rule

`asking price = (lowest + highest) / 2`, rounded to €5, from the team's expected range for that item, condition and age. No range → no suggestion.

The sentence the seller sees, e.g. *"€500 new, but the team expects €150–220 for a good sofa after 8 years, so we ask the middle."*

Own price: below the range → *"it will sell fast, but you may feel cheated"*; above → *"it may sit unsold for a long time"*; inside → *"a fair asking price"*.

## Expectations

9/9 hold (run on 21 Nov 2026).

| Item | Condition | Years | Expected | Asks |
| --- | --- | --- | --- | --- |
| sofa | like new | 1 | €350–450 | €400 |
| chair | good | 3 | €25–40 | €35 |
| sofa | good | 8 | €150–220 | €185 |
| wardrobe | good | 5 | €120–180 | €150 |
| table | worn | 12 | €15–40 | €30 |
| chair | worn | 20 | €5–15 | €10 |
| bed | like new | 2 | €250–350 | €300 |
| desk | good | 4 | €50–90 | €70 |
| bookshelf | worn | 9 | €10–30 | €20 |

The middle always sits inside its own range, so these expectations can't fail. The real test is whether the ranges are right.

## In Figma

Section PRICE on page "Lucas": 10 screens, from the suggestion to the seller's own price, the no-range fallback and the listing review. Details and audit in `labs/lucas/01-lab-exercise-1-ideate-on-a-rule/price-screens/`.

## Idea log

See [[labs/lucas/README]].
