# Andrew Brown
# April 16, 2023
# Version 1.0.0

# Prints the beginning game instructions
def show_instructions():
    instructions = "Zombie Text Adventure Game\n\n" \
                   "Collect 6 items to win the game, or be infected by the zombie.\n" \
                   "Move commands: go South, go North, go East, go West\n" \
                   "Add to Inventory: get 'item name'"
    print(instructions)


# Prints current room, inventory and items in the room
def show_status(current_room, inventory, rooms):
    print("\nYou are in the", current_room)
    print("Inventory : {}".format(inventory))

    if ("Item" in rooms[current_room] and
            rooms[current_room]["Item"] not in inventory):
        print("You see a {}".format(rooms[current_room]["Item"]))


# Verifies room exists and changes to that room if it does
def change_room(direction, current_room, rooms):
    if direction in rooms[current_room]:
        current_room = rooms[current_room][direction]
    else:
        print("You can't go that way!")

    return current_room


# Verifies item can be retrieved and adds to inventory if it can
def get_item(item, inventory, current_room, rooms):
    if ("Item" in rooms[current_room] and
            rooms[current_room]["Item"] == item and
            rooms[current_room]["Item"] not in inventory):
        inventory.append(rooms[current_room]["Item"])
        print("{} retrieved".format(rooms[current_room]["Item"]))
    else:
        print("Can't get {}".format(item))


def main():
    # Define the rooms, items, and directions the player can move to
    rooms = {
        "Living Room": {
            "North": "Laundry Room",
            "East": "Loft",
            "South": "Garage",
            "West": "Kitchen"
        },
        "Laundry Room": {
            "South": "Living Room",
            "Item": "Disinfectant"
        },
        "Kitchen": {
            "East": "Living Room",
            "North": "Dining Room",
            "Item": "Mask"
        },
        "Dining Room": {
            "South": "Kitchen",
            "Item": "Granola"
        },
        "Garage": {
            "North": "Living Room",
            "Item": "Crossbow"
        },
        "Loft": {
            "East": "Bedroom",
            "North": "Master Bedroom",
            "West": "Living Room",
            "Item": "Arrows"
        },
        "Bedroom": {
            "West": "Loft",
            "Item": "Armor"
        },
        "Master Bedroom": {
            "Item": "Zombie"
        }
    }

    # Set the current room and blank inventory
    current_room = "Living Room"
    inventory = []

    # Print the game instructions
    show_instructions()

    # Run the main loop to move between rooms
    while True:
        show_status(current_room, inventory, rooms)

        # Check if player went to room with zombie
        if current_room != "Master Bedroom":
            print("--------------------------")

            # Get the command from the user
            user_input = input("Enter your move:").split()

            # Validate the user's command
            if len(user_input) > 1:
                if user_input[0] == "go":
                    current_room = change_room(user_input[1], current_room, rooms)
                elif user_input[0] == "get":
                    get_item(user_input[1], inventory, current_room, rooms)
                else:
                    print("Invalid Move!")
            else:
                print("Invalid Move!")
        else:
            break

    # If player went to Master Bedroom, see if they won the game or not
    if len(inventory) > 5:
        print("Congratulations! You have collected all items and defeated the zombie!")
    else:
        print("The zombie has infected you..GAME OVER!")

    print("Thanks for playing the game. Hope you enjoyed it!")


main()
