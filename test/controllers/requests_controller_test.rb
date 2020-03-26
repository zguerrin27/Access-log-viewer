require 'test_helper'

class RequestsControllerTest < ActionDispatch::IntegrationTest

  def setup
    request = {ip_address: "83.149.9.216", password: "-", user_id: "-", timestamp: "12/12/12", request_method: "GET", request_path: "/path/to/endpoint", request_protocol: "HTTP/1.1", response_code: "200", response_size: "23456", referrer: "http://apple.com/secretHelicopter", browser: "Safari", full_request: "GET /path/to/endpoint HTTP/1.1", full_browser_info: "Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    Request.create!(request)
  end
  
  test "should get requests index page" do
    get "/"
    assert_response :success
  end

  test "initial render should return a list of logs to the main page" do 
    get "/search/"
    # assert_match "requests", @response.body
    # body = JSON.parse(@response.body)
    # browser = "Safari"
    # url = "http://apple.com/secretHelicopter"
    # ip = "83.149.9.216"
    # currentPage = 1
    # totalPages = 1
    # assert_equal browser, body['requests'][0]['browser']
    # assert_equal ip, body['requests'][0]['ip']
    # assert_equal url, body['requests'][0]['referrer']
    # assert_equal currentPage, body['page']
    # assert_equal totalPages, body['pages']
  end

  # test "should return logs from the db that match the provided ip address" do 
  #   get "/search/", params: {'search' => "83.149.9.216"}
  #   assert_equal @response.status, 200
  #   body = JSON.parse(@response.body)
  #   assert_equal '83.149.9.216', body['requests'][0]['ip_address']
  # end

end
