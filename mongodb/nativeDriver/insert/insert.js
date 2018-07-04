import connect from '../connect';


export default function insert(collectionName, data = []) {
  connect((db, callback) => {
    const collection = db.collection(collectionName);

    collection.insertMany(data, (err, result) => {
      if (err) console.log(`Insert error:${err}`);
      else {
        callback(result);
      }
    });
  });
}

