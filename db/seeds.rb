# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

ApplicationRecord.transaction do 
    puts "Destroying tables..."
    puts "Goodbye Users..."
    User.destroy_all
    puts "Goodbye Benches..."
    Bench.destroy_all

    puts "Resetting primary keys..."
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('benches')

    puts "Creating Users..."
    User.create!(
        username: 'Demo-lition',
        email: 'jspartan@sanangelespd.io',
        password: '3seashells'
    )

    10.times do 
        User.create!({
            username: Faker::Internet.unique.username(specifier: 3),
            email: Faker::Internet.unique.email,
            password: 'password'
        })
    end

    puts "Creating Benches..."
    bench_1 = Bench.create!({
        title: Faker::Coffee.blend_name,
        description: Faker::Coffee.notes,
        seating: 2,
        price: '25',
        lat: 40.034412267303175, 
        lng: -105.26101617511074
    })

    bench_2 = Bench.create!({
        title: Faker::Coffee.blend_name,
        description: Faker::Coffee.notes,
        seating: 2,
        price: '25',
        lat: 40.03888480915883, 
        lng: -105.26387987079231
    })

    bench_3 = Bench.create!({
        title: Faker::Coffee.blend_name,
        description: Faker::Coffee.notes,
        seating: 2,
        price: '25',
        lat: 40.033322398373365, 
        lng: -105.26787086342866
    })

    bench_4 = Bench.create!({
        title: Faker::Coffee.blend_name,
        description: Faker::Coffee.notes,
        seating: 2,
        price: '25',
        lat: 40.02869932902171, 
        lng: -105.2861543904023
    })

    bench_5 = Bench.create!({
        title: Faker::Coffee.blend_name,
        description: Faker::Coffee.notes,
        seating: 2,
        price: '25',
        lat: 40.02939763630952, 
        lng: -105.23388279127643
    })

    puts "Done!"
end