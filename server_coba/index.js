const mqtt = require('mqtt');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const option = {
    username: 'burjoy',
    password: "Tester123456"
}
const client = mqtt.connect('wss://fd463dae44d44830b87a2ab8ad7e97f1.s1.eu.hivemq.cloud:8884/mqtt', option);

function publishMessage(pesan){
  client.publish('cluster/messages/node7', pesan, (err) => {
    if(err){
      console.log(`Ada error di: ${err}`);
    }
    else{
      console.log('Berhasil kirim pesan');
    }
  })
}

app.post('/test_publish', async(req, res) => {
  publishMessage("TESTING 1");
  res.send("Success");
})

client.on('connect', () => {
    publishMessage("Test");
})
  
client.subscribe('cluster/messages/node7', (err, response) => {
    if (err) {
      console.error('Error subscribing to topic:', err);
    } else {
      console.log('Subscribed to topic successfully');
    //   console.log(response);
    }
});

client.on('message', (topic, message) => {
    console.log(`Received message on topic ${topic}: ${message}`);
});

app.listen(3000, function () {
  console.log("app running on this");
});

// client.on("connect", () => {
//     client.subscribe("presence", (err) => {
//       if (!err) {
//         client.publish("presence", "Hello mqtt");
//       }
//     });
//   });
  
// client.on("message", (topic, message) => {
//     // message is Buffer
//     console.log(message.toString());
//     client.end();
//   });