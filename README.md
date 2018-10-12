# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...



## messagesテーブル

|Column|Type|Options|
|------|---|-------|
|body    |text   |null: false|
|image   |string ||
|group_id|integer|null: false|
|user_id |integer|null: false|

### Asssociation
- belongs_to :user
- belongs_tp :group


## usersテーブル

|Column|Type|Options|
|------|---|-------|
|name    |string|index: true, null: false  unique: true|
|email   |string|null: false, unique: true|
|password|string|null: false, unique: true|

### Association
- has_many :messages
- has_many :groups, through: :members
- has_many :members


## groupテーブル

|Column|Type|Options|
|------|---|-------|
|name      |string|null: false, index: true, unique: true|

### Asociation
-has_many :messages
-has_many :users, through: :members
-has_many :members


## group_userテーブル

|Column|Type|Options|
|------|---|-------|
|group |references|foreign_key: true|
|user  |references|foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group



