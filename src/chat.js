class Chat extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        document.addEventListener('send-prompt', this.handlePrompt.bind(this));
        document.addEventListener('start-chat', this.handleStartChat.bind(this));
        document.addEventListener('new-chat', this.handleNewChat.bind(this));
    }

    handleStartChat() {
        let chat = this.shadow.querySelector(".chat");

        chat.classList.add("active");
    }

    handleNewChat() {
        let chat = this.shadow.querySelector(".chat");

        chat.classList.remove("active");
        this.render();
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
                overflow-y:hidden;
                scroll-behavior: smooth;
            }

            .chat.active{
                display:flex;
                flex-direction:column;
                gap:1rem;
            }

            .chat-scrollable {
                overflow-y: auto;
                max-height: 100%;
            }

            .message{
                display:flex;
                gap:0.8rem;
            }

            .user-image img{
                width:35px;
                height:35px;
                border-radius:25px;
            }

            .user-chat{
                display:flex;
                flex-direction:column;
                gap:0.5rem;
            }

            .user-self{
                color:white;
                margin:0;
                font-size:1rem;
                font-weight:600;
            }

            .user-message{
                color:white;
                margin:0;
                font-weight:300;
            }

            .typing-animation {
            border-right: 2px solid; /* Para simular el cursor de escritura */
            white-space: nowrap; /* Para mantener el texto en una sola línea */
            overflow: hidden; /* Para ocultar el contenido que se desborda */
            animation: typing 1s steps(40, end), blink-caret 0.5s step-end infinite;
            }
            
            @keyframes typing {
                from {
                    width: 0;
                }
                to {
                    width: 100%; /* Ancho completo para mostrar el texto */
                }
            }
            
            @keyframes blink-caret {
                from, to {
                    border-color: transparent; /* Cursor parpadeante */
                }
                50% {
                    border-color: white;
                }
            }

            .chat::-webkit-scrollbar{
                background: transparent; 
                width: 0;
            }
            
            .chat:hover::-webkit-scrollbar{
                width: 5px; 
            }
            
            .chat:hover::-webkit-scrollbar-thumb{
                background-color: hsl(0, 0%, 53%); 
                border-radius: 1rem;
                max-height: 15%;
            }
            
            .chat:hover::-webkit-scrollbar-thumb:hover{
                background-color: hsl(0, 0%, 78%); 
            }

            .pulse{
            }

            .pulse.active{
                display:none;
            }

            .pulse svg{
                fill:white;width:15px;
            }

            .gpt-user-message{
                color:white;
                margin:0;
                font-weight:300;
                display:none;
            }

            .gpt-user-message.active{
                display:flex;
            }
        </style>

        <div class="chat">
        </div>

        `;         
    }

    handlePrompt(event) {
        const textDetail = event.detail.prompt;
        
        const chat = this.shadow.querySelector('.chat');
        chat.classList.add('chat-scrollable');
        const message = document.createElement('div');
        message.classList.add("message");
        chat.appendChild(message);

        const userImage = document.createElement('div');
        userImage.innerHTML= `<img src="images/user-avatar.png" alt="avatar de usuario">`;
        userImage.classList.add("user-image");
        message.appendChild(userImage);

        const userChat = document.createElement('div');
        userChat.classList.add("user-chat");
        message.appendChild(userChat);

        const userSelf = document.createElement('h3');
        userSelf.innerHTML= `Tú`;
        userSelf.classList.add("user-self");
        userChat.appendChild(userSelf);

        const userMessage = document.createElement('p');
        userMessage.textContent= textDetail;
        userMessage.classList.add("user-message");
        userChat.appendChild(userMessage);




        const GPTmessage = document.createElement('div');
        GPTmessage.classList.add("message");
        chat.appendChild(GPTmessage);

        const GPTuserImage = document.createElement('div');
        GPTuserImage.innerHTML= `<img src="images/bomboclaat.webp" alt="avatar de usuario">`;
        GPTuserImage.classList.add("user-image");
        GPTmessage.appendChild(GPTuserImage);

        const GPTuserChat = document.createElement('div');
        GPTuserChat.classList.add("user-chat");
        GPTmessage.appendChild(GPTuserChat);

        const GPTuserSelf = document.createElement('h3');
        GPTuserSelf.innerHTML= `JamaicaGPT`;
        GPTuserSelf.classList.add("user-self");
        GPTuserChat.appendChild(GPTuserSelf);

        const GPTuserPulse = document.createElement('div');
        GPTuserPulse.classList.add('pulse');
        GPTuserPulse.innerHTML= `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>circle</title><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>`
        GPTuserChat.appendChild(GPTuserPulse);

        const GPTuserMessage = document.createElement('p');
        GPTuserMessage.classList.add("typing-animation");
        GPTuserMessage.textContent= `BomboClaaaaat`;
        GPTuserMessage.classList.add("gpt-user-message");
        GPTuserChat.appendChild(GPTuserMessage);

        setTimeout(()=>{
            GPTuserPulse.classList.toggle("active");
            GPTuserMessage.classList.toggle("active");
        },500);


        setTimeout(() => {
            GPTuserMessage.scrollIntoView({ behavior: "smooth", block: "end" });
            document.dispatchEvent(new CustomEvent('visible-stop',{
            }));
        }, 50);

        GPTuserMessage.addEventListener('animationend', () => {
            GPTuserMessage.classList.remove("typing-animation");
        });


        chat.addEventListener('wheel', (e) => {
            e.preventDefault();
          
            const delta = e.deltaY || e.detail || e.wheelDelta;
          
            chat.scrollTop += delta;
        });
        
    }
    
}

customElements.define('chat-component', Chat);