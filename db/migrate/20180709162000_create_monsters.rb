class CreateMonsters < ActiveRecord::Migration[5.1]
  def change
    create_table :monsters do |t|

      t.timestamps
    end
  end
end
