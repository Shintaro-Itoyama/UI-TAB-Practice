//形式はES6の形式で記載する。
//htmlで、JSが読み込めているかの確認。DevTool検証でコンソール画面を確認する用。

/*グローバル領域*/
//この領域は、もし別のJSファイルがある場合、そこから参照できてしまう領域になる。
//変数名がコンフリクトして、エラーになることがある。
//const unko = "うんこ";
/*グローバル領域*/



//即時関数 は、どのJSを書くときも入れておいてほしい。
//これを無しでやると、グローバルを汚染する。と言うことになる。
( ()=>{
  //この即時関数の中に、命令を書く。
  //これはローカル変数。即時変数内に宣言することでグローバル汚染を防ぐ。

  //documentを取得（WEBページのDOM全体を取得的な意味合い）
  //DOM＝HTML＝HTMLページを構成する要素的な意味合い（）
  //変数名に＄をつけるとDOM要素だと言うことを表す。
  const $doc = document;

  const $tab = $doc.getElementById("js-tab");

  //$tabのDOM要素が取得できていることをコンソールで確認する。
  console.log("$tab",$tab);

  //CSSを当てるclassとJavaScriptを当てるIdやclassは分けてあげないとごっちゃになることが多い。
  //JavaScriptが引っかかるものはなるべくIDを使用してやる。
  //また、プレフィックスにjs-をつけてやるようにする。

  //DOM要素の中から条件（引数）に当てはまるDOMを取得する。（ID（＃）やクラス(.)からも取得できるし、属性[]からも取得できる。）
  const $nav = $tab.querySelectorAll("[data-nav]");
  console.log("$nav",$nav);


  //html側でタブコンテンツにデータ属性data-contを付与して、このJS側でその要素を取得する
  const $content = $tab.querySelectorAll("[data-cont]");
  console.log("$content",$content);


  //初期化
  const init = () => {
    //cssのstyle操作
    $content[0].style.display = "block";
  };
  //一つ目のコンテンツだけ、display=none から display = blockに。
  init();

  //クリックしたら実際にタブが切り替わるような仕組みを構築していく。

  const handleClick = (e) => { //(e)とは、クリックされた時にイベント自体のオブジェクトを取得する。
    e.preventDefault();//aタグのリンク要素を無効化させたいときに使用する関数。これがないとクリック後即座にリロードされてコンソールログが消える。
    //console.log("e",e);//クリックされたら、クリックイベント自体にもたくさんの情報が入っている。 
    
    //クリックされたnavとそのdataを取得
    const $this = e.target;//e.targetは、クリックしたそのDOM要素をピンポイントに＄thisに取得する。
    //console.log("$this",$this);
    const targetVal = $this.dataset.nav; //htmlに追加追加したデータ属性　data-navの番号が取得できる。
                                         //datasetは、そのDOM要素のデータ属性を取得する。
    console.log("targetVal",targetVal);

    //表示対象外のnav,contを全てリセットする。
    let index = 0;
    while(index < $nav.length){
      $content[index].style.display = "none";
      //is-activeがあったら排除する、。
      $nav[index].classList.remove("is-active");
      index++;
    }

    //対象のコンテンツをアクティブ化する。
    $tab.querySelectorAll('[data-cont ="' + targetVal + '"]')[0].style.display = "block";
    //navの色変え(CSSで色を定義している、is-activeクラスをクリックされたnavのクラスに追加する。)
    $nav[targetVal].classList.add("is-active");




  };

  //タブナビにクリックイベントを追加する。クリックすると、handleClick関数が呼び出されるようになる。
  //$nav[0].addEventListener("click", (e) => handleClick(e) );
  let index = 0;
  while( index < $nav.length ){
    $nav[index].addEventListener("click", (e) => handleClick(e) );
    index ++;
  }






})();