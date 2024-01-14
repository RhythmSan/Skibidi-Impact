window.Attacks = {
    damage01: {
        name: "Lunge",
        skillCost: 1,
        success: [
            { type: "textMessage" , text: "{USER} Uses {ATTACK}"},
            { type: "animation", animation: "lunge"},
            { type: "stateChange", damage: 10}
        ]
    },
    support01: {
        name: "Heal",
        skillCost: 3,
        success: [
            { type: "textMessage", text: "{USER} Uses {ATTACK}"},
            { type: "stateChange", damage: -10}
            
        ]
    }   
}