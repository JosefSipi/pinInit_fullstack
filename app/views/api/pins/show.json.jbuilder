
json.extract! @pin, :id, :creator_id, :title, :description, :description2, :websiteURL, :photo, :heightof, :board_id

if (@pin.photo.attached?)
    json.photoUrl url_for(@pin.photo)
end

# json.comments do
#     @comments.each do |comment|
        
    
#         json.set! comment.id do
#             json.extract! comment, :id, :commenter_id, :body, :created_at

#             nowTime = Time.new

#             # json.timeStuff comment.created_at.to_datetime.min

#             json.timeElapsed do 
#                 json.min nowTime.min - comment.created_at.min
#                 json.hour nowTime.hour - comment.created_at.hour
#                 json.day nowTime.day - comment.created_at.day
#                 json.month nowTime.month - comment.created_at.month
#                 json.year nowTime.year - comment.created_at.year
#             end
    
#             commenter = comment.commenter
        
#             if(commenter.profile_pic.attached?)
#                 json.photoUrl url_for(commenter.profile_pic)
#                 json.name commenter.f_name 
#             end

#             json.like do

#                 json.like_count comment.likes.size
                
#                 if json.like Like.find_by(liker_id: current_user.id, comment_liked_id: comment.id)
#                     json.liked true
#                 else
#                     json.liked false
#                 end
#             end
    
#         end
    
    
#     end
# end