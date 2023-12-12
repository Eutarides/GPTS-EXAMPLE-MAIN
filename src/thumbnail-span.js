class Thumbnail extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.render();
    }

    render() {

        this.shadow.innerHTML = 
        `
        <style>

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
                border-radius:2px;
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

        <div class="arrow">
            <span class="top"></span>
            <span class="bot"></span>
        </div>

        `;

        let arrow = this.shadow.querySelector(".arrow");
        let spans = this.shadow.querySelectorAll("span");

        arrow.addEventListener("click",()=>{
            document.dispatchEvent(new CustomEvent('hide-aside', {
            }));
            spans.forEach(span => {
                span.classList.toggle("active");
            });
            arrow.classList.toggle("active");

        });

    }

    
}

customElements.define('thumbnail-component', Thumbnail);