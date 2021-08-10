class Api::FollowsController < ApplicationController

    debugger
    # skip_before_action :verify_authenticity_token

    def new
        # @follow = Follow.new
        debugger
    end

    def create
        debugger

        @follow = Follow.new( follows_params )

        debugger

        if @follow.save
            debugger
            render :show
        else
            render json: @follow.errors.full_messages, status: 422
        end

        debugger
    end

    def destroy
        debugger

        followed_user_id = params[:deleteIds][:followed_user_id]
        follower_id = params[:deleteIds][:follower_id]


        @follow = Follow.find_by(followed_user_id: followed_user_id, follower_id: follower_id)
        debugger
        if @follow
            @follow.destroy
        else
            render json: ['Something went wrong, unfollow was unsuccessful :(']
        end
        debugger
    end

    def index

        debugger

        @user_id = params[:user_id]

        @followers = User.find(params[:user_id]).followers

        debugger

        @following = User.find(params[:user_id]).followings

        debugger

        render :index


    end

    def show
        debugger
        # @follow = Follow.find(params[:id])

        # render :show
    end

    private

    def follows_params
        params.require(:follow).permit(:follower_id, :followed_user_id, :info)
    end

end