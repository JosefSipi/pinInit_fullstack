class Follow < ApplicationRecord

    validates :follower_id, :followable_id, :followable_type, presence: true

    belongs_to :followers,
        primary_key: :id,
        foreign_key: :follower_id,
        class_name: :User

    belongs_to :follower,
        primary_key: :id,
        foreign_key: :follower_id

end