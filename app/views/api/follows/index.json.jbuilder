followerCount = @followers.length 

followingCount = @following.length

@followers.each do |user|
    json.set! :followers do
        json.extract! user, :id, :username

        if (user.profile_pic.attached?)
            json.photoUrl url_for(user.profile_pic)
        end
    end
end

json.set! :following do
    @following.each do |user|
        json.set! user.id 

            json.extract! user, :id, :username

            if (user.profile_pic.attached?)
                json.photoUrl url_for(user.profile_pic)
            end
            
        end
    end
end