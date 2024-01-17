window.Attacks = {
    damage01: {
        name: "Lunge",
        description: "Lunges at the opponenent, requires 0 skill point",
        skillCost: 0,
        success: [
            { type: "textMessage" , text: "{USER} Uses {ATTACK}"},
            { type: "animation", animation: "lunge"},
            { type: "stateChange", damage: 8}
        ]
    },
    damage02: {
        name: "Slash",
        description: "Slashes the opponenent, requires 1 skill point",
        skillCost: 1,
        success: [
            { type: "textMessage" , text: "{USER} Uses {ATTACK}"},
            { type: "animation", animation: "lunge"},
            { type: "stateChange", damage: 16}
        ]
    },
    damage03: {
        name: "Shoot",
        description: "Shoots the opponenent, requires 1 skill point",
        skillCost: 1,
        success: [
            { type: "textMessage" , text: "{USER} Uses {ATTACK}"},
            { type: "animation", animation: "shoot"},
            { type: "stateChange", damage: 12}
        ]
    },
    support01: {
        name: "Heal",
        description: "Heals the target, requires 2 skill point",
        skillCost: 2,
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
        support03: {
        name: "Sustain",
        description: "Sustain yourself, requires 0 skill point (applies on the User)",
        skillCost: 0,
        success: [
            { type: "textMessage", text: "{USER} Uses {ATTACK}"},
            { type: "stateChange", heal: 5, onUser: true}
            
        ]
    },
    frontline01: {
        name: "Shield",
        description: "Shields the user, requires 3 skill point (applies on the User)",
        skillCost: 3,
        success: [
            { type: "textMessage", text: "{USER} Uses {ATTACK}"},
            { type: "stateChange", shield: 10, onUser: true, shielded: true}   
        ]
    },
    frontline02: {
        name: "Shield Bash",
        description: "Bashes the enemy, requires 0 skill point",
        skillCost: 0,
        success: [
            { type: "textMessage", text: "{USER} Uses {ATTACK}"},
            { type: "animation", animation: "bash"},
            { type: "stateChange", damage: 4}   
        ]
    },
}