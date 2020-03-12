class LikeFilter

  def initialize(params, scope = Request)
    @query = params[:query]
    @scope = scope
  end
  def build_query
    @scope = @scope.where("params[:column] like '%?%'", @query) if @query
    return @scope
  end
  
end