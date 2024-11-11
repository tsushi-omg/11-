//変数定義
var keywordBox;
var dictionary;
var dictionaries;
var addWindow;
var addTitleBox;
var addLinkBox;
var addButton;
var dataText;
var editMode=false;
var editButton;

var editWindow;
var editTitleBox;
var editLinkBox;
var idLabel;
var data;
let array =[];
var editDeleteButton;
var deleteKakuninWindow;
var memoTableTbody;
var inputMemo;
var inputBunrui;
var bunruiSort;

//変数定義関数
function hensu(){
    keywordBox=document.getElementById('keywordBox');
    dictionary=document.getElementById('dictionary');
    dictionaries=document.getElementById('dictionaries');
    addWindow=document.getElementById('addWindow');
    addTitleBox=document.getElementById('addTitleBox');
    addLinkBox=document.getElementById('addLinkBox');
    addButton=document.getElementById('addButton');
    dataText=document.getElementById('dataText');
    editButton=document.getElementById('editButton');

    editWindow=document.getElementById('editWindow');
    editTitleBox=document.getElementById('editTitleBox');
    editLinkBox=document.getElementById('editLinkBox');
    idLabel=document.getElementById('idLabel');
    editDeleteButton=document.getElementById('editDeleteButton');
    deleteKakuninWindow=document.getElementById('deleteKakuninWindow');
    memoTableTbody=document.getElementById('memoTableTbody');
    inputMemo=document.getElementById('inputMemo');
    inputBunrui=document.getElementById('inputBunrui');
    bunruiSort=document.getElementById('bunruiSort');
}


// addボタンクリック時
function addButtonEvent(){
    addWindow.hidden=false;
}

//登録ウィンドウ×ボタン押下時
function closeAddWindow(){
    addWindow.hidden=true;
}

//登録ボタン押下時
function toroku(){

    //未入力チェック
    if(addTitleBox.value=="" || addLinkBox.value==""){
        alert("未入力内容があります");
        return;
    }

    //データ文作成
    var text = "=---="+randomID() + "!===!" + addTitleBox.value + "!===!" + addLinkBox.value + "!===!";

    //データ保存
    dataText.value += text;

    //入力クリア
    addTitleBox.value="";
    addLinkBox.value="";

    //ウィンドウ非表示
    addWindow.hidden=true;

    //データ文読込み
    load();

}

//７桁ID生成
function randomID() {
    // 1000000 以上 9999999 以下の乱数を生成
    var id = Math.floor(1000000 + Math.random() * 9000000);

    if(dataText.value.indexOf(id,0) != -1){
        return randomID();
    }

    return id;
}

//データ文読込
function load(){

    deleteContents();

    data = dataText.value;

    savaStrage(data);

    //データ数をカウント--ok
    var count = 0;
    var start=0;
    for(let i = 0; i <= 1000; i++){
        if(data.indexOf("=---=",start) != -1){
            count++;
            //位置更新
            start=data.indexOf("=---=",start)+2;
        }else{
            break;
        }
    };

    //div作成 =---=id!===!title!===!link!===!
    start=0;

    var id;
    var title;
    var link;

    for(let i = 1; i <= count; i++){

        //情報取得--ok
        id=data.substring(data.indexOf("=---=",start)+5,data.indexOf("=---=",start)+12);
        start=data.indexOf("=---=",start)+5;
        title=data.substring(data.indexOf("!===!",start)+5,data.indexOf("!===!",data.indexOf("!===!",start)+5));
        start=data.indexOf(title,start);
        link=data.substring(data.indexOf("!===!",start)+5,data.indexOf("!===!",data.indexOf("!===!",start)+5));

        //位置更新--ook
        start=data.indexOf("!===!",data.indexOf("!===!",start)+7);
        
        //生成  target="_blank" rel="noopener noreferrer" href="
        const divElement = document.createElement('div');
        dictionaries.appendChild(divElement);
        
        const element = document.createElement('a');
        element.textContent=title;
        element.name = 'divData';
        element.classList.add('divData');
        element.target = "_blank";
        element.rel = "noopener noreferrer";
        element.href = link;
        // element.onclick = function(){
        //     if(editMode==true){
        //         event.preventDefault();
        //         goEdit(id,title,link);
        //     }
        // };
        element.addEventListener('click', (function(id, title, link) {
            return function(event) {
                if (editMode === true) {
                    event.preventDefault();
                    goEdit(id, title, link);
                }
            };
        })(id, title, link));
        
        divElement.appendChild(element); 

    }

    //メモコンテンツ読込み
    loadMemo();

}


