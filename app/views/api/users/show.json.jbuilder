json.extract! @user,  :id, :email, :age, :f_name, :l_name, :username, :profile_pic, :bio
# debugger
if (@user.profile_pic.attached?)
    # debugger
    json.photoUrl url_for(@user.profile_pic)
end

# json.partial! 'api/users/profile', profile: @user
  
# json.extract! profile, :id, :email, :age, :f_name, :l_name, :username, :profile_pic

# removed the following to get it working(:username, :f_name, :l_name, :bio,, :created_at )
# still need to get all info for associations regarding comments likes and follows ect.


# json response should look like this
# {
#     "id": 1
#     "email": "josef@yahoo.com",
#     "age": "25",
#     "profile_pic": "photo_url"

    # "photoUrl": {
    #     info for photo
    # }
# }