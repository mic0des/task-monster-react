class AddUserToMonster < ActiveRecord::Migration[5.1]
  def change
    add_reference :monsters, :user, foreign_key: true
  end
end
