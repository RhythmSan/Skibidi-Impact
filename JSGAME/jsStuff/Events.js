class Events{
    constructor(event, combat){
        this.event = event;
        this.combat = combat;
    }

    textMessage(resolve){

        const text = this.event.text
        .replace("{USER}", this.event.whosTurn?.name)
        .replace("{TARGET}", this.event.target?.name)
        .replace("{ATTACK}", this.event.attack?.name)
        const message = new TextMessage({
            text,
            onComplete: () => {
                resolve();
            }
        })
        message.init(this.combat.element);
    }

    eventCheck(who){
        const {whosTurn, playerTurn, target, damage, heal, shield, reap, onTeam, shieldClear} = this.event;
        if (damage) {
            if(who.shield > 0){
                let shieldBreak = damage - who.shield > 0 ? damage- who.shield : 0;
                console.log(shieldBreak);
                who.update({
                    shield: who.shield - damage,
                    currHp: who.currHp - shieldBreak
                })   
                if (who.shield < 0){
                    who.update({
                        shield: 0
                    })
                }
            }
            else{
                who.update({
                    currHp: who.currHp - damage
                })
            }


            target.characterElement.classList.add("damage-blinker")
        }

        if (heal){
            let newHp = who.currHp + heal;
            who.update({
                currHp: newHp
            })
            if (newHp > who.maxHp){
                who.update({
                    currHp: who.maxHp
                })
            }
            console.log(newHp,who.currHp,who.maxHp)
        }
        if (shield){
            let newShield = who.shield + shield;
            who.update({
                shield: newShield
            })
        }
        if (reap){
            let reap = 20/who.maxHp * who.currHp;
            console.log(reap)
            whosTurn.update({
                currHp: whosTurn.currHp + reap
            })
            if(reap > whosTurn.maxHp){
                whosTurn.update({
                    currHp: whosTurn.maxHp
                })
            }
            if(shield > 0){
                who.update({
                    shield: who.shield - reap
                })
            }
        }
        if(shieldClear){
            who.update({
                shield: 0
            })
        }
    }


    async stateChange(resolve){
        const {whosTurn, playerTurn, target, damage, heal, shield, reap, onTeam} = this.event;
        const who = this.event.onUser ? whosTurn : target
        if (onTeam){
            const currentPlayerCharacters = this.combat.activeCharacters[playerTurn];
            const team = []
            for(const characterId of currentPlayerCharacters){
                team.push(characterId);
            }
            console.log(team)
            team.forEach(key => {
                const who = this.combat.characters[key]
                this.eventCheck(who);
            });
        }
        else{
            this.eventCheck(who)
        }
        

        let newSkillPoint = this.combat.skillPoint[playerTurn] - this.event.attack.skillCost;
        this.combat.skillPoint[playerTurn] = newSkillPoint

        this.combat.updateSkillPointElement(playerTurn);

        console.log(this.combat.skillPoint[playerTurn])
        console.log(this.event.attack.skillCost)
        await utils.wait(500);
        target.characterElement.classList.remove("damage-blinker")

        resolve();
    }

    submissionMenu(resolve){
        const menu = new SubmissionMenu({
            whosTurn: this.event.whosTurn,
            playerTurn: this.event.playerTurn,
            skillPoint: this.event.skillPoint,
            ally: this.event.ally,
            enemy: this.event.enemy,
            onComplete: submission => {
                resolve(submission);
            }

        })
        menu.init(this.combat.element);
    }

    animation(resolve){
        const func = BattleAnims[this.event.animation];
        func(this.event, resolve);
    }
    
    init(resolve){  
        this[this.event.type](resolve);
    }
}