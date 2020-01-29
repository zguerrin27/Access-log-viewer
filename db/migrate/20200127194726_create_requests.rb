class CreateRequests < ActiveRecord::Migration[6.0]
  def change
    create_table :requests do |t|
      t.inet :ip
      t.text :pword
      t.text :userId
      t.timestamp :timestamp
      t.text :request
      t.integer :responseCode
      t.integer :responseSize
      t.text :referrer
      t.text :browserInfo
    end
  end
end


