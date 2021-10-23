json.userSearched do
    @users.each do |user|
        json.set! user.id do
            json.extract! user, :id, :username
            
            if (user.profile_pic.attached?)
                json.photoUrl url_for(user.profile_pic)
            else
                json.photoUrl 'false'
            end
        end
    end
end

json.pinSearched do
    @pins.each do |pin|
        json.set! pin.id do
            json.extract! pin, :id, :title, :description
        end
    end
end