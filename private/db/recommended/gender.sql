SELECT * FROM users WHERE id NOT IN (

SELECT friend_id FROM friends WHERE user_id = $1

) AND id != $1 AND lower(gender) = $2;