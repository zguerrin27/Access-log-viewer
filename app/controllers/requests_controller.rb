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
    #     search = { ip: "1.2.3", broswer}
    #     search.keys  
    #     search.keys[0]
        # @requests = Request.where(ip: "#{params[:search]}")
        @requests = Request.search(params)
        render json: {requests: @requests}
    end
   

end
