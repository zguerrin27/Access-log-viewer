# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_01_27_194726) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "requests", force: :cascade do |t|
    t.string "ip_address"
    t.string "password"
    t.string "user_id"
    t.datetime "timestamp"
    t.string "request_method"
    t.string "request_path"
    t.string "request_protocol"
    t.integer "response_code"
    t.integer "response_size"
    t.string "referrer"
    t.string "browser"
    t.text "full_request"
    t.text "full_browser_info"
  end

end
