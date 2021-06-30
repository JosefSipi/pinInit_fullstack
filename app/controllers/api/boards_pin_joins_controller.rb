class Api::BoardsPinJoinController < ApplicationController

    def new
        @boards_pin_joins = BoardsPinJoin.new
    end

    def create
        @boards_pin_joins = BoardsPinJoin.new( BoardsPinjoin_params )

        if @boards_pin_joins.save
            render :show
        else
            render json: @board.errors.full_messages, status: 422
        end

    end

    # def edit

    # end

    def update
        @boards_pin_joins = BoardsPinJoin.find(params[:id])

        if @boards_pin_joins && @boards_pin_joins.update_attributes(board_params)
            render :show
        else
            render json: @boards_pin_joins.errors.full_messages, status: 401
        end
    end

    def destroy
        @boards_pin_joins = BoardsPinJoin.find(params[:id])
        if @boards_pin_joins
            @boards_pin_joins.destroy
        else
            render json: ["Something went wrong, this pin wasn't found to be associated with this board"]
        end
    end

    # def index
    # end

    def show
        @boards_pin_joins = BoardsPinJoin.find(params[:id])
        render :show
    end


    private

    def BoardsPinjoin_params
        params.require(:boards_pin_joins).permit(:pin_id, :board_id, :note)
    end
end