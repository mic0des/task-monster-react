class User < ApplicationRecord
	has_one :monster
	has_many :task_lists
end
