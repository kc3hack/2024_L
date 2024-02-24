# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

grades = Grade.all
if grades.empty?
  Grade.create(name: "Gold", point: 200)
  Grade.create(name: "Silver", point: 100)
  Grade.create(name: "Bronze", point: 0)
end

marker_colors = MarkerColor.all
if marker_colors.empty?
  MarkerColor.create(color: "red", point: 100)
  MarkerColor.create(color: "blue", point: 50)
  MarkerColor.create(color: "green", point: 30)
  MarkerColor.create(color: "yellow", point: 10)
  MarkerColor.create(color: "white", point: 5)
  MarkerColor.create(color: "black", point: 3)
  MarkerColor.create(color: "gray", point: 1)
end

users = User.all
if users.empty?
  User.create(name: "KansaiMaster", uid: "test:kansaimaster")
  User.create(name: "はばタン", uid: "test:habatan")
  User.create(name: "おの社協戦士ウイングレッド", uid: "test:wingred")
end

markers = Marker.all
if markers.empty?
  Marker.create(name: "大阪工業大学　枚方キャンパス", latitude: 34.843662, longitude: 135.705658, address: "大阪府枚方市北山１丁目７９−１", point: 100)
  Marker.create(name: "ひらパー", latitude: 34.808491, longitude: 135.639572, address: "大阪府枚方市枚方公園町１−１", point: 50)
  Marker.create(name: "大阪城", latitude: 34.685196, longitude: 135.525696, address: "大阪府大阪市中央区大阪城１−１", point: 30)
  Marker.create(name: "京都駅", latitude: 34.985849, longitude: 135.758767, address: "京都府京都市下京区東塩小路町", point: 10)
  Marker.create(name: "奈良公園", latitude: 34.685364, longitude: 135.839023, address: "奈良県奈良市雑司町", point: 50)
  Marker.create(name: "神戸ハーバーランド", latitude: 34.689553, longitude: 135.186823, address: "兵庫県神戸市中央区東川崎町", point: 20)
  Marker.create(name: "USJ", latitude: 34.665442, longitude: 135.432338, address: "大阪府大阪市此花区桜島２丁目１−３３", point: 1)
  Marker.create(name: "関西国際空港", latitude: 34.434167, longitude: 135.243056, address: "大阪府泉佐野市泉州空港北１", point: 10)
  Marker.create(name: "伊丹空港", latitude: 34.785833, longitude: 135.438056, address: "兵庫県伊丹市立売堀１丁目３−１", point: 5)
  Marker.create(name: "大阪モノレール　万博記念公園駅", latitude: 34.814167, longitude: 135.601944, address: "大阪府吹田市千里万博公園", point: 10)
end

user_marker_links = UserMarkerLink.all
if user_marker_links.empty?
  UserMarkerLink.create(user_id: 1, marker_id: 1)
  UserMarkerLink.create(user_id: 2, marker_id: 2)
  UserMarkerLink.create(user_id: 3, marker_id: 3)
  UserMarkerLink.create(user_id: 1, marker_id: 4)
  UserMarkerLink.create(user_id: 2, marker_id: 5)
  UserMarkerLink.create(user_id: 3, marker_id: 6)

  User.find(1).update(point: 110)
  User.find(2).update(point: 100)
  User.find(3).update(point: 50)
end
