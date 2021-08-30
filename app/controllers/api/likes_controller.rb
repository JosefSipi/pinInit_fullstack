class Api::LikesController < ApplicationController

    def new
        @comment
    end

    def create


        @like = Like.new(like_params)

        if @like.save
            render :show # return the number count of likes this comment is associated with
        else
            render json: @like.errors.full_messages, status: 422
        end

    end

    def destroy
        

        @like = Like.find(params[:id])

        if @like
            @like.destroy
            render json: ['like was removed']
        else
            render json: ['like was not removed']
        end

    end

    def index
        # return all likes for a specific comment ?
    end

    def show
    end

    private 

    def like_params
        params.require(:like).permit(:liker_id, :comment_liked_id)
    end


end