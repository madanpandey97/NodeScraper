var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var csv = require('fast-csv');

scrape = () => {


	var csvStream = csv
	    .format({headers: true})
	    .transform(function(row){
	        return {
	           url: row.url,
	           product_id: row.product_id,
	           sizes:row.sizes
	        };
	    }),
	    writableStream = fs.createWriteStream("mynew.csv");

	writableStream.on("finish", function(){
	  console.log("DONE!");
	});

	csvStream.pipe(writableStream);
	for(let id = 15000; id < 20000; id ++) {
		let url = `https://www.styfi.in/product/${id}`;
		request(url, function(err, resp, html) {
			
		    if (!err && resp.statusCode == 200){
	            const $ = cheerio.load(html);
	            // console.log(html);
	            // console.log(typeof $('.sp_selectsizebtn'));
	            let res = $('.sp_selectsizebtn ul');
	            // console.log(res.find('li'));
	            res = res.find('li');
	            product_id = id;
	            let final_result = {};
	            let sizes = [];

	            for(let i = 0; i < res.length; i++ ){
	              let size = res[i].children[1].children[0].data;
	              // console.log("Size: ", size);
	              sizes.push(size);
	              // console.log(res[i].children[1].attribs['data-sku_id'])
	              // console.log(res[i].children[1].attribs['data-webengage']);
	              // console.log("------");
	            }
	            final_result = {product_id, sizes, url};
	            //console.log( Object.keys(sizes).length );
	     		

	     		if(Object.keys(sizes).length != 0){
	     			console.log(final_result);
		        	csvStream.write({url: url, product_id: product_id, sizes: sizes});
	     		}
	     		
	            
	        
		    }
		});
	}

}

scrape();