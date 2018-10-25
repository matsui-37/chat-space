json.content   @message.content
json.image     @message.image.url
json.user_name @message.user.name
json.created_at @message.created_at.to_formatted_s(:datetime)
json.id         @message.id

# .to_formatted_sメソッドによって、形式を合わせている。今回は(:datetime)と表記しているが、表記しなくても機能しているのでデフォルトでその機能が付属していると考えられる。

# imageを反映するときは.urlも付ける。


