class Api::CommentsController < ApplicationController

    def new
        @comment = Comment.new
    end

    def index
        debugger
    end

    def create
        debugger
        @comment = Comment.new(comment_params)
        debugger
        if @comment.save
            debugger
            render json: ['comment was saved correctly']
        else
            debugger
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