class Characters {
    constructor(config, combat){
        Object.keys(config).forEach(key => {
           this[key] = config[key];
        });
        this.combat = combat;

    }

    get hpPercentage(){
        const percentage = this.currHp / this.maxHp * 100;
        return percentage > 0 ? percentage : 0;
    }

    get activeCharacter(){
        const activeCharacters = this.combat.activeCharacters[this.user];
        return activeCharacters && activeCharacters.includes(this.id);
    }
    
    createElement(){
        // Hp bar element
        this.hudElement = document.createElement("div");
        this.hudElement.classList.add("Characters");
        this.hudElement.setAttribute("data-character", this.id);
        this.hudElement.setAttribute("data-user", this.user);
        this.hudElement.setAttribute("data-slot", this.slot);
        this.hudElement.innerHTML = (`
        <svg viewBox = "0 0 26 3" class="Character_hp_container">
        <rect x=0 y=0 width="0%" height=1 fill="#82ff71" />
        <rect x=0 y=1 width="0%" height=2 fill="#3ef126" />
        </svg>
        <div class="slotHp">
        <p>${this.slot}</p>
        </div>
        `);

        // Character icon element (gets the src from CharacterDex)
        this.characterElement = document.createElement("img");
        this.characterElement.classList.add("CharIcon");
        this.characterElement.setAttribute("src", this.src);
        this.characterElement.setAttribute("alt", this.name);
        this.characterElement.setAttribute("data-user", this.user);
        this.characterElement.setAttribute("data-slot", this.slot);

        this.hpFill = this.hudElement.querySelectorAll(".Character_hp_container > rect");
    }

    update(changes={}){
        // Update anything that happens
        Object.keys(changes).forEach(key => {
            this[key] = changes[key]           
        });

        // Update active
        this.hudElement.setAttribute("isActive", this.activeCharacter);
        this.characterElement.setAttribute("isActive", this.activeCharacter);
        this.characterElement.setAttribute("isTarget", this.whoTarget)

        // Update Hp
        this.hpFill.forEach(rect => rect.style.width = `${this.hpPercentage}%`);
        // this.hpPercentage <= 20 ? this.hpFill.forEach(rect => rect.style.fill = "Red") : this.hpFill.forEach(rect => rect.style.fill = "#3ef126") ;
    }

    init(container){
        this.createElement();
        container.appendChild(this.hudElement);
        container.appendChild(this.characterElement);
        this.update();
    }
}