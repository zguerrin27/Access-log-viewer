require "test_helper"

class RequestTest < ActiveSupport::TestCase

    def setup
        @request = Request.new(ip: "83.149.9.216", pword: "-", userId: "-", timestamp: "12/12/12", request: "/pages/index", responseCode: "200", responseSize: "3456", referrer: "http://www.apple.com", browserInfo: "Safari")
    end

    test "request should be valid" do 
        assert @request.valid?
    end

    test "request should not save without valid feilds" do
        @request = Request.new(ip: "", pword: "-", userId: "-", timestamp: "12/12/12", request: "/pages/index", responseCode: "200", responseSize: "3456", referrer: "http://www.apple.com", browserInfo: "Safari")
        invalid_request(@request)

        @request = Request.new(ip: "83.149.9.216", pword: "", userId: "-", timestamp: "12/12/12", request: "/pages/index", responseCode: "200", responseSize: "3456", referrer: "http://www.apple.com", browserInfo: "Safari")
        invalid_request(@request)

        @request = Request.new(ip: "83.149.9.216", pword: "-", userId: "", timestamp: "12/12/12", request: "/pages/index", responseCode: "200", responseSize: "3456", referrer: "http://www.apple.com", browserInfo: "Safari")
        invalid_request(@request)

        @request = Request.new(ip: "83.149.9.216", pword: "-", userId: "-", timestamp: "", request: "/pages/index", responseCode: "200", responseSize: "3456", referrer: "http://www.apple.com", browserInfo: "Safari")
        invalid_request(@request)

        @request = Request.new(ip: "83.149.9.216", pword: "-", userId: "-", timestamp: "12/12/12", request: "", responseCode: "200", responseSize: "3456", referrer: "http://www.apple.com", browserInfo: "Safari")
        invalid_request(@request)

        @request = Request.new(ip: "83.149.9.216", pword: "-", userId: "-", timestamp: "12/12/12", request: "/pages/index", responseCode: "", responseSize: "3456", referrer: "http://www.apple.com", browserInfo: "Safari")
        invalid_request(@request)
        
        @request = Request.new(ip: "83.149.9.216", pword: "-", userId: "-", timestamp: "12/12/12", request: "/pages/index", responseCode: "200", responseSize: "", referrer: "http://www.apple.com", browserInfo: "Safari")
        invalid_request(@request)

        @request = Request.new(ip: "83.149.9.216", pword: "-", userId: "-", timestamp: "12/12/12", request: "/pages/index", responseCode: "200", responseSize: "3456", referrer: "", browserInfo: "Safari")
        invalid_request(@request)

        @request = Request.new(ip: "83.149.9.216", pword: "-", userId: "-", timestamp: "12/12/12", request: "/pages/index", responseCode: "200", responseSize: "3456", referrer: "http://www.apple.com", browserInfo: "")
        invalid_request(@request)
    end


    def invalid_request(request)
        assert_not request.valid?
    end

end