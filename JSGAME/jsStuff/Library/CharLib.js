// ease of access for CharacterClass
window.CharacterClass = {
    dmgDealer: "dmgDealer",
    support: "support",
    frontline: "frontline", 
}

// organized access of Characers labled by type of character class d = dmgDealer, s = support, f = frontline
window.CharacterDex = {
    "d01": {
        name: "TBA",
        type: CharacterClass.dmgDealer,
        src: "/Sprites/Placeholder.png",
        attacks: [ "damage01" ],
    },
    "s01":{
        name: "Koomi",
        type: CharacterClass.support,
        src: "/Sprites/Placeholder.png",
        attacks: [ "support01" ],
    },
    "f01":{
        name: "TBA",
        type: CharacterClass.frontline,
        src: "/Sprites/Placeholder.png",
        attacks: [ "frontline01" ],
    }
}