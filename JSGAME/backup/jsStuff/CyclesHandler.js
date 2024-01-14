class CyclesHandler {
    constructor({ combat, onNewEvent }){
        this.combat = combat;
        this.onNewEvent = onNewEvent;
        this.currentTurn = "player_1"
    }

    async turn(){
        const whosTurnId = this.combat.activeCharacters[this.currentTurn];
        const whosTurn = this.combat.characters[whosTurnId];
        const enemyId = this.combat.activeCharacters[whosTurn.user === "player_1" ? "player_2" : "player_1"]
        const enemy = this.combat.characters[enemyId];

        const submission = await this.onNewEvent({
            type: "submissionMenu",
            whosTurn,
            enemy
        })

        const eventResults = submission.attack.success;
        for (let i=0; i<eventResults.length; i++){
            const events = {
                ...eventResults[i],
                submission,
                attack: submission.attack,
                whosTurn,
                target: submission.target
            }
            await this.onNewEvent(events);
        }

        this.currentTurn = this.currentTurn === "player_1" ? "player_2" : "player_1";
        this.turn();
        
    }
    async init() {
        await this.onNewEvent({
            type: "textMessage",
            text: "The fight begins!"
        })
        //start turn counting

        this.turn();
    }
}