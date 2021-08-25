
json.extract! @pin, :id, :creator_id, :title, :description, :description2, :websiteURL, :photo, :heightof, :board_id

if (@pin.photo.attached?)
    json.photoUrl url_for(@pin.photo)
end

json.comments do
    @comments.each do |comment|
        
    
        json.set! comment.id do
            json.extract! comment, :id, :commenter_id, :body, :created_at
    
            commenter = comment.commenter
        
            if(commenter.profile_pic.attached?)
                json.photoUrl url_for(commenter.profile_pic)
                json.name commenter.f_name 
            end
    
        end
    
    
    end
end