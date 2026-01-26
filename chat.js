// chat.js — AI chat with typing indicator + memory

(() => {
  const API_URL = "/api/chat";
  const sessionId = localStorage.getItem("aslama_ai_session")
    || crypto.randomUUID();

  localStorage.setItem("aslama_ai_session", sessionId);

  // ---------- Styles ----------
  const style = document.createElement("style");
  style.textContent = `
  .chat-btn {
    position: fixed;
    bottom: 20px;
    left: 20px;
    background: #20c997;
    color: #062d23;
    border: none;
    border-radius: 999px;
    padding: 12px 16px;
    font-weight: 700;
    cursor: pointer;
    z-index: 9999;
  }
  .chat-box {
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
    box-shadow: 0 20px 40px rgba(0,0,0,.5);
    z-index: 9999;
    font-family: system-ui, -apple-system, Arial;
  }
  .chat-head {
    padding: 10px 12px;
    background: #1a1a1a;
    font-weight: 700;
    display: flex;
    justify-content: space-between;
  }
  .chat-body {
    flex: 1;
    padding: 10px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .msg {
    padding: 8px 10px;
    border-radius: 10px;
    max-width: 85%;
    font-size: 13px;
    white-space: pre-wrap;
  }
  .user { background:#20c997; color:#062d23; align-self:flex-end; }
  .bot { background:#2a2a2a; align-self:flex-start; }
  .typing {
    font-style: italic;
    opacity: 0.6;
  }
  .chat-foot {
    display:flex;
    gap:8px;
    padding:10px;
    border-top:1px solid #222;
  }
  .chat-input {
    flex:1;
    border:none;
    border-radius:10px;
    padding:8px;
    outline:none;
  }
  .chat-send {
    background:#20c997;
    border:none;
    border-radius:10px;
    font-weight:700;
    padding:8px 12px;
    cursor:pointer;
  }
  `;
  document.head.appendChild(style);

  // ---------- UI ----------
  const btn = document.createElement("button");
  btn.className = "chat-btn";
  btn.textContent = "AI Chat";

  const box = document.createElement("div");
  box.className = "chat-box";
  box.innerHTML = `
    <div class="chat-head">
      <span>Aslama AI</span>
      <button style="background:none;border:none;color:#fff;cursor:pointer">✕</button>
    </div>
    <div class="chat-body"></div>
    <div class="chat-foot">
      <input class="chat-input" placeholder="Ask about tires, sizes, brands…" />
      <button class="chat-send">Send</button>
    </div>
  `;

  document.body.appendChild(btn);
  document.body.appendChild(box);

  const body = box.querySelector(".chat-body");
  const input = box.querySelector(".chat-input");
  const sendBtn = box.querySelector(".chat-send");
  const closeBtn = box.querySelector(".chat-head button");

  btn.onclick = () => {
    box.style.display = box.style.display === "flex" ? "none" : "flex";
    box.style.flexDirection = "column";
    input.focus();
  };

  closeBtn.onclick = () => (box.style.display = "none");

  const addMsg = (cls, text) => {
    const d = document.createElement("div");
    d.className = `msg ${cls}`;
    d.textContent = text;
    body.appendChild(d);
    body.scrollTop = body.scrollHeight;
    return d;
  };

  // ---------- Send ----------
  const send = async () => {
    const text = input.value.trim();
    if (!text) return;

    input.value = "";
    addMsg("user", text);

    const typing = addMsg("bot typing", "Aslama AI is typing…");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          sessionId,
        }),
      });

      const data = await res.json();
      typing.remove();

      addMsg("bot", data.reply || "No response.");
    } catch (err) {
      typing.remove();
      addMsg("bot", "Sorry, something went wrong. Please try again.");
      console.error(err);
    }
  };

  sendBtn.onclick = send;
  input.addEventListener("keydown", e => e.key === "Enter" && send());
})();
