class Request < ApplicationRecord 

    validates_presence_of :ip, :pword, :userId, :timestamp, :requestMethod, :requestPath, :requestProtocol, :responseCode, :responseSize, :referrer, :browser, :fullRequest, :fullBrowserInfo

    self.per_page = 15

end 