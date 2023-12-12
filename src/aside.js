class Aside extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.render();
    }

    connectedCallback() {
        document.addEventListener('hide-aside', (event => {
            this.toggleAside();
        }));
    };

    render() {

        this.shadow.innerHTML = 
        /*html*/
        `
        <style>
            aside{
                background-color: hsl(0, 0%, 0%);
                max-width: 235px;
                min-width: 235px;
                height:100%;
                transition:all 0.5s;
                overflow:hidden;
            }

            aside.active{
                min-width:0;
                max-width:0;
                transition:all 0.5s;
            }
        </style>

        <aside>
            <slot name="new-conversation">
            </slot>

            <slot name="history">
            </slot>
            
            <slot name="user">
            </slot>

            <slot name="thumbnail">
            </slot>
        </aside>

        `;

    }

    toggleAside(){
        let aside = this.shadow.querySelector("aside");

        aside.classList.toggle("active");
    }

    
}

customElements.define('aside-component', Aside);