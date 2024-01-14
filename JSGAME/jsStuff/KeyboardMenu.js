class KeyboardMenu{
    constructor(){
        this.options = [];
        this.up = null;
        this.down = null;
        this.prevFocus = null;
    }

    setOptions(options){
        this.options = options;
        this.element.innerHTML = this.options.map((option,index) => {
            return(`
            <div class="option">
                <button data-button="${index}" data-description="${option.description}">
                    ${option.label}
                </button>
                <span class="right">${option.right ? option.right() : ""}</span>
            </div>
            `)
        }).join("");

        this.element.querySelectorAll("button").forEach(button => {
            
            button.addEventListener("click", () =>{
                const selectedOption = this.options[ Number(button.dataset.button) ];
                selectedOption.handler();
            });
            button.addEventListener("mouseenter", () => {button.focus();});
            button.addEventListener("focus", () => {
                this.prevFocus = button;
                this.descriptionElementText.innerText = button.dataset.description;
            });
        })

    }

    end(){
        this.element.remove();
        this.descriptionElement.remove();
    }

    createElement(){
        this.element = document.createElement("div");
        this.element.classList.add("KeyboardMenu");

        this.descriptionElement = document.createElement("div");
        this.descriptionElement.classList.add("descriptionContainer");
        this.descriptionElement.innerHTML = (`<p></p>`);
        this.descriptionElementText = this.descriptionElement.querySelector("p");
    }

    init(container){
        this.createElement();
        container.appendChild(this.descriptionElement);
        container.appendChild(this.element);
    }
}