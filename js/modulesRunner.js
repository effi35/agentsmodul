function activateModule(moduleName) {
    fetch(`../modules/${moduleName}.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`מודול ${moduleName} לא נמצא`);
        }
        return response.json();
      })
      .then(data => {
        console.log(`✅ מודול הופעל: ${data.name}`);
        console.log(`📚 תיאור: ${data.description}`);
        console.log(`⚡ פיצ'רים: ${data.features.join(', ')}`);
        alert(`המודול ${data.name} הופעל בהצלחה!`);
      })
      .catch(error => {
        console.error(`שגיאה בהפעלת המודול ${moduleName}:`, error);
        alert(`❌ שגיאה בהפעלת המודול ${moduleName}`);
      });
  }
  