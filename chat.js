// chat.js — UI FIX ONLY (FORCED DARK, OVERRIDES SITE CSS)
// Logic, API, memory untouched — FIXED BUTTON WIRING

(() => {
  const API_URL = "/api/chat";
  const chatHistory = [];

  // ---------------------------
  // FORCE STYLES (OVERRIDE SITE)
  // ---------------------------
  const style = document.createElement("style");
  style.textContent = `
    .aslama-ai-btn {
      position: fixed;
      bottom: 18px;
      left: 18px;
      background: #1fd1a2 !important;
      color: #052c22 !important;
      border: none !important;
      padding: 12px 18px;
      border-radius: 999px;
      font-weight: 700;
      cursor: pointer;
      z-index: 99999;
      box-shadow: 0 6px 20px rgba(31,209,162,.35);
    }

    .aslama-ai {
      position: fixed;
      bottom: 80px;
      left: 18px;
      width: 320px;
      height: 420px;
      background: #141414 !important;
      border-radius: 18px;
      display: none;
      flex-direction: column;
      overflow: hidden;
      z-index: 99999;
      box-shadow: 0 30px 60px rgba(0,0,0,.55);
      font-family: system-ui, -apple-system, Arial, sans-serif;
    }

    .aslama-ai-header {
      background: #1b1b1b !important;
      padding: 12px 14px;
      font-weight: 700;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(255,255,255,.08);
      color: #fff;
    }

    .aslama-ai-body {
      flex: 1;
      padding: 12px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 10px;
      font-size: 13px;
    }

    .aslama-bubble {
      max-width: 85%;
      padding: 10px 12px;
      border-radius: 14px;
      line-height: 1.35;
      white-space: pre-wrap;
    }

    .aslama-user {
      background: #1fd1a2 !important;
      color: #052c22 !important;
      align-self: flex-end;
      border-bottom-right-radius: 4px;
    }

    .aslama-assistant {
      background: #242424 !important;
      color: #eaeaea !important;
      align-self: flex-start;
      border-bottom-left-radius: 4px;
    }

    .aslama-typing {
      opacity: .6;
      font-style: italic;
      font-size: 12px;
    }

    .aslama-ai-footer {
      padding: 10px;
      display: flex;
      gap: 8px;
      background: #141414 !important;
      border-top: 1px solid rgba(255,255,255,.08);
    }

    /* IMPORTANT: kill site styles for input */
    .aslama-ai-footer input {
      all: unset;
      flex: 1;
      background: #1c1c1c !important;
      color: #fff !important;
      padding: 10px 12px;
      border-radius: 12px;
      border: 1px solid rgba(255,255,255,.1) !important;
      font-size: 13px;
    }

    .aslama-ai-footer input::placeholder {
      color: #888 !important;
    }

    .aslama-ai-footer .aslama-ai-send {
      background: #1fd1a2 !important;
      color: #052c22 !important;
      border: none !important;
      padding: 10px 16px;
      border-radius: 12px;
      font-weight: 700;
      cursor: pointer;
    }

    .aslama-ai-close {
      all: unset;
      cursor: pointer;
      color: #aaa;
      font-size: 18px;
      line-height: 1;
      padding: 2px 6px;
      border-radius: 10px;
    }

    .aslama-ai-close:hover {
      background: rgba(255,255,255,.08);
      color: #fff;
    }
  `;
  document.head.appendChild(style);

  // ---------------------------
  // UI
  // ---------------------------
  const btn = document.createElement("button");
  btn.className = "aslama-ai-btn";
  btn.type = "button";
  btn.textContent = "AI Chat";

  const chat = document.createElement("div");
  chat.className = "aslama-ai";
  chat.innerHTML = `
    <div class="aslama-ai-header">
      <span>Aslama AI Assistant</span>
      <button type="button" class="aslama-ai-close" aria-label="Close">✕</button>
    </div>
    <div class="aslama-ai-body"></div>
    <div class="aslama-ai-footer">
      <input class="aslama-ai-input" placeholder="Ask about tires, sizes, brands…" />
      <button type="button" class="aslama-ai-send">Send</button>
    </div>
  `;

  document.body.appendChild(btn);
  document.body.appendChild(chat);

  const body = chat.querySelector(".aslama-ai-body");
  const input = chat.querySelector(".aslama-ai-input");
  const sendBtn = chat.querySelector(".aslama-ai-send");
  const closeBtn = chat.querySelector(".aslama-ai-close");

  btn.addEventListener("click", () => {
    chat.style.display = chat.style.display === "flex" ? "none" : "flex";
    chat.style.flexDirection = "column";
    input.focus();
  });

  closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    chat.style.display = "none";
  });

  const addMsg = (cls, text) => {
    const div = document.createElement("div");
    div.className = `aslama-bubble ${cls}`;
    div.textContent = text;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
    return div;
  };

  // ---------------------------
  // SEND (UNCHANGED LOGIC)
  // ---------------------------
  const send = async () => {
    const text = input.value.trim();
    if (!text) return;

    input.value = "";
    addMsg("aslama-user", text);
    chatHistory.push({ role: "user", content: text });

    const typing = addMsg("aslama-assistant aslama-typing", "Aslama AI is typing…");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chatHistory }),
      });

      const data = await res.json();
      typing.remove();

      if (!res.ok || !data.reply) throw new Error("Bad response");

      addMsg("aslama-assistant", data.reply);
      chatHistory.push({ role: "assistant", content: data.reply });
    } catch (err) {
      typing.remove();
      addMsg("aslama-assistant", "Sorry, something went wrong. Please try again.");
      console.error(err);
    }
  };

  sendBtn.addEventListener("click", (e) => {
    e.preventDefault();
    send();
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      send();
    }
  });
})();
