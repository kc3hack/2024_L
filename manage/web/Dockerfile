FROM node:18.17.0

# 作業ディレクトリ
WORKDIR /usr/src/app

# 環境変数
ENV CI=true

RUN \
    # パッケージインストール
    apt-get update -y -qq && apt-get install -y -qq --no-install-recommends \
        sudo \
    ; \
    # キャッシュ削除
    apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false; \
    apt-get clean; \
    rm -rf /var/lib/apt/lists/* \
    ; \
    \
    # 開発ユーザに sudo 権限を付与
    echo "" >> /etc/sudoers ; \
    echo "# Don't require password for sudo command for dev user" >> /etc/sudoers ; \
    echo "dev ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# コンテナ起動時に実行するスクリプト
COPY ./startContainer.sh /usr/local/bin/startContainer.sh

# コピーしたスクリプトに実行権限を付与
RUN chmod +x /usr/local/bin/startContainer.sh

# 開発ユーザに切り替え
USER node

# コンテナ起動時に実行するスクリプトを実行
CMD ["/bin/bash", "-c", "startContainer.sh"]