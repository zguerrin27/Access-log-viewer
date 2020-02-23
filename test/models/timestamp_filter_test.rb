require "test_helper"

class TimestampFilterTest < ActiveSupport::TestCase
  
  test "it should build from params" do 
    request = Request
    params = [{dropdownVal: "ip_address", search_query: "124.12.45.123"}]
    filter = TimestampFilter.new(params)
    request = filter.build_query(request)
    expected_request = Request.where(ip_address: "124.12.45.123")
    assert_equal expected_request, request
  end 
  
end