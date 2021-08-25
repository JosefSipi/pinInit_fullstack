class Api::PinsController < ApplicationController

    def new
        @pin = Pin.new
    end

    def create
        @pin = Pin.new(pin_params)

        if @pin.save
            render :show
        else
            render json: @pin.errors.full_messages, status: 422
        end

    end

    def destroy
        # should only remove the pin from user's board and it's association to the user's account so other user's that have
        # pinned this pin can still display the pin by making a backend request to retrieve this pin's info
        @pin = Pin.find(params[:id])

        if @pin
            @pin.destroy
        else
            render json: ['This pin was not able to be deleted']
        end

    end

    # def edit
    # end

    def index

        board = Board.find(params[:board_id]) # not sure where :board_id in this situation is coming from

        # @pins = Pin.all

        @pins = board.pins

        render 'api/pins/index'
    end

    def show

        @comments = Comment.where(pin_id: params[:id])

        @pin = Pin.find(params[:id])
        render :show
    end

    def update
        
        @pin = Pin.find(params[:id])

        if @pin && @pin.update_attributes(pin_params)
            render :show
        else
            render json: @pin.errors.full_messages, status: 401
        end
    end

    private

    def pin_params
        params.require(:pin).permit(:creator_id, :title, :description, :description2, :websiteURL, :board_id, :photo, :heightof )
    end

end