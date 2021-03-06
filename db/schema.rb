# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_05_05_154623) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "boards", force: :cascade do |t|
    t.integer "owner_id", null: false
    t.string "title", null: false
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "is_private", default: false
    t.index ["owner_id"], name: "index_boards_on_owner_id"
  end

  create_table "boards_pin_joins", force: :cascade do |t|
    t.integer "pin_id", null: false
    t.integer "board_id", null: false
    t.text "note"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["board_id"], name: "index_boards_pin_joins_on_board_id"
    t.index ["pin_id"], name: "index_boards_pin_joins_on_pin_id"
  end

  create_table "comments", force: :cascade do |t|
    t.integer "commenter_id", null: false
    t.integer "pin_id", null: false
    t.text "body", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["commenter_id"], name: "index_comments_on_commenter_id"
    t.index ["pin_id"], name: "index_comments_on_pin_id"
  end

  create_table "follows", force: :cascade do |t|
    t.integer "follower_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "followed_user_id", null: false
    t.index ["follower_id", "followed_user_id"], name: "index_follows_on_follower_id_and_followed_user_id", unique: true
    t.index ["follower_id"], name: "index_follows_on_follower_id"
  end

  create_table "likes", force: :cascade do |t|
    t.integer "liker_id", null: false
    t.integer "comment_liked_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["comment_liked_id"], name: "index_likes_on_comment_liked_id"
    t.index ["liker_id"], name: "index_likes_on_liker_id"
  end

  create_table "pins", force: :cascade do |t|
    t.integer "creator_id", null: false
    t.string "description"
    t.string "description2"
    t.string "websiteURL"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "board_id"
    t.string "title"
    t.index ["creator_id"], name: "index_pins_on_creator_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.text "bio"
    t.integer "age", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "f_name"
    t.string "l_name"
    t.string "username"
    t.index ["f_name"], name: "index_users_on_f_name"
    t.index ["l_name"], name: "index_users_on_l_name"
    t.index ["session_token"], name: "index_users_on_session_token"
    t.index ["username"], name: "index_users_on_username"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
end
