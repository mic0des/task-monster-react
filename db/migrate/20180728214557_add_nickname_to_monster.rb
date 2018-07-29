class AddNicknameToMonster < ActiveRecord::Migration[5.1]
  def change
    add_column :monsters, :nickname, :string
  end
end
