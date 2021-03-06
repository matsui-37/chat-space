class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
    # @messages = @group.messages.order(created_at :DESC).includes(:user)
    # @messages = Message.all
    respond_to do |format|
      format.html
      # html形式でアクセスがあった場合は特に何もなし
      format.json { @new_messages = @messages.where('id > ?', params[:id])}
      # json形式でアクセスがあった場合は、params[:message][:id]よりも大きいidがないかMessageから検索して、@new_messageに代入する
    end
  end

  def create
    @message = @group.messages.new(message_params)
    if @message.save
      respond_to do |format|
        format.html { redirect_to group_messages_path(@group), notice: "メッセージが送信されました" }
        format.json
        # render: jsonはjbuilderを通さない時に必要だが、今回は通しているので必要なし。
        # redirect_to group_messages_path(@group), notice: "メッセージが送信されました"
      end
    else
      @messages = @group.messages.includes(:user)   #これを入力しておかないと、グループ内のメッセージが全て消える。(更新したりグループを選べば元に戻る)
      flash.now[:alert] = "メッセージを入力してください。"
      render :index
    end
  end
#ifとelseの中に両方ともformat.htmlとformat.jsonを定義しなくてはいけない



  private

  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end

# この時のformat.htmlは送信以外の静的なものを指し、format.jsonは送信という動作そのものの動作を指す。
