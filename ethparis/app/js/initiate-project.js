// Web3 setup


var jsonInterface, // load from projectFactory ABI ....
  web3,
  project,
  projectOptions,
  accounts,
  jsonInterface,
  coords;

window.addEventListener('load', async () => {
  if (window.ethereum) {
    window.web3 = new Web3(ethereum);
    try {
      await ethereum.enable();
      console.log("ETHEREUM ENABLED");
      // web3.eth.sendTransaction({ /* ... */ });
    } catch (error) {
      // throw error;
    }
  } else if (window.web3) {
    window.web3 = new Web3(web3.currentProvider);
    // web3.eth.sendTransaction({ /* ... */ });
  } else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
  }


  (async (web3) => {
    accounts = await web3.eth.getAccounts();

  })(web3);

  navigator.geolocation.getCurrentPosition(function (position) {
    lon = Math.floor(position.coords.longitude * 10**9);
    lat = Math.floor(position.coords.latitude * 10**9);
    coords = [lon, lat];
  });



  $.getJSON('..//build/contracts/LocationAware.json', (json) => {
    jsonInterface = json;

    locationAwareOptions = {
      abi: jsonInterface.abi,
      data: jsonInterface.bytecode,
      address: "0x42b8e0afff4461821a4c0f905e9b08f38c82a8a6"
    };


    locationAware = new web3.eth.Contract(locationAwareOptions.abi, locationAwareOptions.address, locationAwareOptions);

    console.log('YO')

    let latestBlockNum;

    web3.eth.getBlockNumber()
      .then((blockNum) => {
        latestBlockNum = blockNum;
      });

  });

});
