require "test_helper"

class RequestTest < ActiveSupport::TestCase

    def setup
        @request = Request.new(ip_address: "83.149.9.216", password: "-", user_id: "-", timestamp: "12/12/12", request_method: "GET", request_path: "/path/to/endpoint", request_protocol: "HTTP/1.1", response_code: "200", response_size: "23456", referrer: "http://apple.com/sectretHelicopter", browser: "Safari", full_request: "GET /path/to/endpoint HTTP/1.1", full_browser_info: "Mozilla (Macintosh; Intel Mac OS X 10_9_1)")
    end

    test "request should be valid" do 
        assert @request.valid?
    end

    test "request should not save without valid feilds" do
        @request = Request.new(ip_address: "", password: "-", user_id: "-", timestamp: "12/12/12", request_method: "GET", request_path: "/path/to/endpoint", request_protocol: "HTTP/1.1", response_code: "200", response_size: "23456", referrer: "http://apple.com/sectretHelicopter", browser: "Safari", full_request: "GET /path/to/endpoint HTTP/1.1", full_browser_info: "Mozilla (Macintosh; Intel Mac OS X 10_9_1)")
        invalid_request(@request)

        @request = Request.new(ip_address: "83.149.9.216", password: "", user_id: "-", timestamp: "12/12/12", request_method: "GET", request_path: "/path/to/endpoint", request_protocol: "HTTP/1.1", response_code: "200", response_size: "23456", referrer: "http://apple.com/sectretHelicopter", browser: "Safari", full_request: "GET /path/to/endpoint HTTP/1.1", full_browser_info: "Mozilla (Macintosh; Intel Mac OS X 10_9_1)")
        invalid_request(@request)

        @request = Request.new(ip_address: "83.149.9.216", password: "-", user_id: "", timestamp: "12/12/12", request_method: "GET", request_path: "/path/to/endpoint", request_protocol: "HTTP/1.1", response_code: "200", response_size: "23456", referrer: "http://apple.com/sectretHelicopter", browser: "Safari", full_request: "GET /path/to/endpoint HTTP/1.1", full_browser_info: "Mozilla (Macintosh; Intel Mac OS X 10_9_1)")
        invalid_request(@request)

        @request = Request.new(ip_address: "83.149.9.216", password: "-", user_id: "-", timestamp: "", request_method: "GET", request_path: "/path/to/endpoint", request_protocol: "HTTP/1.1", response_code: "200", response_size: "23456", referrer: "http://apple.com/sectretHelicopter", browser: "Safari", full_request: "GET /path/to/endpoint HTTP/1.1", full_browser_info: "Mozilla (Macintosh; Intel Mac OS X 10_9_1)")
        invalid_request(@request)

        @request = Request.new(ip_address: "83.149.9.216", password: "-", user_id: "-", timestamp: "12/12/12", request_method: "", request_path: "/path/to/endpoint", request_protocol: "HTTP/1.1", response_code: "200", response_size: "23456", referrer: "http://apple.com/sectretHelicopter", browser: "Safari", full_request: "GET /path/to/endpoint HTTP/1.1", full_browser_info: "Mozilla (Macintosh; Intel Mac OS X 10_9_1)")
        invalid_request(@request)

        @request = Request.new(ip_address: "83.149.9.216", password: "-", user_id: "-", timestamp: "12/12/12", request_method: "GET", request_path: "", request_protocol: "HTTP/1.1", response_code: "200", response_size: "23456", referrer: "http://apple.com/sectretHelicopter", browser: "Safari", full_request: "GET /path/to/endpoint HTTP/1.1", full_browser_info: "Mozilla (Macintosh; Intel Mac OS X 10_9_1)")
        invalid_request(@request)
        
        @request = Request.new(ip_address: "83.149.9.216", password: "-", user_id: "-", timestamp: "12/12/12", request_method: "GET", request_path: "/path/to/endpoint", request_protocol: "", response_code: "200", response_size: "23456", referrer: "http://apple.com/sectretHelicopter", browser: "Safari", full_request: "GET /path/to/endpoint HTTP/1.1", full_browser_info: "Mozilla (Macintosh; Intel Mac OS X 10_9_1)")
        invalid_request(@request)

        @request = Request.new(ip_address: "83.149.9.216", password: "-", user_id: "-", timestamp: "12/12/12", request_method: "GET", request_path: "/path/to/endpoint", request_protocol: "HTTP/1.1", response_code: "", response_size: "23456", referrer: "http://apple.com/sectretHelicopter", browser: "Safari", full_request: "GET /path/to/endpoint HTTP/1.1", full_browser_info: "Mozilla (Macintosh; Intel Mac OS X 10_9_1)")
        invalid_request(@request)

        @request = Request.new(ip_address: "83.149.9.216", password: "-", user_id: "-", timestamp: "12/12/12", request_method: "GET", request_path: "/path/to/endpoint", request_protocol: "HTTP/1.1", response_code: "200", response_size: "", referrer: "http://apple.com/sectretHelicopter", browser: "Safari", full_request: "GET /path/to/endpoint HTTP/1.1", full_browser_info: "Mozilla (Macintosh; Intel Mac OS X 10_9_1)")
        invalid_request(@request)

        @request = Request.new(ip_address: "83.149.9.216", password: "-", user_id: "-", timestamp: "12/12/12", request_method: "GET", request_path: "/path/to/endpoint", request_protocol: "HTTP/1.1", response_code: "200", response_size: "23456", referrer: "", browser: "Safari", full_request: "GET /path/to/endpoint HTTP/1.1", full_browser_info: "Mozilla (Macintosh; Intel Mac OS X 10_9_1)")
        invalid_request(@request)

        @request = Request.new(ip_address: "83.149.9.216", password: "-", user_id: "-", timestamp: "12/12/12", request_method: "GET", request_path: "/path/to/endpoint", request_protocol: "HTTP/1.1", response_code: "200", response_size: "23456", referrer: "http://apple.com/sectretHelicopter", browser: "", full_request: "GET /path/to/endpoint HTTP/1.1", full_browser_info: "Mozilla (Macintosh; Intel Mac OS X 10_9_1)")
        invalid_request(@request)
        
        @request = Request.new(ip_address: "83.149.9.216", password: "-", user_id: "-", timestamp: "12/12/12", request_method: "GET", request_path: "/path/to/endpoint", request_protocol: "HTTP/1.1", response_code: "200", response_size: "23456", referrer: "http://apple.com/sectretHelicopter", browser: "Safari", full_request: "", full_browser_info: "Mozilla (Macintosh; Intel Mac OS X 10_9_1)")
        invalid_request(@request)
        
        @request = Request.new(ip_address: "83.149.9.216", password: "-", user_id: "-", timestamp: "12/12/12", request_method: "GET", request_path: "/path/to/endpoint", request_protocol: "HTTP/1.1", response_code: "200", response_size: "23456", referrer: "http://apple.com/sectretHelicopter", browser: "Safari", full_request: "GET /path/to/endpoint HTTP/1.1", full_browser_info: "")
        invalid_request(@request)
    end


    def invalid_request(request)
        assert_not request.valid?
    end

end