//メモ読込
function loadMemo(){

    data = dataText.value;

    //データ数をカウント--ok
    var count = 0;
    var start=0;
    for(let i = 0; i <= 1000; i++){
        if(data.indexOf("#--?start?--#",start) != -1){
            count++;
            //位置更新
            start=data.indexOf("#--?start?--#",start)+10;
        }else{
            break;
        }
    };

    //メモデータ作成 #--?start?--# ?^^id=〇〇^^? ?^^記載日=〇〇^^? ?^^分類=〇〇^^? ?^^メモ=〇〇^^? ?^^状態=〇〇^^?
    start=0;

    var id,date,bunrui,memo,zyotai;

    for(let i = 1; i <= count; i++){

        //情報取得 --ok
        //id --ok
        start=data.indexOf("?^^id=",start)+5;
            var a = start;//id=←
        start=data.indexOf("^^?",start);
            var b = start;//id=　→^^?
        id=data.substring(a+1,b);

        //date --ok
        start=data.indexOf("?^^記載日=",start)+6;
            var c = start;//記載日=←
        start=data.indexOf("^^?",start);
            var d = start;//記載日=　→^^?
        date=data.substring(c+1,d);

        //bunrui --ok
        start=data.indexOf("?^^分類=",start)+5;
            var e = start;//分類=←
        start=data.indexOf("^^?",start);
            var f = start;//分類=　→^^?
        bunrui=data.substring(e+1,f);

        //memo --ok
        start=data.indexOf("?^^メモ=",start)+5;
            var g = start;//メモ=←
        start=data.indexOf("^^?",start);
            var h = start;//メモ=　→^^?
        memo=data.substring(g+1,h);

        //zyotai --ok
        start=data.indexOf("?^^状態=",start)+5;
            var j = start;//状態=←
        start=data.indexOf("^^?",start);
            var k = start;//状態=　→^^?
        zyotai=data.substring(j+1,k);
        
        
        //生成
        //tr生成
        const tr = document.createElement('tr');
        tr.classList.add('memoContent');
        memoTableTbody.appendChild(tr);

        //記載日
        const th = document.createElement('td');
        th.textContent=date;
        th.style.color="rgb(255, 255, 255)";
        tr.appendChild(th);

        //分類
        const th2 = document.createElement('td');
        th2.textContent=bunrui;
        th2.style.color="rgb(255, 255, 255)";
        tr.appendChild(th2);

        //メモ
        const th3 = document.createElement('td');
        th3.textContent=memo;
        th3.style.color="rgb(255, 255, 255)";
        tr.appendChild(th3);

        //済／未ボタン　親td
        const th4 = document.createElement('td');
        th4.style.color="rgb(255, 255, 255)";
        tr.appendChild(th4);

        //タスク・予定のときは済／未ボタン
        let th5;
        if(bunrui=="タスク" || bunrui=="予定"){
            th5 = document.createElement('button');
            if(zyotai=="未"){
                th5.classList.add('tdButtonOff');
            }else{
                th5.classList.add('tdButtonOn');
            }
            th5.classList.add('ml-2');
            th5.textContent=zyotai;
            th5.style.userSelect="none";
            th5.style.outline="none";

        // 現在のidの値をイベントリスナーに渡す
        const currentId = id; // ここで現在のidを保存

        th5.addEventListener('click', function(event) {
            const button = event.currentTarget; // クリックされたボタンを取得
            if (button.textContent === "未") {
                button.classList.remove('tdButtonOff');
                button.classList.add('tdButtonOn');
                button.textContent = "済";
                editByButton(currentId, "未");  // currentIdを渡す
            } else {
                button.classList.remove('tdButtonOn');
                button.classList.add('tdButtonOff');
                button.textContent = "未";
                editByButton(currentId, "済");  // currentIdを渡す
            }
        });
            
        }else{
            th5 = document.createElement('td');
            th5.style.color="rgb(255, 255, 255)";
            th5.style.border="none";
            th5.textContent="ー";
        }
        th4.appendChild(th5);

    }
    judge();
    judgeLink();
}




//コンテンツクリア
function deleteContents(){
    var array = document.getElementsByClassName('divData');
    while (array.length > 0) {
        array[0].remove();
    }
    var array = document.getElementsByClassName('memoContent');
    while (array.length > 0) {
        array[0].remove();
    }
}

//inputイベント　データ文

function inputEventDataText(){
    dataText.addEventListener("input",function(event){

        load();

    });

}

//inputイベント　リンク

function inputEvent(){
    keywordBox.addEventListener("input",function(event){

        

        judgeLink();
        


    });

}

