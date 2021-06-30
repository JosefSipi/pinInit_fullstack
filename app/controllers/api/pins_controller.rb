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
        

    end

    def edit
    end

    def index
    end

    def show
    end

    def update
    end

    private

    def pin_params
        params.require(:pin).permit(:creator_id, :title, :description, :description2, :websiteURL )
    end

end