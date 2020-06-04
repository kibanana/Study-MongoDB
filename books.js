db.getCollection('books').createIndex({author: 1})
// db.getCollection('books').createIndex({bookId: 1, author: 1})

db.getCollection('books').updateMany({}, { $set: {introduce: "Hi! Hello"}})
db.getCollection('books').updateMany({author: "Choi Beom Gyun"}, { $set: {introduce: "Hello! I'm Choi Beom Gyun"}})
db.getCollection('books').createIndex({introduce: "text"})

db.getCollection('books').getIndexes()

// db.getCollection('books').dropIndex({author: 1})
// db.getCollection('books').dropIndex({bookId: 1, author: 1})

// db.getCollection('books').dropIndexes()

// db.getCollection('books').aggregate([{ $indexStats: {} }])


// save, insert, insertOne, insertMany
db.getCollection('books').save({author: "A"})
db.getCollection('books').insert([{author: "B"}, {author: "C"}])

db.getCollection('books').find()
// 모든 책 출력 시 _id 제외
db.getCollection('books').find({}, {"_id": false})

// 저자 이름이 Kim Jin Seong인 책
db.getCollection('books').find({author: "Kim Jin Seong"})

// 저자 이름이 Kim으로 시작하는 책
db.getCollection('books').find({author: { $regex: /Kim*/ }}) // Kim으로 시작하는 이름

// update, findAndModify, updateOne, updateMany, replaceOne(update시 $set을 안썼을 때의 상황과 유사), findOneandUpdate, findOneAndReplace
// db.monsters.findOneAndUpdate({ name: 'Demon' }, { $set: { att: 150 } }, { returnNewDocument: true }); // { 데몬 }

// 저자 이름이 Choi Beom Gyun인 책 가격 5000원 올리기
db.getCollection('books').updateMany({author: "Choi Beom Gyun"}, {$inc: {price: 5000}})

// 수정된 Document를 반환받고 싶다면 FindAndModify() 메서드 - query, update, new, multi
db.getCollection('books').findAndModify({query: {author: "Choi Beom Gyun"}, update: {$inc: {price: -3000}}, new: true})

db.getCollection('books').findAndModify({query: {author: "Choi Beom Gyun"}, update: {$inc: {price: -3000}} }, true, true)


// 모든 책의 사은품으로 책갈피 추가
db.getCollection('books').updateMany({}, {$set: {presents: ["bookmark"]}})

// 총, 균, 쇠의 사은품으로 쇠 책갈피 추가
db.getCollection('books').updateMany({author: "Jared Mason Diamond"}, {$set: {presents: ["iron bookmark"]}})


// 독자 AA, BB, CC가 모든 책에 리뷰를 달았다.
db.getCollection('books').updateMany({}, {$set: {review: [{user: 'AA', content: 'A'}, {user: 'BB', content: 'B'}, {user: 'CC', content: 'C'}]}})

// 제레미 다이아몬드의 책에 DD, FF가 리뷰를 달았다.
db.getCollection('books').updateMany({author: "Jared Mason Diamond"}, {$set: {review: [{user: 'DD', content: 'D'}, {user: 'FF', content: 'F'}]}})


// 최범균의 책에 GG가 리뷰를 달았다.
db.getCollection('books').update({author: "Choi Beom Gyun"}, { $push: {review: {"user": "GG", "content": "G"}} })

// 또! 최범균의 책에 ZZ, XX가 리뷰를 달았다. 오름차순으로 정렬해서!
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

// 최범균의 책에 대해 쓴 독자 ZZ의 리뷰가 삭제되었다.
db.getCollection('books').update(
{
    author: "Choi Beom Gyun"}, {
    $pull: {
        review: {"user": "ZZ", "content": "Z"}
    }
})

// 최범균의 책에 대해 쓴 리뷰 중 독자 AA, ZZ의 것이 있다면 삭제된다.
db.getCollection('books').update(
{}, {
    $pull: {
        review: { $in: [{"user": "AA", "content": "A"}, {"user": "ZZ", "content": "Z"}]}
    }
})


// 책코드 내림차순, 출간 내림차순으로 정렬해서 3개의 책을 출력한다.
db.getCollection('books').find({}).sort({bookId: -1, releasedAt: -1}).limit(3)

// 책코드 내림차순, 출간 내림차순으로 정렬해서 2개의 책을 건너뛰고 3개의 책을 출력한다.
db.getCollection('books').find({}).sort({bookId: -1, releasedAt: -1}).skip(2).limit(3)

// 책코드가 1(프로그래밍)인 책의 review를 모두 삭제한다.
db.getCollection('books').update({bookId: 1}, {$unset: {review: 1}})

// 모든 책의 review를 삭제한다. -> review 필드의 이름을 reviews로 변경한 후
db.getCollection('books').update({}, {$unset: {reviews: 1}})

// remove, deleteOne, deleteMany




// 요소 쿼리

// $exists
// review가 없는 책을 출력한다.
db.getCollection('books').find({review: {$exists: false}})

// $type
// review 필드의 타입이 array(배열)인 책을 출력한다.
db.getCollection('books').find({review: {$type: "array"}}) 

// $mod
// 가격이 1000(천) 단위인 책을 출력한다.
db.getCollection('books').find({price: {$mod: [1000, 0]}})

