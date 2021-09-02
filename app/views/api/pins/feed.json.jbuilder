# debugger
@pins.each_with_index do |pin, i|
    # debugger



    json.set! pin.id do
        json.extract! pin, :id, :title, :websiteURL

        if(pin.photo.attached?)
            json.photoUrl url_for(pin.photo)
        end
    end

end
