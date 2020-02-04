class Request < ApplicationRecord 
    # validates :ip, presence: true
    # validates :pword, presence: true
    # validates :userId, presence: true
    # validates :timestamp, presence: true
    # validates :requestMethod, presence: true
    # validates :requestPath, presence: true
    # validates :requestProtocol, presence: true
    # validates :responseCode, presence: true
    # validates :responseSize, presence: true
    # validates :referrer, presence: true
    # validates :browser, presence: true
    # validates :fullRequest, presence: true
    # validates :fullBrowserInfo, presence: true

    validates_presence_of :ip, :pword, :userId, :timestamp, :requestMethod, :requestPath, :requestProtocol, :responseCode, :responseSize, :referrer, :browser, :fullRequest, :fullBrowserInfo

    self.per_page = 20

end 