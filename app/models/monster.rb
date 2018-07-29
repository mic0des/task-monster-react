class Monster < ApplicationRecord
	belongs_to :user
	has_many :task_lists 
end
