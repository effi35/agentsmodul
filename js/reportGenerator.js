// modules/reportGenerator.js

/**
 * הפונקציה יוצרת דו"ח HTML להורדה מקומית, לפי תוצאות של סוכן.
 * @param {Object} agentResult - אובייקט עם תוצאות הסוכן
 */
function generateReport(agentResult) {
    // תבנית HTML ליצירת הדו"ח עם עיצוב פשוט ותמיכה בעברית
    const reportHtml = `
    <html lang="he">
    <head>
      <meta charset="UTF-8">
      <title>דו"ח סוכן ${agentResult.agentId}</title>
      <style>
        body { 
          font-family: 'Arial', sans-serif; 
          padding: 20px; 
          background-color: #f4f4f4; 
          direction: rtl;
        }
        h1 { color: #4CAF50; }
        p { margin: 10px 0; font-size: 16px; }
        .status { 
          font-weight: bold; 
          color: ${agentResult.status === 'Success' ? '#4CAF50' : '#f44336'}; 
        }
      </style>
    </head>
    <body>
      <h1>דו"ח סוכן - ${agentResult.agentId}</h1>
      <p><strong>סטטוס:</strong> <span class="status">${agentResult.status}</span></p>
      <p><strong>תוצאה:</strong> ${agentResult.output || agentResult.error || 'לא נמסרה תוצאה'}</p>
      <p><strong>תאריך:</strong> ${new Date(agentResult.timestamp).toLocaleString('he-IL')}</p>
    </body>
    </html>
    `;
  
    // יצירת Blob לקובץ HTML כדי לאפשר הורדה מהדפדפן
    const blob = new Blob([reportHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
  
    // יצירת קישור זמני להורדת הקובץ
    const a = document.createElement('a');
    a.href = url;
    a.download = `Report_${agentResult.agentId}_${Date.now()}.html`;
    a.click();
  
    // ניקוי זיכרון
    URL.revokeObjectURL(url);
  }
  