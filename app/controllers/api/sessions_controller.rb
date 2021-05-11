class Api::SessionsController < ApplicationController

    before_action :ensuer_logged_in!, only: [:destroy]

    def new
        render # loging page
    end

    def create
        @user = User.find_by_cridentials(params[:user][:username], params[:user][:password])
        
        if @user
            login!(@user)
            redirect_to #home feed page
        else
            flash.now[:errors] = ['Invalid username or password']
            render #login page
        end
    end

    def destroy
        logout!
        redirect_to #the login page
    end

end