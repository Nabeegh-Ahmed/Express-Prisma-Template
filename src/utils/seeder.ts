import fetch from "node-fetch"

const createUser = async () => {
    const response = await fetch("http://localhost:5000/api/user/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            firstName: "TestF", 
            lastName: "TestL", 
            email: "test@example.com", 
            password: "test1122334455"
        }),
    });
    const json = await response.json();
    console.log(json);
}

const createCourse = async () => {
    const response = await fetch("http://localhost:5000/api/course/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: "Test Course", 
            description: "Test description for a course.", 
            genre: "Tech", 
            price: 44, 
            startingDate: new Date(), 
            endingDate: new Date(), 
            cover: ""
        }),
    });
    const json = await response.json();
    console.log(json);
}

const main = async() => {
    const seed = await Promise.all([createUser(), createCourse()]);
    console.log("Seeding complete");
}

main().then().catch(err => console.log(err));