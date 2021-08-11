json.set! :following do
    @following.each do |follow| 
        json.set! follow.id do 
            json.extract! follow, :id, :username
    
            if (follow.profile_pic.attached?)
                json.photoUrl url_for(follow.profile_pic)
            end
        end
    end

    json.count @following.length
end

json.set! :followers do
    @followers.each do |follower| 
        json.set! follower.id do 
            json.extract! follower, :id, :username
            
            if (follower.profile_pic.attached?)
                json.photoUrl url_for(follower.profile_pic)
            end
        end
    end

    json.count @followers.length
end

json.amFollowing @amFollowingStat