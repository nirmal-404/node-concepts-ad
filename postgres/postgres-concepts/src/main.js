const { createUsersTable, insertUser, fetchAllUsers, updateUserInfo, deleteInfo } = require("./concepts/basic-queries");
const { getUsersWhere, getSortedUsers, getPaginatedUsers } = require("./concepts/filtering-sorting");

//test basic queries
async function testBasicQueries() {
    try {
        await createUsersTable();

        await insertUser("Abc Def", "abc@gmail.com")
        await insertUser("Ghi Jkl", "ghi@gmail.com")
        await insertUser("Mno Pqr", "mno@gmail.com")
        await insertUser("Stu Vwx", "stu@gmail.com")
        await insertUser("Yza Bcd", "yza@gmail.com")

        console.log("All users");
        const allUsers = await fetchAllUsers();
        console.log(allUsers);

        const updatedUser = await updateUserInfo(
            "Abc Def",
            "updated@gmail.com"
        );
        console.log(updatedUser);

        const deletedUser = await deleteInfo("Yza Bcd");
        console.log(deletedUser);
    } catch (error) {
        console.error("Error", error);

    }
}

// test filter and sort queries
async function testFilterAndSortQueries() {
    try {
        //get users with a username whose username starting with z
        const zFilteredUsers = await getUsersWhere("username LIKE ''");
        console.log(zFilteredUsers);

        const sortedUsers = await getSortedUsers("created_at", "DESC");
        console.log(sortedUsers);

        const paginatedUsers = await getPaginatedUsers(1, 0);
        console.log("paginatedUsers", paginatedUsers);
    } catch (e) {
        console.error("Error", error);
    }
}

async function testAllQueries() {
    await testBasicQueries();
    await testFilterAndSortQueries();
}

testAllQueries();
 