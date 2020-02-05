# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
# Examples:
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# require 'date'
# require 'time'

# file_path = params[:file_path]
# "../apache_logs2"

File.open("../apache_logs2", "r") do |file|
    
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

        newTimestamp = Date.parse(timestamp)
        stripedRequestPath = requestPath.strip()
        stripedResponseCode = responseCode.strip()
        user_agent = UserAgent.parse(fullBrowserInfo)
        browser = user_agent.browser
        
        access_logs.push({
            'ip'              => ip,
            'pword'           => pword,
            'userId'          => userId,
            'timestamp'       => newTimestamp,
            'requestMethod'   => requestMethod,
            'requestPath'     => stripedRequestPath,
            'requestProtocol' => requestProtocol,
            'responseCode'    => stripedResponseCode,
            'responseSize'    => responseSize,
            'referrer'        => referrer,
            'browser'         => browser,
            'fullRequest'     => fullRequest,
            'fullBrowserInfo' => fullBrowserInfo
        })

        # puts ip + " | " + pword + " | " + userId + " | " + timestamp + " | " + requestMethod + " | " + stripedRequestPath + " | " + requestProtocol + " | " + stripedResponseCode + " | " + responseSize + " | " + referrer + " | " + browser + " | " + fullRequest + " | " + fullBrowserInfo

    end

    # puts access_logs
    # Request.create(access_logs)

end


