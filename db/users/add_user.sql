INSERT INTO users ( id, picture ) VALUES ( $1, $2 )
RETURNING *;