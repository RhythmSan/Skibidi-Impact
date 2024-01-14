class Combat{
    constructor(){
        //Character create
        this.characters = {
            "character1": new Characters({
                ...CharacterDex.s01,
                user: "player_1",
                slot: "first",
                maxHp: 100,
                currHp: 100,
                debuff: null
            }, this),
            "character2": new Characters({
                ...CharacterDex.f01,
                user: "player_2",
                slot: "first",
                maxHp: 100,
                currHp: 100,
                debuff: null
            }, this),
            "character3": new Characters({
                ...CharacterDex.d01,
                user: "player_2",
                slot: "second",
                maxHp: 100,
                currHp: 100,
                debuff: null
            }, this)
        }
        //Which character is on field
        this.activeCharacters = {
            player_1: "character1",
            player_2: "character2"
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