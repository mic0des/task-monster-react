class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
	devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
	has_one :monster
	has_many :task_lists

	def gravatar_url
  		email_address = self.email
  		gravatar = Digest::MD5::hexdigest(email_address).downcase 
  		url = "http://gravatar.com/avatar/#{gravatar}.png?s=#64"
  		return !!url ? url : "http://www.gravatar.com/avatar/?d=identicon"
	end

	def gravatar_url_small
    	email_address = self.email
    	gravatar = Digest::MD5::hexdigest(email_address).downcase 
    	url = "http://gravatar.com/avatar/#{gravatar}.png?s=#32"
    	return !!url ? url : "http://www.gravatar.com/avatar/?d=identicon"
	end

end
