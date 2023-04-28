// 獲取所有的選項元素
let options = document.querySelectorAll(".option");
// 為每個選項元素添加點擊事件監聽器
for (let option of options) {
option.addEventListener("click", function() {
    let row = option.parentElement;
    // 移除該列所有選項的selected類別
    for (let child of row.children) {
        child.classList.remove("selected");
    }
    // 為當前選項添加selected類別
    option.classList.add("selected");
});
}
// 提交表單
function submitForm() {
let formData = {};
let rows = document.querySelectorAll("tr");
for (let row of rows) {
    let title = row.querySelector("th").innerText;
    let options = row.querySelectorAll(".option");
    for (let option of options) {
        if (option.classList.contains("selected")) {
            formData[title] = option.dataset.value;
            break;
        }
    }
    if (title == "內容")
    {
        input1 =  document.getElementById("input1");
        if  (input1.value != "")
        {
            formData[title] = document.getElementById("input1").value;
        }
    }
    // 如果該行沒有被選中的選項，則提示使用者並返回
    if (!formData[title]) {
        if (title != "內容")
            alert("請選擇" + title);
        else
            alert("請填寫"+title);
        return;
    }
}
}

// 定義一個函數，用來取消所有選項的選取狀態
function cancelSelection() {
    let options = document.querySelectorAll(".option");
    for (let option of options) {
        option.classList.remove("selected");
    }
    let input1 = document.getElementById("input1");
    input1.value = "";
}