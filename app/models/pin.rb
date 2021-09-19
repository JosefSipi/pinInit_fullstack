class Pin < ApplicationRecord


    validates :creator_id, :board_id, presence: true
    validates :description, :description2, length: { maximum: 500 }

    has_one_attached :photo

    belongs_to :creator,
        primary_key: :id,
        foreign_key: :creator_id,
        class_name: :User

    belongs_to :board,
        primary_key: :id,
        foreign_key: :board_id,
        class_name: :Board

    has_many :comments,
        primary_key: :id,
        foreign_key: :pin_id,
        class_name: :Comment

end