// moduleRunner.js

async function runModule(moduleName) {
  try {
    const response = await fetch(`../modules/${moduleName}.json`);
    const data = await response.json();

    logModuleInfo(data);

    switch (moduleName) {
      case 'BreakCore':
        runBreakCore(data);
        break;
      case 'MindReader':
        runMindReader(data);
        break;
      // תוסיף כאן מקרים נוספים למודולים הבאים
      default:
        console.warn("Module not recognized");
    }

  } catch (error) {
    console.error(`Error loading module ${moduleName}:`, error);
  }
}

function logModuleInfo(module) {
  console.log(`✅ מודול הופעל: ${module.name}`);
  console.log(`ℹ️ תיאור: ${module.description}`);
  console.log(`⭐ יכולות עיקריות: ${module.features.join(', ')}`);
}

// פונקציית דמה להרצת BreakCore
function runBreakCore(data) {
  alert("BreakCore מופעל:\n" + data.features.join('\n'));
}

// פונקציית דמה להרצת MindReader
function runMindReader(data) {
  alert("MindReader מופעל:\n" + data.features.join('\n'));
}
