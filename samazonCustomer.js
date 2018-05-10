// Pull in required dependencies
const inquirer = require('inquirer');
const mysql = require('mysql');
require('dotenv').config()


// Define the MySQL connection parameters
let connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,

	// Your username
	user: 'root',

	// Your password
	password: process.env.SAMAZON_PASSWORD,
	database: process.env.SAMAZON_DB
});

// validateInput makes sure that the user is supplying only positive integers for their inputs
function validateInput(value) {
	let integer = Number.isInteger(parseFloat(value));
	let sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Please enter a whole non-zero number.';
	}
}

// promptUserPurchase will prompt the user for the item/quantity they would like to purchase
function promptUserPurchase() {
	// console.log('___ENTER promptUserPurchase___');

	// Prompt the user to select an item
	inquirer.prompt([
		{
			type: 'input',
			name: 'ItemID',
			message: 'Please enter the Item ID which you would like to purchase.',
			validate: validateInput,
			filter: Number
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'How many do you need?',
			validate: validateInput,
			filter: Number
		}
	]).then(function(input) {
		// console.log('Customer has selected: \n    item_id = '  + input.item_id + '\n    quantity = ' + input.quantity);

		let item = input.ItemID;
		let quantity = input.quantity;

		// Query db to confirm that the given item ID exists in the desired quantity
		let queryStr = 'SELECT * FROM Products WHERE ?';

		connection.query(queryStr, {ItemID: item}, function(err, data) {
			if (err) throw err;

			// If the user has selected an invalid item ID, data attay will be empty
			// console.log('data = ' + JSON.stringify(data));

			if (data.length === 0) {
				console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
				displayInventory();

			} else {
				var productData = data[0];


				// If the shoes requested by the user is in stock
				if (quantity <= productData.ShoeQuantity) {
					console.log('Thanks for your order! Your kicks are being shipped.');

					// Construct the updating query string
					let updateQueryStr = 'UPDATE products SET ShoeQuantity = ' + (productData.ShoeQuantity - quantity) + ' WHERE ItemID = ' + item;
					// console.log('updateQueryStr = ' + updateQueryStr);

					// Update the inventory
					connection.query(updateQueryStr, function(err, data) {
						if (err) throw err;

						console.log('Your oder has been placed! Your total is $' + productData.Price * quantity);
						console.log('Thank you for shopping with us!');
						console.log("\n---------------------------------------------------------------------\n");

						// End the database connection
						connection.end();
					})
				} else {
					console.log('Sorry, we are out of stock for those kicks, your order can not be placed as is.');
					console.log('Please modify your order.');
					console.log("\n---------------------------------------------------------------------\n");

					displayInventory();
				}
			}
		})
	})
}

// displayInventory will retrieve the current inventory from the database and output it to the console
function displayInventory() {
	// console.log('___ENTER displayInventory___');

	// Construct the db query string
	productQuery = 'SELECT * FROM Products';

	// Make the Database query
	connection.query(productQuery, function(err, data) {
		if (err) throw err;

		console.log('Existing Inventory: ');
		console.log('...................\n');

		let strOut = '';
		for (var i = 0; i < data.length; i++) {
			strOut = '';
			strOut += 'Item ID: ' + data[i].ItemID + '  //  ';
			strOut += 'Product Name: ' + data[i].ProductName + '  //  ';
			strOut += 'Department: ' + data[i].BrandName + '  //  ';
			strOut += 'Price: $' + data[i].Price + '\n';

			console.log(strOut);
		}

	  	console.log("---------------------------------------------------------------------\n");

	  	//Prompt the user for item/quantity of the shoe they would like to purchase
	  	promptUserPurchase();
	})
}

// runSamazon will execute the main application logic
function runSamazon() {
	// console.log('___ENTER runSamazon___');

	// Display the available inventory
	displayInventory();
}

// Run the application logic
runSamazon();