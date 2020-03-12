class RequestsController < ApplicationController

    def index
        
    end

    def load
    
    end

    def search 

        search_params = params[:search]

        search_by = {}
        modified_requests = {}

        search_params.each do |search_param|
            search_param = JSON.parse(search_param)  

            puts "****** THESE ARE THE PARSED SEARCH PARAMS *********", search_param

            unless [search_param["dropdownVal"], search_param["searchQuery"]].any?(&:blank?)   
          
                if search_param["modifier"].empty?
                    search_by[search_param["dropdownVal"]] = search_param["searchQuery"]

                elsif !search_param["modifier"].empty?
                    modified_requests = added_filter(search_param["dropdownVal"], search_param["modifier"], search_param["searchQuery"])
                end
                       
            end
        end


        unmodified_requests = if search_by.empty?
                                            Request.all                 # when you do Request...it is referencing the model
                                        else
                                            Request.where(search_by)
                                        end

        
        filtered_requests = unmodified_requests.merge(modified_requests)

        @requests = filtered_requests.paginate(:page => params[:page], :per_page => 10)
        render json: {
            requests: @requests,
            page: @requests.current_page,
            pages: @requests.total_pages
        }

    end



    private 

    def added_filter(dropdownVal, modifier, value)
        @requests ||= Request                      # this is a placeholder work around so that the @requests the first time = Request (empty model)
        case modifier
            when "Less Than"
                @requests = @requests.less_than_size(value)   # changed this to @requests = @requests from @request = Request.scope because the Request.scope overrides itsself each time. The @requests = @requests.scope keeps adding to the @requests instance variable 
            when "Exactly"
                @requests = @requests.exact_size(value)
            when "Larger Than"
                @requests = @requests.larger_than_size(value)
            when "Before Time"
                @requests = @requests.before_time(value)
            when "At Time"
                @requests = @requests.at_time(value)
            when "After Time"
                @requests = @requests.after_time(value)
            when "Starts With"
                dropdownVal == "request_path" ? @requests = @requests.request_path_starts_with(value) : @requests = @requests.referrer_starts_with(value)
            when "Contains"
                dropdownVal == "request_path" ? @requests = @requests.request_path_contains(value) : @requests = @requests.referrer_contains(value)
            when "Ends With"
                dropdownVal == "request_path" ? @requests = @requests.request_path_ends_with(value) : @requests = @requests.referrer_ends_with(value)
            end

        return @requests

    end

  

    


end
