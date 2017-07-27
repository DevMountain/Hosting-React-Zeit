function calcAvailablePages( count ) {
  let temp = count > 25 ? Math.ceil( count / 25 ) : 1;
  let availablePages = [];

  for( var i = 0; i < temp; i++ ) {
    availablePages.push( i.toString() );
  }

  return availablePages;
}

module.exports = {
  patch: ( req, res, next ) => {
    const db = req.app.get('db');
    const id = req.params.id || null;
    if ( !id ) res.status(500).send('No ID attached to request parameters');

    db.users.find_user([ id ]).then( users => {
      if ( users.length > 0 ) {
        const { id, birthday, h_color, e_color, hobby, gender, first, last } = req.body;
        db.users.patch_user([
          id,
          birthday || null,
          h_color || null,
          e_color || null,
          hobby || null,
          gender || null,
          first || null,
          last || null
        ]).then( user => {
          req.session.user = user[0];
          res.status(200).send(user[0]) 
        }).catch( err => console.log(err) );
      } else {
        res.status(500).send(`No user found with id of: ${id}`);
      }
    }).catch( err => console.log(err) );
  },

  list: ( req, res, next ) => {
    const db = req.app.get('db');
    const offset = req.query.page * 25;
    const { id } = req.query;

    db.users.count_users([ id ]).then( result => {
      const count = result[0].count;
      let availablePages = calcAvailablePages( count );

      db.users.find_users([ id, offset ]).then( users => res.status(200).send({ users, count, availablePages }) )
        .catch( err => console.log(err) );
    }).catch( err => console.log(err) );
  },

  search: ( req, res, next ) => {
    const db = req.app.get('db');
    const { filter, name } = req.query;

    switch( filter ) {
      case 'first':
        db.users.search_user_first([ name.toLowerCase() ]).then( users => {
          let availablePages = calcAvailablePages( users.length );
          res.status(200).send({ users, count: users.length, availablePages });
        }).catch( err => console.log(err) );

        break;
      case 'last':
        db.users.search_user_last([ name.toLowerCase() ]).then( users => {
          let availablePages = calcAvailablePages( users.length );
          res.status(200).send({ users, count: users.length, availablePages });
        }).catch( err => console.log( err ) );

        break;
    }
  }
};