class AddSpeciesToMonster < ActiveRecord::Migration[5.1]
  def change
    add_column :monsters, :species, :string
  end
end
