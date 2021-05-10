class User < ApplicationRecord


    validates :email, :f_name, :l_name, :username, :age, :password_digest, presence: true
        validates :password, length: {minimum: 6, allow_nil: true}
        validates :email, :username, :session_token, uniqueness: true

    attr_reader :password

    



end