"""Letting go of furniture · a fair asking price.

A seller takes a photo, and the app suggests what to ask. Too high and nothing
sells; too low and the seller feels cheated. This file decides that price, and
the one sentence that explains it.

Press ▶ Run in the Terminal tab, then pick from the menu.
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
    "like new": 0.90,    # like new keeps 90%
    "good": 0.70,        # good keeps 70%
    "worn": 0.40,        # worn keeps 40%
}
YEARLY_LOSS = 0.05       # loses 5% of its value every year
ROUND_TO = 5             # ask in steps of €5
LOWEST_PRICE = 5         # never suggest less than this: nothing is free
COMPANY_SHARE = 0.10     # the company keeps 10% of the sale price
AREA = "Madrid"          # the area from Nominatim — never the street address
DONATION_PICKUP = 0      # donating costs the seller nothing to hand over


# ── The rule ───────────────────────────────────────────────────────────────
def age_in_years(years, months):
    """An age given in years and months, as a number of years (4 years 6 months = 4.5)."""
    return years + months / 12


def suggest(item, condition, years, months=0):
    """The suggested asking price in whole euros."""
    age = age_in_years(years, months)
    value = NEW_PRICE[item] * CONDITION_KEEPS[condition]
    value *= (1 - YEARLY_LOSS) ** age
    rounded = int(value / ROUND_TO + 0.5) * ROUND_TO
    return max(rounded, LOWEST_PRICE)


def company_cut(asking):
    """What the company keeps from a sale at this price."""
    return int(asking * COMPANY_SHARE + 0.5)


def seller_gets(asking):
    """What the seller actually receives after the company's share."""
    return asking - company_cut(asking)


def age_words(years, months):
    """'8 years', '1 year 6 months', '3 months' — how old the item is, in words."""
    parts = []
    if years:
        parts.append(f"{years} year{'' if years == 1 else 's'}")
    if months:
        parts.append(f"{months} month{'' if months == 1 else 's'}")
    return " ".join(parts) if parts else "0 months"


def why(item, condition, years, months=0):
    """The one sentence the seller sees next to the price."""
    keeps = CONDITION_KEEPS[condition] * 100
    text = (f"€{NEW_PRICE[item]} new, {condition} keeps {keeps:g}%, "
            f"minus {YEARLY_LOSS * 100:g}% a year for {age_words(years, months)}")
    if suggest(item, condition, years, months) == LOWEST_PRICE:
        text += f", but never below €{LOWEST_PRICE}"
    return text + "."


def listing(item, condition, years, months=0):
    """The listing the seller could paste straight into a marketplace."""
    asking = suggest(item, condition, years, months)
    lines = [
        f"{item.capitalize()} — {condition}, {age_words(years, months)} old",
        f"€{asking}",
        f"Pick up in {AREA}.",
        f"Why €{asking}? {why(item, condition, years, months)}",
        f"You receive €{seller_gets(asking)} "
        f"(the company keeps €{company_cut(asking)}).",
    ]
    return "\n".join(lines)


def donation_listing(item, condition, years, months=0):
    """The listing for giving the item away instead of selling it."""
    lines = [
        f"Free to a good home — {item}, {condition}, "
        f"{age_words(years, months)} old",
        "€0 — donation",
        f"Pick up in {AREA}.",
        f"Nobody pays anything: no price, no company share"
        f"{'' if DONATION_PICKUP == 0 else f', pickup €{DONATION_PICKUP}'}.",
        "A neighbour or a charity collects it.",
    ]
    return "\n".join(lines)


# ── Six real items, and what the team expects ──────────────────────────────
#   item,        condition, years, months, lowest €, highest €, the item
SCENARIOS = [
    ("sofa",     "like new",  1, 0, 350, 450, "An almost new sofa keeps most of its value"),
    ("chair",    "good",      3, 0,  25,  40, "An ordinary chair"),
    ("sofa",     "good",      8, 0, 150, 220, "A good sofa after eight years"),
    ("wardrobe", "good",      5, 0, 120, 180, "A wardrobe holds its value"),
    ("table",    "worn",     12, 0,  15,  40, "Old and worn, but never free"),
    ("chair",    "worn",     20, 0,   5,  15, "A very old chair still asks something"),
]


