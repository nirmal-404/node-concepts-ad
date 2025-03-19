const db = require("../db/db");

// -> inner join returns only the rows where thers is a match in both tables

async function getUsersWithPosts() {
  const getUsersWithPostsQuery = `
    SELECT users.id, users.username, posts.title
    FROM users
    INNER JOIN posts ON users.id = posts.user_id
    `;

  try {
    const res = await db.query(getUsersWithPostsQuery);
    return res.rows;
  } catch (e) {
    console.error(e);
  }
}

async function getAllUsersAndTheirPosts() {
  const getAllUsersAndTheirPostsQuery = `
    SELECT users.id, users.username, posts.title
    FROM users
    LEFT JOIN posts ON users.id = posts.user_id
    `;
  try {
    const res = await db.query(getAllUsersAndTheirPostsQuery);
    return res.rows;
  } catch (e) {
    console.error(e);
  }
}

module.exports = { getUsersWithPosts, getAllUsersAndTheirPosts };

// INNER JOIN -> only mathing rows

// LEFT JOIN -> all rows from the left table, and the matching rows from the right table.
// A Left JOIN B => all from A

// RIGHT JOIN -> all rows from the right table, and the matching rows from the left table.
// A RIGHT JOIN B => all from B