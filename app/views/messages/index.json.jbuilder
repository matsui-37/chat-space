# if @new_message.present?
#   json.array! @new_message
# end

json.array! @new_messages do |message|
  json.user_name          message.user.name
  json.created_at    simple_time(message.created_at)
  json.content       message.content
  json.image         message.image.url
  json.id            message.id
end
