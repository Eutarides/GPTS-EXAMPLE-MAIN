class Chat extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        document.addEventListener('send-prompt', this.handlePrompt.bind(this));
    }


    connectedCallback(){
        this.render();
    }

    render() {

        this.shadow.innerHTML = 
        `
        <style>
            .chat{
                position:fixed;
                top:15%;
                left:30%;
                width:40%;
                height:50%;
                display:none;
            }

            .chat.active{
                display:flex;
            }
        </style>

        <div class="chat">
        </div>

        `;       
    }

    handlePrompt(event) {
        const textDetail = event.detail;
        
        const chatContainer = this.shadow.querySelector('.chat');
        const newElement = document.createElement('div');
        newElement.textContent = textDetail; 

        chatContainer.appendChild(newElement);
    }
    
}

customElements.define('chat-component', Chat);