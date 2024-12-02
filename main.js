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
var shortCutSelect;
var linkKensu;
var memoKensu;
var dateSort;
var switchButton;
var editorArea;
var memoArea;
var editTargetArea;
var hikakuTarget;
var functionSelect;
var hikakuFunction;
var rowCopyFunction;
var rowCopyButtonDiv;
var tikanFunction;
var beforTikanText;
var afterTikanText;
var undoButton;
var redoButton;
var targetKensuLabel;
var menuWindow;
var renderLink;
var renderData;
var renderWorking;
var dataArea;
var workingArea;
var renderBG;

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
    shortCutSelect=document.getElementById('shortCutSelect');
    linkKensu=document.getElementById('linkKensu');
    memoKensu=document.getElementById('memoKensu');
    dateSort=document.getElementById('dateSort');
    switchButton=document.getElementById('switchButton');
    editorArea=document.getElementById('editorArea');
    memoArea=document.getElementById('memoArea');
    editTargetArea=document.getElementById('editTargetArea');
    hikakuTarget=document.getElementById('hikakuTarget');
    hikakuResult=document.getElementById('hikakuResult');
    functionSelect=document.getElementById('functionSelect');
    hikakuFunction=document.getElementById('hikakuFunction');
    rowCopyFunction=document.getElementById('rowCopyFunction');
    rowCopyButtonDiv=document.getElementById('rowCopyButtonDiv');
    tikanFunction=document.getElementById('tikanFunction');
    beforTikanText=document.getElementById('beforTikanText');
    afterTikanText=document.getElementById('afterTikanText');
    undoButton=document.getElementById('undoButton');
    redoButton=document.getElementById('redoButton');
    targetKensuLabel=document.getElementById('targetKensuLabel');
    menuWindow=document.getElementById('menuWindow');
    renderLink=document.getElementById('renderLink');
    renderData=document.getElementById('renderData');
    renderWorking=document.getElementById('renderWorking');
    dataArea=document.getElementById('dataArea');
    workingArea=document.getElementById('workingArea');
    renderBG=document.getElementById('renderBG');
    
}


// テスト用関数
function forTest(){
    rowCopyFunctionEvent();
}


//文字列変換用配列(small英字　large英字　small数字　large数字)

// const smallEn = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "g"];

// const largeEn = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "G"];

const smallNum=[0,1,2,3,4,5,6,7,8,9];

const largeNum=["０","１","２","３","４","５","６","７","８","９"];



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


