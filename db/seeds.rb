# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.delete_all
Board.delete_all

demo = User.create!(
    email: 'demoUser@email.com',
    password: '123456',
    age: 22,
    f_name: 'Demo',
    l_name: 'User',
    username: 'demoUser'
)
Travel = Board.create!(
    title: 'Travel',
    is_private: false,
    owner_id: demo.id,
)

Board.create!(
    title: 'Nature',
    is_private: false,
    owner_id: demo.id,
)
Board.create!(
    title: 'Cacti',
    is_private: false,
    owner_id: demo.id,
)

josef = User.create!(
    email: 'josef@email.com',
    password: 'password',
    age: 24,
    f_name: 'Josef',
    l_name: 'Sipiorski',
    username: 'josefSipi'
)
Board.create!(
    title: 'Mountain Climbing',
    is_private: false,
    owner_id: josef.id,
)
Board.create!(
    title: 'Lofi Graphics',
    is_private: false,
    owner_id: josef.id,
)
Board.create!(
    title: 'mushrooms',
    is_private: false,
    owner_id: josef.id,
)

dan = User.create!(
    email: 'Dan@email.com',
    password: 'password',
    age: 19,
    f_name: 'Dan',
    l_name: 'Smith',
    username: 'DanS'
)
Board.create!(
    title: 'animals',
    is_private: false,
    owner_id: dan.id,
)
Board.create!(
    title: 'Apartment',
    is_private: false,
    owner_id: dan.id,
)
Board.create!(
    title: 'Adventure',
    is_private: false,
    owner_id: dan.id,
)
Board.create!(
    title: 'Bikes',
    is_private: false,
    owner_id: dan.id,
)

sam = User.create!(
    email: 'Sam@email.com',
    password: 'password',
    age: 25,
    f_name: 'Sam',
    l_name: 'Henderson',
    username: 'HendersonS'
)
Board.create!(
    title: 'longboard',
    is_private: false,
    owner_id: sam.id,
)
Board.create!(
    title: 'landscape',
    is_private: false,
    owner_id: sam.id,
)

alex = User.create!(
    email: 'Alex@email.com',
    password: 'password',
    age: 23,
    f_name: 'Alex',
    l_name: 'Hiller',
    username: 'AlexTheHill'
)
Board.create!(
    title: 'Reading nook',
    is_private: false,
    owner_id: alex.id,
)
Board.create!(
    title: 'Outfit Ideas',
    is_private: false,
    owner_id: alex.id,
)

frodo = User.create!(
    email: 'Frodo@email.com',
    password: 'password',
    age: 11,
    f_name: 'Frodo',
    l_name: 'Sipiorski',
    username: 'FroFro'
)
Board.create!(
    title: 'Scratching',
    is_private: false,
    owner_id: frodo.id,
)
Board.create!(
    title: 'beds <3',
    is_private: false,
    owner_id: frodo.id,
)

holly = User.create!(
    email: 'Holly@email.com',
    password: 'password',
    age: 22,
    f_name: 'Holly',
    l_name: 'Short',
    username: 'hollyShort'
)
Board.create!(
    title: 'glass',
    is_private: false,
    owner_id: holly.id,
)

Board.create!(
    title: 'trees',
    is_private: false,
    owner_id: holly.id,
)
Board.create!(
    title: 'wings',
    is_private: false,
    owner_id: holly.id,
)
Board.create!(
    title: 'action',
    is_private: false,
    owner_id: holly.id,
)

