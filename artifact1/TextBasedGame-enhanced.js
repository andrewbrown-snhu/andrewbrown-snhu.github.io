// Andrew Brown
// September 22, 2024
// Version 2.0.0
// The game consists of moving to different rooms and gather all the items to defect a zombie in one of the rooms. If all items are gathered once entering the room with the zombie, then you win!
// 

// Import the readline module from node 
const readline = require('node:readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Define the rooms, items, and directions the player can move to
const rooms = {
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
};

// Set the current room and blank inventory
let current_room = "Living Room";
const inventory = [];

// Prints the beginning game instructions
function show_instructions() {
    let instructions = "Zombie Text Adventure Game\n\n" +
                   "Collect 6 items to win the game, or be infected by the zombie.\n" +
                   "Move commands: go South, go North, go East, go West\n" +
                   "Add to Inventory: get 'item name'";
    console.log(instructions);
}

/* 
 * Prints current room, inventory and items in the room
 * @param current_room - the current room the user is in
 * @param inventory - the inventory array
 * @param rooms - the rooms array
 */
function show_status(current_room, inventory, rooms) {
    console.log("\nYou are in the " + current_room);
    console.log("Inventory : " + inventory.join(', '));

    if (rooms[current_room].Item &&
        !inventory.includes(rooms[current_room].Item)) {
        console.log("You see a " + rooms[current_room].Item);
    }
}


/*
 * Verifies room exists and changes to that room if it does
 * @param direction - the requested direction
 * @param current_room - the current room the user is in
 * @param rooms - the rooms array
 * 
 * @returns current_room - the new room
 */
function change_room(direction, current_room, rooms) {
    if (rooms[current_room][direction]) {
        current_room = rooms[current_room][direction];
    } else {
        console.log("You can't go that way!");
    }

    return current_room;
}
    
/*
 * Verifies item can be retrieved and adds to inventory if it can
 * @param item - the item to retrieve
 * @param inventory - the inventory array
 * @param current_room - the current room the user is in
 * @param rooms - the rooms array
 */
function get_item(item, inventory, current_room, rooms) {
    if (rooms[current_room].Item &&
            rooms[current_room].Item == item &&
            !inventory.includes(rooms[current_room].Item)) {
        inventory.push(rooms[current_room].Item);
        console.log(rooms[current_room].Item + " retrieved");
    }
    else {
        console.log("Can't get " + item);
    }   
}

/*
 * Waits for input from the user
 */
async function get_input() {
    return new Promise(resolve => {
        rl.question("Enter your move:", (input) => {
            let user_input = input.split(' ');
            // Validate the user's command
            if (user_input.length > 1) {
                if (user_input[0] == "go") {
                    current_room = change_room(user_input[1], current_room, rooms);
                } else if (user_input[0] == "get") {
                    get_item(user_input[1], inventory, current_room, rooms);
                } else {
                    console.log("Invalid Move!");
                }
            } else {
                console.log("Invalid Move!");
            }

            resolve();
        });
    });
}

/*
 * Starts the main loop for the program
 */
async function main() {
    // Print the game instructions
    show_instructions();
    
    // Run the main loop to move between rooms
    while (true) {
        show_status(current_room, inventory, rooms);

        // Check if player went to room with zombie
        if (current_room != "Master Bedroom") {
            console.log("--------------------------");
            await get_input();
        } else {
            break;
        }
    }

    rl.close();

    // If player went to Master Bedroom, see if they won the game or not
    if (inventory.length > 5) {
        console.log("Congratulations! You have collected all items and defeated the zombie!")
    } else {
        console.log("The zombie has infected you..GAME OVER!")
    }

    console.log("Thanks for playing the game. Hope you enjoyed it!")
}

// Call the main method
main();
