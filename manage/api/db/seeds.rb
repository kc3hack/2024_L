# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

grades

Grade.create(name: "Gold", point: 200)
Grade.create(name: "Silver", point: 100)
Grade.create(name: "Bronze", point: 0)

MarkerColor.create(color: "red", point: 100)
MarkerColor.create(color: "blue", point: 50)
MarkerColor.create(color: "green", point: 30)
MarkerColor.create(color: "yellow", point: 10)
MarkerColor.create(color: "white", point: 5)
MarkerColor.create(color: "black", point: 3)
MarkerColor.create(color: "gray", point: 1)

User.create(name: "Admin", uid: "admin")
User.create(name: "User", uid: "user")
User.create(name: "Guest", uid: "guest")

Marker.create(name: "Tokyo Tower", latitude: 35.6585805, longitude: 139.7454329, address: "4 Chome-2-8 Shibakoen, Minato City, Tokyo 105-0011, Japan", point: 100)
Marker.create(name: "Skytree", latitude: 35.710062, longitude: 139.8107004, address: "1 Chome-1-2 Oshiage, Sumida City, Tokyo 131-0045, Japan", point: 50)
Marker.create(name: "Shibuya Crossing", latitude: 35.659624, longitude: 139.700581, address: "2 Chome-2-1 Dogenzaka, Shibuya City, Tokyo 150-0043, Japan", point: 30)
Marker.create(name: "Shinjuku Gyoen", latitude: 35.685176, longitude: 139.709640, address: "11 Naitomachi, Shinjuku City, Tokyo 160-0014, Japan", point: 10)
Marker.create(name: "Meiji Shrine", latitude: 35.676397, longitude: 139.699325, address: "1-1 Yoyogikamizonocho, Shibuya City, Tokyo 151-0052, Japan", point: 5)
Marker.create(name: "Asakusa Temple", latitude: 35.714022, longitude: 139.796673, address: "2 Chome-3-1 Asakusa, Taito City, Tokyo 111-0032, Japan", point: 3)
Marker.create(name: "Ueno Zoo", latitude: 35.716507, longitude: 139.771854, address: "9-83 Uenokoen, Taito City, Tokyo 110-0007, Japan", point: 1)