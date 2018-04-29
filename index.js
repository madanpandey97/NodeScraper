var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var csv = require('fast-csv');

let url1 = 'https://www.styfi.in/product/nome-multi-colour-bags';
let url2 = 'https://www.styfi.in/product/benoit-red-crew-neck-long-sleeved-tshirt';


var csvStream = csv.format({headers: true}),
    writableStream = fs.createWriteStream("my.csv");



request(url2, function(err, resp, html) {
        if (!err){
          const $ = cheerio.load(html);
          // console.log(html);
          // console.log(typeof $('.sp_selectsizebtn'));
          let res = $('.sp_selectsizebtn ul');
      		// console.log(res.find('li'));
      		res = res.find('li');
      		product_id = '';
      		let final_result = {};
      		let sizes = [];
      		for(let i = 0; i < res.length; i++ ){
      			let size = res[i].children[1].children[0].data;
      			// console.log("Size: ", size);
      			sizes.push(size);
      			// console.log(res[i].children[1].attribs['data-sku_id'])
      			// console.log(res[i].children[1].attribs['data-webengage']);
      			// console.log("------");
      			if(i == 0) {
      				let object_string =res[i].children[1].attribs['data-webengage'];
      				let json_string = object_string.replaceAll("'", '"');
      				let json_object = JSON.parse(json_string);
      				product_id = json_object['data-productid'];
      				// console.log("product id: ", json_object['data-productid']);
      				continue;
      			}
      		}
      		final_result = {product_id, sizes, url1};
         


writableStream.on("finish", function(){
  console.log("DONE!");
});

csvStream.pipe(writableStream);
csvStream.write({url: url2, product_id: product_id, size: sizes});

csvStream.end();
          
 

          
      		console.log(final_result);
      }
});

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};



//sp_selectsizebtn
//data-webengage