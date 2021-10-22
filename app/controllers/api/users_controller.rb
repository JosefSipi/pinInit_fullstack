class Api::UsersController < ApplicationController

    # skip_before_action :verify_authenticity_token

    def new
        @user = User.new
    end

    def create

        @user = User.new(user_params)
        username = @user.email.split("@")

        if !!User.find_by(username: username[0])
            @user.username = username[0] + "2.0"
        else
            @user.username = username[0]
        end

        @user.f_name = username[0]

        if @user.save
            login!(@user)
            render 'api/users/create'
        else
            # render json: ["Your password is too short! You need 6+ characters.", "invalid email", "or age wasn't provided"], status: 401
            render json: @user.errors.full_messages, status: 401
        end

    end


    def show
        @user = User.find(params[:id])

        render :show
    end


    def update

        @user = User.find(params[:user][:id])


        if @user && @user.update_attributes(user_params)
    
            render :show
        else
    
            # render jason: @user.errors.full_messages, status: 401
            render json: @user.errors.full_messages, status: 401
        end
    end


    def destroy
        @user = User.find(params[:id])
        if @user
            @user.destroy                   # not sure if this need to just be 'user' instead of @user
        else
            render json: ['User not found']
        end
    end

    def index

        if params[:dataStuff] == "fetch for index"
            @users = User.all.where.not(id: current_user.id).sample(20)
            render 'api/users/indexAll'
        else
            @users = User.limit(3).where("username LIKE '%#{params['input']}%' OR f_name LIKE '%#{params['input']}%' OR l_name LIKE '%#{params['input']}%' ")

            render :index
        end
    end

    private


    def user_params
        params.require(:user).permit(:email, :age, :password, :profile_pic, :f_name, :l_name, :username, :bio)
    end

end