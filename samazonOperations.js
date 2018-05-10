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

// promptManagerAction will present menu options to the manager
function promptManagerAction() {
	// console.log('___ENTER promptManagerAction___');

	// Prompt the manager to select an option
	inquirer.prompt([
		{
			type: 'list',
			name: 'option',
			message: 'Please select an option:',
			choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product'],
			filter: function (val) {
				if (val === 'View Products for Sale') {
					return 'sale';
				} else if (val === 'View Low Inventory') {
					return 'lowInventory';
				} else if (val === 'Add to Inventory') {
					return 'addInventory';
				} else if (val === 'Add New Product') {
					return 'newProduct';
				} else {
					// This case should be unreachable
					console.log('ERROR: Unsupported operation!');
					exit(1);
				}
			}
		}
	]).then(function(input) {
		// console.log('User has selected: ' + JSON.stringify(input));

		// Trigger the appropriate action based on the user input
		if (input.option ==='sale') {
			displayInventory();
		} else if (input.option === 'lowInventory') {
			displayLowInventory();
		} else if (input.option === 'addInventory') {
			addInventory();
		} else if (input.option === 'newProduct') {
			createNewProduct();
		} else {
			// This case should be unreachable
			console.log('ERROR: Unsupported operation!');
			exit(1);
		}
	})
}

// displayInventory will retrieve the current inventory from the database and output it to the console
function displayInventory() {
	// console.log('___ENTER displayInventory___');

	// Construct the database query string
	queryStr = 'SELECT * FROM Products';

	// Make the db query
	connection.query(queryStr, function(err, data) {
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
			strOut += 'Quantity: ' + data[i].ShoeQuantity + '\n';

			console.log(strOut);
		}

	  	console.log("---------------------------------------------------------------------\n");

		// End the database connection
		connection.end();
	})
}

// displayLowInventory will display a list of Products with the available quantity below 100
function displayLowInventory() {
	// console.log('___ENTER displayLowInventory');

	// Construct the db query string
	queryStr = 'SELECT * FROM Products WHERE ShoeQuantity < 100';

	// Make the db query
	connection.query(queryStr, function(err, data) {
		if (err) throw err;

		console.log('Low Inventory Items (below 100): ');
		console.log('................................\n');

		let strOut = '';
		for (var i = 0; i < data.length; i++) {
			strOut = '';
			strOut += 'Item ID: ' + data[i].ItemID + '  //  ';
			strOut += 'Product Name: ' + data[i].ProductName + '  //  ';
			strOut += 'Department: ' + data[i].BrandName + '  //  ';
			strOut += 'Price: $' + data[i].Price + '\n';
			strOut += 'Quantity: ' + data[i].ShoeQuantity + '\n';

			console.log(strOut);
		}

	  	console.log("---------------------------------------------------------------------\n");

		// End the database connection
		connection.end();
	})
}

// validateInteger makes sure that the user is supplying only positive integers for their inputs
function validateInteger(value) {
	let integer = Number.isInteger(parseFloat(value));
	let sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Please enter a whole non-zero number.';
	}
}

// validateNumeric makes sure that the user is supplying only positive numbers for their inputs
function validateNumeric(value) {
	// Value must be a positive number
	let number = (typeof parseFloat(value)) === 'number';
	let positive = parseFloat(value) > 0;

	if (number && positive) {
		return true;
	} else {
		return 'Please enter a positive number for the unit price.'
	}
}

// addInventory will guilde a user in adding additional quantify to an existing item
function addInventory() {
	// console.log('___ENTER addInventory___');

	// Prompt the user to select an item
	inquirer.prompt([
		{
			type: 'input',
			name: 'ItemID',
			message: 'Please enter the Item ID for stock_count update.',
			validate: validateInteger,
			filter: Number
		},
		{
			type: 'input',
			name: 'ShoeQuantity',
			message: 'How many would you like to add?',
			validate: validateInteger,
			filter: Number
		}
	]).then(function(input) {
		 console.log('Manager has selected: \n    item_id = '  + input.item_id + '\n    additional quantity = ' + input.quantity);

		let item = input.ItemID;
		let addQuantity = input.ShoeQuantity;

		// Query db to confirm that the given item ID exists and to determine the current stock_count
		let queryStr = 'SELECT * FROM Products WHERE ?';

		connection.query(queryStr, {ItemID: item}, function(err, data) {
			if (err) throw err;

			// If the user has selected an invalid item ID, data attay will be empty
			// console.log('data = ' + JSON.stringify(data));

			if (data.length === 0) {
				console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
				addInventory();

			} else {
				var productData = data[0];

				// console.log('productData = ' + JSON.stringify(productData));
				// console.log('productData.stock_quantity = ' + productData.stock_quantity);

				console.log('Updating Inventory...');

				// Construct the updating query string
				var updateQueryStr = 'UPDATE Products SET ShoeQuantity = ' + (productData.ShoeQuantity + addQuantity) + ' WHERE ItemID = ' + item;
				// console.log('updateQueryStr = ' + updateQueryStr);

				// Update the inventory
				connection.query(updateQueryStr, function(err, data) {
					if (err) throw err;

					console.log('Stock count for ItemID ' + item + ' has been updated to ' + (productData.ShoeQuantity + addQuantity) + '.');
					console.log("\n---------------------------------------------------------------------\n");

					// End the database connection
					connection.end();
				})
			}
		})
	})
}

// createNewProduct will guide the user in adding a new product to the inventory
function createNewProduct() {
	// console.log('___ENTER createNewProduct___');

	// Prompt the user to enter information about the new product
	inquirer.prompt([
		{
			type: 'input',
			name: 'ItemID',
			message: 'Please enter a unique Item ID for your new product.',
		},
		{
			type: 'input',
			name: 'ProductName',
			message: 'Please enter the new product name.',
		},
		{
			type: 'input',
			name: 'BrandName',
			message: 'Which department does the new product belong to?',
		},
		{
			type: 'input',
			name: 'Price',
			message: 'What is the price per unit?',
			validate: validateNumeric
		},
		{
			type: 'input',
			name: 'ShoeQuantity',
			message: 'How many items are in stock?',
			validate: validateInteger
		}
	]).then(function(input) {
		// console.log('input: ' + JSON.stringify(input));

		console.log('Adding New Item: \n    ItemID = ' + input.ItemID + '\n' +
									   '	ProductName = ' + input.ProductName + '\n' +  
									   '    BrandName = ' + input.BrandName + '\n' +  
									   '    Price = ' + input.price + '\n' +  
									   '    ShoeQuantity = ' + input.ShoeQuantity);

		// Create the insertion query string
		let queryStr = 'INSERT INTO Products SET ?';

		// Add new product to the db
		connection.query(queryStr, input, function (error, results, fields) {
			if (error) throw error;

			console.log('New product has been added to the inventory under Item ID ' + results.ItemID + '.');
			console.log("\n---------------------------------------------------------------------\n");

			// End the database connection
			connection.end();
		});
	})
}

// runBamazon will execute the main application logic
function runSamazon() {
	// console.log('___ENTER runBamazon___');

	// Prompt manager for input
	promptManagerAction();
}

// Run the application logic
runSamazon();