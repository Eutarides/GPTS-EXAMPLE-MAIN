class Chat extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        document.addEventListener('send-prompt', this.handlePrompt.bind(this));
        document.addEventListener('start-chat', this.handleStartChat.bind(this));
    }

    handleStartChat() {
        let chat = this.shadow.querySelector(".chat");

        chat.classList.add("active");
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
                top:5%;
                left:37%;
                width:40%;
                height:80%;
                display:none;
            }

            .chat.active{
                display:flex;
                flex-direction:column;
                gap:1rem;
            }

            .message{
                display:flex;
            }

            .userImage{
                width:30px;
                height:30px;
            }
        </style>

        <div class="chat">
        </div>

        `;         
    }

    handlePrompt(event) {
        const textDetail = event.detail.prompt;
        
        const chat = this.shadow.querySelector('.chat');
        const message = document.createElement('div');
        message.textContent = textDetail;
        chat.appendChild(message);

        const userImage = this.shadow.createElement('div');
        userImage.innerHTML= `<img src="images/user-avatar.png" alt="avatar de usuario">`;
        message.appendChild(userImage);

        
    }
    
}

customElements.define('chat-component', Chat);