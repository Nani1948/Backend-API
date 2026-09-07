ShoppyGlobe E-Commerce Backend API
1.Project Overview:
The ShoppyGloble API is a RESTful backend application developed using Node.js and Express.js and MongoDB. It provides APIs for managing products and shopping cart items.The API supports CRUD operations for products and cart items and can be using Thunderstorm.
It also implements JWT-based authentication and authorization to protect cart operations

Main Features:
1.User registration
2.User login
3.JWT authentication
4.Get all products
5.Get product by ID
6.Add product to cart
7.Update cart quantity
8.Delete cart item
9.MongoDB CRUD operations
10.Input validation
11.Error handling
12.Thunder Client API testing

Technologies Used:
Node.js
Express.js
MongoDB
Mongoose
JWT (JSON Web Token)
bcrypt
dotenv
Thunder Client
Git and GitHub

Project Structure:
ShoppyGlobe/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   ├── productController.js
│   └── cartController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
│
├── models/
│   ├── User.js
│   ├── Product.js
│   └── Cart.js
│
├── routes/
│   ├── authRoutes.js
│   ├── productRoutes.js
│   └── cartRoutes.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md

Installation:
Clone the repository:
git clone https://github.com/Nani1948/Backend-API.git
Navigate to the project:
cd ShoppyGlobe
Install the required dependencies:
npm install


Running the Application:
Start the server:npm start Or node server.js
The API runs at:http://localhost:5000

Author:Nandhini