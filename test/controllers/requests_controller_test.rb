require 'test_helper'

class RequestsControllerTest < ActionDispatch::IntegrationTest
  
  test "should get requests index page" do
    get "/"
    assert_response :success
  end

end
