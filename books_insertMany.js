use test

db.createCollection("books")

// bookId 1: Programming
// bookId 2: Novel

db.books.insertMany([/* 1 */
{
    "_id" : ObjectId("5ed5e5876bb0cd6000a0af2c"),
    "author" : "Jared Mason Diamond",
    "bookName" : "Guns, Germs, and Steel",
    "releasedAt" : 1974.0,
    "price" : 25000.0,
    "bookId" : 9.0
},

/* 2 */
{
    "_id" : ObjectId("5ed5e5876bb0cd6000a0af2d"),
    "bookId" : 1.0,
    "author" : "Choi Beom Gyun",
    "bookName" : "Spring5 Programming Start",
    "programmingLan" : "Java",
    "releasedAt" : 2010.0,
    "price" : 23850.0
},

/* 3 */
{
    "_id" : ObjectId("5ed5e5876bb0cd6000a0af2e"),
    "author" : "Kim Jin Seong",
    "bookName" : "R Programming for Big Data Analysis",
    "programmingLan" : "R",
    "releasedAt" : 2015.0,
    "price" : 25200.0,
    "bookId" : 1.0
},

/* 4 */
{
    "_id" : ObjectId("5ed5e5876bb0cd6000a0af2f"),
    "author" : "Jo Ho Muk",
    "bookName" : "C# 7.0 Programming Practical Project",
    "programmingLan" : "C#",
    "releasedAt" : 2007.0,
    "price" : 21600.0,
    "bookId" : 1.0
},

/* 5 */
{
    "_id" : ObjectId("5ed5e5876bb0cd6000a0af30"),
    "author" : "Choi Beom Gyun",
    "bookName" : "JSP 2.3 Programming : from basic to intermediate level",
    "programmingLan" : "Java",
    "releasedAt" : 2003.0,
    "price" : 24300.0,
    "bookId" : 1.0
},

/* 6 */
{
    "_id" : ObjectId("5ed5e5876bb0cd6000a0af31"),
    "author" : "Choi Beom Gyun",
    "bookName" : "OpenCV Programming learning by python",
    "programmingLan" : "Python",
    "releasedAt" : 2009.0,
    "price" : 23400.0,
    "bookId" : 1.0
},

/* 7 */
{
    "_id" : ObjectId("5ed5e5876bb0cd6000a0af32"),
    "author" : "Choi Beom Gyun",
    "bookName" : "Starting TDD",
    "programmingLan" : "Java",
    "releasedAt" : 2017.0,
    "price" : 18000.0,
    "bookId" : 1.0
},

/* 8 */
{
    "_id" : ObjectId("5ed5e5876bb0cd6000a0af33"),
    "author" : "Kang Ik Sun",
    "bookName" : "Network Hacking Programming",
    "programmingLan" : "C lang",
    "releasedAt" : 2005.0,
    "price" : 25000.0,
    "bookId" : 1.0
}])