//セーブボタン存在判定
var isSaveButton=false;

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

            //メモ親
            const th3 = document.createElement('td');
            tr.appendChild(th3);

            //イベントリスナーに渡す用
            const thisID = id;

            // メモ　テキストエリア
            const mmemoArea = document.createElement('textarea');
            mmemoArea.textContent=memo;
            mmemoArea.readOnly=false;
            mmemoArea.style.color="rgb(255, 255, 255)";
            mmemoArea.classList.add('forMemo');
            mmemoArea.addEventListener('input',function(event){
                adjustHeight(this);
                if(isSaveButton==false){
                    saveButton.hidden=false;
                    isSaveButton=true;
                }
            })
            th3.appendChild(mmemoArea);
            adjustHeight(mmemoArea);

            //保存ボタン
            const saveButton = document.createElement('button');
            saveButton.textContent="save";
            saveButton.hidden=true;
            saveButton.style.outline="none";
            saveButton.classList.add('tagButton');
            saveButton.addEventListener('click',function(event){
                correctMemo(thisID,mmemoArea);
                this.hidden=true;
                isSaveButton=false;
            })
            th3.appendChild(saveButton);

        //済／未ボタン　親td
        const th4 = document.createElement('td');
        th4.style.color="rgb(255, 255, 255)";
        tr.appendChild(th4);

        // 現在のidの値をイベントリスナーに渡す
        const currentId = id; // ここで現在のidを保存

        //タスク・予定・臨時のときは済／未ボタン
        let th5;
        if (bunrui.indexOf("タスク") !== -1 || bunrui.indexOf("予定") !== -1 || bunrui.indexOf("臨時") !== -1) {
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

        // // 現在のidの値をイベントリスナーに渡す
        // const currentId = id; // ここで現在のidを保存

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

        //消去ボタン
        //親
        const th6 = document.createElement('td');
        tr.appendChild(th6);
        //ボタン
        const th7 = document.createElement('button');
        th7.textContent="消去";
        th7.classList.add("meisaiDeleteButton");
        th7.style.color="rgb(255, 255, 255)";
        th7.style.outline="none";
        th7.addEventListener("click",function(event){
            deleteMemo(currentId);
        });
        th6.appendChild(th7);

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
    var count=0;
    for(let i = 0; i < array.length; i++){
        if(convertSmallNum(array[i].textContent.toLowerCase()).indexOf(convertSmallNum(keywordBox.value.toLowerCase())) != -1){
            array[i].hidden=false;
            count++;
        }else{
            array[i].hidden=true;
        }
    }
    linkKensu.textContent=`(${count}件)`
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

//inputイベント　記載日

function inputEventMemoDate(){
    dateSort.addEventListener("input",function(event){
        judge();
    });

}

function judge(){
    var array = document.getElementsByClassName('memoContent');
    var count=0;
    for(let i = 0; i < array.length; i++){
        if((convertSmallNum(array[i].children[1].textContent.toLowerCase()).indexOf(convertSmallNum(bunruiSort.value.toLowerCase())) != -1) && (convertSmallNum(array[i].children[2].textContent.toLowerCase()).indexOf(convertSmallNum(memoSort.value.toLowerCase())) != -1) && (convertSmallNum(array[i].children[3].textContent.toLowerCase()).indexOf(convertSmallNum(zyotaiSort.value.toLowerCase())) != -1) && array[i].children[0].textContent.indexOf(dateSort.value) != -1){
            array[i].hidden=false;
            count++;
        }else{
            array[i].hidden=true;
        }
    }
    memoKensu.textContent=`(${count}件)`;
}

//inputイベント　ショートカットセレクト

function inputEventShortCutSelect(){
    shortCutSelect.addEventListener("input",function(event){
        
        switch(shortCutSelect.value){
            case '':
                bunruiSort.value="";
                memoSort.value="";
                zyotaiSort.value="";
                load();
                break;

            case '未タスク':
                bunruiSort.value="タスク";
                memoSort.value="";
                zyotaiSort.value="未";
                load();
                break;

            case '未予定':
                bunruiSort.value="予定";
                memoSort.value="";
                zyotaiSort.value="未";
                load();
                break;
        }

    });

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
    // th3.textContent=text;
    // th3.style.color="rgb(255, 255, 255)";
    tr.appendChild(th3);

    

    //済／未ボタン　親td
    const th4 = document.createElement('td');
    th4.style.color="rgb(255, 255, 255)";
    tr.appendChild(th4);

    //タスク・予定・臨時が含まれるときは済／未ボタン
    let th5;
    if (bunrui.indexOf("タスク") !== -1 || bunrui.indexOf("予定") !== -1 || bunrui.indexOf("臨時") !== -1) {
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

    //消去ボタン
    //親
    const th6 = document.createElement('td');
    tr.appendChild(th6);
    //ボタン
    const th7 = document.createElement('button');
    th7.textContent="消去";
    th7.classList.add("meisaiDeleteButton");
    th7.style.color="rgb(255, 255, 255)";
    th7.style.outline="none";
    th6.appendChild(th7);

    //ボックスクリア
    inputBunrui.value="";
    inputMemo.value="";

    //データ文編集　#--?start?--# ?^^id=^^? ?^^記載日=^^? ?^^分類=^^? ?^^メモ=^^? ?^^状態=^^? ※半角スペースは実際には含まない
    data=dataText.value;

    //データ文作成 --ok
    var resultData = "#--?start?--#?^^id="+randomID()+"^^??^^記載日="+th.textContent+"^^??^^分類="+bunrui+"^^??^^メモ="+text+"^^??^^状態="+th5.textContent+"^^?";

    //データ保存
    // dataText.value += resultData;
    dataText.value = resultData+dataText.value;

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

// クリップボードにコピーする関数 id引数
function clipCopy(text) {
    var textnew = document.getElementById(text).value;
    navigator.clipboard.writeText(textnew)
        .then(() => {
            // alert('クリップボードにコピーしました');
        })
        .catch(err => {
            alert('コピーに失敗しました: ' + err);
        });
}

// クリップボードにコピーする関数 ※変数引数　アラート無し
function clipCopyShort(text) {
    var textnew = text;
    navigator.clipboard.writeText(textnew)
        .then(() => {
            // alert('クリップボードにコピーしました');
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

//タグボタン
function tagAction(tag){
    inputBunrui.value+=tag;
    inputBunrui.value+="　";
    bunruiSort.value=tag;
    if(tag=='クリア'){
        inputBunrui.value="";
        bunruiSort.value="";
        memoSort.value="";
        zyotaiSort.value="";
        dateSort.value="";
    }
    inputMemo.focus();
    load();
}

//機能切替ボタン
var functionKubun=0;
function switchFunction(){
    if(functionKubun==0){
        functionKubun=1;
        memoArea.hidden=true;
        editorArea.hidden=false;
        editTargetArea.focus();
    }else{
        functionKubun=0;
        memoArea.hidden=false;
        editorArea.hidden=true;
    }
};

// 比較
function hikaku(){
    if(hikakuTarget.value==editTargetArea.value){
        hikakuResult.textContent="一致";
        hikakuResult.style.color="aqua";
    }else{
        hikakuResult.textContent="不一致";
        hikakuResult.style.color="red";
    }
    //空文字
    if(hikakuTarget.value=="" && editTargetArea.value==""){
        hikakuResult.textContent="ー";
        hikakuResult.style.color="white";
    }
}

function hikakuTargetEvent(){
    hikakuTarget.addEventListener("input",function(event){
        hikaku();
    })
};

function editTargetAreaEvent(){
    editTargetArea.addEventListener("input",function(event){
        hikaku();//比較
        rowCopyFunctionEvent();//行別コピー
        saveEditTarget();//入力保持
        updateKensu();//置換対象件数　更新
    })
};


// 機能別にテキストエリアの入力を保持
var saveEmpty="";//未選択
var saveHikaku="";//比較
var saveRowCopy="";//行ごとにコピー
var saveTikan="";//置換

function saveEditTarget(){

        switch (functionSelect.value){

            case "":{
                saveEmpty=editTargetArea.value;
                break;
            };

            case "比較":{
                saveHikaku=editTargetArea.value;
                break;
            };

            case "小・大文字":{
                break;
            };

            case "置換":{
                saveTikan=editTargetArea.value;
                break;
            };

            case "行ごとにコピー":{
                saveRowCopy=editTargetArea.value;
                break;
            };

            case "指定文字区切り":{
                break;
            };

            case "並べ替え":{
                break;
            };
            
        }
}



// 機能セレクト　イベント（表示切替、入力値読込）
function functionSelectEvent(){
    //空のクラスを付与し、機能エリアを一括操作
    var arrayFunction = document.getElementsByClassName('functionClass');

    functionSelect.addEventListener("input",function(event){

        switch (functionSelect.value){

            case "":{
                //すべて非表示
                for(let element of arrayFunction){
                    element.hidden=true;
                }
                //load
                editTargetArea.value=saveEmpty;
                break;
            };

            case "比較":{
                //すべて非表示
                for(let element of arrayFunction){
                    element.hidden=true;
                }
                //対象を表示
                hikakuFunction.hidden=false;
                //load
                editTargetArea.value=saveHikaku;
                break;
            };

            case "小・大文字":{
                //すべて非表示
                for(let element of arrayFunction){
                    element.hidden=true;
                }
                //対象を表示
                break;
            };

            case "置換":{
                //すべて非表示
                for(let element of arrayFunction){
                    element.hidden=true;
                }
                //対象を表示
                tikanFunction.hidden=false;
                //load
                editTargetArea.value=saveTikan;
                break;
            };

            case "行ごとにコピー":{
                //すべて非表示
                for(let element of arrayFunction){
                    element.hidden=true;
                }
                //対象を表示
                rowCopyFunction.hidden=false;
                //load
                editTargetArea.value=saveRowCopy;
                //関数実行
                rowCopyFunctionEvent();
                break;
            };

            case "指定文字区切り":{
                //すべて非表示
                for(let element of arrayFunction){
                    element.hidden=true;
                }
                //対象を表示
                break;
            };

            case "並べ替え":{
                //すべて非表示
                for(let element of arrayFunction){
                    element.hidden=true;
                }
                //対象を表示
                break;
            };
            
        }
    })
}



//行ごとコピー
function rowCopyFunctionEvent(){

    //クリア
    const elements = [...document.getElementsByClassName('forRowButtonDiv')];
    for (let element of elements) {
        element.remove();
    }

    //改行数
    var count=countTargetWord(editTargetArea.value,`
`);

    //最初の行の+1
    count++;

    //行ごとのテキスト保存用
    let rowTextArray=[];

    var start = 0;
    var text = "";

    for(let i = 0; i < count; i++){
        //一番最後の行
        if((count-1)==i){
            text=editTargetArea.value.substring(start);
        }else{
            text=editTargetArea.value.substring(start,editTargetArea.value.indexOf(`
`,start));
            // 位置更新
            start=editTargetArea.value.indexOf(`
`,start)+1;
        }

        rowTextArray[i]=text;

    }

    //ボタン作成
    count=rowTextArray.length;
    for(let i = 0; i < count; i++){
        if(rowTextArray[i] != ""){
            //div
            const parentDiv = document.createElement('div');
            parentDiv.classList.add('forRowButtonDiv');
            rowCopyButtonDiv.appendChild(parentDiv);
            //button
            const button = document.createElement('button');
            button.textContent=rowTextArray[i];
            button.style.color="white";
            button.style.outline="none";
            button.classList.add('forRowButton');
            button.addEventListener("click",function(event){
                //クリップボードへコピー
                // const sendText = rowTextArray[i];
                clipCopyShort(rowTextArray[i]);
                //自分を下げて周りをそろえる
                const elements = [...document.getElementsByClassName('forRowButton')];
                for (let element of elements) {
                    element.classList.remove('ml-3');
                }
                button.classList.add('ml-3');
            })
            parentDiv.appendChild(button);
        }
    }
}



//置換実行機能
function tikanFunctionEvent(){
    //履歴
    saveLog();
    var word1 = beforTikanText.value;
    var word2 = afterTikanText.value;
    editTargetArea.value=editTargetArea.value.replace(new RegExp(word1,"g"),word2);
    //ボックスクリア
    beforTikanText.value="";
    afterTikanText.value="";
    // 件数表示
    updateKensu();
    //履歴
    saveLog();
}

//入力クリア：編集対象テキストエリア
function clearTarget(){
    //履歴
    saveLog();
    editTargetArea.value="";
    //履歴
    saveLog();
}


// 置換対象ラベル
function beforTikanTextEvent(){
    beforTikanText.addEventListener("input",function(event){
        updateKensu();
    })
}
// 置換対象件数　更新
function updateKensu(){
    if(beforTikanText.value==""){
        targetKensuLabel.textContent="ー件";
        return;
    }
    targetKensuLabel.textContent=`${countTargetWord(editTargetArea.value,beforTikanText.value)}件`;
}


// redo undo初期非活性
function logButtonInit(){
    undoButton.classList.add('redoUndoDisabled');
    redoButton.classList.add('redoUndoDisabled');
}

function initLogArray(){
    logArray.push("");
}



//履歴保存
var logIndex=0;
let logArray=[];
var undoDisabled=true;
var redoDisabled=true;

function saveLog(){
    logArray.splice(logIndex+1);//以降のやりなおし削除
    if(editTargetArea.value != logArray[logIndex]){
        logArray.push(editTargetArea.value);//配列に追加
    }
    logIndex=logArray.length-1;//配列の最新データに合わせる
    undoButton.classList.remove('redoUndoDisabled');
    undoButton.classList.add('hoverButton');
    undoDisabled=false;
    redoButton.classList.add('redoUndoDisabled');
    redoButton.classList.remove('hoverButton');
    redoDisabled=true;
    
}

//undoイベント
function undoEvent(){
    if(undoDisabled==true){
        return;
    }
    logIndex--;
    if(logIndex==0){
        undoDisabled=true;
        undoButton.classList.add('redoUndoDisabled');
        undoButton.classList.remove('hoverButton');
    }
    redoDisabled=false;
    redoButton.classList.remove('redoUndoDisabled');
    redoButton.classList.add('hoverButton');
    editTargetArea.value=logArray[logIndex];
    updateKensu();//置換対象件数　更新
}

//redoイベント
function redoEvent(){
    if(redoDisabled==true){
        return;
    }
    logIndex++;
    if(logIndex==logArray.length-1){
        redoDisabled=true;
        redoButton.classList.add('redoUndoDisabled');
        redoButton.classList.remove('hoverButton');
    }
    undoDisabled=false;
    undoButton.classList.remove('redoUndoDisabled');
    undoButton.classList.add('hoverButton');
    editTargetArea.value=logArray[logIndex];
    updateKensu();//置換対象件数　更新
}

//メニューボタン押下
function openMenu(){
    createLayer();
    menuWindow.hidden=false;
}

//透明レイヤー作成
function createLayer(){
    const layer = document.createElement('textarea');
    layer.style.zIndex=100;
    layer.readOnly=true;
    layer.id="transparentLayer";
    layer.style.outline="none";
    layer.style.width="100vw";
    layer.style.height="100vh";
    layer.style.position="absolute";
    layer.style.left="0%";
    layer.style.top="0%";
    layer.style.userSelect="none";
    layer.style.resize="none";
    layer.style.border="none";
    layer.style.boxSizing="border-box"; 
    layer.style.backgroundColor="rgba(0,0,0,0.6)"; 
    layer.addEventListener('click',function(event){
        deleteLayer();
        menuWindow.hidden=true;
    })
    document.body.appendChild(layer);
}

// レイヤー削除
function deleteLayer(){
    document.getElementById('transparentLayer').remove();
}

//リンク表示切替
function renderLinkEvent(){
    renderLink.addEventListener("input",function(event){
        if(renderLink.checked==true){
            dictionary.hidden=false;
        }else{
            dictionary.hidden=true;
        }
        // memoWindowSwitch();
    })
}

//データ文表示切替
function renderDataEvent(){
    renderData.addEventListener("input",function(event){
        if(renderData.checked==true){
            dataArea.hidden=false;
        }else{
            dataArea.hidden=true;
        }
        // memoWindowSwitch();
    })
}

//進行中表示切替
function renderWorkingEvent(){
    renderWorking.addEventListener("input",function(event){
        if(renderWorking.checked==true){
            workingArea.hidden=false;
        }else{
            workingArea.hidden=true;
        }
        // memoWindowSwitch();
    })
}


// シンプル背景
function renderBGEvent(){
    renderBG.addEventListener('input',function(event){
        document.body.style.backgroundColor = event.target.value;
        document.body.style.backgroundImage = "none"; // 背景画像を削除
    })
}

//リンク、データ文、進行中３つが非表示ならメモ最大化
// function memoWindowSwitch(){
//     if(renderLink.checked==false && renderData.checked==false && renderWorking.checked==false){
//         memoArea.classList.add('memoAreaLarge');
//     }else{
//         memoArea.classList.remove('memoAreaLarge');
//     }
// }




// メモ編集
function correctMemo(id,area){

        //ボックス読込
        initArray();

        data=dataText.value;
    
        var start=0;
    
        //インデックス取得
        var a,b;
        start=data.indexOf(id,0);
        start=data.indexOf("?^^メモ=",start)+6;//メモ内容開始
        a=start;
        start=data.indexOf("^^?",start)-1;
        b=start;
    
        //消去
        for(let i = a; i <= b; i++){
            array[i]="";
        }

        array[a]=area.value;
    
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

//背景切替
const pics = [
    'https://images.pexels.com/photos/7120851/pexels-photo-7120851.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/8903355/pexels-photo-8903355.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/427900/pexels-photo-427900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1755683/pexels-photo-1755683.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/401107/pexels-photo-401107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1573424/pexels-photo-1573424.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/96857/pexels-photo-96857.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/733853/pexels-photo-733853.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1668928/pexels-photo-1668928.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/858076/pexels-photo-858076.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/21492/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1546901/pexels-photo-1546901.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1124960/pexels-photo-1124960.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/376533/pexels-photo-376533.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/445109/pexels-photo-445109.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/347139/pexels-photo-347139.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/673857/pexels-photo-673857.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/66997/pexels-photo-66997.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/698319/pexels-photo-698319.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1122639/pexels-photo-1122639.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/701337/pexels-photo-701337.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1755385/pexels-photo-1755385.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/248159/pexels-photo-248159.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/36762/scarlet-honeyeater-bird-red-feathers.jpg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/249210/pexels-photo-249210.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/6128127/pexels-photo-6128127.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/12735759/pexels-photo-12735759.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/8523797/pexels-photo-8523797.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/3762497/pexels-photo-3762497.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1037992/pexels-photo-1037992.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/776656/pexels-photo-776656.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/354939/pexels-photo-354939.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/194096/pexels-photo-194096.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1764702/pexels-photo-1764702.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1037999/pexels-photo-1037999.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/220182/pexels-photo-220182.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/2775196/pexels-photo-2775196.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1289363/pexels-photo-1289363.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/2340254/pexels-photo-2340254.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/235985/pexels-photo-235985.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/3293148/pexels-photo-3293148.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1809344/pexels-photo-1809344.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/4004374/pexels-photo-4004374.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1765033/pexels-photo-1765033.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/776632/pexels-photo-776632.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/2382738/pexels-photo-2382738.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1292998/pexels-photo-1292998.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/3310691/pexels-photo-3310691.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/769525/pexels-photo-769525.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/2719301/pexels-photo-2719301.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1022692/pexels-photo-1022692.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/3183132/pexels-photo-3183132.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/206064/pexels-photo-206064.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/4050284/pexels-photo-4050284.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1239385/pexels-photo-1239385.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/354939/pexels-photo-354939.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/310435/pexels-photo-310435.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/321552/pexels-photo-321552.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1183434/pexels-photo-1183434.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1629781/pexels-photo-1629781.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/160846/french-bulldog-summer-smile-joy-160846.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/3317038/pexels-photo-3317038.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/4588428/pexels-photo-4588428.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/97533/pexels-photo-97533.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/50577/hedgehog-animal-baby-cute-50577.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1335971/pexels-photo-1335971.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1059823/pexels-photo-1059823.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/36762/scarlet-honeyeater-bird-red-feathers.jpg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/276514/pexels-photo-276514.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/262367/pexels-photo-262367.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/911758/pexels-photo-911758.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/963486/pexels-photo-963486.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/277559/pexels-photo-277559.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1568607/pexels-photo-1568607.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/946255/pexels-photo-946255.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/3034343/pexels-photo-3034343.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/3756616/pexels-photo-3756616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/3038740/pexels-photo-3038740.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://cdn.pixabay.com/photo/2023/08/21/03/34/droplets-8203505_1280.jpg',
    'https://cdn.pixabay.com/photo/2021/09/17/11/13/grapes-6632359_640.jpg',
    'https://cdn.pixabay.com/photo/2019/10/23/19/52/plants-4572694_640.jpg',
    'https://cdn.pixabay.com/photo/2017/10/25/03/40/guitar-2886886_640.jpg',//フルーツ
    'https://cdn.pixabay.com/photo/2021/08/03/07/03/orange-6518675_640.jpg',
    'https://img.freepik.com/free-photo/close-up-view-fruits-slices-concept_23-2148501497.jpg?ga=GA1.1.227649904.1731223005&semt=ais_hybrid',
    'https://img.freepik.com/premium-photo/colorful-summer-citrus-fruits-slices-background-directly_106885-2722.jpg?ga=GA1.1.227649904.1731223005&semt=ais_hybrid',
    'https://img.freepik.com/free-photo/grapes-strawberries-pineapple-kiwi-apricot-banana-whole-pineapple_23-2147968680.jpg?ga=GA1.1.227649904.1731223005&semt=ais_hybrid',
    'https://img.freepik.com/free-photo/colorful-collage-fruits-texture-close-up_23-2149870264.jpg?ga=GA1.1.227649904.1731223005&semt=ais_hybrid',
    'https://img.freepik.com/free-photo/grapes-strawberries-pineapple-kiwi-apricot-banana-whole-pineapple_23-2147968680.jpg?ga=GA1.1.227649904.1731223005&semt=ais_hybrid',
    'https://img.freepik.com/premium-photo/fresh-fruit-wooden-table_95419-3819.jpg?ga=GA1.1.227649904.1731223005&semt=ais_hybrid',
    'https://img.freepik.com/free-photo/flat-lay-tasty-fruits-textures-collage_23-2149763827.jpg?ga=GA1.1.227649904.1731223005&semt=ais_hybrid',
    'https://img.freepik.com/free-photo/flat-lay-citrus-with-copy-space_23-2148853412.jpg?ga=GA1.1.227649904.1731223005&semt=ais_hybrid',
    'https://img.freepik.com/free-photo/various-fruits-near-pineapple-leaves_23-2147931386.jpg?ga=GA1.1.227649904.1731223005&semt=ais_hybrid'
];
let currentIndex=0;

function switchBG(){
    document.body.style.backgroundImage=`url('${pics[randomPics()]}')`;
}

//ランダム背景
function randomPics(){
    return Math.floor(Math.random() * pics.length+1);
}


//引数で渡った全角数字をすべて半角数字に変換して返す関数(変換後同士を比較すればいい)--ok
function convertSmallNum(text){

    let arrayNum=[];

    //配列に移動
    for(let i = 0; i < text.length; i++){
        arrayNum[i]=text[i]
    }

    //比較
    for(let i = 0; i < text.length; i++){
        for(let j = 0; j < largeNum.length; j++){
            if(text[i]==largeNum[j]){
                //置換
                arrayNum[i]=smallNum[j];
            }
        }
    }

    text=arrayNum.join("");

    return text;
    
}

//メモ消去ボタン  #--?start?--#?^^id=〇〇^^? ?^^記載日=〇〇^^? ?^^分類=〇〇^^? ?^^メモ=〇〇^^? ?^^状態=〇〇^^?
function deleteMemo(id){//--ok

    //ボックス読込
    initArray();

    data=dataText.value;

    var start=0;

    //インデックス取得
    var a,b;
    start=data.indexOf(id,0);
    a=start-19;//データ開始位置
    start=data.indexOf("?^^状態=",start)+4;
    b=data.indexOf("^^?",start)+2;

    //消去
    for(let i = a; i <= b; i++){
        array[i]="";
    }

    //data更新
    inArray();

    //データ文更新
    dataText.value=data;

    //データ文読込み
    load();
    
}


// //最新の日付順に並べ替える関数(日付降順↓　30 29 28…)
// function sortDescending(){
//     var array = document.getElementsByClassName('memoContent');//tr
//     //並べ替える
//     array.sort((a,b) => {
//         const valuea =dateToNumber(a.children[0].textContent);
//         const valueb =dateToNumber(b.children[0].textContent);
//         return valuea-valueb
//     })
//     array.forEach(row => memoTableTbody.appendChild(array));
// }

// YYYY-MM-DDをYYYYMMDDの整数に変換 --ok動確済み
function dateToNumber(date){
    //ハイフン除去
    return Number(date.substring(0,4)+date.substring(5,7)+date.substring(8,10));
    
}

//height自動調整
function adjustHeight(textarea) {
    textarea.style.height = "auto"; // 一旦高さをリセット
    textarea.style.height = textarea.scrollHeight + 5 +"px"; // 必要な高さに設定
  }


//   対象から指定文字列の数をカウントして返す関数 --ok
function countTargetWord(target,word){
    var count=0;
    var start=0;
    while(true){
        if(target.indexOf(word,start) != -1){
            count++;
            start=target.indexOf(word,start)+word.length;
        }else{
            break;
        }
    }
    return count;
}