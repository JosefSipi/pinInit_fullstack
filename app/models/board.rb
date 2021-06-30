class Board < ApplicationRecord
    validates :owner_id, :title, presence: true
    validates :description, length: { maximum: 500 }



    belongs_to :owner,
        primary_key: :id,
        foreign_key: :owner_id,
        class_name: :User

    has_many :pins,
        primary_key: :id,
        foreign_key: :creator_id,
        class_name: :Pin

    has_many :boards_pin_joins,
        primary_key: :id,
        foreign_key: :board_id,
        class_name: :BoardsPinJoin

    
end
