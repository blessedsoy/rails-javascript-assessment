class RemoveMemosTable < ActiveRecord::Migration[5.0]
  def change
    drop_table :memos
  end
end
