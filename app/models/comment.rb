class Comment < ApplicationRecord

    validates :commenter_id, :pin_id, :body, presence: true

    belongs_to :pin,
        primary_key: :id,
        foreign_key: :pin_id,
        class_name: :Pin

    belongs_to :commenter,
        primary_key: :id,
        foreign_key: :commenter_id,
        class_name: :User

end