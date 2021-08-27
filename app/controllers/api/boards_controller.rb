class Api::BoardsController < ApplicationController

    skip_before_action :verify_authenticity_token

    def new
        @board = Board.new
    end
    
    def create

        @board = Board.new(board_params)

        if @board.save
            render :show
        else

            render json: @board.errors.full_messages, status: 422
        end

    end

    def show
        @board = Board.find(params[:id])
        render :show

    end
    
    def index
        user = User.find(params[:user_id])
        #
        @boards = user.boards
        
        # @boards = Board.all
        #
        # @boards.each do |board|
        #    
        #     c_user = current_user
        #     @users_arr = {}
        #     if board.owner_id == 21 # c_user.id
        #        
        #         @users_arr[board.owner_id] = board
        #     end
        # end
        # render json: @users_arr

        render 'api/boards/index'
    end

    def destroy
        @board = Board.find(params[:id])
        if @board
            @board.destroy
            render json: ['Board Deleted!']
        else
            render json: ['Board was not able to be deleted']
        end
    end
    
    def update
        @board = Board.find(params[:id])

        if @board && @board.update_attributes(board_params)
            render :show
        else
            render json: @board.errors.full_messages, status: 401
        end
    end



    private

    def board_params
        params.require(:board).permit(:owner_id, :title, :description, :is_private)
    end

end