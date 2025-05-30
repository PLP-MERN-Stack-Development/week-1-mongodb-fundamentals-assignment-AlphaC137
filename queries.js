const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';

const dbName = 'plp_bookstore';
const collectionName = 'books';

async function executeQueries() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB server');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    console.log('\n=== TASK 2: BASIC CRUD OPERATIONS ===\n');

    console.log('1. Books in Fiction genre:');
    const fictionBooks = await collection.find({ genre: "Fiction" }).toArray();
    console.log(fictionBooks);

    console.log('\n2. Books published after 2000:');
    const modernBooks = await collection.find({ published_year: { $gt: 2000 } }).toArray();
    console.log(modernBooks);

    console.log('\n3. Books by George Orwell:');
    const orwellBooks = await collection.find({ author: "George Orwell" }).toArray();
    console.log(orwellBooks);

    console.log('\n4. Updating price of "1984":');
    const updateResult = await collection.updateOne(
      { title: "1984" },
      { $set: { price: 13.99 } }
    );
    console.log(`Modified ${updateResult.modifiedCount} document(s)`);

    console.log('\n5. Attempting to delete "Test Book":');
    const deleteResult = await collection.deleteOne({ title: "Test Book" });
    console.log(`Deleted ${deleteResult.deletedCount} document(s)`);

    console.log('\n=== TASK 3: ADVANCED QUERIES ===\n');

    console.log('1. Books in stock AND published after 2010:');
    const inStockModern = await collection.find({
      $and: [
        { in_stock: true },
        { published_year: { $gt: 2010 } }
      ]
    }).toArray();
    console.log(inStockModern);

    console.log('\n2. Books with projection (title, author, price only):');
    const projectedBooks = await collection.find({}, {
      projection: { title: 1, author: 1, price: 1, _id: 0 }
    }).toArray();
    console.log(projectedBooks);

    console.log('\n3. Books sorted by price (ascending):');
    const sortedAsc = await collection.find({}).sort({ price: 1 }).toArray();
    console.log(sortedAsc.map(book => ({ title: book.title, price: book.price })));

    console.log('\n4. Books sorted by price (descending):');
    const sortedDesc = await collection.find({}).sort({ price: -1 }).toArray();
    console.log(sortedDesc.map(book => ({ title: book.title, price: book.price })));

    console.log('\n5. Pagination - Page 1 (5 books):');
    const page1 = await collection.find({}).limit(5).toArray();
    console.log(page1.map(book => book.title));

    console.log('\n6. Pagination - Page 2 (5 books):');
    const page2 = await collection.find({}).skip(5).limit(5).toArray();
    console.log(page2.map(book => book.title));

    console.log('\n=== TASK 4: AGGREGATION PIPELINE ===\n');

    console.log('1. Average price by genre:');
    const avgPriceByGenre = await collection.aggregate([
      {
        $group: {
          _id: "$genre",
          averagePrice: { $avg: "$price" },
          count: { $sum: 1 }
        }
      },
      { $sort: { averagePrice: -1 } }
    ]).toArray();
    console.log(avgPriceByGenre);

    console.log('\n2. Author with most books:');
    const authorWithMostBooks = await collection.aggregate([
      {
        $group: {
          _id: "$author",
          bookCount: { $sum: 1 },
          books: { $push: "$title" }
        }
      },
      { $sort: { bookCount: -1 } },
      { $limit: 1 }
    ]).toArray();
    console.log(authorWithMostBooks);

    console.log('\n3. Books grouped by publication decade:');
    const booksByDecade = await collection.aggregate([
      {
        $addFields: {
          decade: {
            $multiply: [
              { $floor: { $divide: ["$published_year", 10] } },
              10
            ]
          }
        }
      },
      {
        $group: {
          _id: "$decade",
          count: { $sum: 1 },
          books: { $push: { title: "$title", year: "$published_year" } }
        }
      },
      { $sort: { _id: 1 } }
    ]).toArray();
    console.log(booksByDecade);

    console.log('\n=== TASK 5: INDEXING ===\n');

    console.log('1. Creating index on title field:');
    const titleIndex = await collection.createIndex({ title: 1 });
    console.log(`Created index: ${titleIndex}`);

    console.log('\n2. Creating compound index on author and published_year:');
    const compoundIndex = await collection.createIndex({ 
      author: 1, 
      published_year: -1 
    });
    console.log(`Created compound index: ${compoundIndex}`);

    console.log('\n3. Query execution plan with index:');
    const explainResult = await collection.find({ title: "1984" }).explain("executionStats");
    console.log('Execution stats for title query:');
    console.log(`- Documents examined: ${explainResult.executionStats.totalDocsExamined}`);
    console.log(`- Documents returned: ${explainResult.executionStats.totalDocsReturned}`);
    console.log(`- Execution time: ${explainResult.executionStats.executionTimeMillis}ms`);
    console.log(`- Index used: ${explainResult.executionStats.executionStages.indexName || 'No index'}`);

    console.log('\n4. Compound index usage:');
    const compoundExplain = await collection.find({ 
      author: "George Orwell", 
      published_year: { $gte: 1940 } 
    }).explain("executionStats");
    console.log('Execution stats for compound query:');
    console.log(`- Documents examined: ${compoundExplain.executionStats.totalDocsExamined}`);
    console.log(`- Documents returned: ${compoundExplain.executionStats.totalDocsReturned}`);
    console.log(`- Execution time: ${compoundExplain.executionStats.executionTimeMillis}ms`);

    console.log('\n5. All indexes in the collection:');
    const indexes = await collection.listIndexes().toArray();
    console.log(indexes);

    console.log('\n=== ADDITIONAL QUERY EXAMPLES ===\n');

    console.log('Additional Query Examples:');
    
    const longBooks = await collection.find({ pages: { $gt: 300 } }).toArray();
    console.log(`\nBooks with more than 300 pages: ${longBooks.length}`);
    
    const classicBooks = await collection.find({
      published_year: { $gte: 1800, $lte: 1950 }
    }).toArray();
    console.log(`\nClassic books (1800-1950): ${classicBooks.length}`);
    
    const searchResult = await collection.find({
      title: { $regex: "the", $options: "i" }
    }).toArray();
    console.log(`\nBooks with "the" in title: ${searchResult.length}`);

  } catch (err) {
    console.error('Error occurred:', err);
  } finally {
    await client.close();
    console.log('\nConnection closed');
  }
}

module.exports = { executeQueries };

if (require.main === module) {
  executeQueries().catch(console.error);
}
