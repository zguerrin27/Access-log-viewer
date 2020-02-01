require "test_helper"

class RequestTest < ActiveSupport::TestCase

    def setup
        @request = Request.new(ip: "83.149.9.216", pword: "-", userId: "-", timestamp: "12/12/12", requestMethod: "GET", requestPath: "/path/to/endpoint", requestProtocol: "HTTP/1.1", responseCode: "200", responseSize: "23456", referrer: "http://apple.com/sectretHelicopter", browser: "Safari", fullRequest: "GET /path/to/endpoint HTTP/1.1", fullBrowserInfo: "Mozilla (Macintosh; Intel Mac OS X 10_9_1)")
    end

    test "request should be valid" do 
        assert @request.valid?
    end

    # test "search" do
    
    # end

    test "request should not save without valid feilds" do
        @request = Request.new(ip: "", pword: "-", userId: "-", timestamp: "12/12/12", requestMethod: "GET", requestPath: "/path/to/endpoint", requestProtocol: "HTTP/1.1", responseCode: "200", responseSize: "23456", referrer: "http://apple.com/sectretHelicopter", browser: "Safari", fullRequest: "GET /path/to/endpoint HTTP/1.1", fullBrowserInfo: "Mozilla (Macintosh; Intel Mac OS X 10_9_1)")
        invalid_request(@request)

        @request = Request.new(ip: "83.149.9.216", pword: "", userId: "-", timestamp: "12/12/12", requestMethod: "GET", requestPath: "/path/to/endpoint", requestProtocol: "HTTP/1.1", responseCode: "200", responseSize: "23456", referrer: "http://apple.com/sectretHelicopter", browser: "Safari", fullRequest: "GET /path/to/endpoint HTTP/1.1", fullBrowserInfo: "Mozilla (Macintosh; Intel Mac OS X 10_9_1)")
        invalid_request(@request)

        @request = Request.new(ip: "83.149.9.216", pword: "-", userId: "", timestamp: "12/12/12", requestMethod: "GET", requestPath: "/path/to/endpoint", requestProtocol: "HTTP/1.1", responseCode: "200", responseSize: "23456", referrer: "http://apple.com/sectretHelicopter", browser: "Safari", fullRequest: "GET /path/to/endpoint HTTP/1.1", fullBrowserInfo: "Mozilla (Macintosh; Intel Mac OS X 10_9_1)")
        invalid_request(@request)

        @request = Request.new(ip: "83.149.9.216", pword: "-", userId: "-", timestamp: "", requestMethod: "GET", requestPath: "/path/to/endpoint", requestProtocol: "HTTP/1.1", responseCode: "200", responseSize: "23456", referrer: "http://apple.com/sectretHelicopter", browser: "Safari", fullRequest: "GET /path/to/endpoint HTTP/1.1", fullBrowserInfo: "Mozilla (Macintosh; Intel Mac OS X 10_9_1)")
        invalid_request(@request)

        @request = Request.new(ip: "83.149.9.216", pword: "-", userId: "-", timestamp: "12/12/12", requestMethod: "", requestPath: "/path/to/endpoint", requestProtocol: "HTTP/1.1", responseCode: "200", responseSize: "23456", referrer: "http://apple.com/sectretHelicopter", browser: "Safari", fullRequest: "GET /path/to/endpoint HTTP/1.1", fullBrowserInfo: "Mozilla (Macintosh; Intel Mac OS X 10_9_1)")
        invalid_request(@request)

        @request = Request.new(ip: "83.149.9.216", pword: "-", userId: "-", timestamp: "12/12/12", requestMethod: "GET", requestPath: "", requestProtocol: "HTTP/1.1", responseCode: "200", responseSize: "23456", referrer: "http://apple.com/sectretHelicopter", browser: "Safari", fullRequest: "GET /path/to/endpoint HTTP/1.1", fullBrowserInfo: "Mozilla (Macintosh; Intel Mac OS X 10_9_1)")
        invalid_request(@request)
        
        @request = Request.new(ip: "83.149.9.216", pword: "-", userId: "-", timestamp: "12/12/12", requestMethod: "GET", requestPath: "/path/to/endpoint", requestProtocol: "", responseCode: "200", responseSize: "23456", referrer: "http://apple.com/sectretHelicopter", browser: "Safari", fullRequest: "GET /path/to/endpoint HTTP/1.1", fullBrowserInfo: "Mozilla (Macintosh; Intel Mac OS X 10_9_1)")
        invalid_request(@request)

        @request = Request.new(ip: "83.149.9.216", pword: "-", userId: "-", timestamp: "12/12/12", requestMethod: "GET", requestPath: "/path/to/endpoint", requestProtocol: "HTTP/1.1", responseCode: "", responseSize: "23456", referrer: "http://apple.com/sectretHelicopter", browser: "Safari", fullRequest: "GET /path/to/endpoint HTTP/1.1", fullBrowserInfo: "Mozilla (Macintosh; Intel Mac OS X 10_9_1)")
        invalid_request(@request)

        @request = Request.new(ip: "83.149.9.216", pword: "-", userId: "-", timestamp: "12/12/12", requestMethod: "GET", requestPath: "/path/to/endpoint", requestProtocol: "HTTP/1.1", responseCode: "200", responseSize: "", referrer: "http://apple.com/sectretHelicopter", browser: "Safari", fullRequest: "GET /path/to/endpoint HTTP/1.1", fullBrowserInfo: "Mozilla (Macintosh; Intel Mac OS X 10_9_1)")
        invalid_request(@request)

        @request = Request.new(ip: "83.149.9.216", pword: "-", userId: "-", timestamp: "12/12/12", requestMethod: "GET", requestPath: "/path/to/endpoint", requestProtocol: "HTTP/1.1", responseCode: "200", responseSize: "23456", referrer: "", browser: "Safari", fullRequest: "GET /path/to/endpoint HTTP/1.1", fullBrowserInfo: "Mozilla (Macintosh; Intel Mac OS X 10_9_1)")
        invalid_request(@request)

        @request = Request.new(ip: "83.149.9.216", pword: "-", userId: "-", timestamp: "12/12/12", requestMethod: "GET", requestPath: "/path/to/endpoint", requestProtocol: "HTTP/1.1", responseCode: "200", responseSize: "23456", referrer: "http://apple.com/sectretHelicopter", browser: "", fullRequest: "GET /path/to/endpoint HTTP/1.1", fullBrowserInfo: "Mozilla (Macintosh; Intel Mac OS X 10_9_1)")
        invalid_request(@request)

        @request = Request.new(ip: "83.149.9.216", pword: "-", userId: "-", timestamp: "12/12/12", requestMethod: "GET", requestPath: "/path/to/endpoint", requestProtocol: "HTTP/1.1", responseCode: "200", responseSize: "23456", referrer: "http://apple.com/sectretHelicopter", browser: "Safari", fullRequest: "", fullBrowserInfo: "Mozilla (Macintosh; Intel Mac OS X 10_9_1)")
        invalid_request(@request)

        @request = Request.new(ip: "83.149.9.216", pword: "-", userId: "-", timestamp: "12/12/12", requestMethod: "GET", requestPath: "/path/to/endpoint", requestProtocol: "HTTP/1.1", responseCode: "200", responseSize: "23456", referrer: "http://apple.com/sectretHelicopter", browser: "Safari", fullRequest: "GET /path/to/endpoint HTTP/1.1", fullBrowserInfo: "")
        invalid_request(@request)
    end


    def invalid_request(request)
        assert_not request.valid?
    end

end