// chat.js — Production AI Chat (EN / FA / AR auto-detect)
// Frontend only. Backend remains /api/chat.

(() => {
  const API_URL = "/api/chat";

  // ---------------------------
  // Locale detection
  // ---------------------------
  const path = location.pathname;
  const htmlLang = document.documentElement.lang;

  const isArabic = path.startsWith("/ar") || htmlLang === "ar";
  const isFarsi  = path.startsWith("/fa") || htmlLang === "fa";

  const locale = isArabic ? "ar" : isFarsi ? "fa" : "en";
  const isRTL = locale !== "en";

  // ---------------------------
  // Translations
  // ---------------------------
  const TEXT = {
    en: {
      button: "AI Chat",
      title: "Aslama AI Assistant",
      subtitle: "Ask about sizes, brands, or availability.",
      placeholder: "Type your question…",
      send: "Send",
      typing: "Aslama AI is typing…",
      error: "Sorry, something went wrong. Please try again."
    },
    fa: {
      button: "چت هوشمند",
      title: "دستیار هوشمند اسلمه",
      subtitle: "درباره سایز، برند یا موجودی بپرسید.",
      placeholder: "سؤال خود را بنویسید…",
      send: "ارسال",
      typing: "دستیار در حال تایپ است…",
      error: "مشکلی پیش آمد. لطفاً دوباره تلاش کنید."
    },
    ar: {
      button: "الدردشة الذكية",
      title: "مساعد أسلمة الذكي",
      subtitle: "اسأل عن المقاسات أو العلامات أو التوفر.",
      placeholder: "اكتب سؤالك…",
      send: "إرسال",
      typing: "المساعد يكتب الآن…",
      error: "حدث خطأ. يرجى المحاولة مرة أخرى."
    }
  }[locale];

  // ---------------------------
  // Memory (per session)
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
      ${isRTL ? "right:20px" : "left:20px"};
      background: linear-gradient(135deg,#20c997,#2dd4bf);
      color: #062d23;
      border: none;
      padding: 12px 18px;
      border-radius: 999px;
      font-weight: 800;
      cursor: pointer;
      z-index: 9999;
      box-shadow: 0 10px 30px rgba(0,0,0,.35);
    }

    .ai-chat-box {
      position: fixed;
      bottom: 80px;
      ${isRTL ? "right:20px" : "left:20px"};
      width: 340px;
      height: 440px;
      background: rgba(15,15,15,.95);
      backdrop-filter: blur(10px);
      color: #fff;
      border-radius: 18px;
      display: none;
      flex-direction: column;
      overflow: hidden;
      z-index: 9999;
      box-shadow: 0 25px 60px rgba(0,0,0,.55);
      font-family: system-ui, -apple-system, Arial, sans-serif;
      direction: ${isRTL ? "rtl" : "ltr"};
    }

    .ai-chat-head {
      padding: 12px 14px;
      background: rgba(255,255,255,.04);
      font-weight: 800;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .ai-chat-sub {
      font-size: 11px;
      opacity: .7;
      margin-top: 2px;
    }

    .ai-chat-body {
      flex: 1;
      padding: 12px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 10px;
      font-size: 13px;
    }

    .ai-msg {
      padding: 10px 12px;
      border-radius: 14px;
      max-width: 85%;
      white-space: pre-wrap;
      line-height: 1.4;
    }

    .ai-user {
      background: #20c997;
      color: #062d23;
      align-self: ${isRTL ? "flex-start" : "flex-end"};
      border-bottom-${isRTL ? "left" : "right"}-radius: 4px;
    }

    .ai-bot {
      background: rgba(255,255,255,.08);
      align-self: ${isRTL ? "flex-end" : "flex-start"};
      border-bottom-${isRTL ? "right" : "left"}-radius: 4px;
    }

    .ai-typing {
      opacity: .7;
      font-style: italic;
      font-size: 12px;
    }

    .ai-chat-foot {
      display: flex;
      gap: 8px;
      padding: 12px;
      border-top: 1px solid rgba(255,255,255,.08);
    }

    .ai-chat-input {
      flex: 1;
      padding: 10px 12px;
      border-radius: 12px;
      border: none;
      outline: none;
      background: rgba(255,255,255,.08);
      color: #fff;
    }

    .ai-chat-send {
      padding: 10px 16px;
      border-radius: 12px;
      border: none;
      background: #20c997;
      font-weight: 800;
      cursor: pointer;
      color: #062d23;
    }
  `;
  document.head.appendChild(style);

  // ---------------------------
  // UI
  // ---------------------------
  const openBtn = document.createElement("button");
  openBtn.className = "ai-chat-btn";
  openBtn.textContent = TEXT.button;

  const box = document.createElement("div");
  box.className = "ai-chat-box";
  box.innerHTML = `
    <div class="ai-chat-head">
      <div>
        <div>${TEXT.title}</div>
        <div class="ai-chat-sub">${TEXT.subtitle}</div>
      </div>
      <button class="ai-close" style="background:none;border:none;color:#fff;font-size:18px;cursor:pointer">×</button>
    </div>
    <div class="ai-chat-body"></div>
    <div class="ai-chat-foot">
      <input class="ai-chat-input" placeholder="${TEXT.placeholder}" />
      <button class="ai-chat-send">${TEXT.send}</button>
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
    const d = document.createElement("div");
    d.className = `ai-msg ${cls}`;
    d.textContent = text;
    body.appendChild(d);
    body.scrollTop = body.scrollHeight;
    return d;
  };

  // ---------------------------
  // Send
  // ---------------------------
  const send = async () => {
    const text = input.value.trim();
    if (!text) return;

    input.value = "";
    addMsg("ai-user", text);
    chatHistory.push({ role: "user", content: text });

    const typing = addMsg("ai-bot ai-typing", TEXT.typing);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chatHistory })
      });

      const data = await res.json();
      typing.remove();

      if (!res.ok || !data.reply) throw new Error();

      addMsg("ai-bot", data.reply);
      chatHistory.push({ role: "assistant", content: data.reply });

    } catch {
      typing.remove();
      addMsg("ai-bot", TEXT.error);
    }
  };

  sendBtn.onclick = send;
  input.addEventListener("keydown", e => {
    if (e.key === "Enter") send();
  });
})();
