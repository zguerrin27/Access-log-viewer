require "test_helper"

class TimestampFilterTest < ActiveSupport::TestCase
  
  test "it should build from params" do 
    request = Request

    params = [{dropdownVal: "ip_address", key: "6e6bdaa-d7f-880b", search_query: "2013-02-07 00:00:00"}]
    filter = TimestampFilter.new(params)
    request = filter.build_query(request)
    expected_request = Request.where(ip_address: "2013-02-07 00:00:00")
    assert_equal expected_request, request
  end 
end