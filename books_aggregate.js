// match, group, limit, sort, project, count 주로 쓴다

// SELECT * FROM books WHERE author="Choi Beom Gyun" ORDER BY price DESC;
db.getCollection('books').aggregate([
    { $match: { author: "Choi Beom Gyun" } },
    { $sort: { price: -1 } }
])
    
// SELECT author, bookName, price FROM books WHERE author="Choi Beom Gyun" ORDER BY price DESC;
db.getCollection('books').aggregate([
    { $match: { author: "Choi Beom Gyun" } },
    { $project: { author: 1, bookName: 1, price: 1 } },
    { $sort: { price: -1 } }
])
    
// SELECT author, bookName, price FROM books ORDER BY price DESC LIMIT 2;
db.getCollection('books').aggregate([
    { $project: { author: 1, bookName: 1, price: 1 } },
    { $sort: { price: -1 } },
    { $limit: 2 }
])

// SELECT *, AVG(price) AS priceAvg 
// FROM books
// WHERE bookId = 1
// GROUP BY author, bookName, introduce,price, reviews, presents;
db.getCollection('books').aggregate([
    { $match: { bookId: 1 } },
    {
        $group: {
            _id: { bookId: "$bookId" },
            'priceAvg': { "$avg": "$price" }
        }
    }
])


// $unwind
db.getCollection('books').aggregate([
    { $unwind: "$review" }
])
    
db.getCollection('books').aggregate([
    { $unwind: { path: "$review", includeArrayIndex: "reviewArrayIndex" } }
])
    
db.getCollection('books').aggregate([
    { $unwind: { path: "$review", includeArrayIndex: "reviewArrayIndex", preserveNullAndEmptyArrays: true } }
])
    
db.getCollection('books').aggregate([
    { $unwind: "$presents" }
])


// SELECT author, bookName, releasedAt, review, presents from books WHERE review = ?;
db.getCollection('books').aggregate([
    { $match: {"review.user": "CC"} },
    { $unwind: {path: "$presents", includeArrayIndex: "presentArrayIndex"} },
    {
        $project: {
            _id: 1,
            author: 1,
            bookName: 1,
            releasedAt: 1,
            review: 1,
            presents: 1
        }
    }
])
    
db.getCollection('books').aggregate([
        { $match: { bookId: 1 } },
        {
            $project: { author: 1, bookName: 1, price: 1, discountedPrice: { $multiply: ["$price", 0.9] } } // 프로그래밍 책 10% 할인
        }
])