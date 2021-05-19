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
        debugger
        @boards = Board.all
        debugger
        @boards.each do |board|
            debugger
            @users_arr = {}
            if board.owner_id == 21 # current_user.id
                debugger
                @users_arr[board.owner_id] = board
            end
        end
        render json: @users_arr
    end

    def destroy
        @board = Board.find(params[:id])
        if @board
            @board.destroy

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