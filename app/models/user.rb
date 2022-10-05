class User < ApplicationRecord
  has_secure_password

  validates :username, 
    uniqueness: true,
    length: { in: 3..30 }, 
    format: { without: URI::MailTo::EMAIL_REGEXP, message: "Can't be an email"}
  validates :email, 
    uniqueness: true,
    length: { in: 5..255 }, 
    format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, length: { in: 6..255 }, allow_nil: true
  validates :session_token, uniqueness: true

  before_validation :ensure_session_token

  def self.find_by_credentials(credential, password)
    user = nil

    if URI::MailTo::EMAIL_REGEXP.match?(credential)
      user = User.find_by(email: credential)
    else
      user = User.find_by(username: credential)
    end

    if user&.authenticate(password)
      return user
    end

    nil
  end

  def reset_session_token!
    self.session_token = self.generate_unique_session_token
    self.save!
    self.session_token
  end

  private

  def generate_unique_session_token
    while true
      token = SecureRandom.urlsafe_base64
      return token unless User.exists?(session_token: token)
    end
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end 

end
