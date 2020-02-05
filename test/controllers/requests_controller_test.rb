require 'test_helper'

class RequestsControllerTest < ActionDispatch::IntegrationTest

  def setup
    request = {ip: "83.149.9.216", pword: "-", userId: "-", timestamp: "12/12/12", requestMethod: "GET", requestPath: "/path/to/endpoint", requestProtocol: "HTTP/1.1", responseCode: "200", responseSize: "23456", referrer: "http://apple.com/secretHelicopter", browser: "Safari", fullRequest: "GET /path/to/endpoint HTTP/1.1", fullBrowserInfo: "Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    
    Request.create!(request)
  end
  
  test "should get requests index page" do
    get "/"
    assert_response :success
  end

  test "load should return a list of logs to the main page" do 
    get "/load"
    assert_match "requests", @response.body
    body = JSON.parse(@response.body)
    browser = "Safari"
    url = "http://apple.com/secretHelicopter"
    ip = "83.149.9.216"
    currentPage = 1
    totalPages = 1
    assert_equal browser, body['requests'][0]['browser']
    assert_equal ip, body['requests'][0]['ip']
    assert_equal url, body['requests'][0]['referrer']
    assert_equal currentPage, body['page']
    assert_equal totalPages, body['pages']
  end

  test "should return logs from the db that match the provided ip address" do 
    post "/search/", params: {'search' => "83.149.9.216"}
    assert_equal @response.status, 200
    body = JSON.parse(@response.body)
    assert_equal '83.149.9.216', body['requests'][0]['ip']
  end

end



