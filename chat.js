// chat.js — Frontend UI ONLY (logic unchanged)
// Talks to /api/chat, keeps memory + typing indicator

(() => {
  const API_URL = "/api/chat";
  const chatHistory = [];

  /* =========================
     STYLES (OLD UI LOOK)
  ========================= */
  const style = document.createElement("style");
  style.textContent = `
    .ai-chat-launch {
      position: fixed;
      bottom: 20px;
      left: 20px;
      background: #20c997;
      color: #062d23;
      border: none;
      padding: 12px 18px;
      border-radius: 999px;
      font-weight: 700;
      cursor: pointer;
      z-index: 9999;
      box-shadow: 0 10px 25px rgba(0,0,0,.35);
    }

    .ai-panel {
      position: fixed;
      bottom: 80px;
      left: 20px;
      width: 300px;
      height: 420px;
      background: rgba(18,18,18,.98);
      backdrop-filter: blur(8px);
      color: #fff;
      border-radius: 16px;
      display: none;
      flex-direction: column;
      overflow: hidden;
      z-index: 9999;
      box-shadow: 0 25px 50px rgba(0,0,0,.55);
      font-family: system-ui,-apple-system,Segoe UI,Arial,sans-serif;
    }

    .ai-header {
      padding: 12px 14px;
      background: #161616;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: 700;
      border-bottom: 1px solid #222;
    }

    .ai-header button {
      background: none;
      border: none;
      color: #aaa;
      cursor: pointer;
      font-size: 18px;
    }

    .ai-body {
      flex: 1;
      padding: 12px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 8px;
      font-size: 13px;
    }

    .ai-bubble {
      max-width: 85%;
      padding: 8px 12px;
      border-radius: 14px;
      line-height: 1.35;
      white-space: pre-wrap;
    }

    .ai-user {
      align-self: flex-end;
      background: #20c997;
      color: #062d23;
      border-bottom-right-radius: 4px;
    }

    .ai-assistant {
      align-self: flex-start;
      background: #2a2a2a;
      border-bottom-left-radius: 4px;
    }

    .ai-typing {
      opacity: .7;
      font-style: italic;
      font-size: 12px;
    }

    .ai-footer {
      display: flex;
      gap: 8px;
      padding: 10px;
      border-top: 1px solid #222;
      background: #141414;
    }

    .ai-input {
      flex: 1;
      padding: 8px 10px;
      border-radius: 10px;
      border: none;
      outline: none;
      font-size: 13px;
    }

    .ai-send {
      padding: 8px 14px;
      border-radius: 10px;
      border: none;
      background: #20c997;
      color: #062d23;
      font-weight: 700;
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);

  /* =========================
     UI STRUCTURE
  ========================= */
  const openBtn = document.createElement("button");
  openBtn.className = "ai-chat-launch";
  openBtn.textContent = "AI Chat";

  const panel = document.createElement("div");
  panel.className = "ai-panel";
  panel.innerHTML = `
    <div class="ai-header">
      <span>Aslama AI Assistant</span>
      <button class="ai-close">×</button>
    </div>
    <div class="ai-body"></div>
    <div class="ai-footer">
      <input class="ai-input" placeholder="Ask about tires, sizes, brands" />
      <button class="ai-send">Send</button>
    </div>
  `;

  document.body.appendChild(openBtn);
  document.body.appendChild(panel);

  const body = panel.querySelector(".ai-body");
  const input = panel.querySelector(".ai-input");
  const sendBtn = panel.querySelector(".ai-send");
  const closeBtn = panel.querySelector(".ai-close");

  openBtn.onclick = () => {
    panel.style.display = panel.style.display === "flex" ? "none" : "flex";
    panel.style.flexDirection = "column";
    input.focus();
  };

  closeBtn.onclick = () => {
    panel.style.display = "none";
  };

  /* =========================
     HELPERS
  ========================= */
  const addBubble = (cls, text) => {
    const div = document.createElement("div");
    div.className = `ai-bubble ${cls}`;
    div.textContent = text;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
    return div;
  };

  /* =========================
     SEND MESSAGE (UNCHANGED)
  ========================= */
  const send = async () => {
    const text = input.value.trim();
    if (!text) return;
    input.value = "";

    addBubble("ai-user", text);
    chatHistory.push({ role: "user", content: text });

    const typing = addBubble("ai-assistant ai-typing", "Aslama AI is typing…");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chatHistory }),
      });

      const data = await res.json();
      typing.remove();

      if (!res.ok || !data.reply) throw new Error("Bad response");

      addBubble("ai-assistant", data.reply);
      chatHistory.push({ role: "assistant", content: data.reply });

    } catch (err) {
      typing.remove();
      addBubble("ai-assistant", "Sorry, something went wrong. Please try again.");
      console.error(err);
    }
  };

  sendBtn.onclick = send;
  input.addEventListener("keydown", e => {
    if (e.key === "Enter") send();
  });
})();
