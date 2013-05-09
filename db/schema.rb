# encoding: UTF-8
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
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130509061927) do

  create_table "document_groups", :force => true do |t|
    t.integer  "document_id"
    t.integer  "user_id"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  add_index "document_groups", ["document_id"], :name => "index_document_groups_on_document_id"
  add_index "document_groups", ["user_id"], :name => "index_document_groups_on_user_id"

  create_table "documents", :force => true do |t|
    t.string   "title"
    t.text     "preview"
    t.string   "location"
    t.integer  "owner_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.binary   "pdf_data"
  end

  add_index "documents", ["owner_id"], :name => "index_documents_on_owner_id"

  create_table "posts", :force => true do |t|
    t.text     "response"
    t.integer  "author_id"
    t.integer  "reply_to_id"
    t.integer  "tag_id"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  add_index "posts", ["author_id"], :name => "index_posts_on_author_id"
  add_index "posts", ["reply_to_id"], :name => "index_posts_on_reply_to_id"
  add_index "posts", ["tag_id"], :name => "index_posts_on_tag_id"

  create_table "tags", :force => true do |t|
    t.text     "task"
    t.integer  "x_1"
    t.integer  "x_2"
    t.integer  "y_1"
    t.integer  "y_2"
    t.integer  "document_id"
    t.integer  "creator_id"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  add_index "tags", ["creator_id"], :name => "index_tags_on_creator_id"
  add_index "tags", ["document_id"], :name => "index_tags_on_document_id"

  create_table "users", :force => true do |t|
    t.string   "email",                                :default => "", :null => false
    t.string   "encrypted_password",                   :default => ""
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                        :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                                           :null => false
    t.datetime "updated_at",                                           :null => false
    t.string   "provider"
    t.string   "uid"
    t.string   "invitation_token",       :limit => 60
    t.datetime "invitation_sent_at"
    t.datetime "invitation_accepted_at"
    t.integer  "invitation_limit"
    t.integer  "invited_by_id"
    t.string   "invited_by_type"
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["invitation_token"], :name => "index_users_on_invitation_token", :unique => true
  add_index "users", ["invited_by_id"], :name => "index_users_on_invited_by_id"
  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true

end
