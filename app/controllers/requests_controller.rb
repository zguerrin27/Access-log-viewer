class RequestsController < ApplicationController

    def index
        
    end

    def load
        @requests = Request.paginate(:page => params[:page])
        render json: {
            requests: @requests,
            page: @requests.current_page,
            pages: @requests.total_pages
        }
    end


    def search 

        search_params = params[:search]
        search_by = {}

        search_params.each do |search_param|
            search_by[search_param["dropdownVal"]] = search_param["searchQuery"]
        end

        @requests = Request.where(search_by)
        render json: {requests: @requests}
    end
    

end
