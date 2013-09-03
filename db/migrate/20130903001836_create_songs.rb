class CreateSongs < ActiveRecord::Migration
  def change
    create_table :songs do |t|
      t.string :title
      t.integer :user_id
      t.text :body
      t.string :album_title
      t.string :youtube_link
      t.string :artist

      t.timestamps
    end
  end
end
