FROM ruby:3.2.2

ARG RUBYGEMS_VERSION=3.4.18
ARG USERNAME=dev
ARG GROUPNAME=dev
ARG UID=1000
ARG GID=1000

# 作業ディレクトリ
WORKDIR /usr/src/app

RUN \
    # パッケージインストール
    apt-get update -y -qq ; apt-get install -y -qq --no-install-recommends \
    nano \
    sudo \
    ; \
    \
    # キャッシュ削除
    apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false; \
    apt-get clean; \
    rm -rf /var/lib/apt/lists/* \
    ; \
    \
    # 開発ユーザ作成
    groupadd -g $GID $GROUPNAME && \
    useradd -m -s /bin/bash -u $UID -g $GID $USERNAME \
    ; \
    \
    # 開発ユーザに sudo 権限を付与
    echo "" >> /etc/sudoers ; \
    echo "# Don't require password for sudo command for dev user" >> /etc/sudoers ; \
    echo "dev ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers \
    ; \
    \
    # rails インストール
    gem install -v 7.0.6 rails ; \
    gem update --system ${RUBYGEMS_VERSION}

# コンテナ起動時・作成時に実行するスクリプト
COPY ./startContainer.sh /usr/local/bin/startContainer.sh
COPY ./createContainer.sh /usr/local/bin/createContainer.sh

# コピーしたスクリプトに実行権限を付与
RUN chmod +x /usr/local/bin/startContainer.sh ; \
    chmod +x /usr/local/bin/createContainer.sh

# 開発ユーザに切り替え
USER $USERNAME

ENV RAILS_ENV=development

RUN bundle config set path 'vendor/bundle'

# コンテナ起動時に実行するスクリプトを実行 \
CMD ["/bin/bash", "-c", "startContainer.sh"]