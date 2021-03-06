class BoardsPinJoin < ApplicationRecord 

    validates :pin_id, :board_id, presence: true
    validates :note, length: { maximum: 500 }

    belongs_to :board,
        primary_key: :id,
        foreign_key: :board_id,
        class_name: :Board

    belongs_to :pin, 
        primary_key: :id,
        foreign_key: :pin_id,
        class_name: :Pin

end