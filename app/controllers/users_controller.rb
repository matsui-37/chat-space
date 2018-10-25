class UsersController < ApplicationController

  def index
    @users = User.where('name LIKE(?)', "%#{params[:keyword]}%").limit(5).where.not(id: current_user.id)
    # またはUser.where('name LIKE(?) AND id !=(?)', "%#{params[:keyword]}%" "current_user")
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
