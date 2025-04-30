<!DOCTYPE html>
<html lang="he">
<head>
  <meta charset="UTF-8">
  <title>תוצאות סוכנים</title>
  <style>
    body {
      background-color: #111;
      color: #0f0;
      font-family: 'Courier New', monospace;
      padding: 30px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      border: 1px solid #0f0;
      padding: 10px;
      text-align: center;
    }
    th {
      background-color: #0a0;
    }
  </style>
</head>
<body>
  <h1>תוצאות סוכנים</h1>
  <table id="resultsTable">
    <thead>
      <tr>
        <th>ID סוכן</th>
        <th>סטטוס</th>
        <th>תוצאה</th>
        <th>תאריך</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>

  <!-- טעינת הסקריפט -->
  <script src="js/resultsLoader.js"></script>
</body>
</html>
