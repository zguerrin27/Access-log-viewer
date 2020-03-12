class Search 

  def initialize(params, scope = Request)
    @scope = scope
    @params = params
  end


  def search
    params.each do |param|
      case params.type
        when :between
          @scope = BetweenFilter.new(params, @scope).build_query
        when :equals
          @scope = EqualsFilter.new(params, @scope).build_query
        when :like
          @scope = LikeFilter.new(params, @scope).build_query
        end
      end
      @scope 
  end


end 
