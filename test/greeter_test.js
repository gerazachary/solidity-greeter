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

            assert(owner, "It's not the current owner");
        });

        it("Matches the address that deployed the contract", async () => {
            const greeter = await GreeterContract.deployed();
            const owner = await greeter.owner();
            const expected = accounts[0];

            assert.equal(owner, expected, "Greeter setter account does not match with original");
        });
    });
});

contract("Greeter: update greeting", (accounts) => {
    describe("setGreeting(string)", () => {
        describe("When message is set by the owner", () => {
            it("Sets greeting based on parameter", async () => {
                const greeter = await GreeterContract.deployed();
                const expected = "Hey, I can modify the message!";
    
                await greeter.setGreeting(expected);
                const actual = await greeter.greet();
    
                assert.equal(actual, expected, "Greeting was not updated correctly");
            });
        });

        describe("When message is set by another account", () => {
            it("Does not set the greeting", async () => {
                const assertionErrorMessage = "Greeting shold not be updated by other account than the original";
                const greeter = await GreeterContract.deployed();

                try {
                    await greeter.setGreeting("Mmm... I shouldn't be enabled to set this...", {
                        from: accounts[1]
                    });
                } catch(err) {
                    const errMessage = "Ownable: function caller is not the owner";

                    assert.equal(err.reason, errMessage, assertionErrorMessage);
                    return;
                }

                assert(false, assertionErrorMessage);
            });
        });
    });
});