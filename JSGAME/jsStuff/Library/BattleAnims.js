window.BattleAnims = {
    async lunge(event, onComplete) {
        const element = event.whosTurn.characterElement;
        const animClassName = event.whosTurn.user === "player_1" ? "lunge-right" : "lunge-left";
        element.classList.add(animClassName);

        element.addEventListener("animationend", () => {
            element.classList.remove(animClassName);
        }, {once:true});

        await utils.wait(100);
        onComplete();
    },
    async bash(event, onComplete) {
        const element = event.whosTurn.characterElement;
        const animClassName = event.whosTurn.user === "player_1" ? "bash-right" : "bash-left";
        element.classList.add(animClassName);

        element.addEventListener("animationend", () => {
            element.classList.remove(animClassName);
        }, {once:true});

        await utils.wait(100);
        onComplete();
    },
    async shoot(event, onComplete) {
        const element = event.whosTurn.characterElement;
        const animClassName = event.whosTurn.user === "player_1" ? "shoot-right" : "shoot-left";
        element.classList.add(animClassName);

        element.addEventListener("animationend", () => {
            element.classList.remove(animClassName);
        }, {once:true});

        await utils.wait(100);
        onComplete();
    },
    async orb(event, onComplete){
        const {whosTurn} = event;
        let div = document.createElement("div");
        div.classList.add("orb")
        div.classList.add(whosTurn.user === "player_1" ? "orb-right" : "orb-left");

        div.innerHTML = (`
            <svg viewBox="0 0 64 64" width="64" height="64">
                <circle cx="32" cy="32" r="32" fill="${event.color}" />
            </svg>
        `)

        div.addEventListener("animationend", () => {
            div.remove();
        });
        document.querySelector(".Combat").appendChild(div);

        await utils.wait(820);
        onComplete();
    }
}