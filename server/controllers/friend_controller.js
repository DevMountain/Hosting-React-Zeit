function formatIDs( arr ) {
  let friends = [];

  for( var i = 0; i < arr.length; i++ ) {
    friends.push( arr[i].friend_id );
  }

  return friends;
}

module.exports = {
  list: ( req, res, next ) => {
    const db = req.app.get('db');
    const { id } = req.query;

    db.friends.find_friends([ id ]).then( ids => {
      const friends = formatIDs( ids );
      res.status(200).send( friends );
    }).catch( err => console.log(err) );
  },

  add: ( req, res, next ) => {
    const db = req.app.get('db');
    const { user_id, friend_id } = req.body;

    db.friends.add_friend([ user_id, friend_id ]).then( () => {
      db.friends.find_friends([ user_id ]).then( ids => {
        const friends = formatIDs( ids );
        res.status(200).send( friends );
      }).catch( err => console.log(err) );
    }).catch( err => console.log(err) );
  },

  remove: ( req, res, next ) => {
    const db = req.app.get('db');
    const { user_id, friend_id } = req.body;

    db.friends.remove_friend([ user_id, friend_id ]).then( () => {
      db.friends.find_friends([ user_id ]).then( ids => {
        const friends = formatIDs( ids );
        res.status(200).send( friends );
      }).catch( err => console.log(err) );
    }).catch( err => console.log(err) );
  }
};

