
const { MongoClient,ObjectId} = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "users";

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log("Can not connect to database!");
  }

  const Userid1 = new ObjectId();
  const Userid2 = new ObjectId();
  const Post_id1 = new ObjectId();
  const Post_id2 = new ObjectId();
  const Post_id3 = new ObjectId();
  const Comment_id1 = new ObjectId();
  const Comment_id2 = new ObjectId();
  const Comment_id3 = new ObjectId();
  const db = client.db(databaseName);



  db.collection("users").insertMany(
    [
      {
        _id: Userid1,
        email: "nizar@gmail.com",
        comments: [
          { $ref: "comments", $id: Comment_id1 },
          { $ref: "comments", $id: Comment_id2 },
          { $ref: "comments", $id: Comment_id3 },
        ],
        posts: [{ $ref: "posts", $id: Post_id3 }],
      },
      {
        _id: Userid2,
        email: "adan@gmail.com",
        comments: [{ $ref: "comments", $id: Comment_id3 }],
        posts: [
          { $ref: "posts", $id: Post_id1 },
          { $ref: "posts", $id: Post_id2 },
        ],
      },
    ],
    (error, result) => {
      if (error) {
        return console.log("Can not insert post");
      }

      console.log(result.ops);
    }
  );

  db.collection("posts").insertMany(
    [
      {
        _id: Post_id1,
        name: "nizar",
        content: "what are you doing.",
        user: { $ref: "users", $id: Userid2 },
        comments: [
          { $ref: "comments", $id: Comment_id1 },
          { $ref: "comments", $id: Comment_id3 },
        ],
      },
      {
        _id: Post_id2,
        name: "adan",
        content: "beautifull picture.",
        user: { $ref: "users", $id: Userid2 },
        comments: [{ $ref: "comments", $id: Comment_id3 }],
      },
      {
        _id: Post_id3,
        name: "gurel",
        content: "thanks !!!!.",
        user: { $ref: "users", $id: Userid1 },
        comments: [{ $ref: "comments", $id: Comment_id2 }],
      },
    ],
    (error, result) => {
      if (error) {
        return console.log("Can not insert post");
      }

      console.log(result.ops);
    }
  );

  db.collection("comments").insertMany([
    {
      _id: Comment_id1,
      name: "nizar",
      email:"nizar@gamil.com",
      coments:"beautiful picture"
    },
    {
      _id: Comment_id2,
      name: "adan",
      email:"adan@gamil.com",
      coments:"thanks for the comment"
    },
    {
      _id: Comment_id3,
      name: "gurel",
      email:"gurel@gamil.com",
      coments:"thanks for the comment"
    },
  ]);
});