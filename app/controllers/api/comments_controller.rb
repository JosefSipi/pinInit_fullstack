class Api::CommentsController < ApplicationController

    def new
        @comment = Comment.new
    end

    def index
    end

    def create
        @comment = Comment.new(comment_params)
        
        pinId = comment_params[:pin_id]

        # @comments = Comment.where(pin_id: pinId)
        # @pin = Pin.find(pinId)
        # @userPin = User.find(@pin.creator_id)
        # @board = Board.find(@pin.board_id)

        if @comment.save

            @comments = Comment.where(pin_id: pinId)
            @pin = Pin.find(pinId)
            @userPin = User.find(@pin.creator_id)
            @board = Board.find(@pin.board_id)

            render 'api/pins/show'
        else

            render json: ['comment could not be saved']
        end 
    end

    def destroy

        @comment = Comment.find(params[:id])

        if @comment 
            @comment.destroy
            render json: ['comment was deleted']
        else
            render json: ['comment was not deleted']
        end


    end

    def edit
    end

    def update

        @comment = Comment.find(params[:id])

        if @comment && @comment.update_attributes(comment_params)
            render json: ['edit was completed'] 
        end

    end

    def show
    end

    def comment_params
        params.require(:comment).permit(:commenter_id, :pin_id, :body)
    end

end