//変数定義
var keywordBox;
var dictionary;
var addWindow;
var addTitleBox;
var addLinkBox;
var addButton;
var dataText;


//変数定義関数
function hensu(){
    keywordBox=document.getElementById('keywordBox');
    dictionary=document.getElementById('dictionary');
    addWindow=document.getElementById('addWindow');
    addTitleBox=document.getElementById('addTitleBox');
    addLinkBox=document.getElementById('addLinkBox');
    addButton=document.getElementById('addButton');
    dataText=document.getElementById('dataText');
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

    var data = dataText.value;

    //データ数をカウント--ok
    var count = 0;
    var start=0;
    for(let i = 0; i <= 200; i++){
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
        dictionary.appendChild(divElement);
        
        const element = document.createElement('a');
        element.textContent=title;
        element.name = 'divData';
        element.classList.add('divData');
        element.target = "_blank";
        element.rel = "noopener noreferrer";
        element.href = link;
        divElement.appendChild(element); 

    }

}

//コンテンツクリア
function deleteContents(){
    var array = document.getElementsByClassName('divData');
    while (array.length > 0) {
        array[0].remove();
    }
    
}

//inputイベント

function inputEvent(){
    keywordBox.addEventListener("input",function(event){

        var array = document.getElementsByClassName('divData');

        judge();

        function judge(){
            for(let i = 0; i < array.length; i++){
                if(array[i].textContent.indexOf(keywordBox.value) != -1){
                    array[i].hidden=false;
                }else{
                    array[i].hidden=true;
                }
            }
        }

    });

}

//ctrl + enterでキーワードにフォーカス
document.addEventListener("keydown", function(event) {
    //判定
    if (event.ctrlKey && event.key === "Enter") {
        event.preventDefault();//デフォルトの動作を無効化
            keywordBox.focus();
    }
});
