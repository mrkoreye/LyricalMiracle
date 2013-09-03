class CreateAnnotations < ActiveRecord::Migration
  def change
    create_table :annotations do |t|
      t.string :body
      t.integer :user_id
      t.integer :song_id

      t.timestamps
    end
  end
end
