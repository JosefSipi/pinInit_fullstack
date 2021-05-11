class API::UsersController < ApplicationController


    def new
        @user = User.new
    end

    def create
        @user = User.new(user_params)

        if @user.save
            login!(@user)
            render "api/users/show"
        else
            render json: @user.errors.full_messages, status: 422
        end

    end

    # def index
    # end

    def show
        @user = User.find(params[:id])
        render :show # this is where well link to the jbuilder that gets a user's profile info
    end

    # def edit
    # end

    # def update
    # end

    def destroy
        user = User.find(params[:id])
        user.destroy
        render "api/session/new"
    end

    private


    def user_params
        params.require(:user).permit(:username, :password)
    end

end