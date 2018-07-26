# BusMall

A project using HTML/CSS and JavaScript to do market analysis on which displayed products are most desirable. Currently renders 3 non-duplicate, non-repeated product images at a time and asks the user to vote for which is the most desirable while tabulating the votes. 

Once 25 choices have been made, the voting system is removed and the results are displayed via Chart.js, leveraging HTML local storage to keep a persistent total of how many times each image was picked even if the browser window is closed between picking sessions.