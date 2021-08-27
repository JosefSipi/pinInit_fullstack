# going to need to show the following info on the index page
#   all board + their title + number of pins on the board + the date it was created at


# :title :udated_at
@boards.each do |board|

    json.set! board.id do
    
        json.extract! board, :id, :owner_id, :title, :description, :updated_at, :is_private

        pins = board.pins

        json.pinPhotos do 
            if (!!pins[0])
                json.one url_for(pins[0].photo)
            else
                json.one false
            end
            
            if (!!pins[1])
                json.two url_for(pins[1].photo)
            else
                json.two false
            end
            
            if (!!pins[2])
                json.three url_for(pins[2].photo)
            else
                json.three false
            end
        end

    end

end
