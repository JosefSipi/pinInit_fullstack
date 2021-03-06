class Follow < ApplicationRecord

    validates :follower_id, :followed_user_id, presence: true
    validates :follower_id, uniqueness: { scope: :followed_user_id}

    # The user giving the follow
    belongs_to :follower,
        primary_key: :id,
        foreign_key: :follower_id,
        class_name: :User

    # the user being followed
    belongs_to :followed_user,
        primary_key: :id,
        foreign_key: :followed_user_id,
        class_name: :User

end