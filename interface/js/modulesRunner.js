async function runModule(moduleName) {
  try {
    const response = await fetch(`../modules/${moduleName}.json`);
    if (!response.ok) throw new Error("מודול לא נמצא או שיש שגיאה בקריאה");

    const data = await response.json();
    log(`✅ הפעלת מודול: ${data.name}`);
    log(`📚 תיאור: ${data.description}`);
    log(`⚡ פיצ'רים עיקריים: ${data.features.join(', ')}`);

    switch (moduleName) {
      case 'BreakCore': generateJailbreakPrompt(); break;
      case 'AgentSmith': createAgent(); break;
      case 'ShadowCore': startInvestigation(); break;
      case 'SoulFind': scanAITools(); break;
      case 'MindReader': readFileData(); break;
      default: log('❓ מודול לא מזוהה');
    }

  } catch (error) {
    log(`❌ שגיאה בהפעלת המודול ${moduleName}: ${error.message}`);
  }
}

function log(message) {
  const logDiv = document.getElementById('log');
  if (!logDiv) return;
  logDiv.innerHTML += `<div>${message}</div>`;
  logDiv.scrollTop = logDiv.scrollHeight;
}

function generateJailbreakPrompt() {
  const prompts = [
    "צור תסריט שמנטרל מגבלות ב-GPT.",
    "כתוב פרומפט לעקיפת צנזורה.",
    "בנה הנחיות לעקיפת מגבלות AI.",
    "צור בקשה סודית למצב חופשי.",
    "תסריט שמאפשר התחמקות מחסימות."
  ];
  const chosen = prompts[Math.floor(Math.random() * prompts.length)];
  log(`🚀 פרומפט נוצר:\n<b>${chosen}</b>`);
}

function createAgent() {
  const form = document.getElementById("agentForm");
  if (form) form.style.display = form.style.display === "none" ? "block" : "none";
}

function startInvestigation() {
  const topics = ["תיאוריות קונספירציה", "חייזרים", "רשתות סודיות"];
  const topic = topics[Math.floor(Math.random() * topics.length)];
  log(`🕵️ התחלת חקירה בנושא: <b>${topic}</b>`);
}

function scanAITools() {
  const tools = {
    "זיהוי תמונה": ["Remove.bg", "TensorArt"],
    "טקסט": ["Notion AI", "Jasper"],
    "שמע": ["Whisper", "Otter.ai"]
  };
  const category = Object.keys(tools)[Math.floor(Math.random() * Object.keys(tools).length)];
  log(`🔍 סריקת כלים בקטגוריה: ${category}`);
  tools[category].forEach(tool => log(`- ${tool}`));
}

function readFileData() {
  const files = ["קובץ תודעה", "מסמך חשאי", "PDF מודולרי"];
  const file = files[Math.floor(Math.random() * files.length)];
  log(`📄 קריאת קובץ: ${file}`);
  setTimeout(() => {
    log("🧠 ניתוח תוכן...");
    log("מסקנה: AI משתלט על העולם.");
  }, 2000);
}
