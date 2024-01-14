class TextMessage{
    constructor({ text, onComplete}){
        this.text = text;
        this.onComplete = onComplete;
        this.element = null;
    }

    createElement(){
        this.element = document.createElement("div");
        this.element.classList.add("TextMessage");

        this.element.innerHTML = (`
            <p class="TestMessage_para">${this.text}</p>
            <button class="TextMessage_btn">Next</button>
        `)
        this.element.querySelector("button").addEventListener("click", () => {
            this.Finish();
        });
    }  

    Finish(){
        this.element.remove();
        this.onComplete();
    }

    init(container){
        this.createElement();
        container.appendChild(this.element);
    }
}