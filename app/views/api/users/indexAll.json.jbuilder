
json.curUserFollCount current_user.followings.count

json.usersList do 

    @users.each do |user|
        json.set! user.id do 
            json.extract! user, :id, :username

            json.followThisUser !user.followers.where(id: current_user.id).empty?


            if (user.profile_pic.attached?)
                json.photoUrl url_for(user.profile_pic)
            else
                json.photoUrl 'false'
            end

            boards = user.boards
        json.boards do
            boards.each do |board|

                json.set! board.id do
        
                    json.extract! board, :id, :owner_id, :title, :description, :updated_at, :is_private

                    pins = board.pins

                    json.pinsCount pins.count

                    json.pinPhotos do 
                        if (!!pins[0])
                            json.one url_for(pins[0].photo)
                        else
                            json.one false
                        end
                        
                        if (!!pins[1])
                            json.two url_for(pins[1].photo)
                        else
                            json.two false
                        end
                        
                        if (!!pins[2])
                            json.three url_for(pins[2].photo)
                        else
                            json.three false
                        end
                    end
                end
            end
        end

        end
    end

end