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
  Marker.create(name: "大阪工業大学　枚方キャンパス", description: "大阪工業大学は、大阪府大阪市旭区大宮五丁目16番1号に本部を置く日本の私立大学。1922年創立、1949年大学設置。大学の略称は大阪工大、大工大、阪工大。特に学会では、阪工大が用いられることが多い。" ,latitude: 34.843662, longitude: 135.705658, address: "大阪府枚方市北山１丁目７９−１", point: 100)
  Marker.create(name: "ひらパー", description:"ひらかたパークは、大阪府枚方市枚方公園町にある、京阪電気鉄道の子会社、京阪レジャーサービスが運営する[1]遊園地（テーマパーク）。通称は「ひらパー」。1度も取り壊されずに現存する遊園地では日本最古である。京阪本線の枚方公園駅前に位置している。年間の入園者数は130万人前後。",latitude: 34.808491, longitude: 135.639572, address: "大阪府枚方市枚方公園町１−１", point: 50)
  Marker.create(name: "大阪城", description:"大坂城／大阪城（おおさかじょう[注釈 1]）は、現在の大阪府大阪市中央区大阪城（上町台地の先端、摂津国東成郡生玉荘大坂）にあった、安土桃山時代に築かれ、江戸時代に再築された日本の城。別称は錦城（きんじょう／金城とも表記）。 「大阪城跡」として国の特別史跡に指定されている。なお、城址を含む一帯は大阪城公園（おおさかじょうこうえん）として整備されている。1931年に復興された天守は博物館「大阪城天守閣」となっている。", latitude: 34.685196, longitude: 135.525696, address: "大阪府大阪市中央区大阪城１−１", point: 30)
  Marker.create(name: "京都駅", description:"京都駅（きょうとえき）は、京都府京都市下京区にある、西日本旅客鉄道（JR西日本）・東海旅客鉄道（JR東海）・近畿日本鉄道（近鉄）・京都市交通局（京都市営地下鉄）の駅。 現存の原広司設計の烏丸口の駅ビルは「京都駅ビル」と呼ばれ、1997年に完成した4代目駅舎である[1][2]。", latitude: 34.985849, longitude: 135.758767, address: "京都府京都市下京区東塩小路町", point: 10)
  Marker.create(name: "奈良公園", description:"奈良公園（ならこうえん）は、奈良県奈良市にある都市公園である。国の名勝にして名所でもある。", latitude: 34.685364, longitude: 135.839023, address: "奈良県奈良市雑司町", point: 50)
  Marker.create(name: "神戸ハーバーランド",description:"神戸ハーバーランド（こうべハーバーランド）は、兵庫県神戸市中央区にある再開発地区。地元を中心に、単にハーバーランド (Harborland)と表記・呼称される事もある[1][2]。", latitude: 34.689553, longitude: 135.186823, address: "兵庫県神戸市中央区東川崎町", point: 20)
  Marker.create(name: "USJ", description:"ユニバーサル・スタジオ・ジャパン（英: Universal Studios Japan、通称：USJ[2]）は、日本の大阪府大阪市此花区にあるテーマパーク。米国NBCユニバーサル（コムキャスト）のテーマパーク部門ユニバーサル・デスティネーションズ&エクスペリエンシズが展開し、世界に5つあるユニバーサル・スタジオ・テーマパークスの一つで、合同会社ユー・エス・ジェイが所有・運営している。2017年からNBCユニバーサルの完全子会社[3]。",  latitude: 34.665442, longitude: 135.432338, address: "大阪府大阪市此花区桜島２丁目１−３３", point: 1)
  Marker.create(name: "関西国際空港", description:"関西国際空港（かんさいこくさいくうこう、英: Kansai International Airport）は、大阪府大阪市の南西約40 kmに位置する国際空港。西日本の国際的な玄関口であり、関西三空港の一つとして大阪国際空港（伊丹空港）、神戸空港とともに関西エアポート株式会社によって一体運営が行われている。",  latitude: 34.434167, longitude: 135.243056, address: "大阪府泉佐野市泉州空港北１", point: 10)
  Marker.create(name: "伊丹空港", description:"大阪国際空港（おおさかこくさいくうこう、英語: Osaka International Airport）は、大阪府豊中市、同府池田市、兵庫県伊丹市にまたがる空港。伊丹空港（いたみくうこう、英語: Itami Airport）あるいは大阪空港（おおさかくうこう、英語: Osaka Airport）の通称でも知られる。名前に「国際」と付いており、1994年の関西国際空港開港の前は名実ともに国際空港であったが、現在は国内線専用の拠点空港（基幹空港）として運用されている。近隣の関西国際空港、神戸空港とともに関西三空港のひとつである。空港運営は関西エアポートが実施している。",  latitude: 34.785833, longitude: 135.438056, address: "兵庫県伊丹市立売堀１丁目３−１", point: 5)
  Marker.create(name: "大阪モノレール　万博記念公園駅", description:"万博記念公園駅（ばんぱくきねんこうえんえき）は、大阪府吹田市にある大阪モノレールの駅。本線と彩都線の2路線が乗り入れる。第1回近畿の駅百選選定駅。2015年に太陽の駅の愛称がつけられた。駅番号は17。",  latitude: 34.814167, longitude: 135.601944, address: "大阪府吹田市千里万博公園", point: 10)
  Marker.create(name: "姫路城", description:"世界遺産にも登録されている、白鷺城と呼ばれる美しい城", latitude:34.8377895, longitude:134.6912532, address:"兵庫県姫路市本町６８−２５", point: 30)
  Marker.create(name: "有馬温泉", description:"日本三名湯の一つとして知られる温泉街" , latitude:34.794008 , longitude:135.2432138 , address:"兵庫県神戸市北区有馬町" , point: 20)
  Marker.create(name: "六甲山", description:"神戸の街並みと大阪湾を一望できる景勝地" , latitude:34.7780393 , longitude:135.2534241 , address:"兵庫県神戸市北区有馬町" , point: 20)
  Marker.create(name: "淡路島", description:"鳴門海峡のうず潮や、国営明石海峡公園など、自然豊かな観光スポットが多数" , latitude:34.3271453 , longitude:134.8080121 , address:"兵庫県" , point: 10)
  Marker.create(name: "北野異人館街", description:"明治・大正時代に建てられた洋館が立ち並ぶ、異国情緒あふれる街並み" , latitude:34.7007327 , longitude:135.1882157 , address:"兵庫県神戸市中央区北野町", point: 30)
  Marker.create(name: "神戸ハーバーランド", description:"ショッピングやグルメを楽しめる、海沿いの複合商業施設" , latitude:34.6788107 , longitude:135.177998 , address:"兵庫県神戸市中央区東川崎町１丁目", point: 5)
  Marker.create(name: "宝塚歌劇", description:"華麗な舞台で魅せる、女性だけの歌劇団" , latitude:34.8072308 , longitude:135.3436711 , address:"兵庫県宝塚市栄町１丁目１−５７", point: 5)
  Marker.create(name: "城崎温泉", description:"外湯巡りが楽しめる、風情ある温泉街" , latitude:35.6226735 , longitude:134.7871971 , address:"兵庫県豊岡市 城崎町今津２８３", point: 40)
  Marker.create(name: "竹田城跡", description:"天空の城と呼ばれる、雲海に浮かぶ城跡" , latitude:35.3005639 , longitude:134.8265452 , address:"兵庫県朝来市和田山町竹田古城山169番地", point: 10)
  Marker.create(name: "哲学の道", description: "桜並木が美しい、散策にぴったりの道", latitude:35.0214532 , longitude:135.7942948 , address:"左京区 京都市 京都府 606-8426" , point: 50)
  Marker.create(name: "京町家カフェ", description: "京町家を改装したカフェは、京都ならではの魅力を味わえるスポット", latitude:35.0067163 , longitude:135.7547531 , address:"京都府京都市中京区七観音町 烏丸通", point: 50)
  Marker.create(name: "南禅寺水路閣", description: "レンガ造りの水路橋", latitude:35.0105859 , longitude:135.7913714 , address: "京都府京都市左京区南禅寺風呂山町", point: 20)
  Marker.create(name: "瑠璃光院", description: "天井に描かれた美しい庭園画が有名な寺院", latitude:35.0634617 , longitude:135.8061425 , address: "京都府京都市左京区上高野東山５５−５５", point: 5)
  Marker.create(name: "金閣寺", description: "美しい庭園に囲まれ、池のほとりにたたずむ由緒ある閑静な寺", latitude:35.0393698 , longitude:135.7264106 , address: "京都府京都市北区金閣寺町１", point: 5)
  Marker.create(name: "貴船神社", description: "川沿いに赤い灯籠が並ぶ、神秘的な雰囲気の神社", latitude:35.1168216 , longitude:135.753144 , address: "京都府京都市左京区鞍馬貴船町１８０", point: 20)
  Marker.create(name: "鞍馬寺", description: "山の中にひっそりと佇む、パワースポットとして知られる寺院", latitude:35.1177867 , longitude:135.7655437 , address: "京都府京都市左京区鞍馬本町１０７４", point: 10)
  Marker.create(name: "二条城二の丸御殿", description: "江戸幕府の権力の象徴であった二条城の内部を見学できる", latitude:35.0133446 , longitude:135.7476085 , address: "京都府京都市中京区二条通堀川西入二条城町541番地", point: 30)
  Marker.create(name: "京都御苑", description: "広大な敷地内に、京都御所や仙洞御所など、歴史的な建造物が多数ある", latitude:35.0232842 , longitude:135.7582785 , address: "京都府京都市上京区京都御苑３", point: 10)
  Marker.create(name: "東寺弘法市", description: "毎月21日に東寺境内で開催される、骨董市", latitude:34.9806472 , longitude:135.7452665 , address: "京都府京都市南区九条町１", point: 20)
  Marker.create(name: "琵琶湖", description: "日本最大の湖で、遊覧船やクルージングなどが楽しめる", latitude:35.2483116 ,longitude:136.0688862 ,address:"滋賀県 琵琶湖",point:1)
  Marker.create(name: "彦根城", description: "国宝にも指定されている、美しい城", latitude:35.276452 ,longitude:136.251846 ,address:"滋賀県彦根市金亀町１−１",point:10)
  Marker.create(name: "近江神宮", description: "天智天皇を祀る神社で、歴史ある建造物や庭園が楽しめる", latitude:35.0322394 ,longitude:135.8519502 ,address:"滋賀県大津市神宮町１−１",point:20)
  Marker.create(name: "メタセコイア並木", description: "美しい並木道で、写真撮影に人気", latitude:35.4670052 ,longitude:136.0359276 ,address:"滋賀県高島市マキノ町牧野",point:5)
  Marker.create(name: "白髭神社", description: "琵琶湖の湖中に浮かぶ神社で、神秘的な雰囲気", latitude:35.274531 ,longitude:136.011054 ,address:"滋賀県高島市鵜川２１５",point:20)
  Marker.create(name: "黒壁スクエア", description: "古い町並みを活かした、おしゃれなエリア", latitude:35.3807087 ,longitude:136.2670812 ,address:"滋賀県長浜市元浜町１２−３８",point:20)
  Marker.create(name: "多賀大社", description: "縁結びの神様として有名な神社", latitude:35.2251576 ,longitude:136.291025 ,address:"滋賀県犬上郡多賀町多賀６０４",point:30)
  Marker.create(name: "びわ湖バレイ", description: "ロープウェイで山頂に登り、琵琶湖の絶景を楽しめる", latitude:35.2129605 ,longitude:135.8958791 ,address:"滋賀県大津市木戸１５４７−１",point:30)
  Marker.create(name: "マキノピックランド", description: "季節の花畑を楽しめる観光農園", latitude:35.4712306 ,longitude:136.0369817 ,address:"滋賀県高島市マキノ町寺久保８３５−１",point:50)
  Marker.create(name: "ラ コリーナ近江八幡", description: "たねやグループが運営する、お菓子のテーマパーク", latitude:35.148882 ,longitude:136.0909952 ,address:"滋賀県近江八幡市北之庄町６１５−１",point:50)
  Marker.create(name:"和歌山城",description:"徳川御三家の一つ、紀州徳川氏の居城だったお城です。天守閣からは和歌山市街や和歌浦の美しい景色を楽しめます。",latitude:34.2276836,longitude:135.1694616,address:"和歌山県和歌山市一番丁",point:5)
  Marker.create(name:"熊野那智大社",description:"熊野三山の一つ、熊野那智大社は、熊野夫須美大神を祀る神社です。国の重要文化財に指定されている三重塔や、日本三名瀑の一つである那智の滝などがあります。",latitude:33.668655,longitude:135.8875585,address:"和歌山県東牟婁郡那智勝浦町那智山１",point:20)
  Marker.create(name:"高野山",description:"真言宗の総本山である金剛峯寺がある高野山は、弘法大師空海によって開かれた霊場です。奥之院には空海御廟があり、多くの参拝者が訪れています。",latitude:34.2162518,longitude:135.583308,address:"和歌山県伊都郡高野町高野山",point:30)
  Marker.create(name:"白浜",description:"美しい海岸線と温泉が楽しめる白浜は、リゾート地として人気です。円月島や千畳敷、三段壁などの景勝地や、アドベンチャーワールドなどの観光施設があります。",latitude:33.6256281,longitude:135.4144106,address:"和歌山県西牟婁郡白浜町１−１",point:5)
  Marker.create(name:"本州最南端の碑",description:"紀伊半島の最南端に位置し、ダイビングやシュノーケリングなどのマリンスポーツが楽しめるスポットです。また、世界遺産に登録されている紀伊山地の霊場と参詣道の一つ、熊野古道があります。",latitude:33.459114,longitude:135.749302,address:"和歌山県東牟婁郡串本町潮岬",point:20)
  Marker.create(name:"那智勝浦",description:"マグロ漁で有名な那智勝浦は、新鮮な海鮮料理を楽しめる港町です。那智の滝や熊野那智大社などの観光地も近くにあります。",latitude:33.6310432,longitude:135.803057,address:"和歌山県東牟婁郡那智勝浦町",point:20)
  Marker.create(name:"和歌浦",description:"和歌山市の南に位置する和歌浦は、万葉集にも詠まれた景勝地です。美しい海岸線と松林、温泉などが楽しめます。",latitude:34.1874047,longitude:135.1535529,address:"和歌山県和歌山市和歌浦東１丁目１",point:30)
  Marker.create(name:"九度山",description:"真田幸村が幽閉された地として知られる九度山は、歴史的な町並みが残る城下町です。真田庵や九度山村歴史民俗資料館などの観光地があります。",latitude:34.2690971,longitude:135.5445865,address:"和歌山県伊都郡九度山町九度山",point:10)
  Marker.create(name:"紀三井寺",description:"西国三十三観音霊場第一番札所である紀三井寺は、和歌山市内にある寺院です。三井の湧水や、国宝に指定されている三重塔などがあります。",latitude:34.179296,longitude:135.1793644,address:"和歌山県和歌山市紀三井寺１２０１",point:20)
  Marker.create(name:"東大寺",description:"奈良時代を代表する寺院で、世界最大級の木造建築である大仏殿があります。",latitude:34.6889296,longitude:135.837242,address:"奈良県奈良市雑司町４０６−１",point:5)
  Marker.create(name:"興福寺",description:"五重塔や阿修羅像などの国宝を擁する、奈良時代から続く古刹です。",latitude:34.6889512,longitude:135.8295172,address:"奈良県奈良市登大路町４８",point:20)
  Marker.create(name:"春日大社",description:"奈良公園の奥深くに鎮座する神社で、朱塗りの楼門や本殿が美しいです。",latitude:34.6815498,longitude:135.845897,address:"奈良県奈良市春日野町１６０",point:5)
  Marker.create(name:"法隆寺",description:"世界最古の木造建築として知られる、聖徳太子ゆかりの寺院です。",latitude:34.6300186,longitude:135.7085773,address:"奈良県生駒郡斑鳩町法隆寺山内１−１−１",point:5)
  Marker.create(name:"唐招提寺",description:"鑑真和上が建立した、中国風の建築様式が特徴の寺院です。",latitude:34.6757942,longitude:135.7839929,address:"奈良県奈良市五条町１３−４６",point:20)
  Marker.create(name:"薬師寺",description:"白鳳時代の建築様式を残す、薬師如来を本尊とする寺院です。",latitude:34.6758052,longitude:135.7801305,address:"奈良県奈良市西ノ京町４５７",point:10)
  Marker.create(name:"平城宮跡",description:"平城京の中心施設であった平城宮の跡地で、朱雀門や第一次大極殿などが復原されています。",latitude:34.6923651,longitude:135.7917384,address:"奈良県奈良市二条大路南３丁目５番1号",point:10)
  Marker.create(name:"吉野山",description:"修験道の聖地として知られる山で、春は桜、秋は紅葉の名所です。",latitude:34.3564498,longitude:135.8603173,address:"奈良県吉野郡吉野町 吉野山",point:20)
  Marker.create(name:"十津川村",description:"古くから秘境として知られる村で、自然豊かな景観と伝統的な暮らしが楽しめます。",latitude:34.0062906,longitude:135.5689168,address:"奈良県吉野郡十津川村",point:30)
  Marker.create(name:"伊勢神宮",description:"伊勢神宮は、皇室の祖神である天照大御神を祀る神社です。内宮と外宮を中心に125の神社から成り立っています。",latitude:34.4550082,longitude:136.7228989,address:"三重県伊勢市宇治浦田1",point:5)
  Marker.create(name:"鳥羽水族館",description:"鳥羽水族館は、約1200種類の海の生き物を飼育展示している水族館です。",latitude:34.4815869,longitude:136.8431177,address:"三重県鳥羽市鳥羽1-23-1",point:20)
  Marker.create(name:"二見浦",description:"二見浦は、伊勢神宮の別宮である二見興玉神社がある海岸です。夫婦岩と呼ばれる二つの岩が特徴です。",latitude:34.5080268,longitude:136.7047762,address:"三重県伊勢市二見町",point:10)
  Marker.create(name:"志摩スペイン村",description:"志摩スペイン村は、スペインの街並みを再現したテーマパークです。",latitude:34.3614427,longitude:136.8415454,address:"三重県志摩市磯部町坂下104-1",point:5)
  Marker.create(name:"ミキモト真珠島",description:"ミキモト真珠島は、真珠養殖発祥の地である答志島にある観光施設です。",latitude:34.4834051,longitude:136.8442673,address:"三重県鳥羽市答志島字先山1",point:20)
  Marker.create(name:"伊勢志摩スカイライン",description:"伊勢志摩スカイラインは、伊勢志摩国立公園を走るドライブウェイです。美しい海岸線の景色を楽しめます。",latitude:34.45895,longitude:136.7866526,address:"三重県鳥羽市鳥羽1-23-1",point:20)
  Marker.create(name:"朝熊岳",description:"朝熊岳は、伊勢神宮の神域である朝熊ヶ岳の山頂にある展望台です。伊勢湾や志摩半島の絶景を楽しめます。",latitude:34.4675727,longitude:136.7651125,address:"三重県伊勢市朝熊町",point:30)
  Marker.create(name:"赤目四十八滝",description:"赤目四十八滝は、国指定の特別名勝である渓谷です。大小48の滝が点在し、美しい自然を楽しめます。",latitude:34.5589806,longitude:136.0845481,address:"三重県名張市赤目町長瀬",point:20)
  Marker.create(name:"長谷寺",description:"長谷寺は、西国三十三観音霊場第八番札所である寺院です。十一面観音菩薩を本尊としており、美しい庭園で知られています。",latitude:34.535885,longitude:135.7543587,address:"三重県伊勢市二見町松下10",point:20)
  Marker.create(name:"湯の山温泉",description:"湯の山温泉は、1300年の歴史を持つ温泉街です。肌に優しい湯で知られており、多くの観光客が訪れています。",latitude:35.0164673,longitude:136.4485621,address:"三重県伊賀市湯山",point:10)
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
