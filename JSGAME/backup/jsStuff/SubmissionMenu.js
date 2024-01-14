class SubmissionMenu{
    constructor({ whosTurn, enemy, onComplete}){
        this.whosTurn = whosTurn;
        this.enemy = enemy;
        this.onComplete = onComplete;
    }
    getPages(){

        const backOption = {
            label: "Back",
            description: "Go back to previous page",
            handler: () => {
                this.keyboardMenu.setOptions(this.getPages().root);
            }
        }
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
                            this.menuSubmit(attack);
                        }
                    }
                }), 
                backOption       
        ]
            
        }
    }
    decide(){
        this.onComplete({
            attack: Attacks[ this.whosTurn.attacks[0]],
            target: this.enemy
        })
    }

    menuSubmit(attack){

        this.keyboardMenu.end();

        this.onComplete({
            attack: Attacks[ this.whosTurn.attacks[0]],
            target: this.enemy
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