# README  
<img width="1680" alt="Screen Shot 2020-05-24 at 5 08 09 PM" src="https://user-images.githubusercontent.com/39317224/82765061-830b9c00-9de1-11ea-9917-8b1555cdb064.png">
<img width="1680" alt="Screen Shot 2020-05-24 at 5 13 50 PM" src="https://user-images.githubusercontent.com/39317224/82765125-fe6d4d80-9de1-11ea-89de-344f21fc998c.png">
  
TO USE:  
  
Clone  
gem install bundler  
bundler install  
yarn install  
rake db:migrate  
**Configure seeds file 'apache_logs2' in seeds.rb...line 13  
I have included the file in this project folder  
Run seeds  
Rails S to start app  

This application allows a user to read and search through Apache Server Access-logs.  
  
It uses React.js for the front end, Ruby on Rails for the API and postgresQL for the DB. 

The search feature allows a user to search by 11 parameters, ( each column of the Access-Log ), along with modifiers such as "starts with", "contains", "ends with" etc.  

Important Information:  

In app/views/requests/index.html.erb you will see <%= javascript_pack_tag 'index' %> which injects the react code into my rails app.  
    
In app/javascript/components you will find the components I created.  
In app/controllers/requests_controller.rb you will find my API.  
In app/models/request.rb you will find my Request model, along with some validation and the scopes I used for my API.       
In app/assets/stylesheets/custom.css.scss you will find some styling I wrote to compliment the Bootstrap and ANT designs styling that I used.    
In app/db/seeds.rb you can see how I broke down the txt file I was given and built the information to insert into my DB.    
In app/test/Components you can see all of my tests for my React components/validation tests.    
In app/test/controllers/requests_controller_test.rb you can see all of my tests for my API.  
In app/test/models/request_test.rb you can see my model tests.  
  
Back End Tests:      
22 runs, 119 assertions, 0 failures, 0 errors, 0 skips  
Coverage report generated for Minitest to Access-Log-Viewer/coverage. 317 / 317 LOC (100.0%) covered.  
  

Front End Tests:  
PASS  test/Components/Validate.test.js  
PASS  test/Components/InputBar.test.js  
PASS  test/Components/SearchModal.test.js  
PASS  test/Components/App.test.js  
PASS  test/Components/SearchContainer.test.js (5.129s)  
  
Test Suites: 5 passed, 5 total  
Tests:       25 passed, 25 total  
Snapshots:   0 total  
Time:        5.906s  
   
    
  
********** WORK IN PROGRESS **********    
I need to complete the Share feature.               
   
  
            
Technologies Used:  

React  
Ruby on Rails  
PostgresQL  
Jest & Enzyme  
Webpack  
Babel  
Nock  
MiniTest  
Axios  
Pagination  
Bootstrap  
Reactstrap
antDesigns    
Custom CSS  
