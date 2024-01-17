class Combat{
    constructor(){
        this.numPlayers = 2;
        //Character create
        this.characters = {

        }
        //Which character is on field
        this.activeCharacters = {
            player_1: [],
            player_2: []
        }
        this.skillPoint = {
            player_1: 5,
            player_2: 5
        }
    }

    getPlayerNumber() {
        // Determine the player number dynamically based on the existing players
        console.log(this.activeCharacters)
        return this.activeCharacters["player_1"].length < 3 ? 1 : 2
    }

    getNextAvailableSlot(playerNumber) {
        // Determine the next available slot for the new character
        const playerKey = `player_${playerNumber}`;
        const slots = ["first", "second", "third"]; // Customize based on your requirements
        const occupiedSlots = this.activeCharacters[playerKey].map(characterId => this.characters[characterId].slot);

        for (const slot of slots) {
            if (!occupiedSlots.includes(slot)) {
                return slot;
            }
        }

        return null; // No available slot found
    }

    getActiveCharacterLength(playerNumber){
        return this.activeCharacters[`player_${playerNumber}`].length + 1;
    }

    updateSkillPointElement(player) {
        const skillPointElement = this.element.querySelector(`.skill_Points${player === "player_1" ? '1' : '2'} .skillPoint`);
        if (skillPointElement) {
            skillPointElement.innerHTML = this.skillPoint[player];
        }
    }

    createElement(){
        // User element
        this.element = document.createElement("div");
        this.element.classList.add("Combat");
        this.element.innerHTML = (`
        <div class="combat_Player1">
            <img src="${'/Sprites/Placeholder.png'}" alt="Player1">
        </div>
        <div class="combat_Player2">
            <img src="${'/Sprites/Placeholder2.png'}" alt="Player2">
        </div>
        <div class="skill_Points1">
            <p class="skillPoint">${this.skillPoint["player_1"]}</p>
        </div>
        <div class="skill_Points2">
            <p class="skillPoint">${this.skillPoint["player_2"]}</p>
        </div>
        `); 
    }

    init(container){
        this.createElement();
        container.appendChild(this.element);

        Object.keys(this.characters).forEach(key => {
            let character = this.characters[key];
            character.id = key;
            character.init(this.element);
        });

        // create a turn cycle
        this.cyclesHandler = new CyclesHandler({
            combat: this,
            onNewEvent: event => {
                // call the message event
                return new Promise(resolve => {
                    const events = new Events(event, this);
                    events.init(resolve);
                })
            }
        })
        this.cyclesHandler.init();
        
    }
}