class User < ApplicationRecord

# removed the presence: true validation for testing of the following: (:f_name, :l_name, :username,)
    validates :email, :age, :password_digest, :session_token, presence: true
    validates :password, length: {minimum: 6, allow_nil: true}
    validates :email, :username, :session_token, uniqueness: true
    

    attr_reader :password

    after_initialize :ensure_session_token

    has_one_attached :profile_pic

    has_many :boards,
        primary_key: :id,
        foreign_key: :owner_id,
        class_name: :Board
    
    has_many :pins,
        primary_key: :id,
        # foreign_key: :pinner_id,
        foreign_key: :creator_id,
        class_name: :Pin
    
    has_many :likes,
        primary_key: :id,
        foreign_key: :liker_id,
        class_name: :Like

    
    # has_many :comments,
    #     as: :commentable
    # polymorphic association

    # has_many :follows,
    #     as: :followable
    # polymorphic association
  
    def self.find_by_cridentialsEmail(email, password)
        user = User.find_by(email: email)
        if user && user.is_password?(password)
            user
        else
            nil
        end
    end

    def ensure_profile_pic
        
    end


    def self.find_by_cridentials(username, password)
        user = User.find_by(username: username)
        if user && user.is_password?(password)
            user
        else
            nil
        end
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def ensure_session_token
        self.session_token ||= SecureRandom.urlsafe_base64
    end

    def reset_session_token!
        self.session_token = SecureRandom.urlsafe_base64
        self.save
        self.session_token
    end
end