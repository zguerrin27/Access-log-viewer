# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
# Examples:
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'date'
require 'time'


# file_path = params[:file_path]
# "../apache_logs2"

File.open("../apache_logs2", "r") do |file|
    
    access_logs = []

    for line in file.readlines()

        ip = line[/\b(?:\d{1,3}\.){3}\d{1,3}\b/]
        pword = line[/-/]
        userId = line[/-/]
        timestamp = line[/\[([^\]]+)\]/]
        request = line[/([A-Z])+\s?(\S+)?\s?(\S+)?(?=")/]
        responseCode = line[/ ([0-9]{3}) /]
        responseSize = line[/(([0-9]+)|-)(?= ")/]
        referrer = line[/(htt(\S+)?(?=")|-(?="))/]

        browserInfo = line[/(([A-Z]{1}?[^"]*(?="$))|-(?="$))/]

        newTimestamp = Date.parse(timestamp)

        # parse browserInfo into gem then insert into db 

        # puts newTimestamp
        
        access_logs.push({
            'ip' => ip,
            'pword' => pword,
            'userId' => userId,
            'timestamp' => newTimestamp,
            'request' => request,
            'responseCode' => responseCode,
            'responseSize' => responseSize,
            'referrer' => referrer,
            'browserInfo' => browserInfo
        })

        # puts ip + " | " + pword + " | " + userId + " | " + timestamp + " | " + request + " | " + responseCode + " | " + responseSize + " | " + referrer + " | " + browserInfo

    end

    # puts access_logs
    # Request.create(access_logs)

end






        # reqMethod = line[/"([A-Z]+ )/]
        # requestedUrl = line[/ \/(\S+)?/]
        # protocol = line[/HTTP\/[0-9.]+"/]