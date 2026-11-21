"""Letting go of furniture · a fair asking price.

A seller takes a photo, and the app suggests what to ask. Too high and nothing
sells; too low and the seller feels cheated. This file decides that price, and
the one sentence that explains it.

Press ▶ Run in the Terminal tab: a short menu appears.
  1) run the six test items
  2) price your own item
  3) designer brands: old price vs new price
  q) quit
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
YEARLY_LOSS = 0.15       # loses 15% of its value every year
ROUND_TO = 5             # ask in steps of €5
LOWEST_PRICE = 5         # never suggest less than this: nothing is free

# ── The new idea: designer brands keep their value ─────────────────────────
DESIGNER_BRANDS = ["ikea", "habitat", "made", "vitra", "no brand"]
DESIGNER_KEEPS_MORE = 0.25   # a designer piece keeps 25% more of its value


# ── The rule ───────────────────────────────────────────────────────────────
def suggest(item, condition, years, brand="no brand"):
    """The suggested asking price in whole euros."""
    value = NEW_PRICE[item] * CONDITION_KEEPS[condition]
    if brand in DESIGNER_BRANDS and brand != "no brand":
        value *= (1 + DESIGNER_KEEPS_MORE)   # the brand name holds value
    value *= (1 - YEARLY_LOSS) ** years
    rounded = int(value / ROUND_TO + 0.5) * ROUND_TO
    return max(rounded, LOWEST_PRICE)


def why(item, condition, years, brand="no brand"):
    """The one sentence the seller sees next to the price."""
    keeps = CONDITION_KEEPS[condition] * 100
    text = (f"€{NEW_PRICE[item]} new, {condition} keeps {keeps:g}%, ")
    if brand in DESIGNER_BRANDS and brand != "no brand":
        text += f"a {brand} name adds {DESIGNER_KEEPS_MORE * 100:g}%, "
    text += f"minus {YEARLY_LOSS * 100:g}% a year for {years} year{'' if years == 1 else 's'}"
    if suggest(item, condition, years, brand) == LOWEST_PRICE:
        text += f", but never below €{LOWEST_PRICE}"
    return text + "."


# ── Six real items, and what the team expects ──────────────────────────────
#   item,        condition, years, brand,      lowest €, highest €, the item
# The expectations now include the designer idea: a brand name adds 25%.
SCENARIOS = [
    ("sofa",     "like new",  1, "no brand", 350, 450, "An almost new sofa keeps most of its value"),
    ("chair",    "good",      3, "no brand",  25,  40, "An ordinary chair"),
    ("sofa",     "good",      8, "no brand",  70, 110, "A good sofa after eight years"),
    ("wardrobe", "good",      5, "no brand",  80, 120, "A wardrobe holds its value"),
    ("table",    "worn",     12, "no brand",   5,  20, "Old and worn, but never free"),
    ("chair",    "worn",     20, "no brand",   5,  10, "A very old chair still asks something"),
    ("sofa",     "like new",  1, "vitra",    400, 500, "A designer sofa keeps even more"),
    ("sofa",     "good",      8, "vitra",     90, 130, "A designer sofa after eight years"),
]


def show():
    print("Letting go of furniture · eight items\n")
    holding = 0
    for item, condition, years, brand, low, high, label in SCENARIOS:
        asking = suggest(item, condition, years, brand)
        ok = low <= asking <= high
        holding += ok
        print(f"{'✓' if ok else '✗'}  €{asking:<4} {label}  (expected €{low}–{high})")
        print(f"          {why(item, condition, years, brand)}")
    print(f"\n{holding}/{len(SCENARIOS)} expectations hold.", end=" ")
    if holding == len(SCENARIOS):
        print("Ask the AI agent to change a knob or try an idea, then press ▶ Run again.")
    else:
        print("Is the rule wrong, or the expectation?")


# ── The same items, with and without a designer name ───────────────────────
def compare_brands():
    print("\nDesigner brands keep their value · same items, two prices\n")
    print(f"{'item':<34} {'no brand':>9} {'designer':>9}   change")
    for item, condition, years, brand, low, high, label in SCENARIOS:
        plain = suggest(item, condition, years)
        fancy = suggest(item, condition, years, "vitra")
        print(f"{label[:33]:<34} {'€' + str(plain):>9} {'€' + str(fancy):>9}   +€{fancy - plain}")
    print(f"\nA designer name adds {DESIGNER_KEEPS_MORE * 100:g}% before the years are taken off.")


# ── Pricing one item from home ─────────────────────────────────────────────
def ask_choice(question, options):
    """Ask until the answer is one of the options. Returns the option."""
    while True:
        answer = input(question).strip().lower()
        if answer in options:
            return answer
        print(f"  Please type one of: {', '.join(options)}")


def ask_years():
    """Ask for the age in whole years, 0 or more."""
    while True:
        answer = input("How many years old is it? (for example 3) ").strip()
        try:
            years = int(answer)
        except ValueError:
            print("  Please type a whole number, like 3.")
            continue
        if years < 0:
            print("  It can't be younger than 0 years.")
            continue
        return years


def price_one():
    print("\nPrice your own item")
    item = ask_choice(f"Which item? ({', '.join(NEW_PRICE)}) ", list(NEW_PRICE))
    condition = ask_choice(f"Condition? ({', '.join(CONDITION_KEEPS)}) ", list(CONDITION_KEEPS))
    brand = ask_choice(f"Brand? ({', '.join(DESIGNER_BRANDS)}) ", DESIGNER_BRANDS)
    years = ask_years()
    asking = suggest(item, condition, years, brand)
    print(f"\n  Ask €{asking} for your {condition} {item}.")
    print(f"  {why(item, condition, years, brand)}\n")


# ── The menu ───────────────────────────────────────────────────────────────
def menu():
    print("Letting go of furniture · a fair asking price")
    while True:
        print("\n1) run the six test items")
        print("2) price your own item")
        print("3) designer brands: old price vs new price")
        print("q) quit")
        choice = input("Pick one: ").strip().lower()
        if choice == "1":
            print()
            show()
        elif choice == "2":
            price_one()
        elif choice == "3":
            compare_brands()
        elif choice in ("q", ""):
            print("Good luck with the sale!")
            return
        else:
            print("  Please type 1, 2, 3 or q.")


if __name__ == "__main__":
    menu()
