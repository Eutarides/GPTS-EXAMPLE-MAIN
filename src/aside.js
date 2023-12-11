class Aside extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.render();
    }

    render() {

        this.shadow.innerHTML = 
        `
        <style>
            aside{
                background-color: hsl(0, 0%, 0%);
                max-width: 235px;
                min-width: 235px;
                height:100%;
            }

            span{
                
            }
        </style>

        <aside>
            <slot name="new-conversation">
            </slot>

            <slot name="history">
            </slot>
            
            <slot name="user">
            </slot>

            <span class="top"></span>
            <span class="bot"></span>
        </aside>

        `;

    }

    
}

customElements.define('aside-component', Aside);