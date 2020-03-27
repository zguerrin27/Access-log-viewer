require 'test_helper'

class RequestsControllerTest < ActionDispatch::IntegrationTest

  def setup
    request = {id: 1, ip_address: "83.149.9.216", password: "-", user_id: "-", timestamp: "2017-03-26T13:46:04.000Z", request_method: "GET", request_path: "/path/to/endpoint", request_protocol: "HTTP/1.1", response_code: "200", response_size: "23456", referrer: "http://apple.com/secretHelicopter", browser: "Safari", full_request: "GET /path/to/endpoint HTTP/1.1", full_browser_info: "Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    Request.create!(request)
    request = {id: 2, ip_address: "50.500.5.500", password: "-", user_id: "-", timestamp: "2019-03-26T13:46:04.000Z", request_method: "GET", request_path: "/path/to/endpoint2", request_protocol: "HTTP/1.2", response_code: "200", response_size: "500000", referrer: "http://apple.com/secretJetPack", browser: "Chrome", full_request: "GET /path/to/endpoint2 HTTP/1.2", full_browser_info: "Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    Request.create!(request)
    request = {id: 3, ip_address: "80.800.8.800", password: "-", user_id: "-", timestamp: "2016-03-26T13:46:04.000Z", request_method: "GET", request_path: "/path/to/another/endpoint3", request_protocol: "HTTP/1.2", response_code: "200", response_size: "88888", referrer: "http://apple.com/secretStarDestroyer", browser: "IE", full_request: "GET /path/to/endpoint3 HTTP/1.2", full_browser_info: "Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    Request.create!(request)
    request = {id: 4, ip_address: "22.222.2.222", password: "-", user_id: "-", timestamp: "2014-03-26T13:46:04.000Z", request_method: "GET", request_path: "/path/to/endpoint4", request_protocol: "HTTP/1.1", response_code: "200", response_size: "500", referrer: "http://apple.com/secretStarDestroyer", browser: "Safari", full_request: "GET /path/to/endpoint4 HTTP/1.2", full_browser_info: "Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    Request.create!(request)
    request = {id: 5, ip_address: "45.455.4.455", password: "-", user_id: "-", timestamp: "2010-03-26T13:46:04.000Z", request_method: "GET", request_path: "/path/to/endpoint5", request_protocol: "HTTP/2.0", response_code: "200", response_size: "200000", referrer: "http://apple.com/secretStarDestroyer", browser: "Safari", full_request: "GET /path/to/endpoint5 HTTP/2.0", full_browser_info: "Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    Request.create!(request)
  end
  
  test "should get requests index page" do
    get "/"
    assert_response :success
  end

  test "initial render should return a list of logs to the main page. With pagination" do 
    get "/search/", params: {"search"=>["{\"searchQuery\":\"\",\"dropdownVal\":\"\",\"modifier\":\"\"}"]}
    assert_match "requests", @response.body
    body = JSON.parse(@response.body)
    request1 = {"id"=>1, "ip_address"=>"83.149.9.216", "password"=>"-", "user_id"=>"-", "timestamp"=>"2017-03-26T13:46:04.000Z", "request_method"=>"GET", "request_path"=>"/path/to/endpoint", "request_protocol"=>"HTTP/1.1", "response_code"=>200, "response_size"=>23456, "referrer"=>"http://apple.com/secretHelicopter", "browser"=>"Safari", "full_request"=>"GET /path/to/endpoint HTTP/1.1", "full_browser_info"=>"Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    request2 = {"id"=>2, "ip_address"=>"50.500.5.500", "password"=>"-", "user_id"=>"-", "timestamp"=>"2019-03-26T13:46:04.000Z", "request_method"=>"GET", "request_path"=>"/path/to/endpoint2", "request_protocol"=>"HTTP/1.2", "response_code"=>200, "response_size"=>500000, "referrer"=>"http://apple.com/secretJetPack", "browser"=>"Chrome", "full_request"=>"GET /path/to/endpoint2 HTTP/1.2", "full_browser_info"=>"Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    request3 = {"id"=>3, "ip_address"=>"80.800.8.800", "password"=>"-", "user_id"=>"-", "timestamp"=>"2016-03-26T13:46:04.000Z", "request_method"=>"GET", "request_path"=>"/path/to/another/endpoint3", "request_protocol"=>"HTTP/1.2", "response_code"=>200, "response_size"=>88888, "referrer"=>"http://apple.com/secretStarDestroyer", "browser"=>"IE", "full_request"=>"GET /path/to/endpoint3 HTTP/1.2", "full_browser_info"=>"Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    request4 = {"id"=>4, "ip_address"=>"22.222.2.222", "password"=>"-", "user_id"=>"-", "timestamp"=>"2014-03-26T13:46:04.000Z", "request_method"=>"GET", "request_path"=>"/path/to/endpoint4", "request_protocol"=>"HTTP/1.1", "response_code"=>200, "response_size"=>500, "referrer"=>"http://apple.com/secretStarDestroyer", "browser"=>"Safari", "full_request"=>"GET /path/to/endpoint4 HTTP/1.2", "full_browser_info"=>"Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    request5 = {"id"=>5, "ip_address"=>"45.455.4.455", "password"=>"-", "user_id"=>"-", "timestamp"=>"2010-03-26T13:46:04.000Z", "request_method"=>"GET", "request_path"=>"/path/to/endpoint5", "request_protocol"=>"HTTP/2.0", "response_code"=>200, "response_size"=>200000, "referrer"=>"http://apple.com/secretStarDestroyer", "browser"=>"Safari", "full_request"=>"GET /path/to/endpoint5 HTTP/2.0", "full_browser_info"=>"Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    currentPage = 1
    totalPages = 1
    assert_equal request1, body['requests'][0]
    assert_equal request2, body['requests'][1]
    assert_equal request3, body['requests'][2]
    assert_equal request4, body['requests'][3]
    assert_equal request5, body['requests'][4]
    assert_equal currentPage, body['page']
    assert_equal totalPages, body['pages']
  end

  test "should return log from the db that match the provided ip address" do 
    get "/search/", params: {"search"=>["{\"searchQuery\":\"50.500.5.500\",\"dropdownVal\":\"ip_address\",\"modifier\":\"\"}"]}
    assert_equal @response.status, 200
    body = JSON.parse(@response.body)
    assert_equal 1, body['requests'].length
    assert_equal 2, body['requests'][0]['id']
    assert_equal '50.500.5.500', body['requests'][0]['ip_address']
    assert_equal '-', body['requests'][0]['password']
    assert_equal '-', body['requests'][0]['user_id']
    assert_equal '2019-03-26T13:46:04.000Z', body['requests'][0]['timestamp']
    assert_equal 'GET', body['requests'][0]['request_method']
    assert_equal '/path/to/endpoint2', body['requests'][0]['request_path']
    assert_equal 'HTTP/1.2', body['requests'][0]['request_protocol'] 
    assert_equal 200, body['requests'][0]['response_code']
    assert_equal 500000, body['requests'][0]['response_size']
    assert_equal 'http://apple.com/secretJetPack', body['requests'][0]['referrer']
    assert_equal 'Chrome', body['requests'][0]['browser']
    assert_equal 'GET /path/to/endpoint2 HTTP/1.2', body['requests'][0]['full_request']
    assert_equal 'Mozilla (Macintosh; Intel Mac OS X 10_9_1)', body['requests'][0]['full_browser_info']
  end

  test "should return logs matching given password" do
    get "/search/", params: {"search"=>["{\"searchQuery\":\"-\",\"dropdownVal\":\"password\",\"modifier\":\"\"}"]}
    assert_equal @response.status, 200
    body = JSON.parse(@response.body)
    assert_equal 5, body['requests'].length
    request1 = {"id"=>1, "ip_address"=>"83.149.9.216", "password"=>"-", "user_id"=>"-", "timestamp"=>"2017-03-26T13:46:04.000Z", "request_method"=>"GET", "request_path"=>"/path/to/endpoint", "request_protocol"=>"HTTP/1.1", "response_code"=>200, "response_size"=>23456, "referrer"=>"http://apple.com/secretHelicopter", "browser"=>"Safari", "full_request"=>"GET /path/to/endpoint HTTP/1.1", "full_browser_info"=>"Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    request2 = {"id"=>2, "ip_address"=>"50.500.5.500", "password"=>"-", "user_id"=>"-", "timestamp"=>"2019-03-26T13:46:04.000Z", "request_method"=>"GET", "request_path"=>"/path/to/endpoint2", "request_protocol"=>"HTTP/1.2", "response_code"=>200, "response_size"=>500000, "referrer"=>"http://apple.com/secretJetPack", "browser"=>"Chrome", "full_request"=>"GET /path/to/endpoint2 HTTP/1.2", "full_browser_info"=>"Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    request3 = {"id"=>3, "ip_address"=>"80.800.8.800", "password"=>"-", "user_id"=>"-", "timestamp"=>"2016-03-26T13:46:04.000Z", "request_method"=>"GET", "request_path"=>"/path/to/another/endpoint3", "request_protocol"=>"HTTP/1.2", "response_code"=>200, "response_size"=>88888, "referrer"=>"http://apple.com/secretStarDestroyer", "browser"=>"IE", "full_request"=>"GET /path/to/endpoint3 HTTP/1.2", "full_browser_info"=>"Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    request4 = {"id"=>4, "ip_address"=>"22.222.2.222", "password"=>"-", "user_id"=>"-", "timestamp"=>"2014-03-26T13:46:04.000Z", "request_method"=>"GET", "request_path"=>"/path/to/endpoint4", "request_protocol"=>"HTTP/1.1", "response_code"=>200, "response_size"=>500, "referrer"=>"http://apple.com/secretStarDestroyer", "browser"=>"Safari", "full_request"=>"GET /path/to/endpoint4 HTTP/1.2", "full_browser_info"=>"Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    request5 = {"id"=>5, "ip_address"=>"45.455.4.455", "password"=>"-", "user_id"=>"-", "timestamp"=>"2010-03-26T13:46:04.000Z", "request_method"=>"GET", "request_path"=>"/path/to/endpoint5", "request_protocol"=>"HTTP/2.0", "response_code"=>200, "response_size"=>200000, "referrer"=>"http://apple.com/secretStarDestroyer", "browser"=>"Safari", "full_request"=>"GET /path/to/endpoint5 HTTP/2.0", "full_browser_info"=>"Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    assert_equal request1, body['requests'][0]
    assert_equal request2, body['requests'][1]
    assert_equal request3, body['requests'][2]
    assert_equal request4, body['requests'][3]
    assert_equal request5, body['requests'][4]
  end
  
  test "should return logs matching given user id" do
    get "/search/", params: {"search"=>["{\"searchQuery\":\"-\",\"dropdownVal\":\"user_id\",\"modifier\":\"\"}"]}
    assert_equal @response.status, 200
    body = JSON.parse(@response.body)
    assert_equal 5, body['requests'].length
    request1 = {"id"=>1, "ip_address"=>"83.149.9.216", "password"=>"-", "user_id"=>"-", "timestamp"=>"2017-03-26T13:46:04.000Z", "request_method"=>"GET", "request_path"=>"/path/to/endpoint", "request_protocol"=>"HTTP/1.1", "response_code"=>200, "response_size"=>23456, "referrer"=>"http://apple.com/secretHelicopter", "browser"=>"Safari", "full_request"=>"GET /path/to/endpoint HTTP/1.1", "full_browser_info"=>"Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    request2 = {"id"=>2, "ip_address"=>"50.500.5.500", "password"=>"-", "user_id"=>"-", "timestamp"=>"2019-03-26T13:46:04.000Z", "request_method"=>"GET", "request_path"=>"/path/to/endpoint2", "request_protocol"=>"HTTP/1.2", "response_code"=>200, "response_size"=>500000, "referrer"=>"http://apple.com/secretJetPack", "browser"=>"Chrome", "full_request"=>"GET /path/to/endpoint2 HTTP/1.2", "full_browser_info"=>"Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    request3 = {"id"=>3, "ip_address"=>"80.800.8.800", "password"=>"-", "user_id"=>"-", "timestamp"=>"2016-03-26T13:46:04.000Z", "request_method"=>"GET", "request_path"=>"/path/to/another/endpoint3", "request_protocol"=>"HTTP/1.2", "response_code"=>200, "response_size"=>88888, "referrer"=>"http://apple.com/secretStarDestroyer", "browser"=>"IE", "full_request"=>"GET /path/to/endpoint3 HTTP/1.2", "full_browser_info"=>"Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    request4 = {"id"=>4, "ip_address"=>"22.222.2.222", "password"=>"-", "user_id"=>"-", "timestamp"=>"2014-03-26T13:46:04.000Z", "request_method"=>"GET", "request_path"=>"/path/to/endpoint4", "request_protocol"=>"HTTP/1.1", "response_code"=>200, "response_size"=>500, "referrer"=>"http://apple.com/secretStarDestroyer", "browser"=>"Safari", "full_request"=>"GET /path/to/endpoint4 HTTP/1.2", "full_browser_info"=>"Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    request5 = {"id"=>5, "ip_address"=>"45.455.4.455", "password"=>"-", "user_id"=>"-", "timestamp"=>"2010-03-26T13:46:04.000Z", "request_method"=>"GET", "request_path"=>"/path/to/endpoint5", "request_protocol"=>"HTTP/2.0", "response_code"=>200, "response_size"=>200000, "referrer"=>"http://apple.com/secretStarDestroyer", "browser"=>"Safari", "full_request"=>"GET /path/to/endpoint5 HTTP/2.0", "full_browser_info"=>"Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    assert_equal request1, body['requests'][0]
    assert_equal request2, body['requests'][1]
    assert_equal request3, body['requests'][2]
    assert_equal request4, body['requests'][3]
    assert_equal request5, body['requests'][4]
  end

  test "should return logs that have dates before the provided date. This tests the modifier 'Before Time' in timestamp" do
    get "/search/", params: {"search"=>["{\"searchQuery\":\"2020-03-26 13:46:04\",\"dropdownVal\":\"timestamp\",\"modifier\":\"Before Time\"}"]}
    assert_equal @response.status, 200
    body = JSON.parse(@response.body)
    assert_equal 5, body['requests'].length
    request1 = {"id"=>1, "ip_address"=>"83.149.9.216", "password"=>"-", "user_id"=>"-", "timestamp"=>"2017-03-26T13:46:04.000Z", "request_method"=>"GET", "request_path"=>"/path/to/endpoint", "request_protocol"=>"HTTP/1.1", "response_code"=>200, "response_size"=>23456, "referrer"=>"http://apple.com/secretHelicopter", "browser"=>"Safari", "full_request"=>"GET /path/to/endpoint HTTP/1.1", "full_browser_info"=>"Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    request2 = {"id"=>2, "ip_address"=>"50.500.5.500", "password"=>"-", "user_id"=>"-", "timestamp"=>"2019-03-26T13:46:04.000Z", "request_method"=>"GET", "request_path"=>"/path/to/endpoint2", "request_protocol"=>"HTTP/1.2", "response_code"=>200, "response_size"=>500000, "referrer"=>"http://apple.com/secretJetPack", "browser"=>"Chrome", "full_request"=>"GET /path/to/endpoint2 HTTP/1.2", "full_browser_info"=>"Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    request3 = {"id"=>3, "ip_address"=>"80.800.8.800", "password"=>"-", "user_id"=>"-", "timestamp"=>"2016-03-26T13:46:04.000Z", "request_method"=>"GET", "request_path"=>"/path/to/another/endpoint3", "request_protocol"=>"HTTP/1.2", "response_code"=>200, "response_size"=>88888, "referrer"=>"http://apple.com/secretStarDestroyer", "browser"=>"IE", "full_request"=>"GET /path/to/endpoint3 HTTP/1.2", "full_browser_info"=>"Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    request4 = {"id"=>4, "ip_address"=>"22.222.2.222", "password"=>"-", "user_id"=>"-", "timestamp"=>"2014-03-26T13:46:04.000Z", "request_method"=>"GET", "request_path"=>"/path/to/endpoint4", "request_protocol"=>"HTTP/1.1", "response_code"=>200, "response_size"=>500, "referrer"=>"http://apple.com/secretStarDestroyer", "browser"=>"Safari", "full_request"=>"GET /path/to/endpoint4 HTTP/1.2", "full_browser_info"=>"Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    request5 = {"id"=>5, "ip_address"=>"45.455.4.455", "password"=>"-", "user_id"=>"-", "timestamp"=>"2010-03-26T13:46:04.000Z", "request_method"=>"GET", "request_path"=>"/path/to/endpoint5", "request_protocol"=>"HTTP/2.0", "response_code"=>200, "response_size"=>200000, "referrer"=>"http://apple.com/secretStarDestroyer", "browser"=>"Safari", "full_request"=>"GET /path/to/endpoint5 HTTP/2.0", "full_browser_info"=>"Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    assert_equal request1, body['requests'][0]
    assert_equal request2, body['requests'][1]
    assert_equal request3, body['requests'][2]
    assert_equal request4, body['requests'][3]
    assert_equal request5, body['requests'][4]
  end

  test "should return logs that occur at a given time. This tests the modifier 'At Time' in timestamp" do
    get "/search/", params: {"search"=>["{\"searchQuery\":\"2016-03-26 13:46:04\",\"dropdownVal\":\"timestamp\",\"modifier\":\"At Time\"}"]}
    assert_equal @response.status, 200
    body = JSON.parse(@response.body)
    assert_equal 1, body['requests'].length
    request3 = {"id"=>3, "ip_address"=>"80.800.8.800", "password"=>"-", "user_id"=>"-", "timestamp"=>"2016-03-26T13:46:04.000Z", "request_method"=>"GET", "request_path"=>"/path/to/another/endpoint3", "request_protocol"=>"HTTP/1.2", "response_code"=>200, "response_size"=>88888, "referrer"=>"http://apple.com/secretStarDestroyer", "browser"=>"IE", "full_request"=>"GET /path/to/endpoint3 HTTP/1.2", "full_browser_info"=>"Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    assert_equal request3, body['requests'][0]
  end

  test "should return logs that occur after a given time. This tests the modifier 'After Time' in timestamp" do
    get "/search/", params: {"search"=>["{\"searchQuery\":\"2016-03-26 13:46:04\",\"dropdownVal\":\"timestamp\",\"modifier\":\"After Time\"}"]}
    assert_equal @response.status, 200
    body = JSON.parse(@response.body)
    assert_equal 2, body['requests'].length
    request1 = {"id"=>1, "ip_address"=>"83.149.9.216", "password"=>"-", "user_id"=>"-", "timestamp"=>"2017-03-26T13:46:04.000Z", "request_method"=>"GET", "request_path"=>"/path/to/endpoint", "request_protocol"=>"HTTP/1.1", "response_code"=>200, "response_size"=>23456, "referrer"=>"http://apple.com/secretHelicopter", "browser"=>"Safari", "full_request"=>"GET /path/to/endpoint HTTP/1.1", "full_browser_info"=>"Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    request2 = {"id"=>2, "ip_address"=>"50.500.5.500", "password"=>"-", "user_id"=>"-", "timestamp"=>"2019-03-26T13:46:04.000Z", "request_method"=>"GET", "request_path"=>"/path/to/endpoint2", "request_protocol"=>"HTTP/1.2", "response_code"=>200, "response_size"=>500000, "referrer"=>"http://apple.com/secretJetPack", "browser"=>"Chrome", "full_request"=>"GET /path/to/endpoint2 HTTP/1.2", "full_browser_info"=>"Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    assert_equal request1, body['requests'][0]
    assert_equal request2, body['requests'][1]
  end


  test "should return logs that match the given Request Method. " do
    get "/search/", params: {"search"=>["{\"searchQuery\":\"GET\",\"dropdownVal\":\"request_method\",\"modifier\":\"\"}"]}
    assert_equal @response.status, 200
    body = JSON.parse(@response.body)
    assert_equal 5, body['requests'].length
    request1 = {"id"=>1, "ip_address"=>"83.149.9.216", "password"=>"-", "user_id"=>"-", "timestamp"=>"2017-03-26T13:46:04.000Z", "request_method"=>"GET", "request_path"=>"/path/to/endpoint", "request_protocol"=>"HTTP/1.1", "response_code"=>200, "response_size"=>23456, "referrer"=>"http://apple.com/secretHelicopter", "browser"=>"Safari", "full_request"=>"GET /path/to/endpoint HTTP/1.1", "full_browser_info"=>"Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    request2 = {"id"=>2, "ip_address"=>"50.500.5.500", "password"=>"-", "user_id"=>"-", "timestamp"=>"2019-03-26T13:46:04.000Z", "request_method"=>"GET", "request_path"=>"/path/to/endpoint2", "request_protocol"=>"HTTP/1.2", "response_code"=>200, "response_size"=>500000, "referrer"=>"http://apple.com/secretJetPack", "browser"=>"Chrome", "full_request"=>"GET /path/to/endpoint2 HTTP/1.2", "full_browser_info"=>"Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    request3 = {"id"=>3, "ip_address"=>"80.800.8.800", "password"=>"-", "user_id"=>"-", "timestamp"=>"2016-03-26T13:46:04.000Z", "request_method"=>"GET", "request_path"=>"/path/to/another/endpoint3", "request_protocol"=>"HTTP/1.2", "response_code"=>200, "response_size"=>88888, "referrer"=>"http://apple.com/secretStarDestroyer", "browser"=>"IE", "full_request"=>"GET /path/to/endpoint3 HTTP/1.2", "full_browser_info"=>"Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    request4 = {"id"=>4, "ip_address"=>"22.222.2.222", "password"=>"-", "user_id"=>"-", "timestamp"=>"2014-03-26T13:46:04.000Z", "request_method"=>"GET", "request_path"=>"/path/to/endpoint4", "request_protocol"=>"HTTP/1.1", "response_code"=>200, "response_size"=>500, "referrer"=>"http://apple.com/secretStarDestroyer", "browser"=>"Safari", "full_request"=>"GET /path/to/endpoint4 HTTP/1.2", "full_browser_info"=>"Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    request5 = {"id"=>5, "ip_address"=>"45.455.4.455", "password"=>"-", "user_id"=>"-", "timestamp"=>"2010-03-26T13:46:04.000Z", "request_method"=>"GET", "request_path"=>"/path/to/endpoint5", "request_protocol"=>"HTTP/2.0", "response_code"=>200, "response_size"=>200000, "referrer"=>"http://apple.com/secretStarDestroyer", "browser"=>"Safari", "full_request"=>"GET /path/to/endpoint5 HTTP/2.0", "full_browser_info"=>"Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    assert_equal request1, body['requests'][0]
    assert_equal request2, body['requests'][1]
    assert_equal request3, body['requests'][2]
    assert_equal request4, body['requests'][3]
    assert_equal request5, body['requests'][4]
  end

  test "should return logs that start with /path in the request_path. This tests the modifier 'Starts With' " do
    get "/search/", params: {"search"=>["{\"searchQuery\":\"/path\",\"dropdownVal\":\"request_path\",\"modifier\":\"Starts With\"}"]}
    assert_equal @response.status, 200
    body = JSON.parse(@response.body)
    assert_equal 5, body['requests'].length
    request1 = {"id"=>1, "ip_address"=>"83.149.9.216", "password"=>"-", "user_id"=>"-", "timestamp"=>"2017-03-26T13:46:04.000Z", "request_method"=>"GET", "request_path"=>"/path/to/endpoint", "request_protocol"=>"HTTP/1.1", "response_code"=>200, "response_size"=>23456, "referrer"=>"http://apple.com/secretHelicopter", "browser"=>"Safari", "full_request"=>"GET /path/to/endpoint HTTP/1.1", "full_browser_info"=>"Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    request2 = {"id"=>2, "ip_address"=>"50.500.5.500", "password"=>"-", "user_id"=>"-", "timestamp"=>"2019-03-26T13:46:04.000Z", "request_method"=>"GET", "request_path"=>"/path/to/endpoint2", "request_protocol"=>"HTTP/1.2", "response_code"=>200, "response_size"=>500000, "referrer"=>"http://apple.com/secretJetPack", "browser"=>"Chrome", "full_request"=>"GET /path/to/endpoint2 HTTP/1.2", "full_browser_info"=>"Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    request3 = {"id"=>3, "ip_address"=>"80.800.8.800", "password"=>"-", "user_id"=>"-", "timestamp"=>"2016-03-26T13:46:04.000Z", "request_method"=>"GET", "request_path"=>"/path/to/another/endpoint3", "request_protocol"=>"HTTP/1.2", "response_code"=>200, "response_size"=>88888, "referrer"=>"http://apple.com/secretStarDestroyer", "browser"=>"IE", "full_request"=>"GET /path/to/endpoint3 HTTP/1.2", "full_browser_info"=>"Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    request4 = {"id"=>4, "ip_address"=>"22.222.2.222", "password"=>"-", "user_id"=>"-", "timestamp"=>"2014-03-26T13:46:04.000Z", "request_method"=>"GET", "request_path"=>"/path/to/endpoint4", "request_protocol"=>"HTTP/1.1", "response_code"=>200, "response_size"=>500, "referrer"=>"http://apple.com/secretStarDestroyer", "browser"=>"Safari", "full_request"=>"GET /path/to/endpoint4 HTTP/1.2", "full_browser_info"=>"Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    request5 = {"id"=>5, "ip_address"=>"45.455.4.455", "password"=>"-", "user_id"=>"-", "timestamp"=>"2010-03-26T13:46:04.000Z", "request_method"=>"GET", "request_path"=>"/path/to/endpoint5", "request_protocol"=>"HTTP/2.0", "response_code"=>200, "response_size"=>200000, "referrer"=>"http://apple.com/secretStarDestroyer", "browser"=>"Safari", "full_request"=>"GET /path/to/endpoint5 HTTP/2.0", "full_browser_info"=>"Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    assert_equal request1, body['requests'][0]
    assert_equal request2, body['requests'][1]
    assert_equal request3, body['requests'][2]
    assert_equal request4, body['requests'][3]
    assert_equal request5, body['requests'][4]
  end

  test "should return logs that contains 'another' in the path. This tests the modifier 'Contains' in request_path" do
    get "/search/", params: {"search"=>["{\"searchQuery\":\"another\",\"dropdownVal\":\"request_path\",\"modifier\":\"Contains\"}"]}
    assert_equal @response.status, 200
    body = JSON.parse(@response.body)
    assert_equal 1, body['requests'].length
    request3 = {"id"=>3, "ip_address"=>"80.800.8.800", "password"=>"-", "user_id"=>"-", "timestamp"=>"2016-03-26T13:46:04.000Z", "request_method"=>"GET", "request_path"=>"/path/to/another/endpoint3", "request_protocol"=>"HTTP/1.2", "response_code"=>200, "response_size"=>88888, "referrer"=>"http://apple.com/secretStarDestroyer", "browser"=>"IE", "full_request"=>"GET /path/to/endpoint3 HTTP/1.2", "full_browser_info"=>"Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    assert_equal request3, body['requests'][0]
  end

  test "should return logs that end with 'endpoint5' in the request_path. This tests the modifier 'Ends With' and request_path" do
    get "/search/", params: {"search"=>["{\"searchQuery\":\"endpoint5\",\"dropdownVal\":\"request_path\",\"modifier\":\"Ends With\"}"]}
    assert_equal @response.status, 200
    body = JSON.parse(@response.body)
    assert_equal 1, body['requests'].length
    request5 = {"id"=>5, "ip_address"=>"45.455.4.455", "password"=>"-", "user_id"=>"-", "timestamp"=>"2010-03-26T13:46:04.000Z", "request_method"=>"GET", "request_path"=>"/path/to/endpoint5", "request_protocol"=>"HTTP/2.0", "response_code"=>200, "response_size"=>200000, "referrer"=>"http://apple.com/secretStarDestroyer", "browser"=>"Safari", "full_request"=>"GET /path/to/endpoint5 HTTP/2.0", "full_browser_info"=>"Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    assert_equal request5, body['requests'][0]
  end

  test "should return logs matching given request protocol type" do
    get "/search/", params: {"search"=>["{\"searchQuery\":\"HTTP/1.1\",\"dropdownVal\":\"request_protocol\",\"modifier\":\"\"}"]}
    assert_equal @response.status, 200
    body = JSON.parse(@response.body)
    assert_equal 2, body['requests'].length
    request1 = {"id"=>1, "ip_address"=>"83.149.9.216", "password"=>"-", "user_id"=>"-", "timestamp"=>"2017-03-26T13:46:04.000Z", "request_method"=>"GET", "request_path"=>"/path/to/endpoint", "request_protocol"=>"HTTP/1.1", "response_code"=>200, "response_size"=>23456, "referrer"=>"http://apple.com/secretHelicopter", "browser"=>"Safari", "full_request"=>"GET /path/to/endpoint HTTP/1.1", "full_browser_info"=>"Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    request4 = {"id"=>4, "ip_address"=>"22.222.2.222", "password"=>"-", "user_id"=>"-", "timestamp"=>"2014-03-26T13:46:04.000Z", "request_method"=>"GET", "request_path"=>"/path/to/endpoint4", "request_protocol"=>"HTTP/1.1", "response_code"=>200, "response_size"=>500, "referrer"=>"http://apple.com/secretStarDestroyer", "browser"=>"Safari", "full_request"=>"GET /path/to/endpoint4 HTTP/1.2", "full_browser_info"=>"Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    assert_equal request1, body['requests'][0]
    assert_equal request4, body['requests'][1]
  end

  test "should return logs that are less than the searched amount. This tests the modifier 'Less Than' and the response_size scope" do
    get "/search/", params: {"search"=>["{\"searchQuery\":\"30000\",\"dropdownVal\":\"response_size\",\"modifier\":\"Less Than\"}"]}
    assert_equal @response.status, 200
    body = JSON.parse(@response.body)
    assert_equal 2, body['requests'].length
    request1 = {"id"=>1, "ip_address"=>"83.149.9.216", "password"=>"-", "user_id"=>"-", "timestamp"=>"2017-03-26T13:46:04.000Z", "request_method"=>"GET", "request_path"=>"/path/to/endpoint", "request_protocol"=>"HTTP/1.1", "response_code"=>200, "response_size"=>23456, "referrer"=>"http://apple.com/secretHelicopter", "browser"=>"Safari", "full_request"=>"GET /path/to/endpoint HTTP/1.1", "full_browser_info"=>"Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    request4 = {"id"=>4, "ip_address"=>"22.222.2.222", "password"=>"-", "user_id"=>"-", "timestamp"=>"2014-03-26T13:46:04.000Z", "request_method"=>"GET", "request_path"=>"/path/to/endpoint4", "request_protocol"=>"HTTP/1.1", "response_code"=>200, "response_size"=>500, "referrer"=>"http://apple.com/secretStarDestroyer", "browser"=>"Safari", "full_request"=>"GET /path/to/endpoint4 HTTP/1.2", "full_browser_info"=>"Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    assert_equal request1, body['requests'][0]
    assert_equal request4, body['requests'][1]
  end

  test "should return logs that exactly match searched amount. This tests the modifier 'Exactly' " do
    get "/search/", params: {"search"=>["{\"searchQuery\":\"500000\",\"dropdownVal\":\"response_size\",\"modifier\":\"Exactly\"}"]}
    assert_equal @response.status, 200
    body = JSON.parse(@response.body)
    assert_equal 1, body['requests'].length
    request2 = {"id"=>2, "ip_address"=>"50.500.5.500", "password"=>"-", "user_id"=>"-", "timestamp"=>"2019-03-26T13:46:04.000Z", "request_method"=>"GET", "request_path"=>"/path/to/endpoint2", "request_protocol"=>"HTTP/1.2", "response_code"=>200, "response_size"=>500000, "referrer"=>"http://apple.com/secretJetPack", "browser"=>"Chrome", "full_request"=>"GET /path/to/endpoint2 HTTP/1.2", "full_browser_info"=>"Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    assert_equal request2, body['requests'][0]
  end

  test "should return logs that are more than the searched amount. This tests the modifier More Than" do
    get "/search/", params: {"search"=>["{\"searchQuery\":\"100000\",\"dropdownVal\":\"response_size\",\"modifier\":\"Larger Than\"}"]}
    assert_equal @response.status, 200
    body = JSON.parse(@response.body)
    assert_equal 2, body['requests'].length
    request2 = {"id"=>2, "ip_address"=>"50.500.5.500", "password"=>"-", "user_id"=>"-", "timestamp"=>"2019-03-26T13:46:04.000Z", "request_method"=>"GET", "request_path"=>"/path/to/endpoint2", "request_protocol"=>"HTTP/1.2", "response_code"=>200, "response_size"=>500000, "referrer"=>"http://apple.com/secretJetPack", "browser"=>"Chrome", "full_request"=>"GET /path/to/endpoint2 HTTP/1.2", "full_browser_info"=>"Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    request5 = {"id"=>5, "ip_address"=>"45.455.4.455", "password"=>"-", "user_id"=>"-", "timestamp"=>"2010-03-26T13:46:04.000Z", "request_method"=>"GET", "request_path"=>"/path/to/endpoint5", "request_protocol"=>"HTTP/2.0", "response_code"=>200, "response_size"=>200000, "referrer"=>"http://apple.com/secretStarDestroyer", "browser"=>"Safari", "full_request"=>"GET /path/to/endpoint5 HTTP/2.0", "full_browser_info"=>"Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    assert_equal request2, body['requests'][0]
    assert_equal request5, body['requests'][1]
  end

  test "should return logs that start with 'htt'. This tests the modifier 'Starts With' in referrer" do
    get "/search/", params: {"search"=>["{\"searchQuery\":\"htt\",\"dropdownVal\":\"referrer\",\"modifier\":\"Starts With\"}"]}
    assert_equal @response.status, 200
    body = JSON.parse(@response.body)
    assert_equal 5, body['requests'].length
    request1 = {"id"=>1, "ip_address"=>"83.149.9.216", "password"=>"-", "user_id"=>"-", "timestamp"=>"2017-03-26T13:46:04.000Z", "request_method"=>"GET", "request_path"=>"/path/to/endpoint", "request_protocol"=>"HTTP/1.1", "response_code"=>200, "response_size"=>23456, "referrer"=>"http://apple.com/secretHelicopter", "browser"=>"Safari", "full_request"=>"GET /path/to/endpoint HTTP/1.1", "full_browser_info"=>"Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    request2 = {"id"=>2, "ip_address"=>"50.500.5.500", "password"=>"-", "user_id"=>"-", "timestamp"=>"2019-03-26T13:46:04.000Z", "request_method"=>"GET", "request_path"=>"/path/to/endpoint2", "request_protocol"=>"HTTP/1.2", "response_code"=>200, "response_size"=>500000, "referrer"=>"http://apple.com/secretJetPack", "browser"=>"Chrome", "full_request"=>"GET /path/to/endpoint2 HTTP/1.2", "full_browser_info"=>"Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    request3 = {"id"=>3, "ip_address"=>"80.800.8.800", "password"=>"-", "user_id"=>"-", "timestamp"=>"2016-03-26T13:46:04.000Z", "request_method"=>"GET", "request_path"=>"/path/to/another/endpoint3", "request_protocol"=>"HTTP/1.2", "response_code"=>200, "response_size"=>88888, "referrer"=>"http://apple.com/secretStarDestroyer", "browser"=>"IE", "full_request"=>"GET /path/to/endpoint3 HTTP/1.2", "full_browser_info"=>"Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    request4 = {"id"=>4, "ip_address"=>"22.222.2.222", "password"=>"-", "user_id"=>"-", "timestamp"=>"2014-03-26T13:46:04.000Z", "request_method"=>"GET", "request_path"=>"/path/to/endpoint4", "request_protocol"=>"HTTP/1.1", "response_code"=>200, "response_size"=>500, "referrer"=>"http://apple.com/secretStarDestroyer", "browser"=>"Safari", "full_request"=>"GET /path/to/endpoint4 HTTP/1.2", "full_browser_info"=>"Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    request5 = {"id"=>5, "ip_address"=>"45.455.4.455", "password"=>"-", "user_id"=>"-", "timestamp"=>"2010-03-26T13:46:04.000Z", "request_method"=>"GET", "request_path"=>"/path/to/endpoint5", "request_protocol"=>"HTTP/2.0", "response_code"=>200, "response_size"=>200000, "referrer"=>"http://apple.com/secretStarDestroyer", "browser"=>"Safari", "full_request"=>"GET /path/to/endpoint5 HTTP/2.0", "full_browser_info"=>"Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    assert_equal request1, body['requests'][0]
    assert_equal request2, body['requests'][1]
    assert_equal request3, body['requests'][2]
    assert_equal request4, body['requests'][3]
    assert_equal request5, body['requests'][4]
  end

  test "should return logs that contains 'Jet' in the referrer. This tests the modifier 'Contains' in referrer" do
    get "/search/", params: {"search"=>["{\"searchQuery\":\"Jet\",\"dropdownVal\":\"referrer\",\"modifier\":\"Contains\"}"]}
    assert_equal @response.status, 200
    body = JSON.parse(@response.body)
    assert_equal 1, body['requests'].length
    request2 = {"id"=>2, "ip_address"=>"50.500.5.500", "password"=>"-", "user_id"=>"-", "timestamp"=>"2019-03-26T13:46:04.000Z", "request_method"=>"GET", "request_path"=>"/path/to/endpoint2", "request_protocol"=>"HTTP/1.2", "response_code"=>200, "response_size"=>500000, "referrer"=>"http://apple.com/secretJetPack", "browser"=>"Chrome", "full_request"=>"GET /path/to/endpoint2 HTTP/1.2", "full_browser_info"=>"Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    assert_equal request2, body['requests'][0]
  end

  test "should return logs that ends with 'Helicopter' in the referrer. This tests the modifier 'Ends With' in referrer" do
    get "/search/", params: {"search"=>["{\"searchQuery\":\"Helicopter\",\"dropdownVal\":\"referrer\",\"modifier\":\"Ends With\"}"]}
    assert_equal @response.status, 200
    body = JSON.parse(@response.body)
    assert_equal 1, body['requests'].length
    request1 = {"id"=>1, "ip_address"=>"83.149.9.216", "password"=>"-", "user_id"=>"-", "timestamp"=>"2017-03-26T13:46:04.000Z", "request_method"=>"GET", "request_path"=>"/path/to/endpoint", "request_protocol"=>"HTTP/1.1", "response_code"=>200, "response_size"=>23456, "referrer"=>"http://apple.com/secretHelicopter", "browser"=>"Safari", "full_request"=>"GET /path/to/endpoint HTTP/1.1", "full_browser_info"=>"Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    assert_equal request1, body['requests'][0]
  end

  test "should return logs that match the given browser. This tests the Browser search feature" do
    get "/search/", params: {"search"=>["{\"searchQuery\":\"Chrome\",\"dropdownVal\":\"browser\",\"modifier\":\"\"}"]}
    assert_equal @response.status, 200
    body = JSON.parse(@response.body)
    assert_equal 1, body['requests'].length
    request2 = {"id"=>2, "ip_address"=>"50.500.5.500", "password"=>"-", "user_id"=>"-", "timestamp"=>"2019-03-26T13:46:04.000Z", "request_method"=>"GET", "request_path"=>"/path/to/endpoint2", "request_protocol"=>"HTTP/1.2", "response_code"=>200, "response_size"=>500000, "referrer"=>"http://apple.com/secretJetPack", "browser"=>"Chrome", "full_request"=>"GET /path/to/endpoint2 HTTP/1.2", "full_browser_info"=>"Mozilla (Macintosh; Intel Mac OS X 10_9_1)"}
    assert_equal request2, body['requests'][0]
  end

end

