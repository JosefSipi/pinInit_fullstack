class Api::FollowsController < ApplicationController

    
    # skip_before_action :verify_authenticity_token

    def new
        @follow = Follow.new
    end

    def create

        @new_follow = Follow.new( follows_params )

        if @new_follow.save

            

            # @amFollowingStat = true

            # @followers = User.find(follows_params[:followed_user_id]).followers

            # @following = User.find(follows_params[:followed_user_id]).followings

            

            render :show
        else
            render json: @new_follow.errors.full_messages, status: 422
        end

    end

    def destroy
        

        followed_user_id = params[:deleteIds][:followed_user_id]
        follower_id = params[:deleteIds][:follower_id]


        @follow = Follow.find_by(followed_user_id: followed_user_id, follower_id: follower_id)
        
        if @follow
            @follow.destroy
        else
            render json: ['Something went wrong, unfollow was unsuccessful :(']
        end
        
    end

    def index

        if(params[:fromNum] == "true")

            numFollowing = User.find(params[:id]).followings.count
            render json: numFollowing
            
        else  
            dataPar = params[:userId]
    
            follow = Follow.find_by(followed_user_id: dataPar[:profile_users_id], follower_id: dataPar[:current_user_id])
    
            if follow 
                @amFollowingStat = true
            else
                @amFollowingStat = false
            end
    
            @user_id = params[:user_id]
    
            @followers = User.find(params[:user_id]).followers
    
            @following = User.find(params[:user_id]).followings
    
            render :index
        end



    end

    def show
        
        # @follow = Follow.find(params[:id])

        # render :show
    end

    private

    def follows_params
        params.require(:follow).permit(:follower_id, :followed_user_id, :info, :userId)
    end

end