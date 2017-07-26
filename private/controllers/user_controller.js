module.exports = {
  patch: ( req, res, next ) => {
    console.log('PATCH HIT');
    const db = req.app.get('db');
    const id = req.params.id || null;
    if ( !id ) res.status(500).send('No ID attached to request parameters');

    console.log( id );
    db.users.find_user([ id ]).then( users => {
      if ( users.length > 0 ) {
        const { id, birthday, h_color, e_color, hobby, gender, first, last } = req.body;
        console.log( req.body );
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

  }
};