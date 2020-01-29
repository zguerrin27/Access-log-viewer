class Request < ApplicationRecord 
    validates :ip, presence: true
    validates :pword, presence: true
    validates :userId, presence: true
    validates :timestamp, presence: true
    validates :request, presence: true
    validates :responseCode, presence: true
    validates :responseSize, presence: true
    validates :referrer, presence: true
    validates :browserInfo, presence: true
end 