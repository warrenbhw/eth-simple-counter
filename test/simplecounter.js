const SimpleCounter = artifacts.require("./SimpleCounter.sol");

contract("SimpleCounter", accounts => {
  it("...should increment the counter by 1.", async () => {
    const simpleCounterInstance = await SimpleCounter.deployed();

    // Get the current value of the counter.
    const priorCount = await simpleCounterInstance.getCount();

    // Increment the count by 1.
    await simpleCounterInstance.increment({ from: accounts[0] });

    // Get the updated value of the counter.
    const posteriorCount = await simpleCounterInstance.getCount();

    
    // Assert that we have incremented the counter by 1.
    assert.equal(posteriorCount.toNumber(), priorCount.toNumber()+1, "The count was not incremented.");
  });
});
