class SubmissionMenu{
    constructor({ whosTurn, enemy, skillPoint, playerTurn, ally, onComplete}){
        this.whosTurn = whosTurn;
        this.enemy = enemy;
        this.skillPoint = skillPoint;
        this.playerTurn = playerTurn;
        this.ally = ally;
        this.onComplete = onComplete;
        this.targetCharacter;
    }

    getPages(){

        const backOption = {
            label: "Back",
            description: "Go back to previous page",
            handler: () => {
                this.keyboardMenu.setOptions(this.getPages().root);
            }
        }
        const targetOptionsEnemy = Object.keys(this.enemy).map(key => {
            const who = "enemy";
            return{
                label: key === "0" ? "First" : key === "1" ? "Second" : "Third",
                description: key === "0" ? "First" : key === "1" ? "Second" : "Third",
                handler: () =>{
                    this.handleTargetClick(key, who);
                }   
            }
        });
        const targetOptionsAlly = Object.keys(this.ally).map(key => {
            const who = "ally";
            return{             
                label: key === "0" ? "First" : key === "1" ? "Second" : "Third",
                description: key === "0" ? "First" : key === "1" ? "Second" : "Third",
                handler: () =>{
                    this.handleTargetClick(key, who);
                }   
            }
        })
        return{
            root: [{
                label: "Attack",
                description: "Choose an attack!",
                handler: () =>{
                    this.keyboardMenu.setOptions( this.getPages().attacks);
                }
            },
            {
                label: "Target",
                description: "Choose your target! (Some skills has it's own set target)",
                handler: () =>{
                    this.keyboardMenu.setOptions( this.getPages().targets)
                }
            },
        ],

            attacks: [
                ...this.whosTurn.attacks.map(key => {
                    const attack = Attacks[key];
                    return{
                        label: attack.name,
                        description: attack.description,
                        handler: () => {
                            if (this.skillPoint < attack.skillCost){
                                this.keyboardMenu.unusableSkill();
                            }
                            else{
                                console.log(this.whosTurn, attack, this.enemy, this.skillPoint)
                                this.menuSubmit(attack);
                            }
                        }
                    }
                }), 
                backOption       
            ],

            targets: [{
                label: "Allies",
                description: "Choose an Ally!",
                handler: () =>{
                    this.keyboardMenu.setOptions( this.getPages().targetAlly);
                }
            },
            {
                label: "Enemies",
                description: "Choose an Enemy",
                handler: () =>{
                    this.keyboardMenu.setOptions( this.getPages().targetEnemy);
                }
            },
                backOption,
            ],

            targetEnemy: [
                ...targetOptionsEnemy,
                backOption
            ],
            targetAlly: [
                ...targetOptionsAlly,
                backOption
            ]
        }
    }  

    handleTargetClick(targetKey, target){
        console.log(`Clicked on target: ${targetKey}`);
        target === "enemy" ? this.targetCharacter  = this.enemy[targetKey] : this.targetCharacter = this.ally[targetKey]
        console.log(this.targetCharacter);
    }

    menuSubmit(attack){

        this.keyboardMenu?.end();

        console.log(this.skillPoint);
        console.log(attack.skillCost);
        this.onComplete({
            attack,
            target: this.targetCharacter,
        })
    }

    showMenu(container){
        this.keyboardMenu = new KeyboardMenu();
        this.keyboardMenu.init(container);
        this.keyboardMenu.setOptions( this.getPages().root)
    }    

    init(container){
        this.showMenu(container);
    }
}