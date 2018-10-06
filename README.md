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
- has_many :members


## groupsテーブル

|Column|Type|Options|
|------|---|-------|
|name      |string|null: false|
|add_member|string||
|member    |string||

### Asociation
-has_many :messages
-has_many :members


## membersテーブル

|Column|Type|Options|
|------|---|-------|
|user_id |integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group



