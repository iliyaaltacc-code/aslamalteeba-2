(() => {
  const API_URL = "/api/chat";

  let messages = [
    {
      role: "assistant",
      content:
        "Welcome to Aslama Alteeba 👋 How can I help with tire sizes, brands, or availability?",
    },
  ];

  const chatBox = document.querySelector(".chat-body");
  const input = document.querySelector(".chat-input");
  const sendBtn = document.querySelector(".chat-send");

  const addMessage = (role, text) => {
    const msg = document.createElement("div");
    msg.className = `msg ${role === "user" ? "user" : "bot"}`;
    msg.textContent = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
  };

  const showTyping = () => {
    const typing = document.createElement("div");
    typing.className = "msg bot";
    typing.id = "typing";
    typing.textContent = "Aslama AI is typing…";
    chatBox.appendChild(typing);
    chatBox.scrollTop = chatBox.scrollHeight;
  };

  const hideTyping = () => {
    const t = document.getElementById("typing");
    if (t) t.remove();
  };

  // Render initial greeting
  addMessage("assistant", messages[0].content);

  const send = async () => {
    const text = input.value.trim();
    if (!text) return;

    input.value = "";

    messages.push({ role: "user", content: text });
    addMessage("user", text);

    showTyping();

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
      });

      const data = await res.json();
      hideTyping();

      if (!res.ok) throw new Error("AI error");

      messages.push({ role: "assistant", content: data.reply });
      addMessage("assistant", data.reply);
    } catch (err) {
      hideTyping();
      addMessage(
        "assistant",
        "Sorry, something went wrong. Please try again."
      );
    }
  };

  sendBtn.addEventListener("click", send);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") send();
  });
})();
