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
                height:100%;
                transition:0.7s;
            }

            aside.active{
                width:0;
            }

            .arrow{
                position:fixed;
                left:13%;
                bottom:50%;
                display:flex;
                flex-direction:column;
                transition:0.7s;
            }

            .arrow.active{
                left:2%;
            }

            span{
                height: 25px;
                width:4px;
                display: inline-block;
                transition: transform 0.3s ease;
                background-color:white;
            }

            .top.active{
                transform-origin: bottom right;
                transform: rotate(25deg);
                transition:0.7s;
            }

            .bot.active{
                transform-origin: top right;
                transform: rotate(-25deg);
                transition:0.7s;
            }
        </style>

        <aside>
            <slot name="new-conversation">
            </slot>

            <slot name="history">
            </slot>
            
            <slot name="user">
            </slot>

            <div class="arrow">
                <span class="top"></span>
                <span class="bot"></span>
            </div>
        </aside>

        `;

        let arrow = this.shadow.querySelector(".arrow");

    }

    
}

customElements.define('aside-component', Aside);