# ── The three things the menu can do ───────────────────────────────────────
def show_scenarios():
    """The six real items, and whether each price lands where the team expects."""
    print("\nLetting go of furniture · six items\n")
    holding = 0
    for item, condition, years, months, low, high, label in SCENARIOS:
        asking = suggest(item, condition, years, months)
        ok = low <= asking <= high
        holding += ok
        print(f"{'✓' if ok else '✗'}  €{asking:<4} {label}  (expected €{low}–{high})")
        print(f"          {why(item, condition, years, months)}")
        print(f"          seller gets €{seller_gets(asking)}, "
              f"company keeps €{company_cut(asking)}")
    print(f"\n{holding}/{len(SCENARIOS)} expectations hold.", end=" ")
    if holding == len(SCENARIOS):
        print("Ask the AI agent to change a knob or try an idea, then press ▶ Run again.")
    else:
        print("Is the rule wrong, or the expectation?")


def ask_choice(question, options):
    """Ask until the answer is one of the options. Returns the option."""
    while True:
        answer = input(question).strip().lower()
        if answer in options:
            return answer
        print(f"  Sorry, please type one of: {', '.join(options)}")


def ask_years():
    """Ask for the age in whole years, and keep asking if it isn't a number."""
    while True:
        answer = input("  How many years old? (a whole number, e.g. 4): ").strip()
        if answer.isdigit():
            return int(answer)
        print("  Sorry, that needs to be a whole number like 4.")


def ask_months():
    """Ask how many extra months on top of the years. 0 is fine."""
    while True:
        answer = input("  Any extra months? (0–11, e.g. 6, or 0 for none): ").strip()
        if answer.isdigit() and int(answer) <= 11:
            return int(answer)
        print("  Sorry, that needs to be a whole number from 0 to 11.")


def ask_age():
    """Ask the age in years and months. Returns (years, months)."""
    years = ask_years()
    months = ask_months()
    return years, months


def sell_one_item():
    """Walk through a sale: the item, its condition, its age, then the listing."""
    print("\nSelling one item\n")
    print("  First, the photo. (In the real app this is where the picture goes.)")
    item = ask_choice(f"  What are you selling? ({', '.join(NEW_PRICE)}): ", list(NEW_PRICE))
    condition = ask_choice(f"  How is it? ({', '.join(CONDITION_KEEPS)}): ",
                           list(CONDITION_KEEPS))
    years, months = ask_age()
    print(f"\n  Your area: {AREA}  (from the address, never the street)\n")
    print("  ── Your listing ──")
    for line in listing(item, condition, years, months).split("\n"):
        print(f"  {line}")
    print("\n  Happy to sell? Post it. Not sure? Try another price in option 3.\n")


def give_one_item():
    """Walk through a donation: the item, its condition, its age, then the listing."""
    print("\nGiving one item away\n")
    print("  First, the photo. (In the real app this is where the picture goes.)")
    item = ask_choice(f"  What are you giving away? ({', '.join(NEW_PRICE)}): ",
                      list(NEW_PRICE))
    condition = ask_choice(f"  How is it? ({', '.join(CONDITION_KEEPS)}): ",
                           list(CONDITION_KEEPS))
    years, months = ask_age()
    print(f"\n  Your area: {AREA}  (from the address, never the street)\n")
    print("  ── Your listing ──")
    for line in donation_listing(item, condition, years, months).split("\n"):
        print(f"  {line}")
    print("\n  A donation needs no price: the rule that sets prices never runs.\n")


def try_your_own():
    """One item, one condition, one age: the price and the sentence."""
    print("\nYour own item\n")
    item = ask_choice(f"  Which item? ({', '.join(NEW_PRICE)}): ", list(NEW_PRICE))
    condition = ask_choice(f"  What condition? ({', '.join(CONDITION_KEEPS)}): ",
                           list(CONDITION_KEEPS))
    years, months = ask_age()
    asking = suggest(item, condition, years, months)
    print(f"\n  Ask €{asking}")
    print(f"  {why(item, condition, years, months)}")
    print(f"  You receive €{seller_gets(asking)}, the company keeps €{company_cut(asking)}.\n")


def menu():
    """The short menu. Keeps going until the seller quits."""
    while True:
        print("\nWhat would you like to do?")
        print("1) sell one item (photo → price → listing)")
        print("2) give one item away (photo → free listing)")
        print("3) just check a price")
        print("4) run the six test items")
        print("q) quit")
        choice = input("Pick one: ").strip().lower()
        if choice == "1":
            sell_one_item()
        elif choice == "2":
            give_one_item()
        elif choice == "3":
            try_your_own()
        elif choice == "4":
            show_scenarios()
        elif choice in ("q", ""):
            print("Bye — good luck with the sale.")
            return
        else:
            print("  Sorry, please type 1, 2, 3, 4 or q.")


if __name__ == "__main__":
    menu()
