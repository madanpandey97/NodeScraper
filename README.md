# NodeScraper
A Node Scrapper to Crawl STYFI Product Detail Page and check for discrepancies in product sizes.

# Technology Used

Node 8.11.1 <br>
Cheerio<br>
Request<br>
Fs<br>
Fast-Csv<br>

# To run the module 
 Open terminal  and type following command <br>
 git clone https://github.com/madanpandey97/NodeScraper.git<br>
 cd NodeScraper<br>
 npm install <br>
 node scraper.js<br>
 
 # To change the range of product id 
 Open Scraper.js in editing mode and change the range of id at line No 25
 
 ```
 	for(let id = 15000; id < 20000; id ++) {
		let url = `https://www.styfi.in/product/${id}`;
 ```
 
# Screen capture of output file 

<a href="https://ibb.co/jaiAuS"><img src="https://preview.ibb.co/kjAquS/Screenshot_from_2018_04_30_23_04_38.png" alt="Screenshot_from_2018_04_30_23_04_38" border="0"></a>
 
