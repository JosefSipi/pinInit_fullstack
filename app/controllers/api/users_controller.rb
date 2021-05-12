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
            render :show
        else
            render json: @user.errors.full_messages, status: 401
        end

    end


    def show
        @user = User.find(params[:id])
    end

    # def edit
    # end

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
        params.require(:user).permit(:email, :age, :password)
    end

end