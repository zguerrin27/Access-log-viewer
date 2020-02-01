class Request < ApplicationRecord 
    validates :ip, presence: true
    validates :pword, presence: true
    validates :userId, presence: true
    validates :timestamp, presence: true
    validates :requestMethod, presence: true
    validates :requestPath, presence: true
    validates :requestProtocol, presence: true
    validates :responseCode, presence: true
    validates :responseSize, presence: true
    validates :referrer, presence: true
    validates :browser, presence: true
    validates :fullRequest, presence: true
    validates :fullBrowserInfo, presence: true

    self.per_page = 10

    def self.search(params) 
        where(ip: "#{params[:search]}")
    end
    
end 