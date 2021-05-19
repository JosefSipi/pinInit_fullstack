class Board < ApplicationRecord
    validates :owner_id, :title, presence: true
    validates :description, length: { maximum: 500 }



    belongs_to :owner,
        primary_key: :id,
        foreign_key: :owner_id,
        class_name: :User

    has_many :pins,
        primary_key: :id,
        foreign_key: :pinner_id,
        class_name: :Pin



    
end
