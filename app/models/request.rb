class Request < ApplicationRecord 

    validates_presence_of :ip_address, :password, :user_id, :timestamp, :request_method, :request_path, :request_protocol, :response_code, :response_size, :referrer, :browser, :full_request, :full_browser_info

    scope :less_than_size, ->(size) { where("response_size < ?", size)}
    scope :larger_than_size, ->(size) { where("response_size > ?", size)} 
    scope :exact_size, ->(size) { where("response_size = ?", size)}  

    scope :before_time, ->(time) { where("timestamp < ?", time)}
    scope :at_time, ->(time) { where("timestamp = ?", time)} 
    scope :after_time, ->(time) { where("timestamp > ?", time)}  

    scope :request_path_starts_with, ->(user_input) { where("request_path ILIKE :prefix", prefix: "#{user_input}%")}
    scope :request_path_contains, ->(user_input) { where("request_path ILIKE ?", "%#{user_input}%")} 
    scope :request_path_ends_with, ->(user_input) { where("request_path ILIKE :suffix", suffix: "%#{user_input}")}  

    scope :referrer_starts_with, ->(user_input) { where("referrer ILIKE :prefix", prefix: "#{user_input}%")}
    scope :referrer_contains, ->(user_input) { where("referrer ILIKE ?", "%#{user_input}%")} 
    scope :referrer_ends_with, ->(user_input) { where("referrer ILIKE :suffix", suffix: "%#{user_input}")}  
    
end 