document.getElementById("send-btn").addEventListener("click", sendMessage);
document.getElementById("user-input").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

function sendMessage() {
    const inputField = document.getElementById("user-input");
    const message = inputField.value.trim();
    if (!message) return;

    appendMessage(message, "user-message");
    inputField.value = "";

    fetch("/get", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `msg=${encodeURIComponent(message)}`
    })
    .then(res => res.text())
    .then(data => {
        appendMessage(data, "bot-message");
    })
    .catch(err => {
        appendMessage("⚠️ Error: Unable to connect to server.", "bot-message");
        console.error(err);
    });
}

function appendMessage(text, className) {
    const chatBox = document.getElementById("chat-box");
    const messageElem = document.createElement("div");
    messageElem.classList.add("message", className);
    messageElem.textContent = text;
    chatBox.appendChild(messageElem);
    chatBox.scrollTop = chatBox.scrollHeight;
}

document.getElementById("send-btn").addEventListener("click", sendMessage);
document.getElementById("user-input").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

function sendMessage() {
    const inputField = document.getElementById("user-input");
    const message = inputField.value.trim();
    if (!message) return;

    appendMessage(message, "user-message");
    inputField.value = "";

    // Show typing indicator
    const typingElem = showTypingIndicator();

    fetch("/get", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `msg=${encodeURIComponent(message)}`
    })
    .then(res => res.text())
    .then(data => {
        removeTypingIndicator(typingElem);
        appendMessage(data, "bot-message");
    })
    .catch(err => {
        removeTypingIndicator(typingElem);
        appendMessage("⚠️ Error: Unable to connect to server.", "bot-message");
        console.error(err);
    });
}

function appendMessage(text, className) {
    const chatBox = document.getElementById("chat-box");
    const messageElem = document.createElement("div");
    messageElem.classList.add("message", className);
    messageElem.textContent = text;
    chatBox.appendChild(messageElem);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function showTypingIndicator() {
    const chatBox = document.getElementById("chat-box");
    const typingElem = document.createElement("div");
    typingElem.classList.add("typing-indicator");
    typingElem.innerHTML = "<span></span><span></span><span></span>";
    chatBox.appendChild(typingElem);
    chatBox.scrollTop = chatBox.scrollHeight;
    return typingElem;
}

function removeTypingIndicator(elem) {
    if (elem && elem.parentNode) {
        elem.parentNode.removeChild(elem);
    }
}
document.getElementById("send-btn").addEventListener("click", sendMessage);
document.getElementById("user-input").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

function sendMessage() {
    const inputField = document.getElementById("user-input");
    const message = inputField.value.trim();
    if (!message) return;

    appendMessage(message, "user-message");
    inputField.value = "";

    // Show typing indicator
    const typingElem = showTypingIndicator();

    fetch("/get", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `msg=${encodeURIComponent(message)}`
    })
    .then(res => res.text())
    .then(data => {
        removeTypingIndicator(typingElem);
        typeBotMessage(data, "bot-message", 40); // 40ms delay per word
    })
    .catch(err => {
        removeTypingIndicator(typingElem);
        appendMessage("⚠️ Error: Unable to connect to server.", "bot-message");
        console.error(err);
    });
}

function appendMessage(text, className) {
    const chatBox = document.getElementById("chat-box");
    const messageElem = document.createElement("div");
    messageElem.classList.add("message", className);
    messageElem.textContent = text;
    chatBox.appendChild(messageElem);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function showTypingIndicator() {
    const chatBox = document.getElementById("chat-box");
    const typingElem = document.createElement("div");
    typingElem.classList.add("typing-indicator");
    typingElem.innerHTML = "<span></span><span></span><span></span>";
    chatBox.appendChild(typingElem);
    chatBox.scrollTop = chatBox.scrollHeight;
    return typingElem;
}

function removeTypingIndicator(elem) {
    if (elem && elem.parentNode) {
        elem.parentNode.removeChild(elem);
    }
}

function typeBotMessage(text, className, delay = 50) {
    const chatBox = document.getElementById("chat-box");
    const messageElem = document.createElement("div");
    messageElem.classList.add("message", className);
    chatBox.appendChild(messageElem);

    const words = text.split(" ");
    let i = 0;

    function typeWord() {
        if (i < words.length) {
            messageElem.textContent += (i === 0 ? "" : " ") + words[i];
            i++;
            chatBox.scrollTop = chatBox.scrollHeight;
            setTimeout(typeWord, delay);
        }
    }

    typeWord();
}
