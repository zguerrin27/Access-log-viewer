class RequestsController < ApplicationController

    def index

    end

    def search
        @requests = Request.where(ip: "#{params[:search]}")
        render json: {requests: @requests}
    end

   

end
