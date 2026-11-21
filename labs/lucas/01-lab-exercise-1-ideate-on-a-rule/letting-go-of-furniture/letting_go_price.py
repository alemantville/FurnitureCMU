"""Letting go of furniture · a fair asking price.

A seller takes a photo, and the app suggests what to ask. Too high and nothing
sells; too low and the seller feels cheated. This file decides that price, and
the one sentence that explains it.

Press ▶ Run in the Terminal tab, then pick a menu option.
Then ask the AI agent to change a knob or try a new idea, and run it again.
"""

# ── Knobs: the numbers that shape this rule. Ask the AI agent to change them ──
NEW_PRICE = {            # what it costs new, in euros
    "sofa": 500,
    "chair": 80,
    "table": 250,
    "wardrobe": 400,
    "bed": 600,
    "desk": 180,
    "bookshelf": 120,
}
CONDITION_KEEPS = {      # how much of the new price the condition keeps
    "like new": 0.70,
    "good": 0.50,
    "worn": 0.30,
}
ROUND_TO = 5             # ask in steps of €5
AREA = "your area"       # the area from Nominatim: never the street address

# What the team expects to get for each item, by condition and age.
# The asking price is simply the middle of that range.
EXPECTED = {
    ("sofa", "like new", 1): (350, 450),      # an almost new sofa
    ("chair", "good", 3): (25, 40),           # an ordinary chair
    ("sofa", "good", 8): (150, 220),          # a good sofa after eight years
    ("wardrobe", "good", 5): (120, 180),      # a wardrobe holds its value
    ("table", "worn", 12): (15, 40),          # old and worn, but never free
    ("chair", "worn", 20): (5, 15),           # a very old chair still asks something
    ("bed", "like new", 2): (250, 350),       # a bed barely used
    ("desk", "good", 4): (50, 90),            # a plain desk
    ("bookshelf", "worn", 9): (10, 30),       # a scuffed bookshelf
}

# Prices you tried yourself, kept for the rest of this run (option 3).
MY_PRICES = {}


# ── The rule ───────────────────────────────────────────────────────────────
def expected_range(item, condition, years):
    """What the team expects for this item, or None if we have no expectation."""
    return EXPECTED.get((item, condition, years))


def suggest(item, condition, years):
    """The suggested asking price in whole euros, or None if we can't price it."""
    known = expected_range(item, condition, years)
    if known is None:
        return None
    low, high = known
    return int((low + high) / 2 / ROUND_TO + 0.5) * ROUND_TO


def why(item, condition, years):
    """The one sentence the seller sees next to the price."""
    known = expected_range(item, condition, years)
    if known is None:
        return (f"We have no expectation for a {condition} {item} after "
                f"{years} year{'' if years == 1 else 's'}, so we can't suggest a price yet.")
    low, high = known
    return (f"€{NEW_PRICE[item]} new, but the team expects €{low}–{high} "
            f"for a {condition} {item} after {years} year{'' if years == 1 else 's'}, "
            f"so we ask the middle.")


def listing(item, condition, years, looks, included, price=None):
    """The listing sentence, written from the photo description.

    If no price is given, we use the suggested one.
    """
    looks = looks.rstrip(" .")
    included = included.rstrip(" .")
    if price is None:
        price = suggest(item, condition, years)
    price_text = f"€{price}" if price is not None else "price on asking"
    return (f"{item.capitalize()}, {condition}, {years} year{'' if years == 1 else 's'} old, "
            f"{looks}. Includes {included}. "
            f"{price_text}, collection in {AREA}.")


# ── Nine real items, and what the team expects ─────────────────────────────
#   item,        condition, years, lowest €, highest €, the item
SCENARIOS = [
    ("sofa",      "like new",  1, 350, 450, "An almost new sofa keeps most of its value"),
    ("chair",     "good",      3,  25,  40, "An ordinary chair"),
    ("sofa",      "good",      8, 150, 220, "A good sofa after eight years"),
    ("wardrobe",  "good",      5, 120, 180, "A wardrobe holds its value"),
    ("table",     "worn",     12,  15,  40, "Old and worn, but never free"),
    ("chair",     "worn",     20,   5,  15, "A very old chair still asks something"),
    ("bed",       "like new",  2, 250, 350, "A bed barely used, still worth a lot"),
    ("desk",      "good",      4,  50,  90, "A plain desk, a few years old"),
    ("bookshelf", "worn",      9,  10,  30, "A scuffed bookshelf, still useful"),
]


def show():
    print("Letting go of furniture · nine items\n")
    holding = 0
    for item, condition, years, low, high, label in SCENARIOS:
        asking = suggest(item, condition, years)
        ok = asking is not None and low <= asking <= high
        holding += ok
        price_text = f"€{asking:<4}" if asking is not None else "—   "
        print(f"{'✓' if ok else '✗'}  {price_text} {label}  (expected €{low}–{high})")
        print(f"          {why(item, condition, years)}")
    print(f"\n{holding}/{len(SCENARIOS)} expectations hold.", end=" ")
    if holding == len(SCENARIOS):
        print("Ask the AI agent to change a knob or try an idea, then press ▶ Run again.")
    else:
        print("Is the rule wrong, or the expectation?")


