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
        @requests = Request.where(ip: "#{params[:search]}")   
        render json: {requests: @requests}
    end

    # def search
    #     search = { ip: "1.2.3", broswer}
    #     search.keys  
    #     search.keys[0]
    #     @requests = Request.where(ip: "#{params[:search]}")
    #     @requests = Request.search(params)
    #     render json: {requests: @requests}
    # end

    # def search 
    #     # byebug
    #     @requests = Request.where(params[:search_by]: "#{params[:search]}")
    #     byebug
    #     render json: {requests: @requests}, status: :ok
    # end

    
   
   

end
