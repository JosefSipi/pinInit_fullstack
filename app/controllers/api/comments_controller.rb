class Api::CommentsController < ApplicationController

    def new
        @comment = Comment.new
    end

    def index
    end

    def create
        @comment = Comment.new(comment_params)
        if @comment.save

            render json: ['comment was saved correctly']
        else

            render json: ['comment could not be saved']
        end 
    end

    def destroy
        # @comment.find(params[:id])
    end

    def edit
    end

    def show
    end

    def comment_params
        params.require(:comment).permit(:commenter_id, :pin_id, :body)
    end

end