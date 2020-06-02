db.getCollection('books').createIndex({author: 1})
// db.getCollection('books').createIndex({bookId: 1, author: 1})

db.getCollection('books').getIndexes()

// db.getCollection('books').dropIndex({author: 1})
// db.getCollection('books').dropIndex({bookId: 1, author: 1})

// db.getCollection('books').dropIndexes()

// db.getCollection('books').aggregate([{ $indexStats: {} }])

// save, insert, insertOne, insertMany
db.getCollection('books').save({author: "A"})
db.getCollection('books').insert([{author: "B"}, {author: "C"}])

db.getCollection('books').find()
db.getCollection('books').find({}, {"_id": false})

db.getCollection('books').find({author: "Kim Jin Seong"})

db.getCollection('books').find({author: { $regex: /Kim*/ }}) // Kim으로 시작하는 이름

// update, findAndModify, updateOne, updateMany, replaceOne(update시 $set을 안썼을 때의 상황과 유사), findOneandUpdate, findOneAndReplace
// db.monsters.findOneAndUpdate({ name: 'Demon' }, { $set: { att: 150 } }, { returnNewDocument: true }); // { 데몬 }

db.getCollection('books').updateMany({author: "Choi Beom Gyun"}, {$inc: {price: 5000}}) // 저자인 최범균이 유명해져서 책값에 로열티가 붙는다

// 수정된 Document를 반환받고 싶다면 FindAndModify() 메서드
db.getCollection('books').findAndModify({query: {author: "Choi Beom Gyun"}, update: {$inc: {price: -3000}}, new: true})

db.getCollection('books').findAndModify({query: {author: "Choi Beom Gyun"}, update: {$inc: {price: -3000}} }, true, true)



db.getCollection('books').updateMany({}, {$set: {presents: ["bookmark"]}})

db.getCollection('books').updateMany({author: "Jared Mason Diamond"}, {$set: {presents: ["iron bookmark"]}})


db.getCollection('books').updateMany({}, {$set: {review: [{user: 'AA', content: 'A'}, {user: 'BB', content: 'B'}, {user: 'CC', content: 'C'}]}})

db.getCollection('books').updateMany({author: "Jared Mason Diamond"}, {$set: {review: [{user: 'DD', content: 'D'}, {user: 'FF', content: 'F'}]}})


db.getCollection('books').update({author: "Choi Beom Gyun"}, { $push: {review: {"user": "GG", "content": "G"}} })

db.getCollection('books').update({author: "Choi Beom Gyun"}, { $push: {review: { $each: [{"user": "ZZ", "content": "Z"}, {"user": "XX", "content": "X"}], $sort: 1} }})


db.getCollection('books').update({
    author: "Choi Beom Gyun"}, {
    $push: {
        review: { 
            $each: [
                {"user": "ZZ", "content": "Z"},
                {"user": "XX", "content": "X"}
            ],
            $sort: 1
        }
    }
})

db.getCollection('books').update(
{author: "Choi Beom Gyun"}, {
    $pull: {
        review: {"user": "ZZ", "content": "Z"}
    }
})

db.getCollection('books').update(
{}, {
    $pull: {
        review: { $in: [{"user": "AA", "content": "A"}, {"user": "ZZ", "content": "Z"}]}
    }
})



db.getCollection('books').find({}).sort({bookId: -1, releasedAt: -1}).limit(3)

db.getCollection('books').find({}).sort({bookId: -1, releasedAt: -1}).skip(2).limit(3)

db.getCollection('books').update({bookId: 1}, {$unset: {review: 1}})


// remove, deleteOne, deleteMany




// 요소 쿼리
db.getCollection('books').find({review: {$exists: false}}) // $exists
db.getCollection('books').find({review: {$type: "array"}}) // $type
db.getCollection('books').find({price: {$mod: [1000, 0]}}) // $mod -> 가격이 1000(천) 단위인 책
db.getCollection('books').find({$regex: "/un/", $options: "i"}) // $regex, $options
// $text -> text index가 설정되어야 한다. 꼭 정확한 문자가 아니더라도 유사한 문자도 찾아준다.
db.getCollection('books').find({$where: "this.review.length == 3"})// $where

// 배열 쿼리
db.getCollection('books').find({review: { $all: [{user: "AA", content: "A"}, {user: "BB", content: "B"}] }}) // $all -> 쿼리 내의 모든 값이 배열에 있다 -> 값 비교
db.getCollection('books').find({review: {$elemMatch: {user: "DD"}}}, {_id: false, "review.user": false})// $elemMatch -> 쿼리 조건이 배열 요소와 일치한다 -> 조건 비교
db.getCollection('books').find({review: {$size: 2}}) // $size -> 배열을 length가 값과 같다

// 투사 연산자
db.getCollection('books').find({review.$: 2} // $ -> index는 0부터 시작
// db.getCollection('books').find({review: {$elemMatch: {this.user.length gte 2 && this.content.length gte 1 }}})
// $elemMatch -> 일치하는 첫번째 객체만 가져온다
db.getCollection('books').find({}, {_id: false, review: {$slice: 1}}) // $slice

// 필드 수정 연산자
db.getCollection('books').update({}, {$inc: {price: 1000}})
db.getCollection('books').update({}, {$mul: {price: 0.5}})
db.getCollection('books').update({}, {$rename: {review: reviews, present: presents}})
// setOnInsert -> upsert의 경우에만 동작한다. upsert의 경우에만 동작한다.
db.getCollection('books').update({}, {$min: {price: 20000}}) // 필드의 값이 주어진 값보다 크면 새 값으로 교체 -> 작아진다
db.getCollection('books').update({}, {$min: {price: 10000}) // 필드의 값이 주어진 값보다 작으면 새 값으로 교체 -> 커진다
// db.getCollection('books').update({}, {$set: {$currentDate: {curDate: true}}})

// 배열 수정 연산자
db.getCollection('books').update({reviews: {user: "AA", content: "A"}}, {"review.$": {user: "ABA", content: "AB"}}) // $ : update 메서드에서 query절에서 찾은 값의 위치를 기억한다.
// $addToSet : 배열 필드에 해당 요소가 없으면 추가하고 있으면 아무것도 안한다.
// $pop : 맨 앞 또는 맨 뒤 요소를 꺼낸다. -1 -> shift, 1 -> pop
// $pull : 배열에서 조건을 만족하는 특정한 요소를 꺼낸다.

// $pulAll : 조건으로 넘긴 배열에서 일치하는 값을 배열에서 꺼낸다.
db.getCollection('books').update({}, {$pullAll: {review: [{user: "AA", content: "A"}]}})

// $push : 배열에 요소를 push한다
// $each -> push, addToSet과 같이 사용하는 경우가 있다 -> 인자로 배열을 전달한다
// $slice : 배열을 push할 때 개수를 제한할 수 있으며, 반드시 $each와 함게 사용되어야 한다. {$each, $slice}
// $sort : 반드시 $push, $each와 함께 사용되어야 한다. {$each, $sort}
// $position : 반드시 $push, $each와 함께 사용되어야 한다. 배열이 삽입되는 위치를 지정한다
// $position : 반드시 $push, $each와 함께 사용되어야 한다.