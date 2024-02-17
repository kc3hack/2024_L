# app/services/firebase_authenticator.rb
require 'jwt'
require 'net/http'

class FirebaseAuthenticator
  class InvalidTokenError < StandardError; end

  ALG = 'RS256'
  ISSUER_BASE_URL = "https://securetoken.google.com/"
  PROJECT_ID = ENV['RAILS_APP_FIREBASE_PROJECT_ID']
  CERTS_CACHE_KEY = 'firebase_auth_certificates'
  CERTS_URI = 'https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com'

  def initialize(token)
    @token = token
  end

  def validate!
    options = {
      algorithm: ALG,
      iss: ISSUER_BASE_URL + PROJECT_ID,
      verify_iss: true,
      aud: PROJECT_ID,
      verify_aud: true,
      verify_iat: true
    }

    payload, _ = JWT.decode(@token, nil, true, options) do |header|
      cert = fetch_certificates[header['kid']]
      if cert.present?
        OpenSSL::X509::Certificate.new(cert).public_key
      else
        nil
      end
    end

    # JWT.decodeでチェックされない項目をここでチェック
    raise InvalidTokenError.new('Invalid auth_time') unless Time.zone.at(payload['auth_time']).past?
    raise InvalidTokenError.new('Invalid sub') if payload['sub'].empty?

    payload

  rescue JWT::DecodeError => e
    Rails.logger.error e.message
    Rails.logger.error e.backtrace.join("\n")

    raise InvalidTokenError.new(e.message)
  end

  private

  # 証明書は毎回取得せずにキャッシュする
  def fetch_certificates
    cached = Rails.cache.read(CERTS_CACHE_KEY)
    return cached if cached.present?

    res = Net::HTTP.get_response(URI(CERTS_URI))
    raise 'Fetch certificates error' unless res.is_a?(Net::HTTPSuccess)

    body = JSON.parse(res.body)
    expires_at = Time.zone.parse(res.header['expires'])
    Rails.cache.write(CERTS_CACHE_KEY, body, expires_in: expires_at - Time.current)

    body
  end
end