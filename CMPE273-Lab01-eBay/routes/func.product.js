var mysql = require('./util.database');
var session = require('./func.session');
var dateFormat = require('dateformat');

var soap = require('soap');
var baseURL = "http://localhost:8080/eBay-WebService/services";



function getProductQuery()
{
	var userQuery = "select product_id, product_name, product_desc, product_adv,product_seller_info, product_quantity, product_price from product_detail " +
			"where product_quantity > 0 and product_bid_flag = 'no'";
	return userQuery;
}

function getProductQueryUser(username)
{
	var userQuery = "select product_id, product_name, product_desc, product_adv,product_seller_info, product_quantity, product_price from product_detail " +
			"where product_quantity > 0 and product_bid_flag = 'no' and product_adv != '"+username+"'";
	return userQuery;
}

function getProductDetailQuery(product_id)
{
	var userQuery = "select product_id, product_name, product_desc, product_adv,product_seller_info, product_quantity, product_price from product_detail " +
			"where product_id = '"+product_id+"'";
	return userQuery;
}


function getBidProductDetailQuery(product_id)
{
	var userQuery = "select product_id, product_name, product_desc, product_adv,product_seller_info, product_price,product_base_bid, current_bid from product_detail " +
			"where product_id = '"+product_id+"'";
	return userQuery;
}

function getBidProductUserQuery(username)
{
	var userQuery = "SELECT product_id, product_name, product_adv, product_seller_info, product_price, product_base_bid, current_bid FROM ebay.product_detail "+
	"where  product_bid_flag = 'yes' and "+
	"product_sold_flag = 'no' and "+
	"product_adv != '"+username+"'";
	return userQuery;
}

function getBidProductQuery()
{
	var userQuery = "SELECT product_id, product_name, product_adv, product_seller_info, product_price, product_base_bid, current_bid FROM ebay.product_detail "+
	"where  product_bid_flag = 'yes' and "+
	"product_sold_flag = 'no'";
	
	return userQuery;
}

exports.returnBidProductInfo = function(req, res){
	
	var product_id = req.param("product_id");
	
	mysql.fetchData(function(err, results) {
		if(err)
		{
			console.log('Not able to fetch Product Data');
		}
		else
		{
			res.send(results[0]);
		}
		
	}, getBidProductDetailQuery(product_id));
}


exports.returnBidProductsdetails = function(req, res){
	var query = "";
	if(req.session.username)
	{
		query = getBidProductUserQuery(req.session.username);
	}
	else
	{
		query = getBidProductQuery();
	}
	mysql.fetchData(function(err, results) {
		if(err)
		{
			console.log('Not able to fetch Product Data');
		}
		else
		{
			res.send(results);
		}
		
	}, query);
}

exports.returnProductdetails = function(req, res){
	var query = "";
	if(req.session.username)
	{
		query = getProductQueryUser(req.session.username);
	}
	else
	{
		query = getProductQuery();
	}
	mysql.fetchData(function(err, results) {
		if(err)
		{
			console.log('Not able to fetch Product Data');
		}
		else
		{
			res.send(results);
		}
		
	}, query);

}

exports.getProductDetails = function(req,res){
	
	product_id = req.param('product_id');
	
	mysql.fetchData(function(err, results) {
		if(err)
		{
			console.log('Not able to fetch Product Data');
		}
		else
		{
			res.send(results[0]);
		}
		
	}, getProductDetailQuery(product_id));
}



/*exports.returnBidProductInfo = function(req, res){
	
	var product_id = req.param("product_id");
	var url = baseURL+"/ProductInfo?wsdl";
	var option = {
			ignoredNamespaces : true	
		};
	soap.createClient(url,option, function(err, client) {
		
		var productinfo = {product_id : prodcut_id}
		
		client.bidProduct(productinfo, function(err, result) {  
			//return bid product info
	    });
	});
}


exports.returnBidProductsdetails = function(req, res){
	var query = "";
	if(req.session.username)
	{
		var url = baseURL+"/ProductInfo?wsdl";	
		var option = {
				ignoredNamespaces : true	
			};
		soap.createClient(url,option, function(err, client) {
			var user = {username : req.session.username}
			client.bidProducts(user, function(err, result) {  
				//return bid products info
		    });
		});
	}
	else
	{
		var url = baseURL+"/ProductInfo?wsdl";
		var option = {
				ignoredNamespaces : true	
			};
		soap.createClient(url,option, function(err, client) {
			var user = {username : ""}
			client.bidProducts(user, function(err, result) {  
				//return bid products info
		    });
		});
	}

}

exports.returnProductdetails = function(req, res){
	var query = "";
	if(req.session.username)
	{
		var url = baseURL+"/ProductInfo?wsdl";
		var option = {
				ignoredNamespaces : true	
			};
		soap.createClient(url,option, function(err, client) {
			var user = {username : req.session.username}
			client.products(user, function(err, result) {  
				//return Products info
		    });
		});
	}
	else
	{	
		var url = baseURL+"/ProductInfo?wsdl";
		var option = {
				ignoredNamespaces : true	
			};
		soap.createClient(url,option, function(err, client) {
			var user = {username : ""}
			client.products(user, function(err, result) {  
				//return Products info
		    });
		});
	}
}

exports.getProductDetails = function(req,res){
	
	product_id = req.param('product_id');
	var url = baseURL+"/ProductInfo?wsdl";
	var option = {
			ignoredNamespaces : true	
		};
	soap.createClient(url,option, function(err, client) {
		var productinfo = {product_id : product_id}
		client.product(user, function(err, result) {  
			//return Products info
	    });
	});
}*/









