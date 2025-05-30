[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19658147&assignment_repo_type=AssignmentRepo)
# MongoDB Fundamentals Assignment - Week 1

This assignment demonstrates MongoDB fundamentals including database setup, CRUD operations, advanced queries, aggregation pipelines, and indexing for the PLP Bookstore database.

## 📂 Project Structure

```
├── insert_books.js
├── queries.js
├── README.md
└── Week1-Assignment.md
```

## 🚀 Prerequisites

1. **MongoDB Installation**: Either install MongoDB Community Edition locally OR set up a free MongoDB Atlas cluster
2. **Node.js**: Make sure Node.js is installed on your system
3. **MongoDB Driver**: The project uses the official MongoDB Node.js driver

## 📋 Setup Instructions

### Option 1: Local MongoDB Installation

1. **Install MongoDB Community Edition**
   - Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
   - Follow the installation guide for your operating system
   - Start the MongoDB service

2. **Verify MongoDB is running**
   ```bash
   mongosh
   ```

### Option 2: MongoDB Atlas (Cloud)

1. **Create a free account** at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. **Create a new cluster** (free tier available)
3. **Get your connection string** and update the `uri` variable in both `insert_books.js` and `queries.js`
4. **Replace** `'mongodb://localhost:27017'` with your Atlas connection string

## 🔧 Installation and Setup

1. **Clone the repository**

2. **Install dependencies**
   ```bash
   npm install mongodb
   ```

3. **Configure connection** (if using Atlas)
   - Update the `uri` variable in both files with your connection string
   - Ensure your IP is whitelisted in Atlas

## 🏃‍♂️ Running the Scripts

### Step 1: Populate the Database

Run the insert script to create the database and add sample book data:

```bash
node insert_books.js
```

**Expected Output:**
```
Connected to MongoDB server
12 books were successfully inserted into the database

Inserted books:
1. "To Kill a Mockingbird" by Harper Lee (1960)
2. "1984" by George Orwell (1949)
...
Connection closed
```

### Step 2: Execute All Queries

Run the queries script to demonstrate all MongoDB operations:

```bash
node queries.js
```

**The script will execute:**
- Basic CRUD operations
- Advanced queries with filtering and sorting
- Aggregation pipelines
- Index creation and performance analysis

## 📊 What the Scripts Demonstrate

### **insert_books.js**
- Connects to MongoDB
- Creates `plp_bookstore` database
- Inserts 12 sample books into `books` collection
- Each book contains: title, author, genre, published_year, price, in_stock, pages, publisher

### **queries.js**
- **Task 2 - Basic CRUD Operations:**
  - Find books by genre
  - Find books published after a specific year
  - Find books by author
  - Update book prices
  - Delete books by title

- **Task 3 - Advanced Queries:**
  - Complex filtering with `$and` operator
  - Projection to return specific fields
  - Sorting (ascending/descending)
  - Pagination with `limit()` and `skip()`

- **Task 4 - Aggregation Pipelines:**
  - Calculate average price by genre
  - Find author with most books
  - Group books by publication decade

- **Task 5 - Indexing:**
  - Create single field index on title
  - Create compound index on author and published_year
  - Use `explain()` to analyze query performance

## 🗂️ Database Schema

Each book document has the following structure:

```javascript
{
  title: "Book Title",           // String
  author: "Author Name",         // String
  genre: "Genre",               // String
  published_year: 1984,         // Number
  price: 12.99,                 // Number
  in_stock: true,               // Boolean
  pages: 328,                   // Number
  publisher: "Publisher Name"    // String
}
```

## 🧪 Testing Your Setup

1. **Verify MongoDB connection**
   ```bash
   mongosh
   use plp_bookstore
   db.books.countDocuments()
   ```
   Should return: `12`

2. **Check specific queries**
   ```bash
   db.books.find({ author: "George Orwell" })
   db.books.find({ genre: "Fiction" })
   ```

## 🔍 Troubleshooting

### Common Issues:

1. **Connection Error**
   - Ensure MongoDB is running (local) or Atlas cluster is active
   - Check connection string format
   - Verify network access for Atlas

2. **Module Not Found**
   ```bash
   npm install mongodb
   ```

3. **Authentication Error (Atlas)**
   - Check username/password in connection string
   - Ensure IP is whitelisted

4. **Database Not Found**
   - Run `insert_books.js` first to create the database

## 📈 Assignment Completion Checklist

- [x] MongoDB setup (local or Atlas)
- [x] Database `plp_bookstore` created
- [x] Collection `books` with 12+ documents
- [x] Basic CRUD operations implemented
- [x] Advanced queries with filtering, projection, sorting
- [x] Pagination implemented
- [x] Aggregation pipelines for data analysis
- [x] Indexes created with performance analysis
- [x] All queries saved in `queries.js`

## 🎯 Learning Outcomes

After completing this assignment, you will understand:
- MongoDB database and collection structure
- CRUD operations with the MongoDB driver
- Query operators (`$gt`, `$and`, `$regex`, etc.)
- Projection and sorting techniques
- Aggregation framework for data analysis
- Index creation and performance optimization
- Query performance analysis with `explain()`

## 📝 Additional Notes

- The scripts are designed to be idempotent (safe to run multiple times)
- All queries include error handling and proper connection management
- The code follows MongoDB best practices and is well-documented
- Both scripts can be run independently after initial setup

## Files Included

- `Week1-Assignment.md`: Detailed assignment instructions
- `insert_books.js`: Script to populate your MongoDB database with sample book data

## Requirements

- Node.js (v18 or higher)
- MongoDB (local installation or Atlas account)
- MongoDB Shell (mongosh) or MongoDB Compass

## Submission

Your work will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Complete all tasks in the assignment
2. Add your `queries.js` file with all required MongoDB queries
3. Include a screenshot of your MongoDB database
4. Update the README.md with your specific setup instructions

## Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [MongoDB University](https://university.mongodb.com/)
- [MongoDB Node.js Driver](https://mongodb.github.io/node-mongodb-native/) 
