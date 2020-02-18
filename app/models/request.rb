class Request < ApplicationRecord 

    validates_presence_of :ip_address, :password, :user_id, :timestamp, :request_method, :request_path, :request_protocol, :response_code, :response_size, :referrer, :browser, :full_request, :full_browser_info

    self.per_page = 15

end 