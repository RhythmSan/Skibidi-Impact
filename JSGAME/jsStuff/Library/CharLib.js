// ease of access for CharacterClass
window.CharacterClass = {
    dmgDealer: "dmgDealer",
    support: "support",
    frontline: "frontline", 
}

// organized access of Characers labled by type of character class d = dmgDealer, s = support, f = frontline
window.CharacterDex = {
    "d01": {
        name: "Karl",
        type: CharacterClass.dmgDealer,
        src: "/Sprites/d01.png",
        attacks: [ "damage01", "damage03","damage05" ],
    },
    "d02": {
        name: "Wither",
        type: CharacterClass.dmgDealer,
        src: "/Sprites/d02.png",
        attacks: [ "damage06", "damage02","damage07" ],
    },
    "s01":{
        name: "Koomi",
        type: CharacterClass.support,
        src: "/Sprites/s01.png",
        attacks: [ "support01", "support03", "support02" ],
    },
    "s02":{
        name: "Gandice",
        type: CharacterClass.support,
        src: "/Sprites/s02.png",
        attacks: [ "support01", "support03", "support04" ],
    },
    "f01":{
        name: "Billow",
        type: CharacterClass.frontline,
        src: "/Sprites/f01.png",
        attacks: [ "frontline01", "frontline02", "frontline03" ],
    },
    "f02":{
        name: "Fernando",
        type: CharacterClass.frontline,
        src: "/Sprites/f02.png",
        attacks: [ "frontline01", "frontline02", "damage04","damage02" ],
    }
}