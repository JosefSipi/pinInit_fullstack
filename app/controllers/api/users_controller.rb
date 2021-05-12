class Api::UsersController < ApplicationController


    def new
        @user = User.new
    end

    def create
        # byebug
        @user = User.new(user_params)
        
        # 12 might need additional logic to populate f_name, l_name, and username
        if @user.save
            login!(@user)
            render :show # 15 # this routes should be "api/users/show"
        else
            render json: @user.errors.full_messages, status: 422
        end

    end

    def index
        @user = User.find(params[:id])
    end

    def show
        @user = User.find(params[:id])
        # 28 render :show # this is where well link to the jbuilder that gets a user's profile info
    end

    # def edit
    # end

    def update
        @user = User.find(params[:id])
        if @user && @user.update_attributes(user_params)
            render "api/users/show"
        else
            render jason: @user.errors.full_messages # not sure what status to assign
        end
    end


    def destroy
        user = User.find(params[:id])
        user.destroy
        render "api/session/new" # not sure if this is correct
    end

    private


    def user_params
        params.require(:user).permit(:email, :age, :password)
    end

end