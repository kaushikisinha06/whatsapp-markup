const conversation = {
    chats: [
        {message: 'Hey!!', time: '2:24 am', sentVia: 'sender'},
        {message: 'Hi Kaushiki. How are you?', time: '2:24 am', sentVia: 'receiver'},
        {message: 'I am fine. What are u doing?', time: '2:24 am', sentVia: 'sender'},
        {message: 'Locked Up!!', time: '2:24 am', sentVia: 'receiver'},
        {message: 'Same here!!', time: '2:24 am', sentVia: 'sender'},
        {message: 'Lets Call :)', time: '2:24 am', sentVia: 'receiver'},
        {message: 'Test :)', time: '2:24 am', sentVia: 'receiver'}
    ]
}
localStorage.setItem('conversation', JSON.stringify(conversation));

function renderChat() {
    const chatData = JSON.parse(localStorage.getItem('conversation'));

    const time = `${new Date().getHours()}:${new Date().getMinutes()}`;
    let chatNode = chatData.chats.map(chat => 
            `<div class="chat-box ${chat.sentVia === "sender" ?  "chat-sent" : "chat-received"}">
                <div>${chat.message}</div>
                <div class="chat-time">${chat.time || time}</div>
            </div>`
        ).join('');
    
    const frag = document.createDocumentFragment();
    let temp = document.createElement('div');
    temp.innerHTML = chatNode;
    while(temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    
    const mainNode = document.getElementById('chat-container');
    mainNode.appendChild(frag);

    enterChat();
}
function enterChat() {
    const node = document.getElementById('message-input');
    node.addEventListener('keypress', (event) => {
        if(event.keyCode===13 && node.value.length>=1) {
            
            const newMessage = {
                message: node.value,
                time: `${new Date().getHours()}:${new Date().getMinutes()}`,
                sentVia: 'sender'
            }
            const chatData = JSON.parse(localStorage.getItem('conversation'));
            chatData.chats.push(newMessage);

            node.value = '';
            localStorage.setItem('conversation', JSON.stringify(chatData));
            
            const chatContainer = document.getElementById('chat-container');
            while(chatContainer.firstChild) {
                chatContainer.removeChild(chatContainer.firstChild)
            }
            renderChat();
            const chatnode = document.getElementById('chat-container');
            chatnode.scrollTop = chatnode.scrollHeight;
        }
    })
}
