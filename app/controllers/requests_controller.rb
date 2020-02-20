class RequestsController < ApplicationController

    def index
        
    end

    def load
    
    end


    def search 
        search_params = params[:search]

        search_by = {}

        search_params.each do |search_param|
            search_param = JSON.parse(search_param) # takes in each line of the 
            unless [search_param["dropdownVal"], search_param["searchQuery"]].any?(&:blank?)  # if either side of hash is  
                search_by[search_param["dropdownVal"]] = search_param["searchQuery"]          # empty dont run the next line
            end
        end

        filtered_requests = if search_by.empty?
                                Request.all
                            else
                                Request.where(search_by)
                            end

        @requests = filtered_requests.paginate(:page => params[:page], :per_page => 13)
        render json: {
            requests: @requests,
            page: @requests.current_page,
            pages: @requests.total_pages
        }
    end



    # many small functions that do one thing 
    # post either emtpy params which should just load all data 
    # or search params 

    

end
