DROP DATABASE IF EXISTS Samazon;
CREATE DATABASE Samazon;

USE samazon;

CREATE TABLE Products (
ItemID int AUTO_INCREMENT NOT NULL,
ProductName varchar(100) NOT NULL,
BrandName varchar(100) NOT NULL,
Price DECIMAL(10,2) NOT NULL,
ShoeQuantity int NOT NULL,

PRIMARY KEY (ItemId)
);
/*JORDAN BRAND SHOES

============================================================
 This inventory features 23 shoes from the Jordan Brand. 
 All pricing and some of the quantity has a math variation of 23, 45, 15 or 30.12.
 23 and 45 are Michael Jordans jersey number during his time in the NBA. 
 15 signifies his time in the NBA and 30.12 were his career points average. 
 ============================================================
 
 */
 
INSERT INTO Products (ItemID, ProductName, BrandName, Price, ShoeQuantity) VALUES (
00001,
'AJ Banned 1',
'Jordan Brand',
65.23,
100);

INSERT INTO Products (ItemID, ProductName, BrandName, Price, ShoeQuantity) VALUES (
00002,
'AJ 2',
'Jordan Brand',
105.23,
105);

INSERT INTO Products (ItemID, ProductName, BrandName, Price, ShoeQuantity) VALUES (
00003,
'AJ 3',
'Jordan Brand',
299.45,
100);

INSERT INTO Products (ItemID, ProductName, BrandName, Price, ShoeQuantity) VALUES (
00004,
'AJ 4 ',
'Jordan Brand',
199.23,
100);

INSERT INTO Products (ItemID, ProductName, BrandName, Price, ShoeQuantity) VALUES (
00005,
'AJ 5',
'Jordan Brand',
23.45,
100);

INSERT INTO Products (ItemID, ProductName, BrandName, Price, ShoeQuantity) VALUES (
00006,
'AJ 6',
'Jordan Brand',
45.45,
100);

INSERT INTO Products (ItemID, ProductName, BrandName, Price, ShoeQuantity) VALUES (
00007,
'AJ 7',
'Jordan Brand',
4523.23,
100);

INSERT INTO Products (ItemID, ProductName, BrandName, Price, ShoeQuantity) VALUES (
00008,
'AJ 8',
'Jordan Brand',
2345.68,
100);

INSERT INTO Products (ItemID, ProductName, BrandName, Price, ShoeQuantity) VALUES (
00009,
'AJ 9',
'Jordan Brand',
6823.45,
100);

INSERT INTO Products (ItemID, ProductName, BrandName, Price, ShoeQuantity) VALUES (
00010,
'AJ 10',
'Jordan Brand',
23.45,
100);

INSERT INTO Products (ItemID, ProductName, BrandName, Price, ShoeQuantity) VALUES (
00011,
'AJ 11',
'Jordan Brand',
4523.45,
100);

INSERT INTO Products (ItemID, ProductName, BrandName, Price, ShoeQuantity) VALUES (
00012,
'AJ 12',
'Jordan Brand',
4523.23,
4545);

INSERT INTO Products (ItemID, ProductName, BrandName, Price, ShoeQuantity) VALUES (
00013,
'AJ 13',
'Jordan Brand',
2300.00,
2345);

INSERT INTO Products (ItemID, ProductName, BrandName, Price, ShoeQuantity) VALUES (
00014,
'AJ 14',
'Jordan Brand',
4500.00,
45);

INSERT INTO Products (ItemID, ProductName, BrandName, Price, ShoeQuantity) VALUES (
00015,
'AJ 15',
'Jordan Brand',
30.12,
23);

INSERT INTO Products (ItemID, ProductName, BrandName, Price, ShoeQuantity) VALUES (
00016,
'AJ 16',
'Jordan Brand',
6.00,
6);

INSERT INTO Products (ItemID, ProductName, BrandName, Price, ShoeQuantity) VALUES (
00017,
'AJ 17',
'Jordan Brand',
299.99,
68);

INSERT INTO Products (ItemID, ProductName, BrandName, Price, ShoeQuantity) VALUES (
00018,
'AJ 18',
'Jordan Brand',
2330.12,
3012);

INSERT INTO Products (ItemID, ProductName, BrandName, Price, ShoeQuantity) VALUES (
00019,
'AJ 19',
'Jordan Brand',
4530.12,
2300);

INSERT INTO Products (ItemID, ProductName, BrandName, Price, ShoeQuantity) VALUES (
00020,
'AJ 20',
'Jordan Brand',
23.23,
15);

