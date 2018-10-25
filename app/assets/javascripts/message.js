$(function(){
  function buildMESSAGE(message){
    var image = message.image ? `<img src="${message.image}" class="right-center__group--images">` : '';
    // この変数内でクラスを指定していないと指定した画像のサイズが適用されず、本来の画像の大きさのまま適用されてしまう。
    var html = `<div class = "right-center__group",  data-message-id = "${message.id}" >
    <div class="right-center__group--name">
                  ${message.user_name}
                </div>
                <div class="right-center__group--date">
                  ${message.created_at}
                </div>
                <div class="right-center__group--message">
                  ${message.content}
                    ${image}
                </div>`
    return html;
  }
//create.json.jbuilderを通し、jbuider内で定義した変数を用いている。

 // メッセージ送信時の非同期通信
    $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
        // このactionはコメントのSENTボタンの検証から<form>内のactionを用いている。

    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildMESSAGE(data);
      $('.right-center').append(html);
      $('.right-center').animate({scrollTop: $('.right-center')[0].scrollHeight},'fast');
      $('.hidden').val('');
    })
    .fail(function(){
      alert('error');
    })
    .always(function(){
      $("#disable").prop('disabled', false);
    })
  })


  function buildMESSAGE(message) {
    var image = message.image ? `<img src="${message.image}" class="right-center__group--images">` : '';
    var html = `<div class = "right-center__group",  data-message-id = "${message.id}" >
                  <div class="right-center__group--name">
                    ${message.user_name}
                  </div>
                  <div class="right-center__group--date">
                    ${message.created_at}
                  </div>
                  <div class="right-center__group--message">
                    ${message.content}
                      ${image}
                  </div>
                  </div>`
    return html
  }


 // 自動更新
  $(function(){
    var interval = setInterval(update, 5000);
  });
  //5000ミリ秒ごとにupdateという関数を実行する
  function update(){
    var message_id = $(".right-center__group").last().data("message-id");  // クラスの一番下にmessage-idを加え、変数message_idに代入
    if(window.location.href.match(/\/groups\/\d+\/messages/)){
      $.ajax({
        url: location.href,  //urlは現在のページを指定
        type: 'GET',
        data: { id: message_id },
        dataType: 'json'
      })
      .done(function(json){
        console.log(json)
        if(json != null){     // jsonの中身が空だった場合、
          json.forEach(function(message){
            $('.right-center').append(buildMESSAGE(message));
          });
          $('.right-center').animate({scrollTop: $('.right-center')[0].scrollHeight},'fast');
        }
      })
      .fail(function(json){
        alert('自動更新に失敗しました');
      });
    }
    else{
      clearInterval(interval)
    }
  };
});

// insertHTML = insertHTML + newHTMLという意味

// function(data)となっているが、非同期通信に成功した時の即時関数の第一引数には、サーバから返されたデータが入ってる。この場合のサーバから返ってくるデータというのは、jbuilderで作成したcreate.json.jbuilderのデータ。

//animateメソッドを用いて自動スクロールを行なっている。

//failとdoneに共通の処理がある時にalwaysでまとめられる。

//processData: falseとcontentType: falseは送信する処理がある場合、必要。

// 同じページの関連する機能で行なっているため、非同期通信のメール送信と自動更新のurlの関数buildMESSAGEで統一し、jbuilderで定義した変数も統一することで、同じ関数のURLを用いても特に問題なし。ただし、jbuilderは別々に用意しておく。片方は配列で定義しており、さらにコントローラで定義した内容が違うため。

// if(window.location.href.match(/\/groups\/\d+\/messages/))
// この現在いるサイトだけで更新機能が追加されるように正規表現を用いてurlの指定を行なっている。
// 今回の場合
// 最初の/と最後の/で正規表現を囲み、最初から2番目の\は次に/を並べる時に使用。/groupsはurlの一部、その次の\は2番目の時と同様、/\d+はこれでurlの一部、\dは数値、+は直前の文字の一回以上の繰り返し、例えば数値が11や22、111と同じ数値が並ぶ際に必要。その次の\は2番目と同様、/messagesはurlの一部。

// setIntervalで一定の感覚で関数を繰り返す、つまり更新作業に必要。他のページに移動しても動作し続けるので、clearInterval()でsetInterval() を使用して設定された繰り返し動作をキャンセルできる。使い方は上記の通り。urlが変わった場合、つまりwindow.location.hrefが異なる場合にclearInterval(interval)でintervalをクリアします。


