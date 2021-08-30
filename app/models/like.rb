class Like < ApplicationRecord

    validates :liker_id, :comment_liked_id, presence: true
    validates :liker_id, uniqueness: { scope: :comment_liked_id}


    belongs_to :liker,
        primary_key: :id,
        foreign_key: :liker_id,
        class_name: :User

    belongs_to :comment,
        primary_key: :id,
        foreign_key: :comment_liked_id,
        class_name: :Comment

end