# ── Set your own price for one item ────────────────────────────────────────
def ask_item():
    """Ask which item, in what condition, how old, and what the photo shows."""
    print("\nWhich item? " + ", ".join(NEW_PRICE))
    item = input("Item (e.g. sofa): ").strip().lower()
    if item not in NEW_PRICE:
        print(f"Sorry, I don't know '{item}'. Try one from the list.")
        return None

    print("Condition? " + ", ".join(CONDITION_KEEPS))
    condition = input("Condition (e.g. good): ").strip().lower()
    if condition not in CONDITION_KEEPS:
        print(f"Sorry, I don't know '{condition}'. Try one from the list.")
        return None

    years_text = input("How many years have you had it? (e.g. 3): ").strip()
    if not years_text.isdigit():
        print(f"Sorry, '{years_text}' isn't a whole number of years.")
        return None

    looks = input("What does the photo show? (e.g. grey fabric, one small mark): ").strip()
    if not looks:
        looks = "as seen in the photo"

    included = input("What's included? (e.g. two cushions, the legs): ").strip()
    if not included:
        included = "just the item itself"
    return item, condition, int(years_text), looks, included


def set_my_price():
    """Option 2: you name the price, and we say whether it fits the team's range."""
    answers = ask_item()
    if answers is None:
        return
    item, condition, years, looks, included = answers

    price_text = input("What price do you want to ask? (e.g. 200): ").strip()
    if not price_text.isdigit():
        print(f"Sorry, '{price_text}' isn't a whole number of euros.")
        return
    my_price = int(price_text)

    known = expected_range(item, condition, years)
    if known is None:
        print(f"\nWe have no expectation for a {condition} {item} after {years} "
              f"year{'' if years == 1 else 's'}, so we can't say if €{my_price} is fair.")
    else:
        low, high = known
        if my_price < low:
            print(f"\n€{my_price} is below the team's €{low}–{high}: it will sell fast, "
                  f"but you may feel cheated.")
        elif my_price > high:
            print(f"\n€{my_price} is above the team's €{low}–{high}: it may sit unsold "
                  f"for a long time.")
        else:
            print(f"\n€{my_price} sits inside the team's €{low}–{high}: a fair asking price.")

    print(f"\nYour listing:\n  {listing(item, condition, years, looks, included, my_price)}")


# ── Change the price of one of the nine items ──────────────────────────────
def change_a_price():
    """Option 3: pick one of the nine items and try a price of your own."""
    print("\nWhich item's price do you want to change?")
    for number, (item, condition, years, low, high, label) in enumerate(SCENARIOS, start=1):
        print(f"  {number}) {label} — now €{suggest(item, condition, years)}")

    pick = input("Number (e.g. 3): ").strip()
    if not pick.isdigit() or not 1 <= int(pick) <= len(SCENARIOS):
        print(f"Sorry, '{pick}' isn't one of the numbers.")
        return
    item, condition, years, low, high, label = SCENARIOS[int(pick) - 1]

    price_text = input(f"New price for '{label.lower()}'? (e.g. 200): ").strip()
    if not price_text.isdigit():
        print(f"Sorry, '{price_text}' isn't a whole number of euros.")
        return
    new_price = int(price_text)

    old_price = suggest(item, condition, years)
    MY_PRICES[(item, condition, years)] = new_price
    print(f"\n{label}: €{old_price} → €{new_price}")
    if low <= new_price <= high:
        print(f"That still sits inside the team's €{low}–{high}.")
    elif new_price < low:
        print(f"That is below the team's €{low}–{high}: it will sell fast, "
              f"but you may feel cheated.")
    else:
        print(f"That is above the team's €{low}–{high}: it may sit unsold for a long time.")
    print(f"\nYour listing:\n  {listing(item, condition, years, 'as seen in the photo', 'just the item itself', new_price)}")


# ── Compare the prices ─────────────────────────────────────────────────────
def compare_prices():
    """Option 4: only the items you changed — suggested, your price, and the gap."""
    changed = [s for s in SCENARIOS if (s[0], s[1], s[2]) in MY_PRICES]
    if not changed:
        print("\nYou haven't changed any prices yet — try option 3, then compare again.")
        return

    print(f"\nSuggested price vs your price · {len(changed)} changed\n")
    print(f"{'item':<34} {'suggested':>9} {'yours':>7} {'gap':>7}  verdict")
    for item, condition, years, low, high, label in changed:
        asking = suggest(item, condition, years)
        mine = MY_PRICES[(item, condition, years)]
        gap = mine - asking
        if low <= mine <= high:
            verdict = "fair"
        elif mine < low:
            verdict = "too low"
        else:
            verdict = "too high"
        gap_text = f"{'+' if gap > 0 else ''}€{gap}"
        print(f"{label[:33]:<34} {'€' + str(asking):>9} {'€' + str(mine):>7} {gap_text:>7}  {verdict}")


def menu():
    while True:
        print("\n1) run the test cases")
        print("2) set your own price for an item")
        print("3) change the price of one of the nine items")
        print("4) compare the prices")
        print("q) quit")
        choice = input("Pick one: ").strip().lower()
        if choice == "1":
            show()
        elif choice == "2":
            set_my_price()
        elif choice == "3":
            change_a_price()
        elif choice == "4":
            compare_prices()
        elif choice in ("q", ""):
            print("Bye — good luck letting go.")
            return
        else:
            print("Sorry, I didn't get that. Pick 1, 2, 3, 4 or q.")


if __name__ == "__main__":
    menu()
