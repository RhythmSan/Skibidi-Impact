class CyclesHandler {
    constructor({ combat, onNewEvent }){
        this.combat = combat;
        this.onNewEvent = onNewEvent;
        this.currentTurn = "player_1"
    }

    get skillPoint(){
       return this.combat.skillPoint[this.currentTurn];
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
                // submits an action with the key of the enemy
            const submission = await this.onNewEvent({
                type: "submissionMenu",
                whosTurn,
                skillPoint: this.skillPoint,
                playerTurn: this.currentTurn,
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
                    playerTurn: this.currentTurn,
                    target,
                }
                // console.log(events);
                console.log(target); 
                console.log("start")
                await this.onNewEvent(events);
                console.log("Stop")
            }
            console.log(target.currHp); 
            const targetIsDead = target.currHp <= 0;
            if (targetIsDead){
                console.log(target.id)
                console.log(target.name + " Is dead!")

                const indexOfTarget = enemyCharacters.indexOf(target.id);
                if (indexOfTarget !== -1){
                    enemyCharacters.splice(indexOfTarget, 1);
                    console.log(enemyCharacters)
                    target.update();
                }
            }


            const winner = this.getWinner();
            if (winner){
                
                await this.onNewEvent({
                    type: "textMessage",
                    text: winner === "player_1"? "player 1 is the WINNER!" : "player 2 is the WINNER!"
                })

            // Win condition here => todo // send into home screen => todo
                return;
            }
        }
        // switches to next player
        /// add a way for players to get skill point after each turn
        let skillPointIncome = this.skillPoint + 3 <= 5? this.skillPoint + 3 : 5;
        this.combat.skillPoint[this.currentTurn] = skillPointIncome;
        this.combat.updateSkillPointElement(this.currentTurn);
        console.log(this.skillPoint);
        /// add a way for players to stop using skill point if they dont have enough skill point
        this.currentTurn = this.currentTurn === "player_1" ? "player_2" : "player_1";
        await this.onNewEvent({
            type: "textMessage",
            text: this.currentTurn === "player_1" ? "it is player 1's turn now!" : "it is player 2's turn now!"
        })
        console.log("switched")
        await this.turn();
        
    }
    getWinner(){
        let aliveTeam = {};
        Object.values(this.combat.characters).forEach(c => {
            if (c.currHp > 0){
                aliveTeam[c.user] = true;
            }
        })
        console.log(aliveTeam);
        if (!aliveTeam["player_1"]) { return "player_2"};
        if (!aliveTeam["player_2"]) { return "player_1"};
        return null;
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