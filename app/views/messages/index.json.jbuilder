# if @new_message.present?
#   json.array! @new_message
# end

json.array! @new_messages do |message|
  json.user_name          message.user.name
  json.created_at    message.created_at.to_formatted_s(:datetime)
  json.content       message.content
  json.image         message.image.url
  json.id            message.id
end
