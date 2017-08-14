UPDATE users SET birthday = $2, h_color = $3, e_color = $4, hobby = $5, gender = $6, first = $7, last = $8
WHERE id = $1
RETURNING *;