class CreateRequests < ActiveRecord::Migration[6.0]
  def change
    create_table :requests do |t|
      t.string :ip
      t.string :pword
      t.string :userId
      t.datetime :timestamp
      t.string :requestMethod
      t.string :requestPath
      t.string :requestProtocol
      t.integer :responseCode
      t.integer :responseSize
      t.string :referrer
      t.string :browser
      t.text :fullRequest
      t.text :fullBrowserInfo
    end
  end
end


