class Api::SessionsController < ApplicationController

    # before_action :ensure_logged_in!, only: [:destroy]


    def create

        @user = User.find_by_cridentialsEmail(params[:user][:email], params[:user][:password])
        @userEmail = User.find_by(email: params[:user][:email])

        if @user
            login!(@user)
            render 'api/users/show'
        else


            if @userEmail && (!@user)
                render json: ['The password you entered is incorrect.'], status: 401
            else
                render json: ['The email you entered does not belong to any account.'], status: 401
            end

            
            # render json: ['Wrong Email or password'], status: 401 #login page
        end
    end

    def destroy
        logout!
    end

end