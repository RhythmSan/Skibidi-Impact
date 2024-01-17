class CharacterPicker {
    constructor(characterDex, onSelect, onSubmit) {
        this.characterDex = characterDex;
        this.onSelect = onSelect;
        this.onSubmit = onSubmit;
        this.createPicker();
        this.gameContainer = document.querySelector('.game-container');
        this.chosenCharacters = {
            player_1: 0,
            player_2: 0
        };

        this.totalPlayers = 2;
    }

    selectCharacter(characterId) {
        if (this.onSelect) {
            this.onSelect(characterId);
        }
    }

         
    submitSelection() {
        const selectedCharacterId = this.selectedCharacterId;
        if (this.onSubmit && selectedCharacterId) {
            // Call the onSubmit callback
            this.onSubmit(selectedCharacterId);
    
            // Create an instance of the Combat class
            if (!this.combat) {
                this.combat = new Combat();
            }
    
            const combat = this.combat;
    
            // Add selected character to the Combat class
            const selectedCharacter = CharacterDex[selectedCharacterId];
            const playerNumber = combat.getPlayerNumber(); // You need to implement this method in the Combat class
            const slot = combat.getNextAvailableSlot(playerNumber);
            this.chosenCharacters[`player_${playerNumber}`]++;
            
            const characterNumber = combat.getActiveCharacterLength(playerNumber);
            const characterIds = `character${Object.keys(combat.characters).length + 1}`;
            // Create a new Characters instance and add it to the combat.characters and activeCharacters
            combat.characters[characterIds] = new Characters({
                ...selectedCharacter,
                user: `player_${playerNumber}`,
                slot,
                maxHp: 100,
                currHp: 100,
                debuff: null
            }, combat);
            

            combat.activeCharacters[`player_${playerNumber}`].push(characterIds);

            console.log(combat.activeCharacters[`player_${playerNumber}`]);
            console.log(this.chosenCharacters);
            console.log(Object.keys(combat.activeCharacters[`player_${playerNumber}`]).length);
            console.log(characterIds);
            console.log(characterNumber)
            console.log(playerNumber)

            displaySubmittedCharacter(selectedCharacterId, slot, `player_${playerNumber}`);


            // combat.init(this.gameContainer);
            // Initialize the Combat class and append it to the game container
            if (
                this.chosenCharacters.player_1 === 3 &&
                this.chosenCharacters.player_2 === 3
            ) {
                // Initialize the Combat class only when both players have chosen three characters each
                combat.init(this.gameContainer);

                // Remove the character picker container from the document
                const pickerContainer = document.querySelector('.character-picker-container');
                const existingDisplay = document.querySelector(".selected-character-display");
                const playerLabel = document.querySelector('.playerLabel_1');
                const playerLabel_2 = document.querySelector('.playerLabel_2');
                const displayElement = document.querySelectorAll('.submitted-character-display')
                if (pickerContainer) {
                    pickerContainer.remove();
                }
                if(existingDisplay){
                    existingDisplay.remove();
                }
                if(playerLabel){
                    playerLabel.remove();
                }
                if(playerLabel_2){
                    playerLabel_2.remove();
                }
                displayElement.forEach(displayElement => {
                    displayElement.remove()
                })
            }
        }
    }
    createPicker() {
        // Create the character picker container
        const pickerContainer = document.createElement("div");
        pickerContainer.classList.add("character-picker-container");

        // Create the character picker element
        const pickerElement = document.createElement("div");
        pickerElement.classList.add("character-picker");            

        const playerLabel = document.createElement("div");

        playerLabel.classList.add('playerLabel_1');
        playerLabel.innerHTML = (
            `        
            <div class="player_1">
                <p class="player">Player 1</p>
            </div>
            `
        )        
        const playerLabel_2 = document.createElement("div");

        playerLabel_2.classList.add('playerLabel_2');
        playerLabel_2.innerHTML = (
            `
            <div class="player_2">
                <p class="player">Player 2</p>
            </div>
             `
        )

        Object.keys(this.characterDex).forEach(characterId => {
            const character = this.characterDex[characterId];

            const characterButton = document.createElement("button");
            characterButton.classList.add("character-button");

            const characterImage = document.createElement("img");
            characterImage.src = character.src;
            characterImage.alt = character.name;

            characterButton.appendChild(characterImage);

            const characterName = document.createElement("span");
            characterName.textContent = character.name;

            characterButton.appendChild(characterName);

            characterButton.addEventListener("click", () => {
                this.selectCharacter(characterId);
                this.selectedCharacterId = characterId;
            });

            pickerElement.appendChild(characterButton);
        });

        // Create the submit button
        const submitButton = document.createElement("button");
        submitButton.textContent = "Submit";
        submitButton.classList.add("submit-button"); // Add this line
        submitButton.addEventListener("click", () => this.submitSelection());
        
        pickerContainer.appendChild(pickerElement);
        pickerContainer.appendChild(submitButton);

        document.body.appendChild(pickerContainer);
        document.body.appendChild(playerLabel);
        document.body.appendChild(playerLabel_2);
    }
}

const characterPicker = new CharacterPicker(CharacterDex, selectedCharacterId => {
    console.log(`Selected Character: ${selectedCharacterId}`);
    // Add logic to handle the selected character as needed

    // Display the selected character's icon on top
    const selectedCharacter = CharacterDex[selectedCharacterId];
    displaySelectedCharacterIcon(selectedCharacter.src);
}, selectedCharacterId => {
    console.log(`Submitted Character ID: ${selectedCharacterId}`);
});

function displaySelectedCharacterIcon(iconSrc) {
    // Remove any existing display
    const existingDisplay = document.querySelector(".selected-character-display");
    if (existingDisplay) {
        existingDisplay.remove();
    }

    // Create a new display for the selected character's icon
        // Create a new display for the selected character's icon
        const displayElement = document.createElement("div");
        displayElement.classList.add("selected-character-display");

        const iconImage = document.createElement("img");
        iconImage.src = iconSrc;
        iconImage.alt = "Selected Character";

        displayElement.appendChild(iconImage);
    document.body.appendChild(displayElement);
}

function displaySubmittedCharacter(characterId, slot, user) {
    const submittedCharacter = CharacterDex[characterId];

    const displayElement = document.createElement("div");
    displayElement.classList.add("submitted-character-display");
    displayElement.setAttribute("data-slot", slot);
    displayElement.setAttribute("data-user", user);

    const iconImage = document.createElement("img");
    iconImage.src = submittedCharacter.src;
    iconImage.alt = "Submitted Character";
    
    displayElement.appendChild(iconImage);
    document.body.appendChild(displayElement);
}