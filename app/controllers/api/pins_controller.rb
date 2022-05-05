class Api::PinsController < ApplicationController

    def new
        @pin = Pin.new
    end

    def create
        @pin = Pin.new(pin_params)

        
        if @pin.save
            @from_pin_create = true
            render :show
            # render json: ['created new pin']
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

        if !!params[:word_search]

            theIPS = params[:word_search][:displayWord].upcase
            
            @pins = Pin.where("upper(title) LIKE '%#{theIPS}%' OR upper(description) LIKE '%#{theIPS}%'")
            render 'api/pins/feed'
        else
            if (!!params[:board_id])
                board = Board.find(params[:board_id]) # not sure where :board_id in this situation is coming from
                @pins = board.pins

                render 'api/pins/index'
            else
                users = User.find(params[:user_id]).followings
                @pins = []
                users.each do |user|
                    @pins.push(*user.pins)
                end

                render 'api/pins/feed'
            end
        end
    end

    def show
        

        @comments = Comment.where(pin_id: params[:id])
        
        @pin = Pin.find(params[:id])

        @userPin = User.find(@pin.creator_id)
        @board = Board.find(@pin.board_id)

        
        render :show
    end

    def update

        @comments = Comment.where(pin_id: params[:id])
       
        @pin = Pin.find(params[:id])

        @userPin = User.find(@pin.creator_id)
        @board = Board.find(@pin.board_id)
        
        if @pin && @pin.update_attributes(pin_params)
            render :show
        else
            render json: @pin.errors.full_messages, status: 401
        end
    end

    private

    def pin_params
        params.require(:pin).permit(:creator_id, :title, :description, :description2, :websiteURL, :board_id, :photo)
    end

end