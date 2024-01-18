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
            { type: "stateChange", damage: 17}
        ]
    },
    damage04: {
        name: "Blade of Sus",
        description: "Slash the opponenent with your Susword, requires 4 skill point",
        skillCost: 4,
        success: [
            { type: "textMessage" , text: "{USER} Uses {ATTACK}"},
            { type: "animation", animation: "lunge"},
            { type: "stateChange", damage: 37.5}
        ]
    },
    damage05: {
        name: "Full Auto",
        description: "Dump your mag into you opponent, requires 3 skill point",
        skillCost: 3,
        success: [
            { type: "textMessage" , text: "{USER} Uses {ATTACK}"},
            { type: "animation", animation: "shoot"},
            { type: "stateChange", damage: 25}
        ]
    },
    damage06: {
        name: "Stab",
        description: "Stab your opponent, requires 0 skill point",
        skillCost: 0,
        success: [
            { type: "textMessage" , text: "{USER} Uses {ATTACK}"},
            { type: "animation", animation: "bash"},
            { type: "stateChange", damage: 5}
        ]
    },
    damage07: {
        name: "Soul Reap",
        description: "Steal the soul of your enemies (Hp regen, does more shield dmg), requires 3 skill point",
        skillCost: 3,
        success: [
            { type: "textMessage" , text: "{USER} Uses {ATTACK}"},
            { type: "animation", animation: "bash"},
            { type: "stateChange", damage: 15, reap: true}
        ]
    },
    support01: {
        name: "Heal",
        description: "Heals the target, requires 2 skill point",
        skillCost: 2,
        success: [
            { type: "textMessage", text: "{USER} Uses {ATTACK}"},
            { type: "animation", animation: "orb", color: "lightyellow"},
            { type: "stateChange", heal: 15}
            
        ]
    },
    support02: {
        name: "Full Heal",
        description: "Heals the target to full, requires 5 skill point",
        skillCost: 5,
        success: [
            { type: "textMessage", text: "{USER} Uses {ATTACK}"},
            { type: "animation", animation: "orb", color: "yellow"},
            { type: "stateChange", heal: 100, onTeam: true}
            
        ]
    },  
        support03: {
        name: "Sustain",
        description: "Sustain yourself, requires 0 skill point (applies on the User)",
        skillCost: 0,
        success: [
            { type: "textMessage", text: "{USER} Uses {ATTACK}"},
            { type: "animation", animation: "orb", color: "lightgreen"},
            { type: "stateChange", heal: 8, onUser: true}
            
        ]
    },
    support04: {
        name: "Shield Clear",
        description: "Clears the target shield, requires 3 skill point",
        skillCost: 3,
        success: [
            { type: "textMessage", text: "{USER} Uses {ATTACK}"},
            { type: "animation", animation: "orb", color: "white"},
            { type: "stateChange", shieldClear: true}
            
        ]
    },
    frontline01: {
        name: "Shield",
        description: "Shields the user, requires 1 skill point (applies on the User)",
        skillCost: 1,
        success: [
            { type: "textMessage", text: "{USER} Uses {ATTACK}"},
            { type: "animation", animation: "orb", color: "lightblue"},
            { type: "stateChange", shield: 8, onUser: true, shielded: true}   
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
    frontline03: {
        name: "In the Name of Landau",
        description: "In the name of Landau! (applies to team) requires 4 skill point",
        skillCost: 4,
        success: [
            { type: "textMessage", text: "{USER} Uses {ATTACK}"},
            { type: "animation", animation: "orb", color: "blue"},
            { type: "stateChange", shield: 30, shielded: true, onTeam: true}   
        ]
    },
}