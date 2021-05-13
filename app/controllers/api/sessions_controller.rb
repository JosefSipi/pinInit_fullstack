class Api::SessionsController < ApplicationController

    # before_action :ensure_logged_in!, only: [:destroy]


    def create
        @user = User.find_by_cridentialsEmail(params[:user][:email], params[:user][:password])

        if @user
            login!(@user)
            render 'api/users/show'
        else

            render json: ['Wrong Email or password'], status: 401 #login page
        end
    end

    def destroy
        logout!
    end

end