// $regex, $options
// 대소문자 관계없이 
// db.getCollection('books').find({author: {$regex: "/un/", $options: "i"} }) 
// regex은 풀 스캔이기 때문에 MongoDB 레벨에서는 잘 사용하지 않는다.
// $text -> text index가 설정되어야 한다. 꼭 정확한 문자가 아니더라도 유사한 문자도 찾아준다.

// $where
// 리뷰 개수가 3개인 책을 찾는다.
db.getCollection('books').find({$where: "this.review.length == 3"})

// 배열 쿼리
db.getCollection('books').find({review: { $all: [{user: "AA", content: "A"}, {user: "BB", content: "B"}] }}) // $all -> 쿼리 내의 모든 값이 배열에 있다 -> 값 비교
db.getCollection('books').find({review: { $elemMatch: {user: "DD"}}}, {_id: false, "review.user": false})// $elemMatch -> 쿼리 조건이 배열 요소와 일치한다 -> 조건 비교
db.getCollection('books').find({review: {$size: 2}}) // $size -> 배열을 length 값과 같다

// 투사 연산자
// $ -> index는 0부터 시작
db.getCollection('books').updateMany(
    {
        review: { user: "AA", content: "A" }
    }, {
        $set: {'review.$': { user: "AAA", content: "BBBB" }}
    }
)
// db.getCollection('books').find({review: {$elemMatch: {this.user.length gte 2 && this.content.length gte 1 }}})
// $elemMatch -> 일치하는 첫번째 객체만 가져온다
db.getCollection('books').find({}, {_id: false, review: {$slice: 1}}) // $slice

// 필드 수정 연산자
db.getCollection('books').update({}, {$inc: {price: 1000}})
db.getCollection('books').update({}, {$mul: {price: 0.5}})
db.getCollection('books').update({}, {$rename: {review: reviews, present: presents}})
// setOnInsert -> upsert의 경우에만 동작한다. upsert의 경우에만 동작한다.
db.getCollection('books').update({}, {$min: {price: 20000}}) // 필드의 값이 주어진 값보다 크면 새 값으로 교체 -> 작아진다
db.getCollection('books').update({}, {$min: {price: 10000}}) // 필드의 값이 주어진 값보다 작으면 새 값으로 교체 -> 커진다
// db.getCollection('books').update({}, {$set: {$currentDate: {curDate: true}}})

db.getCollection('books').updateMany({}, {$unset: {reviews: 1}})

// 배열 수정 연산자
db.getCollection('books').updateMany(
    {review: {user: "BB", content: "B"}},
    { $set: {"review.$": {user: "ABA", content: "AB"}}
}) // $ : update 메서드에서 query절에서 찾은 값의 위치를 기억한다.


// 모든 책에 Owner가 쓴 두 리뷰를 추가한다 (아직 없다면)
db.getCollection('books').updateMany({}, {
    $addToSet: {
        review: {
            $each: [
                {user: "Owner", content: "said"},
                {user: "Owner", content: "told"}
            ]
        }
    }
})  // $addToSet : 배열 필드에 해당 요소가 없으면 추가하고 있으면 아무것도 안한다.

// presents에 책갈피가 있는 책에서 요소 하나를 꺼낸다 -> 1은 pop -> 뒤에서 꺼낸다
db.getCollection('books').update({presents: "bookmark"}, {$pop: {presents: 1}}) // updateMany 변경 필요
// $pop : 맨 앞 또는 맨 뒤 요소를 꺼낸다. -1 -> shift, 1 -> pop

db.getCollection('books').update({}, {$pull: {author: "Kim Jin Seong"}})
// $pull : 배열에서 조건을 만족하는 특정한 요소를 꺼낸다.

db.getCollection('books').update({}, {$pullAll: {author: ["Jo Ho Muk", "Kang Ik Sun"]}})
// $pullAll : 조건으로 넘긴 배열에서 일치하는 값을 배열에서 꺼낸다.

db.getCollection('books').update({}, {$push: {presents: { $each: ["mug cup", "tumbler", "wireless mouse"] }}})
// $push : 배열에 요소를 push한다

// addToSet은 있으면 안넣고, push는 있어도 넣는다(-> 중복될 가능성 있음)

// $each -> push, addToSet과 같이 사용하는 경우가 있다 -> 인자로 배열을 전달한다


// 1) 미리 일부 데이터의 presents를 삭제한다
db.getCollection('books').update({author: "Choi Beom Gyun"}, {$unset: {presents: 1}})
// 2)
db.getCollection('books').updateMany({}, {
    $push: {
        presents: { 
            $each: ["mug cup", "tumbler", "wireless mouse", "Pen", "Pensil Set"], $slice: 3, $sort: {"author": 1}
        }
    }
})

// $slice : 배열을 push할 때 개수를 제한할 수 있으며, 반드시 $each와 함게 사용되어야 한다. {$each, $slice}
// $sort : 반드시 $push, $each와 함께 사용되어야 한다. {$each, $sort}

db.getCollection('books').updateMany({programmingLan: "Python"}, 
    {$push: { presents: {$each: ["bag", "postcard"], $position: 1} }
})
// $position : 반드시 $push, $each와 함께 사용되어야 한다. 배열이 삽입되는 위치를 지정한다

db.getCollection('books').find({"programmingLan": {$exists: true}})
// 프로그래밍 서적을 출력한다(현재 컬렉션에선 bookId: 1로 해도 되긴 한다)