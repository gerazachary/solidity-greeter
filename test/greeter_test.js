const GreeterContract = artifacts.require("Greeter");

contract("Greeter", (accounts) => {
    it("Has been deployed", async () => {
        const greeter = await GreeterContract.deployed();
        assert(greeter, "Contract was not deployed");
    });

    describe("greet()", () => {
        it("Returns 'Hello, World!'", async () => {
            const greeter = await GreeterContract.deployed();
            const expected = "Hello, World!";
            const actual = await greeter.greet();
    
            assert.equal(actual, expected, "Not greeted with 'Hello, World!'");
        });
    });

    describe("owner()", () => {
        it("Returns the owner's address", async () => {
            const greeter = await GreeterContract.deployed();
            const owner = await greeter.owner();

            assert(owner, "It's not the curren owner");
        });

        it("Matches the address that deployed the contract", async () => {
            const greeter = await GreeterContract.deployed();
            const owner = greeter.owner();
            const expected = accounts[0];

            assert.equal(owner, expected, "Matches address used to deploy contract");
        });
    });
});

contract("Greeter: update greeting", () => {
    describe("setGreeting(string)", () => {
        it("Sets greeting based on parameter", async () => {
            const greeter = await GreeterContract.deployed();
            const expected = "Hi there!";

            await greeter.setGreeting(expected);
            const actual = await greeter.greet();

            assert.equal(actual, expected, "Greeting was not updated correctly");
        });
    });
});