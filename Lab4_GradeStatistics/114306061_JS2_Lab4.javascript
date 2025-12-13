const submitBtn = document.getElementById("submitBtn");
const mathInput = document.getElementById("mathGrade");
const englishInput = document.getElementById("englishGrade");
const gradeTableBody = document.querySelector("#gradeTable tbody");
const averageRow = document.getElementById("averageRow");
const avgMathDisplay = document.getElementById("avgMath");
const avgEnglishDisplay = document.getElementById("avgEnglish");
const avgOverallDisplay = document.getElementById("avgOverall");

function updateColumnAverages() {
    const rows = gradeTableBody.querySelectorAll("tr");
    const rowCount = rows.length;

    if (rowCount === 0) {
        averageRow.style.display = "none";
        return;
    }

    averageRow.style.display = "";

    let totalMath = 0;
    let totalEnglish = 0;
    
    // 總平均不應從行平均累積，而應從總分直接計算以保持精確度
    let totalScoreSum = 0; 

    rows.forEach(row => {
        // cells[0]是#，cells[1]是Math，cells[2]是English，cells[3]是Average
        const cells = row.querySelectorAll("td");
        totalMath += parseFloat(cells[1].textContent);
        totalEnglish += parseFloat(cells[2].textContent);
    });
    
    totalScoreSum = totalMath + totalEnglish;

    const avgMath = totalMath / rowCount;
    const avgEnglish = totalEnglish / rowCount;
    const avgOverall = totalScoreSum / (rowCount * 2);

    avgMathDisplay.textContent = avgMath.toFixed(2);
    avgEnglishDisplay.textContent = avgEnglish.toFixed(2);
    avgOverallDisplay.textContent = avgOverall.toFixed(2);
}

submitBtn.addEventListener("click", function () {
    const mathGrade = parseFloat(mathInput.value);
    const englishGrade = parseFloat(englishInput.value);

    // 驗證輸入，確保它是有效的數字且在 0-100 範圍內
    if (isNaN(mathGrade) || isNaN(englishGrade) || mathGrade < 0 || mathGrade > 100 || englishGrade < 0 || englishGrade > 100) {
        alert("請輸入有效的數學和英文成績 (0-100)。");
        return;
    }

    const rowAverage = (mathGrade + englishGrade) / 2;
    const newRow = gradeTableBody.insertRow();
    const rowCount = gradeTableBody.rows.length;

    // 新增資料列
    // 這裡的 index 是從 0 開始，所以要確保與 HTML 表格的 cells 順序一致
    newRow.insertCell().textContent = rowCount;             // #
    newRow.insertCell().textContent = mathGrade.toFixed(2);  // Math
    newRow.insertCell().textContent = englishGrade.toFixed(2); // English
    newRow.insertCell().textContent = rowAverage.toFixed(2); // Average (數學＋英文）／２

    // 清空輸入框
    mathInput.value = "";
    englishInput.value = "";

    // 更新所有平均值
    updateColumnAverages();
});

// 頁面載入時執行一次，以確保初始狀態下平均值行是隱藏的
updateColumnAverages();