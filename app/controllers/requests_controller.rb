class RequestsController < ApplicationController

    def index

    end

    def search
        @requests = Request.where(id: "#{params[:search]}")
        render json: {requests: @requests}
    end

    def create

    end

end
