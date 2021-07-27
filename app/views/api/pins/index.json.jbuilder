# need to associate an image with AWS

@pins.each_with_index do |pin, i|
    json.set! pin.id do
        json.extract! pin, :id, :creator_id, :title, :websiteURL, :heightof #going to need to store profile photo 
        
        if(pin.photo.attached?)
            json.photoUrl url_for(pin.photo)
        end
    end
end