function judgeLink(){
    var array = document.getElementsByClassName('divData'); 
    for(let i = 0; i < array.length; i++){
        if(array[i].textContent.indexOf(keywordBox.value) != -1){
            array[i].hidden=false;
        }else{
            array[i].hidden=true;
        }
    }
}



//inputイベント　メモ-分類--ok

function inputEventMemoBunrui(){
    bunruiSort.addEventListener("input",function(event){
        judge();
    });
}

//inputイベント　メモ内容--ok

function inputEventMemoNaiyo(){
    memoSort.addEventListener("input",function(event){
        judge();
    });

}

//inputイベント　状態--ok

function inputEventMemoJotai(){
    zyotaiSort.addEventListener("input",function(event){
        judge();
    });

}

function judge(){
    var array = document.getElementsByClassName('memoContent');
    for(let i = 0; i < array.length; i++){
        if((array[i].children[1].textContent.indexOf(bunruiSort.value) != -1) && (array[i].children[2].textContent.indexOf(memoSort.value) != -1) && (array[i].children[3].textContent.indexOf(zyotaiSort.value) != -1)){
            array[i].hidden=false;
        }else{
            array[i].hidden=true;
        }
    }
}

function setSort(){
    setInterval(() => {
      judge();
      judgeLink();
    }, 100);
}


//ctrl + enterでキーワードにフォーカス
document.addEventListener("keydown", function(event) {
    //判定
    if (event.ctrlKey && event.key === "Enter") {
        event.preventDefault();//デフォルトの動作を無効化
            keywordBox.focus();
    }
});



//編集ボタン押下時
function modeSwitch(){
    if(!editMode){//編集モードへ移行
        editButton.classList.add('isEdit');
        editMode=true;
    }else{//すでに編集モード
        editButton.classList.remove('isEdit');
        editMode=false;
    }
}

//編集ウィンドウ閉じる
function closeeditWindow(){
    editWindow.hidden=true;
}

//編集モード時にリンククリック
function goEdit(id,title,link){
    editTitleBox.value=title;
    editLinkBox.value=link;
    editWindow.hidden=false;
    idLabel.textContent=id;
}

//登録ボタン押下時
function toroku(){

    //未入力チェック
    if(addTitleBox.value=="" || addLinkBox.value==""){
        alert("未入力内容があります");
        return;
    }

    //データ文作成
    var text = "=---="+randomID() + "!===!" + addTitleBox.value + "!===!" + addLinkBox.value + "!===!";

    //データ保存
    dataText.value += text;

    //入力クリア
    addTitleBox.value="";
    addLinkBox.value="";

    //ウィンドウ非表示
    addWindow.hidden=true;

    //データ文読込み
    load();
}


//修正確定処理--ok
function syuse(){

    //ボックス読込
    initArray();

    data=dataText.value;

    //未入力チェック
    if(editTitleBox.value=="" || editLinkBox.value==""){
        alert("未入力内容があります");
        return;
    }

    //変数定義
    var title=editTitleBox.value;
    var link=editLinkBox.value;
    var id=idLabel.textContent;

    //データ文編集  =---=id!===!  title!===!link  !===!
    //削除
    var start=0;
    var startD,endD;
    start = data.indexOf(id,start);
    start = data.indexOf('!===!',start)+5;//→title
    startD=start;
    start = data.indexOf('!===!',start)+5;//→!===!link
    start = data.indexOf('!===!',start)-1;//link←!===!
    endD=start;
    for(let i = startD; i <= endD; i++){
        array[i]="";
    }
    //置換
    array[startD]=title+'!===!'+link;

    //data更新
    inArray();

    //データ文更新
    dataText.value=data;
    
    //ウィンドウ非表示
    editWindow.hidden=true;

    //データ文読込み
    load();
}


//削除ボタン押下時 --ok
function sakujo(){
    //確認ウィンドウ表示
    deleteKakuninWindow.hidden=false;
    editWindow.hidden=true;
}

//削除実行 --ok
function sakujoExe(){

        //ボックス読込
        initArray();

        data=dataText.value;
    
        //変数定義
        var id=idLabel.textContent;
    
        //データ文編集  =---=id!===!  title!===!link  !===!
        //削除
        var start=0;
        var startD,endD;
        start = data.indexOf(id,start)-5;
        startD=start;
        start = data.indexOf('!===!',start)+5;
        start = data.indexOf('!===!',start)+5;
        start = data.indexOf('!===!',start)+4;//link!===!　←
        endD=start;
        for(let i = startD; i <= endD; i++){
            array[i]="";
        }
    
        //data更新
        inArray();
    
        //データ文更新
        dataText.value=data;
        
        //ウィンドウ非表示
        editWindow.hidden=true;
        deleteKakuninWindow.hidden=true;
    
        //データ文読込み
        load();

}

