class TimestampFilter

  def initialize(params)
    @params = params
  end


  def build_query(scope)

  end

end


# scope :created_before, -> (time) {where ("created_at < ?" time) }
# Request.created_before(time)

# same as the class method in request.rb
# class Request < ApplicationRecord
#   self.created_before(time)
#     where("created_at < ?", time)
#   end
# end 

# scope :filter_by_starts_with, -> (name) { where("name like ?", "#{name}%")}