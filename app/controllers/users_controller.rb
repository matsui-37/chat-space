class UsersController < ApplicationController

  def index
    @users = User.where('name LIKE(?) And id != ?', "%#{params[:keyword]}%", current_user)
    respond_to do |format|
     format.html
     format.json
    end
  end

  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit               #編集画面に戻る。
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
end

# name LIKE(?) "%#{params[:keyword]}%"ビューから取得したキーを参考に登録している名前一覧を取得している。
# And id !=?でcurrent_userを指定して検索一覧から出ないようにしている。
