"""Letting go of furniture · a fair asking price.

A seller takes a photo, and the app suggests what to ask. Too high and nothing
sells; too low and the seller feels cheated. This file decides that price, and
the one sentence that explains it.

Press ▶ Run in the Terminal tab to see six real items.
Then ask the AI agent to change a knob or try a new idea, and run it again.
"""

# ── Knobs: the numbers that shape this rule. Ask the AI agent to change them ──
NEW_PRICE = {            # what it costs new, in euros
    "sofa": 600,
    "chair": 80,
    "table": 250,
    "wardrobe": 400,
}
CONDITION_KEEPS = {      # how much of the new price the condition keeps
    "like new": 0.70,
    "good": 0.50,
    "worn": 0.30,
}
YEARLY_LOSS = 0.06       # loses 6% of its value every year
ROUND_TO = 5             # ask in steps of €5
LOWEST_PRICE = 5         # never suggest less than this: nothing is free


# ── The rule ───────────────────────────────────────────────────────────────
def suggest(item, condition, years):
    """The suggested asking price in whole euros."""
    value = NEW_PRICE[item] * CONDITION_KEEPS[condition]
    value *= (1 - YEARLY_LOSS) ** years
    rounded = int(value / ROUND_TO + 0.5) * ROUND_TO
    return max(rounded, LOWEST_PRICE)


def why(item, condition, years):
    """The one sentence the seller sees next to the price."""
    keeps = CONDITION_KEEPS[condition] * 100
    text = (f"€{NEW_PRICE[item]} new, {condition} keeps {keeps:g}%, "
            f"minus {YEARLY_LOSS * 100:g}% a year for {years} year{'' if years == 1 else 's'}")
    if suggest(item, condition, years) == LOWEST_PRICE:
        text += f", but never below €{LOWEST_PRICE}"
    return text + "."


# ── Six real items, and what the team expects ──────────────────────────────
#   item,        condition, years, lowest €, highest €, the item
SCENARIOS = [
    ("sofa",     "like new",  1, 350, 450, "An almost new sofa keeps most of its value"),
    ("chair",    "good",      3,  25,  40, "An ordinary chair"),
    ("sofa",     "good",      8, 150, 220, "A good sofa after eight years"),
    ("wardrobe", "good",      5, 120, 180, "A wardrobe holds its value"),
    ("table",    "worn",     12,  15,  40, "Old and worn, but never free"),
    ("chair",    "worn",     20,   5,  15, "A very old chair still asks something"),
]


def show():
    print("Letting go of furniture · six items\n")
    holding = 0
    for item, condition, years, low, high, label in SCENARIOS:
        asking = suggest(item, condition, years)
        ok = low <= asking <= high
        holding += ok
        print(f"{'✓' if ok else '✗'}  €{asking:<4} {label}  (expected €{low}–{high})")
        print(f"          {why(item, condition, years)}")
    print(f"\n{holding}/{len(SCENARIOS)} expectations hold.", end=" ")
    if holding == len(SCENARIOS):
        print("Ask the AI agent to change a knob or try an idea, then press ▶ Run again.")
    else:
        print("Is the rule wrong, or the expectation?")


if __name__ == "__main__":
    show()
