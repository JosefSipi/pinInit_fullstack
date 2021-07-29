json.extract! @pin, :id, :creator_id, :title, :description, :description2, :websiteURL, :photo, :heightof, :board_id

if (@pin.photo.attached?)
    json.photoUrl url_for(@pin.photo)
end