INSERT INTO Products (ItemID, ProductName, BrandName, Price, ShoeQuantity) VALUES (
00021,
'AJ 21',
'Jordan Brand',
24.35,
15);

INSERT INTO Products (ItemID, ProductName, BrandName, Price, ShoeQuantity) VALUES (
00022,
'AJ 22',
'Jordan Brand',
42.53,
9);

INSERT INTO Products (ItemID, ProductName, BrandName, Price, ShoeQuantity) VALUES (
00023,
'AJ 23',
'Jordan Brand',
230.45,
59);

/* NIKE BRAND SHOES
================================================

These shoes feature LeBron James shoes under the Nike Brand. 
Pricing and quantity is random.

================================================
*/
INSERT INTO Products (ItemID, ProductName, BrandName, Price, ShoeQuantity) VALUES (
00024,
'Lebron 1',
' Nike',
249.99,
100);

INSERT INTO Products (ItemID, ProductName, BrandName, Price, ShoeQuantity) VALUES (
00025,
'Lebron 2',
' Nike',
450.00,
75);

INSERT INTO Products (ItemID, ProductName, BrandName, Price, ShoeQuantity) VALUES (
00026,
'LeBron 3',
' Nike',
500.00,
90);

INSERT INTO Products (ItemID, ProductName, BrandName, Price, ShoeQuantity) VALUES (
00027,
'LeBron 4',
' Nike',
200.20,
20);

INSERT INTO Products (ItemID, ProductName, BrandName, Price, ShoeQuantity) VALUES (
00028,
'LeBron 5',
' Nike',
50.00,
100);

INSERT INTO Products (ItemID, ProductName, BrandName, Price, ShoeQuantity) VALUES (
00029,
'LeBron 6',
' Nike',
100.00,
60);

INSERT INTO Products (ItemID, ProductName, BrandName, Price, ShoeQuantity) VALUES (
00030,
'LeBron 7',
' Nike',
150.45,
15);

INSERT INTO Products (ItemID, ProductName, BrandName, Price, ShoeQuantity) VALUES (
00031,
'LeBron 8',
' Nike',
450.00,
20);

INSERT INTO Products (ItemID, ProductName, BrandName, Price, ShoeQuantity) VALUES (
00032,
'LeBron 9',
' Nike',
239.90,
23);

INSERT INTO Products (ItemID, ProductName, BrandName, Price, ShoeQuantity) VALUES (
00033,
'LeBron 10',
' Nike',
199.00,
3);


/*BIG BALLER BRAND
=================================================

This shoe is under the Big Baller Brand -- only two shoe products 

==================================================
*/

INSERT INTO Products (ItemID, ProductName, BrandName, Price, ShoeQuantity) VALUES (
00034,
'ZO 1',
' Big Baller Brand',
499.00,
75);

INSERT INTO Products (ItemID, ProductName, BrandName, Price, ShoeQuantity) VALUES (
00035,
'ZO 2',
' Big Baller Brand',
1.00,
100);

INSERT INTO Products (ItemID, ProductName, BrandName, Price, ShoeQuantity) VALUES (
00036,
'Melo 1',
' Big Baller Brand',
2.00,
200);

INSERT INTO Products (ItemID, ProductName, BrandName, Price, ShoeQuantity) VALUES (
00037,
'Gelo 1',
' Big Baller Brand',
3.00,
300);


/* BRANDS BY NAME
======================

1) Jordan Brand
2) Nike
3) Big Baller Brand     

======================      
*/


/* PRODUCTS TABLE FOR MANAGEMENT 
===========================================

This table provides data on stock and quantity for all brands.
This helps the manager look at totals sales and overhead cost

===========================================

*/

USE samazon;
CREATE TABLE Brands(
BrandID int AUTO_INCREMENT,
BrandName varchar(50) NOT NULL,
OverHeadCosts DECIMAL(11,2) NOT NULL,
TotalSales DECIMAL(11,2) NOT NULL,

PRIMARY KEY(BrandID)

);



INSERT INTO Brands (BrandName, OverHeadCosts, TotalSales) VALUES (
'Jordan Brand ',
23000,
0);

INSERT INTO Brands (BrandName, OverHeadCosts, TotalSales) VALUES (
'Nike ',
10000,
0);

INSERT INTO Brands (BrandName, OverHeadCosts, TotalSales) VALUES (
'Big Baller Brand ',
5000,
0);



-- This creates the alias table TotalProfits that will exist only when requested by the executive 
SHOW TABLES;
CREATE VIEW samazon.TotalProfits AS SELECT BrandID, BrandName, OverHeadCosts, TotalSales, TotalSales-OverHeadCosts AS TotalProfit FROM Brands;
