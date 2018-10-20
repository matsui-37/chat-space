$(function(){
  function buildHTML(message){
    var image = message.image ? `<img src="${message.image}" class="right-center__group--images">` : '';
    // この変数内でクラスを指定していないと指定した画像のサイズが適用されず、本来の画像の大きさのまま適用されてしまう。
    var html = `<div class="right-center__group--name">
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
      var html = buildHTML(data);
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
});

// function(data)となっているが、非同期通信に成功した時の即時関数の第一引数には、サーバから返されたデータが入ってる。この場合のサーバから返ってくるデータというのは、jbuilderで作成したcreate.json.jbuilderのデータ。

//animateメソッドを用いて自動スクロールを行なっている。

//failとdoneに共通の処理がある時にalwaysでまとめられる。