var type = '<th>類別</th> <td class="options"><div class="option" data-value="0">功課</div> <div class="option" data-value="1">小考</div> <div class="option" data-value="2">週考或段考</div> <div class="option" data-value="3">提醒事項</div> <div class="option" data-value="4">連結</div> </td>';
var subject = '<th>科目</th> <td class="options"> <div class="option" data-value="chi">國文</div> <div class="option" data-value="eng">英文</div> <div class="option" data-value="mat">數學</div> <div class="option" data-value="phy">物理</div> <div class="option" data-value="che">化學</div> <div class="option" data-value="bio">生物</div> <div class="option" data-value="geos">地科</div> <div class="option" data-value="his">歷史</div> <div class="option" data-value="geo">地理</div> <div class="option" data-value="cit">公民</div> <div class="option" data-value="art">美術</div> <div class="option" data-value="hrt">班導</div> <div class="option" data-value="coa">輔導</div> <div class="option" data-value="me">資訊股長提醒</div> <div class="option" data-value="pe">體育</div> </td>';
var textinput = '<th>內容</th> <td class="options"> <input id="input1" type="text"> </td>';
var dateinput = '<th>日期</th> <td class="options"> <input id="input1" type="date" > </td>';
var range = "<th>範圍</th> <td class='options'> 從id=<input id='input1' type='text'> 到id=<input id='input2' type='text'> </td>";
var password = '<th>密碼</th> <td class="options"> <input id="input2" type="password"> </td>';
var title = '<th>標題</th> <td class="options"> <input id="input1" type="text" value="today"> </td>';
var id = '<th>id</th> <td class="options"> <input id="input2" type="text"> </td>';
var display = ''

function update() {
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
}
// 依據第一列的內容改變表格內容
let commands = document.querySelectorAll(".command");
for (let command of commands) { 
    command.addEventListener("click", function() {
        let row = command.parentElement;
        // 移除該列所有選項的selected類別
        for (let child of row.children) {
            child.classList.remove("selected");
        }
        // 為當前選項添加selected類別
        command.classList.add("selected");
        var html = '';
        var content = document.getElementById("content");
        while(content.rows.length > 2)
        {
            content.deleteRow(2);
        }
        var tr;
        if (command.dataset.value == "add")
        {
            tr = document.createElement("tr");
            content.appendChild(tr);
            tr.innerHTML = type;
            tr = document.createElement("tr");
            content.appendChild(tr);
            tr.innerHTML = subject;
            tr = document.createElement("tr");
            content.appendChild(tr);
            tr.innerHTML = textinput;
        }
        else if (command.dataset.value == "show" || command.dataset.value == "show_id")
        {
            tr = document.createElement("tr");
            content.appendChild(tr);
            tr.innerHTML = dateinput;
        }
        else if (command.dataset.value == "remove" || command.dataset.value == "add_old")
        {
            tr = document.createElement("tr");
            content.appendChild(tr);
            tr.innerHTML = range;
        }
        else if (command.dataset.value == "change")
        {
            tr = document.createElement("tr");
            content.appendChild(tr);
            tr.innerHTML = id;
            tr = document.createElement("tr");
            content.appendChild(tr);
            tr.innerHTML = textinput;
        }
        else
        {
            tr = document.createElement("tr");
            content.appendChild(tr);
            tr.innerHTML = title;
            tr = document.createElement("tr");
            content.appendChild(tr);
            tr.innerHTML = password;
        }
        update();
    });
}

// 提交表單
async function submitForm() {
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
        if (title == "內容" || title == "標題")
        {
            input1 =  document.getElementById("input1");
            if  (input1.value != "")
            {
                formData[title] = input1.value;
            }
        }
        if (title == "日期")
        {
            input1 =  document.getElementById("input1");
            if  (input1.value != "")
            {
                formData[title] = input1.value.replaceAll('-', '/');
            }
        }
        if (title == "密碼")
        {
            input2 =  document.getElementById("input2");
            if  (input2.value != "")
            {
                formData[title] =  input2.value;
            }
        }
        if (title == "id")
        {
            input2 =  document.getElementById("input2");
            if  (input2.value != "")
            {
                formData[title] =  input2.value;
            }
        }
        if (title == "範圍")
        {
            input1 =  document.getElementById("input1");
            input2 =  document.getElementById("input2");
            if  (input1.value != "" && input2.value != "")
            {
                formData[title] = input1.value + ' ' + input2.value;
            }
        }
        // 如果該行沒有被選中的選項，則提示使用者並返回
        if (!formData[title]) {
            if (title == "聯絡簿內容")
                continue;
            if (title != "內容" && title != "密碼" && title != "日期" && title != "範圍")
                alert("請選擇" + title);
            else
                alert("請填寫"+title);
            return;
        }
    }
    send = ''
    for (var key in formData) 
    {
        send += formData[key] + ' ';
    }
    result = await eel.receive(send)();
    area = document.getElementById("display");
    if (result == 'finished!')
        result = await eel.receive("show today")();
    area.value = result;
    cancelSelection();
}


// 定義一個函數，用來取消所有選項的選取狀態
function cancelSelection() {
    let options = document.querySelectorAll(".option");
    for (let option of options) {
        option.classList.remove("selected");
    }
    let input1 = document.getElementById("input1");
    input1.value = "";
    var content = document.getElementById("content");
    while(content.rows.length > 2)
    {
        content.deleteRow(2);
    }
}