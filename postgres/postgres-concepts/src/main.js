const { createUsersTable, insertUser, fetchAllUsers, updateUserInfo, deleteInfo } = require("./concepts/basic-queries");


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

async function testAllQueries() {
    await testBasicQueries();
}

testAllQueries();
