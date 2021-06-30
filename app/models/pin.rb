class Pin < ApplicationRecord


    validates :creator_id, :title, presence: true
    validates :description, :description2, length: { maximum: 500 }


    belongs_to :creator,
        primary_key: :id,
        foreign_key: :creator_id,
        class_name: :User

    belongs_to :board,
        primary_key: :id,
        foreign_key: :board_id,
        class_name: :Board


end