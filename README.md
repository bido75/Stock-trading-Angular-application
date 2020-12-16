Reference - 
---------
***Responsive Angular application for stock search and trading 
o	Designed and implemented a responsive, platform independent and cross-browser compatible angular application for searching and analyzing stocks, maintaining watchlist and portfolio for buying and selling stocks 
o	Created website structure, easy navigation with less panning, content optimization and real time asynchronous JSON data fetching via AJAX Get requests to GCP deployed Node.js backend that uses Tiingo stock Restful APIs
o	Tested successfully for responsive design on 15+ handheld devices including IphoneXS, Ipad and on large display laptop with user engagement improvements using Bootstrap 4.
o	Techstack: AJAX, JSON, HTML5, CSS3, Bootstrap (navbars, alerts, modals, cards, grid view,footer,icons,buttons),Angular10,Node.js,Express.js,
TiingoAPI,NewsAPI,Angular Routing,Angular Material tabs, material spinner and material autocomplete,ng-bootstrap,angular modal,angular highcharts,Typescript,
Twitter and Facebook share content icon API, HTML5 Local Storage,Highcharts angular module, GCP ***

Link to web app - https://hw8-stock-search.wl.r.appspot.com/

# MyApp - Stock Search

This project was generated with [Angular CLI] version 10.1.6.

Technology stack:
----------------------
AJAX/JSON/HTML5/Bootstrap/Angular/Node.js/Cloud/Tiingo API and NewsAPI

Description:
---------------
Created a webpage that allows users to search for stocks using the Tiingo
API and display the results on the details page.

There are 4 routes for this application:
a) Homepage/ Search Route [‘/’] – It is a default route of this application.
b) Watchlist Route [‘/watchlist’] – It displays the watchlist of the user.
c) Portfolio Route [‘/portfolio’] – It displays the portfolio of the user.
d) Details Route [‘/details/<ticker>’] – It shows the details of the <ticker>.

Webpages
---------
***Search Page/ Homepage - Stock Ticker,  Search Button, autocomplete

Once the user clicks on the “Search” button, your application should make an HTTP call to the
Node.js script hosted on GA/AWS/Azure back end (the Cloud Services) . The Node.js script on
Cloud Services will then make a request to the Tiingo API and NewsAPI services to get the
detailed information and news.

Autocomplete
• A Search Bar allows a user to enter a keyword (Stock ticker symbol / company name) to
retrieve information. Based on the user input, the text box should display a list of all the
matching company’s ticker symbols with company’s name (see Figure 2). The
autocomplete JSON data is retrieved from the Tiingo Search API
The autocomplete function should be implemented using Angular Material.

***Details Page

->Details of Searched Stock
After the user clicks the Search button, a page should route to /details/<ticker> path (example:
/details/AMZN). The following components need to be displayed on successful search:
• Symbol, company name, trading Exchange (such as NASS+DAQ), and Buy button on top
left;
• Last price, change, percent change, and date/time, on top right. The change items should
be preceded by appropriately colored arrows);
• Indication of open / closed market;
• Summary, Top News and Charts tabs.
  
 When the user clicks on the star icon, the white star turns yellow, and that ticker should be
stored in local storage. A self-closing alert should be displayed
at the top and that stock should be visible on the Watchlist Page.
• When the user clicks on the Buy button, a modal window should open. which will display
the details (stock symbol, current price, quantity of shares to buy and total price for the
shares) Note that:
o The Buy button should be disabled if the user inputs the quantity < 1 or the quantity
field is empty.
o The Buy button will be enabled once the user enters a number greater than 0.

**Material Tabs - Summary Tab , Top News Tab , Charts Tab

This component helps users see different stock data on the same page,
and the tabs content is detailed in the following sections.

Summary Tab
------------

It contains summary of the stock, which includes:
Details are as following:

§ If market is Open: Display all the fields :
High Price 
Low Price 
Open Price 
Prev. Close 
Volume

§ If market is Closed: Display all the fields above

o Company’s Description: values for ‘startDate’ and ‘description’ 

o Chart for the last Working Day:
§ If market is Open: Show stock chart available in Highcharts for that day.
§ If market is Closed: Show stock chart for the day when the market was
closed. (i.e., last working day).

Top News Tab
------------
This tab shows top news for the given stock ticker symbol from News API.

o Show cards which contains Image and Title.
§ For Image use ‘urlToImage’ key 
§ For Title use ‘title’ key 

o When clicked on card, open a Modal window.
o User can share the news articles on Twitter and Facebook. Twitter and Facebook should open in a new browser
tab, if clicked.
§ In Twitter, it should create a post having following content:
• Title of the news article
• URL of the news article.
§ In Facebook, it should create a post, which contains URL of the news
Article.
o Inside modal when user clicks on ‘here’ in ‘For more details click here’, it should
open the URL for the article in a new browser tab.

Charts Tab
-----------
This tab uses HighCharts to display historical stock market data on the related stock.
o Display SMA and Volume by Price chart for data of the last 2 years.

Error Page
----------
If user manually edits the /details/<ticker> route and if the <ticker>
entered by user is invalid, then you need to display an alert on that page instead of details.
  
Note: Data mentioned in Stock Details section and Summary Tab,autoupdates every 15 seconds.

***Watchlist Menu

This menu will display all the stocks that are added to the watchlist by the user. This watchlist will
be maintained in local storage of the application.
If the change is positive, the color of the ‘last’, ‘change’ and ‘changePercentage’ keys
should be green
• If the change is negative, the color of the ‘last’, ‘change’ and ‘changePercentage’ keys
should be red
• If there is no change, the color of the ‘last’, ‘change’ and ‘changePercentage’ keys should
be black.
• When clicked on close button at present on the right-top corner of the card, it should
remove it from the watchlist and display an updated watchlist.
• When clicked on card, it should open the details route of that ticker (stock).
• If watchlist is empty, it should display the alert "Currently you don't have any stock in your watchlist."

***Portfolio Menu

This menu will display all the stocks that have been bought by the user (i.e. the current portfolio
of the user). This portfolio will be maintained in local storage of the application.

• If the current rate is greater than the rate at which user bought it, then color of the ‘Change’,
‘Current Price’ and ‘Current Total’ keys should be green;
• If the change is negative, the color of the ‘Change’, ‘Current Price’ and ‘Current Total’
keys should be red;
• If there is no change, the color of the ‘Change’, ‘Current Price’ and ‘Current Total’ keys
should be black;
• When clicking on Buy button, modal should open. The Buy button
inside modal should be disabled if the quantity entered by user is not valid 
Valid input should be greater than 0 and must be non-empty;
• When clicking on Sell button, modal should open.
Sell button inside modal should be disabled if the quantity entered by user is not valid. Input is
Valid if, 0<input<=Quantity and must be non-empty. 
• When clicked on card’s header part, it should open the details route of that ticker (stock);
• If portfolio is empty, it should display the alert "Currently you don't have any stock."

Note: Portfolio and Watchlist is sorted in ascending order based on Ticker.

**This application follows Responsive Design - works smoothly on phone, tab and large desktops.

**Navbar

The Navigation bar is present on top of the page, and visible at all times as shown in all the
figures above. Bootstrap used to create a navbar. It consists of following menu options:
1. Search
2. Watchlist
3. Portfolio

***Footer

The Footer must be present at the end of each page. It should contain
following line:
“Powered by Tiingo. Developed by <name>”
