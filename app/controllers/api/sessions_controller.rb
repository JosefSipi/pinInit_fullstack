class Api::SessionsController < ApplicationController

    before_action :ensuer_logged_in!, only: [:destroy]


    def create
        @user = User.find_by_cridentials(params[:user][:username], params[:user][:password])
        
        if @user
            login!(@user)
            render 'api/users/show'
        else
            render json: ['Wrong Username or password'], status: 401 #login page
        end
    end

    def destroy
        logout!
    end

end