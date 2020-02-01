require 'test_helper'

class RequestsControllerTest < ActionDispatch::IntegrationTest
  
  test "should get requests index page" do
    get "/"
    assert_response :success
  end

  test "should return an array of logs from the db that match the provided ip address" do 
    Request.create!({ip: "83.149.9.216", pword: "-", userId: "-", timestamp: "12/12/12", requestMethod: "GET", requestPath: "/path/to/endpoint", requestProtocol: "HTTP/1.1", responseCode: "200", responseSize: "23456", referrer: "http://apple.com/sectretHelicopter", browser: "Safari", fullRequest: "GET /path/to/endpoint HTTP/1.1", fullBrowserInfo: "Mozilla (Macintosh; Intel Mac OS X 10_9_1)"})

    post '/search/' 
    results = JSON.parse(@response.body)
    puts results
    # @requests = Request.where(ip: "83.149.9.216")
    # res = response
    # assert res.body == 
  end





  test "load should return a list of logs to the main page" do 
    # create some results
    Request.create!({ip: "83.149.9.216", pword: "-", userId: "-", timestamp: "12/12/12", requestMethod: "GET", requestPath: "/path/to/endpoint", requestProtocol: "HTTP/1.1", responseCode: "200", responseSize: "23456", referrer: "http://apple.com/sectretHelicopter", browser: "Safari", fullRequest: "GET /path/to/endpoint HTTP/1.1", fullBrowserInfo: "Mozilla (Macintosh; Intel Mac OS X 10_9_1)"})

    get "/load"
    # byebug
    results = JSON.parse(@response.body)
    # puts results
    # assert_equal 1
    assert_response :success
  end


  

end
