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
    }
}