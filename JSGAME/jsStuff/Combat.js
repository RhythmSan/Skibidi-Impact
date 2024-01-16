class Combat{
    constructor(){
        //Character create
        this.characters = {
            "character1": new Characters({
                ...CharacterDex.s01,
                user: "player_2",
                slot: "first",
                maxHp: 100,
                currHp: 100,
                debuff: null
            }, this),
            "character2": new Characters({
                ...CharacterDex.f01,
                user: "player_1",
                slot: "first",
                maxHp: 100,
                currHp: 100,
                shield: 0,
                debuff: null
            }, this),
            "character3": new Characters({
                ...CharacterDex.d01,
                user: "player_1",
                slot: "second",
                maxHp: 100,
                currHp: 100,
                debuff: null
            }, this),
            "character4": new Characters({
                ...CharacterDex.d01,
                user: "player_2",
                slot: "third",
                maxHp: 100,
                currHp: 100,
                debuff: null
            }, this),
            "character6": new Characters({
                ...CharacterDex.d01,
                user: "player_2",
                slot: "second",
                maxHp: 100,
                currHp: 100,
                debuff: null
            }, this),
            "character7": new Characters({
                ...CharacterDex.d01,
                user: "player_1",
                slot: "third",
                maxHp: 100,
                currHp: 100,
                debuff: null
            }, this),
        }
        //Which character is on field
        this.activeCharacters = {
            player_1: ["character2", "character3", "character7"],
            player_2: ["character1", "character6", "character4"]
        }
        this.skillPoint = {
            player_1: 5,
            player_2: 5
        }
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