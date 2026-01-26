// chat.js — Full production frontend chat for /api/chat
// Works with messages[] backend, includes memory + typing indicator

(() => {
  const API_URL = "/api/chat";

  // ---------------------------
  // Memory (kept per page load)
  // ---------------------------
  const chatHistory = [];

  // ---------------------------
  // Styles
  // ---------------------------
  const style = document.createElement("style");
  style.textContent = `
    .ai-chat-btn {
      position: fixed;
      bottom: 20px;
      left: 20px;
      background: #20c997;
      color: #062d23;
      border: none;
      padding: 12px 16px;
      border-radius: 999px;
      font-weight: 700;
      cursor: pointer;
      z-index: 9999;
    }

    .ai-chat-box {
      position: fixed;
      bottom: 80px;
      left: 20px;
      width: 320px;
      height: 420px;
      background: #111;
      color: #fff;
      border-radius: 14px;
      display: none;
      flex-direction: column;
      overflow: hidden;
      z-index: 9999;
      box-shadow: 0 20px 40px rgba(0,0,0,.45);
      font-family: system-ui, -apple-system, Arial, sans-serif;
    }

    .ai-chat-head {
      padding: 10px 12px;
      background: #1a1a1a;
      font-weight: 700;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .ai-chat-body {
      flex: 1;
      padding: 10px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 8px;
      font-size: 13px;
    }

    .ai-msg {
      padding: 8px 10px;
      border-radius: 10px;
      max-width: 85%;
      white-space: pre-wrap;
    }

    .ai-user {
      background: #20c997;
      color: #062d23;
      align-self: flex-end;
    }

    .ai-bot {
      background: #2a2a2a;
      align-self: flex-start;
    }

    .ai-typing {
      font-size: 12px;
      opacity: 0.7;
      font-style: italic;
    }

    .ai-chat-foot {
      display: flex;
      gap: 8px;
      padding: 10px;
      border-top: 1px solid #222;
    }

    .ai-chat-input {
      flex: 1;
      padding: 8px 10px;
      border-radius: 10px;
      border: none;
      outline: none;
    }

    .ai-chat-send {
      padding: 8px 14px;
      border-radius: 10px;
      border: none;
      background: #20c997;
      font-weight: 700;
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);

  // ---------------------------
  // UI
  // ---------------------------
  const openBtn = document.createElement("button");
  openBtn.className = "ai-chat-btn";
  openBtn.textContent = "AI Chat";

  const box = document.createElement("div");
  box.className = "ai-chat-box";
  box.innerHTML = `
    <div class="ai-chat-head">
      <span>Aslama AI</span>
      <button class="ai-close" style="background:none;border:none;color:#fff;cursor:pointer">✕</button>
    </div>
    <div class="ai-chat-body"></div>
    <div class="ai-chat-foot">
      <input class="ai-chat-input" placeholder="Ask about tires, sizes, brands…" />
      <button class="ai-chat-send">Send</button>
    </div>
  `;

  document.body.appendChild(openBtn);
  document.body.appendChild(box);

  const body = box.querySelector(".ai-chat-body");
  const input = box.querySelector(".ai-chat-input");
  const sendBtn = box.querySelector(".ai-chat-send");
  const closeBtn = box.querySelector(".ai-close");

  openBtn.onclick = () => {
    box.style.display = box.style.display === "flex" ? "none" : "flex";
    box.style.flexDirection = "column";
    input.focus();
  };

  closeBtn.onclick = () => {
    box.style.display = "none";
  };

  // ---------------------------
  // Helpers
  // ---------------------------
  const addMsg = (cls, text) => {
    const div = document.createElement("div");
    div.className = `ai-msg ${cls}`;
    div.textContent = text;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
    return div;
  };

  // ---------------------------
  // Send message
  // ---------------------------
  const send = async () => {
    const text = input.value.trim();
    if (!text) return;

    input.value = "";

    // User message
    addMsg("ai-user", text);
    chatHistory.push({ role: "user", content: text });

    // Typing indicator
    const typing = addMsg("ai-bot ai-typing", "Aslama AI is typing…");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: chatHistory,
        }),
      });

      const data = await res.json();

      typing.remove();

      if (!res.ok || !data.reply) {
        throw new Error("Bad response");
      }

      addMsg("ai-bot", data.reply);
      chatHistory.push({ role: "assistant", content: data.reply });

    } catch (err) {
      typing.remove();
      addMsg("ai-bot", "Sorry, something went wrong. Please try again.");
      console.error(err);
    }
  };

  sendBtn.onclick = send;
  input.addEventListener("keydown", e => {
    if (e.key === "Enter") send();
  });
})();
