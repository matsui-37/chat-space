$(function() {

 var search_list = $("#user-search-result");

  function appendUser(user) {
    var html =`<div class="chat-group-user clearfix">
                 <p class="chat-group-user__name">${ user.name}</p>
                 <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${ user.id} data-user-name=${ user.name}>追加</a>
               </div>`
    search_list.append(html);
  }

  function appendNoUser(user) {
    var html = `<div class="chat-group-user clearfix">${ user}</div>`
    search_list.append(html);
  }

 var add_member = $("#chat-group-form-user")

  function appendMember(id, name) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                 <input name='group[user_ids][]' type='hidden' value=${id}>
                 <p class='chat-group-user__name'>${name}</p>
                 <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
               </div>`
    add_member.append(html)
  }

//名前一覧表示
  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
     $("#user-search-result").empty('');
     if (users.length !== 0) {
       users.forEach(function(user){
         appendUser(user);
       });
     }
     else {
       appendNoUser("ユーザー検索に失敗しました");
     }
    })
  });

// 追加機能
  $(document).on("click", ".user-search-add", function (e) {
    var target = $(e.target);
    var id = target.attr("data-user-id");
    var name = target.attr("data-user-name");
    appendMember(id, name)
    $(this).parent().remove();
   });

// 削除機能
  $(document).on("click", ".user-search-remove", function (e) {
    var target = $(e.target);
    var id = target.attr("data-user-id");
    var name = target.attr("data-user-name");
    $(this).parent().remove();
  })
});



// 「クラス名が".chat-group-form__input”の部分のテキストフィールドがkeyupしたら、テキストフィールドの文字を取得して変数inputに代入する」

// 今回groupとは関係なくuserを引っ張り出してきているので、urlはuser指定となる。

// e.targetでクリックした箇所を判別している。例えば、ユーザー一覧のユーザーの右にそれぞれ追加がある。この追加を押すと、その箇所のみの追加を判別して取得することができる。e.targetがないと追加を押してもどの追加を押したか判別できない。

// function appendUser(user)はjbuilderで定義した変数を用いているが、function appendMember(id, name)はjbuilderを通していないので、$(document).on("click", ".user-search-add", function (e)で定義した変数idとnameを利用している。

// forEachメソッド
// forEach は、与えられた関数を配列に含まれる各要素に対して一度ずつ呼び出します。





