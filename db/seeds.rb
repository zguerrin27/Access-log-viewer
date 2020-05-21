# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
# Examples:
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'date'
require 'time'

# file_path = params[:file_path]
# "../apache_logs2" if 1 level outside project folder

File.open("./apache_logs2", "r") do |file|
    
    access_logs = []

    for line in file.readlines()

        ip = line[/\b(?:\d{1,3}\.){3}\d{1,3}\b/]
        pword = line[/-/]
        userId = line[/-/]
        timestamp = line[/\[([^\]]+)\]/]
        requestMethod = line[/([A-Z]{3}(?= \/))/]
        requestPath = line[/ \/(\S+)?/]
        requestProtocol = line[/HTTP\/[0-9.]+/]
        responseCode = line[/ ([0-9]{3}(?= ))/]
        responseSize = line[/(([0-9]+)|-)(?= ")/]
        referrer = line[/(htt(\S+)?(?=")|-(?="))/]
        fullRequest = line[/([A-Z])+\s?(\S+)?\s?(\S+)?(?=")/]
        fullBrowserInfo = line[/(([A-Z]{1}?[^"]*(?="$))|-(?="$))/]

        newTimestamp = DateTime.strptime(timestamp[1..timestamp.length], "%d/%b/%Y:%H:%M:%S")
        stripedRequestPath = requestPath.strip()
        stripedResponseCode = responseCode.strip()
        user_agent = UserAgent.parse(fullBrowserInfo)
        browser = user_agent.browser
        
        access_logs.push({
            'ip_address'        => ip,
            'password'          => pword,
            'user_id'           => userId,
            'timestamp'         => newTimestamp,
            'request_method'    => requestMethod,
            'request_path'      => stripedRequestPath,
            'request_protocol'  => requestProtocol,
            'response_code'     => stripedResponseCode,
            'response_size'     => responseSize,
            'referrer'          => referrer,
            'browser'           => browser,
            'full_request'      => fullRequest,
            'full_browser_info' => fullBrowserInfo
        })

        # puts ip + " | " + pword + " | " + userId + " | " + timestamp + " | " + newTimestamp.to_s + " | " + requestMethod + " | " + stripedRequestPath + " | " + requestProtocol + " | " + stripedResponseCode + " | " + responseSize + " | " + referrer + " | " + browser + " | " + fullRequest + " | " + fullBrowserInfo

        # newTimestamp = "2020-02-05 15:37:31"
        # puts DateTime.parse(timestamp)
        # 17/May/2015 13:05:26 +0000
        # puts Date.strptime("17/May/2015:13:05:26", "%d/%B/%y:%H:%M:%S")
        # puts DateTime.strptime(timestamp[1..timestamp.length], "%d/%b/%Y:%H:%M:%S")

    end

    # puts access_logs
    # Request.create(access_logs)

end


