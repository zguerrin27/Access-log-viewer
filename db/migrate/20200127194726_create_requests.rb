class CreateRequests < ActiveRecord::Migration[6.0]
  def change
    create_table :requests do |t|
      t.string :ip_address
      t.string :password
      t.string :user_id
      t.datetime :timestamp
      t.string :request_method
      t.string :request_path
      t.string :request_protocol
      t.integer :response_code
      t.integer :response_size
      t.string :referrer
      t.string :browser
      t.text :full_request
      t.text :full_browser_info
    end
  end
end


