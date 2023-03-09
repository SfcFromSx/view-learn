;(function () {
    // Select elements
    const chatbotMessages = document.querySelector(".chatbot-messages")
    const chatbotInput = document.querySelector(".chatbot-input-field")
    const chatbotSend = document.querySelector(".chatbot-send")
    const loadingSpinner = document.getElementById("loading-spinner")

    const chatHistory = [] // Initialize an array to store previous messages

    const sendMessage = () => {
        if (chatHistory.length >= 6) {
            chatHistory.splice(0, chatHistory.length) // 对话达到3次则清空history，避免上下文中的token太多造成请求资源浪费
        }
        const messageText = chatbotInput.value
        addMessage("user", messageText)
        chatbotInput.value = ""
        const payload = {
            model: "gpt-3.5-turbo",
            messages: chatHistory,
        }

        // Make the API call with the payload
        loadingSpinner.style.display = "block"
        fetch("/chat/ask", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                loadingSpinner.style.display = "none"
                const message = data.choices[0].message.content
                addMessage("assistant", message)
            })
            .catch((error) => console.error(error))
    }

    // Send message to chatbot
    chatbotSend.addEventListener("click", sendMessage)
    chatbotInput.addEventListener("keyup", (e) => {
        // Press Enter to send message
        if (e.keyCode === 13) {
            sendMessage()
        }
    })

    // Add message to chatbot messages list
    function addMessage(sender, message) {
        const messageClass = sender === "user" ? "chatbot-user" : "chatbot-response"
        const messageElement = document.createElement("div")
        messageElement.className = `chatbot-message ${messageClass}`
        messageElement.innerHTML =
            sender === "user" ? message : processMarkdown(message)
        chatbotMessages.appendChild(messageElement)
        chatHistory.push({ role: sender, content: message }) // Add the message to chat history
        chatbotMessages.scrollTo({
            top: chatbotMessages.scrollHeight,
            behavior: "smooth",
        })
    }

    function processMarkdown(str) {
        const converter = new showdown.Converter()
        return converter.makeHtml(str)
    }
})()
