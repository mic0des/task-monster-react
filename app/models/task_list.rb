class TaskList < ApplicationRecord
	has_many :tasks
	belongs_to :user
	belongs_to :monster
end
