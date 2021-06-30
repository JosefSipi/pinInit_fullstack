# need to associate an image with AWS

@pins.each do |pin|

    json.set! pin.id do
        json.extract! pin, :id, :creator_id, :title, :websiteURL, :
    end
end