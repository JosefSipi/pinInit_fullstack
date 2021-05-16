class Api::UsersController < ApplicationController

    skip_before_action :verify_authenticity_token

    def new
        @user = User.new
    end

    def create

        @user = User.new(user_params)
        username = @user.email.split("@")
        @user.username = username[0]
        @user.f_name = username[0]
        # 12 might need additional logic to populate f_name, l_name, and username
        if @user.save
            login!(@user)
            render :show
        else
            render json: ["Your password is too short! You need 6+ characters.", "invalid email", "or age wasn't provided"], status: 401
            # @user.errors.full_messages, status: 401
        end

    end


    def show
        @user = User.find(params[:id])

        render :show
    end


    def update
        @user = User.find(params[:id])

        if @user && @user.update_attributes(user_params)
            render :show
        else
            render jason: @user.errors.full_messages, status: 401
        end
    end


    def destroy
        @user = User.find(params[:id])
        if @user
            user.destroy
        else
            render json: ['User not found']
        end
    end

    private


    def user_params
        params.require(:user).permit(:email, :age, :password, :profile_pic, :f_name, :l_name, :username, :bio)
    end

end