window.Attacks = {
    damage01: {
        name: "Lunge",
        description: "Lunges at the opponenent, requires 1 skill point",
        skillCost: 3,
        success: [
            { type: "textMessage" , text: "{USER} Uses {ATTACK}"},
            { type: "animation", animation: "lunge"},
            { type: "stateChange", damage: 15}
        ]
    },
    support01: {
        name: "Heal",
        description: "Heals the target, requires 2 skill point",
        skillCost: 3,
        success: [
            { type: "textMessage", text: "{USER} Uses {ATTACK}"},
            { type: "stateChange", heal: 10}
            
        ]
    },
    support02: {
        name: "All Heal",
        description: "Heals the target, requires 4 skill point",
        skillCost: 4,
        success: [
            { type: "textMessage", text: "{USER} Uses {ATTACK}"},
            { type: "stateChange", heal: 15, onTeam: true}
            
        ]
    },
    frontline01: {
        name: "Shield",
        description: "Shields the user, requires 3 skill point",
        skillCost: 3,
        success: [
            { type: "textMessage", text: "{USER} Uses {ATTACK}"},
            { type: "stateChange", shield: 10, onUser: true, shielded: true}   
        ]
    },
}