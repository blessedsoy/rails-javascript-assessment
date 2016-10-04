class AddMemoToLists < ActiveRecord::Migration[5.0]
  def change
    add_column :lists, :memo, :text
  end
end
