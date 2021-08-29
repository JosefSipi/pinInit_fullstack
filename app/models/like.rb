class Like < ApplicationRecord

    validates :liker_id, :comment_liked_id, presence: true


    belongs_to :liker,
        primary_key: :id,
        foreign_key: :liker_id,
        class_name: :User

    belongs_to :comment,
        primary_key: :id,
        foreign_key: :comment_liked_id,
        class_name: :Comment

end