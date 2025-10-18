document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
    const messages = document.getElementById('messages');
    const input = document.getElementById('messeageToSend');
    const sendBtn = document.getElementById('sendMessage');

    sendBtn.addEventListener('click', () => {
        const msg = input.value.trim();
        if (!msg) return;
        socket.emit('chat message', msg);
        input.value = '';
    });

    socket.on('chat message', (data) => {
        const li = document.createElement('li');
        if (data.id === socket.id) {
            li.classList.add('user-message'); 
        } else {
            li.classList.add('other-message'); 
        }
        li.textContent = data.msg;
        messages.appendChild(li);
        messages.scrollTop = messages.scrollHeight;
    });
});
