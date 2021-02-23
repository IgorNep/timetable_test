
## Events Timetable
Simple meeting planning calendar for a meeting room in your office.

## Version
1.0.0

## Features
```text
Display meetings planned
Filter meetings for a particular team member
Add new meetings
Delete meetings
```



## Usage

```text
1.To add new meeting click on button "New Event +" and the modal winow will appear
2.In modal window input required values such as :
  -name of the event
  -participants (you can choose like single like multiple)
  -choose the day of the event
  -choose the time of the event
(If the table already has event for chosen date and time the error will show up - you should choose other date or/and time)
3.After successfull creating you will redirect to table screen and new event will appear in table.
  -All new events will persist in localstorage for possibility of using events data after page reload.
4.You can manipulate with event instances:
  -you can move it by drag and drop.
  -you can put new event only on empty time slot otherwise alert message will appear.
  -you can delete event by click on delete icon. After click the confirmation modal window will appear. Just make choice yes or no.
 5.You have ability to sort events by participants. Just use selector in right top corner.
 ```
 
 ## Authorization
 1.To enter the application you have to authorize.
 2.If you want to authorize as admin - just choose Maria, she is an Admin.
 3.Admin can add new events and drag/drop them.
 
 ## Local Server Usage
 
 ```text
 If you would like to load this project on your local machine just follow next steps:
 
 1.Clone this repository in folder you want
 2.Open folder in any code editor (VS code for example)
 3.Run command in terminal : npm install (all files will be installed by using package.json file)
 4.after that make sure you are in yours project folder and then run next command in terminal: npm run start (project will be automatically run and open browser chrome ,
  so it is good if you have it :) )
 
 If for any reason something does not work please contact me: igornesan@gmail.com
 ```
 
 ## Contributing
 
 ```bash
If you like to make improvements just send a message igornesan@gmail.com
```

