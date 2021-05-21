# going to need to show the following info on the index page
#   all board + their title + number of pins on the board + the date it was created at


# :title :udated_at
@boards.each do |board|

    json.set! board.id do
    
        json.extract! board, :id, :owner_id, :title, :description, :updated_at, :is_private
    end

end
