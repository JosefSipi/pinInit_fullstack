json.extract! @user,  :id, :email, :age, :profile_pic

json.partial! 'api/users/profile', profile: @user
  


# removed the following to get it working(:username, :f_name, :l_name, :bio,, :created_at )
# still need to get all info for associations regarding comments likes and follows ect.


# json response should look like this
# {
#     "id": 1
#     "email": "josef@yahoo.com",
#     "age": "25",
#     "profile_pic": "photo_url"
# }