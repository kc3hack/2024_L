#!/bin/bash

# createContainer.sh が存在していれば実行（コンテナ作成時に実行）
if [ -e "/usr/local/bin/createContainer.sh" ]; then
  # 繰り返し
  while true; do
    # db:3306 の接続を確認
    curl db:3306

    # 接続できたらループを抜ける
    if [ $? -eq 1 ]; then
      break
    fi

    # 接続できなかったら1秒待機して再度確認
    sleep 1
  done

  # createContainer.sh を実行
  /usr/local/bin/createContainer.sh

  # createContainer.sh を削除
  rm -f /usr/local/bin/createContainer.sh
fi

# rails サーバの起動
rm -f tmp/pids/server.pid
rails s -p 5000 -b '0.0.0.0'