//削除取消 --ok
function sakujoNo(){
    //確認ウィンドウ非表示
    deleteKakuninWindow.hidden=true;
    editWindow.hidden=false;
}


//メモ追加ボタン
function addMemo(){

    var text = inputMemo.value;
    var bunrui = inputBunrui.value;

    if(text==""){
        alert("メモ内容は空白にできません");
        return;
    }

    if(bunrui==""){
        bunrui="ー";
    }

    //tr生成
    const tr = document.createElement('tr');
    tr.classList.add('memoContent');
    memoTableTbody.appendChild(tr);

    //記載日
    const th = document.createElement('td');
    th.textContent=getCurrentDate();
    th.style.color="rgb(255, 255, 255)";
    tr.appendChild(th);

    //分類
    const th2 = document.createElement('td');
    th2.textContent=bunrui;
    th2.style.color="rgb(255, 255, 255)";
    tr.appendChild(th2);

    //メモ
    const th3 = document.createElement('td');
    th3.textContent=text;
    th3.style.color="rgb(255, 255, 255)";
    tr.appendChild(th3);

    //済／未ボタン　親td
    const th4 = document.createElement('td');
    th4.style.color="rgb(255, 255, 255)";
    tr.appendChild(th4);

    //タスク・予定のときは済／未ボタン
    let th5;
    if(bunrui=="タスク" || bunrui=="予定"){
        th5 = document.createElement('button');
        th5.classList.add('tdButtonOff');
        th5.classList.add('ml-2');
        th5.textContent="未";
        th5.style.userSelect="none";
        th5.style.outline="none";
    }else{
        th5 = document.createElement('td');
        th5.style.color="rgb(255, 255, 255)";
        th5.style.border="none";
        th5.textContent="ー";
    }
    th4.appendChild(th5);

    //ボックスクリア
    inputBunrui.value="";
    inputMemo.value="";

    //データ文編集　#--?start?--# ?^^id=^^? ?^^記載日=^^? ?^^分類=^^? ?^^メモ=^^? ?^^状態=^^? ※半角スペースは実際には含まない
    data=dataText.value;

    //データ文作成 --ok
    var resultData = "#--?start?--#?^^id="+randomID()+"^^??^^記載日="+th.textContent+"^^??^^分類="+bunrui+"^^??^^メモ="+text+"^^??^^状態="+th5.textContent+"^^?";

    //データ保存
    dataText.value += resultData;

    //データ文読込み
    load();
    
}


//現在の年月日を返す関数
function getCurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月が0から始まるので+1
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}

// クリップボードにコピーする関数
function clipCopy(text) {
    var textnew = document.getElementById(text).value;
    navigator.clipboard.writeText(textnew)
        .then(() => {
            alert('クリップボードにコピーしました');
        })
        .catch(err => {
            alert('コピーに失敗しました: ' + err);
        });
}


//未・済ボタンクリック時にデータ文書き換え
function editByButton(id,jotai){

    //ボックス読込
    initArray();

    data=dataText.value;

    //編集　#--?start?--# ?^^id=〇〇^^? ?^^記載日=〇〇^^? ?^^分類=〇〇^^? ?^^メモ=〇〇^^? ?^^状態=〇〇^^?
    var start=0;
    var a;
    start=data.indexOf(id,start);
    switch(jotai){
        case "未":
            start=data.indexOf("?^^状態=",start)+6;
            a=start;
            array[a]="済";
            break;
        case "済":
            start=data.indexOf("?^^状態=",start)+6;
            a=start;
            array[a]="未";
            break;
        default:
            alert("無効です");
    }

    //data更新
    inArray();

    //データ文更新
    dataText.value=data;

    //データ文読込み
    load();

}









//配列＆再格納
function inArray(){
    var code = array.join("");
    //配列クリア
    array.length=0;
    //再格納
    for(let i = 0; i <= code.length; i++){
        array[i]=code[i];
    };
    data=array.join("");

};


//配列に格納
function initArray(){
    for(let i = 0; i <= data.length; i++){
        array[i]=data[i];
    }
};

//ローカルストレージ
//保存
function savaStrage(data){
    localStorage.setItem("saveData",data);
}

//読込
function readStrage(){
    var readData = localStorage.getItem("saveData");
    dataText.value=readData;
}
