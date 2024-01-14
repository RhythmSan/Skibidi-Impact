class CyclesHandler {
    constructor({ combat, onNewEvent }){
        this.combat = combat;
        this.onNewEvent = onNewEvent;
        this.currentTurn = "player_1"
        this.skillPoint = this.combat.skillPoint[this.currentTurn]
    }

    async turn(){
        //gets the Players active characters
        const currentPlayerCharacters = this.combat.activeCharacters[this.currentTurn];
        
        // loops through each active characters of player on field before cycling to the next player
        for(const characterId of currentPlayerCharacters){
            const whosTurn = this.combat.characters[characterId];

            const enemyPlayer = whosTurn.user === "player_1" ? "player_2" : "player_1";
            const enemyCharacters = this.combat.activeCharacters[enemyPlayer];

            console.log(enemyCharacters)
            console.log(currentPlayerCharacters);
            console.log(this.skillPoint);
                // submits an action with the key of the enemy
            const submission = await this.onNewEvent({
                type: "submissionMenu",
                whosTurn,
                skillPoint: this.skillPoint,
                // allyTeam: currentPlayerCharacters,
                // enemyTeam: enemyCharacters,
                ally: currentPlayerCharacters,
                enemy: enemyCharacters,

            })

            // Sends the result of the submission
            const target = this.combat.characters[submission.target] || this.combat.characters[enemyCharacters[0]];
            console.log(submission.target)
            console.log(target);
            const eventResults = submission.attack.success;
            for (let i=0; i<eventResults.length; i++){
                const events = {
                    ...eventResults[i],
                    submission,
                    attack: submission.attack,
                    whosTurn,
                    target,
                }
                // console.log(events);
                console.log(target); 
                console.log("start")
                await this.onNewEvent(events);
                console.log("Stop")
            }
        }
        // switches to next player
        this.currentTurn = this.currentTurn === "player_1" ? "player_2" : "player_1";
        await this.onNewEvent({
            type: "textMessage",
            text: this.currentTurn === "player_1" ? "it is player 1's turn now!" : "it is player 2's turn now!"
        })
        console.log("switched")
        await this.turn();
        
    }

    
    async init() {
        // await this.onNewEvent({
        //     type: "textMessage",
        //     text: "The fight begins!"
        // })
        //start turn counting

        this.turn();
    }
}