# To Do
# Overall Goal
- personal finance tracking
- user authentication and accounts
- tracking and categorizing expenses, income, investments, and savings

# Configurations

## Connections (DONE)
- make the connection.js 
- needs to import sequalize and dotenv packages
- configure Sequalize to connect to postgres using the environment variables

# Controllers

## API
- Index.js that is used as a router to get the rest of the other route files

### Users
- User sign up
    - POST route for creating a new user
- User authentication
    - POST route for logging in
    - middleware for verifying a user session
    - DELETE route for logging out
### Transactions
- POST route for new transactions
- PUT route for updating transaction details
- DELETE route for deleting a transaction
- GET routes for seeing all transactions, and filtering by date, category, etc
### Income
- POST route for adding new income
- PUT route for updating income details
- DELETE route for deleting an income
- GET route for seeing all income entries

### Reports
- GET routes with specific parameters to filter and retireve the desired information (eg. monthly spending, spending by category, etc.)

# Database (DONE)
- set up database with PostgreSQL and Sequalize ORM

## Schema (DONE)
- schema that creates the cashCompass_db

# Seeds

## Transactions (DONE)
- create a transactions.json seed that we can use for testing.
    - We can make up transactions or we can make a seed with a typical whole month's worth of expenses 
    - transactions seed needs the following
        - Transaction ID
        - Date
        - Vendor
        - Category
        - Description
        - Amount

## Categories (DONE)
- create a categories.json seed that has all of the basic categories for a budget with the following
    - category ID
    - Category Name
## Users (DONE)
- Create a users.json seed that we can use for testing with fake names. they need the following:
 - User ID (primary Key)
    - First Name
    - Last Name
    - Email
    - Password
    - Income

## Models (DONE)
- Make the tables for the budget
    - Need tables for the following:
        - Users (DONE)
            - User ID (primary Key)
            - First Name
            - Last Name
            - Email
            - Password (hashed)
            - Income
        - Transactions (DONE)
            - Transaction ID (primary key)
            - User ID (foreign key)
            - Date
            - Cost
            - Category (foreign key )
            - Vendor ID (foreign key)
        - Categories (DONE)
            - Category ID (primary key)
            - Category Name
        - Vendors (DONE)
            - Vendor ID (primary key)
            - Vendor Name
        - Budget (income)(DONE)
            - Budget ID (primary Key)
            - User ID (foreign key)
            - Amount
            - Date
        - Sessions (DONE)
            - User ID (foreign key)
            - Login timestamp
            - Logout timestamp
            - Session ID (Primary key)

# Public
- Everything that is handled on the front end

## CSS
- Styles for the entire application
    - Bootstrap or Tailwind CSS

## JS
- client side JS

# Utilities

## Helpers
- custom helper for timestamp for transactions
- custom helper for formatting money in a way that we can use it for all backend stuff
- custom helper for formatting the money on the backed to make it look the way that we want on the front end


## Authentication (DONE)
- need to set up login.js and logout.js
    - Sign up
        - needs to include a form to handle all of inputs needed for the users model
        - upon signup, all of that information needs to be written to the users model
        - password needs to be hashed before storing to database (bcrypt)
    - login.js
        - create from boilerplate template
        - verify user credencials and establish a session
    - logout.js
        - create from boilerplate template
        - end user session and clear cookies
- Sessions
    - import and set up sessions with cookies to track when people are logged in
    - use timestamp helper
    - every time someone logs into their account, it starts a session, and when they log out it ends the session
        - keep a log of all user sessions 
        
# Views

## Layouts
- main.hbs - main layout file for all pages

## Other Views
- Home: home page for logged out users
- Dashboard: dashboard for logged in users to show financial summary
- Login: login page
- SignUp: sign up page
- Transactions: page for viewing and managing all transactions
- Income: page for viewing and managing income entries
- Reports: page for generating and viewing reports
- Profile: user profile page for updating their information


