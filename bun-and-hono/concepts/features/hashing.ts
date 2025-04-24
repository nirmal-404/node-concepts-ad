
async function hashingOperations() {
    const password = "123456"

    const hash = await Bun.password.hash(password);
    console.log("Hash:", hash);

    const isMatching = await Bun.password.verify(password, hash);
    console.log("Is matching:", isMatching);

    const argonHashExample = await Bun.password.hash(password, {
        algorithm: "argon2id",
        memoryCost: 4,
        timeCost: 3,
    });
    console.log("Argon2 Hash Example:", argonHashExample);

    const bcryptHashExample = await Bun.password.hash(password, {
        algorithm: "bcrypt",
        cost: 10,
    });
    console.log("Bcrypt Hash Example:", bcryptHashExample);
}

hashingOperations()