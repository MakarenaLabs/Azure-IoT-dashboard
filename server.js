const { EventHubConsumerClient } = require("@azure/event-hubs");
const Client = require('azure-iothub').Client;
const Message = require('azure-iot-common').Message;

const express = require('express');
let app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const config = require("./config");

let eventHubClient;

app.use(express.json());
app.post('/offline_update', (req, res) => {
  io.emit('changeOptions', req.body);
  res.end()
});

io.on('connection', async function(socket){
  console.log('New socket client connected, id:', socket.id);

  eventHubClient = new EventHubConsumerClient(
    config.eventEndpoint,
    config.eventConnectionString
  );
  await eventHubClient.getEventHubProperties();
  // retrieve partitionIds from client.getEventHubProperties() or client.getPartitionIds()
  const partitionId = "0";
  await eventHubClient.getPartitionProperties(partitionId);

  const subscription = eventHubClient.subscribe(
    {
      processEvents: (events, context) => {
        // event processing code goes here
        console.log("Event HERE:", events, context);
        events.deviceId = config.deviceId;
        socket.emit("update", events);
      },
      processError: (err, context) => {
        // error reporting/handling code here
        console.log("Event ERROR:", err, context);
        socket.emit("error", err);
      }
    }
  );

  // Wait for a few seconds to receive events before closing
  /*setTimeout(async () => {
    await subscription.close();
    await client.close();
    console.log(`Exiting sample`);
  }, 3 * 1000);*/

  //await client.close();

  socket.on("changeOptions", async (data) => {
    console.log("Data received from", socket.id, JSON.stringify(data));

    const connectionString = config.cloudToDeviceConnectionString;
    const targetDevice = config.deviceId;

    let serviceClient = Client.fromConnectionString(connectionString);

    function printResultFor(op) {
      return function printResult(err, res) {
        if (err) console.log(op + ' error: ' + err.toString());
        if (res) console.log(op + ' status: ' + res.constructor.name);
      };
    }

    function receiveFeedback(err, receiver){
      receiver.on('message', function (msg) {
        console.log('Feedback message:')
        console.log(msg.getData().toString('utf-8'));
      });
    }

    serviceClient.open(function (err) {
      if (err) {
        console.error('Could not connect: ' + err.message);
      } else {
        console.log('Service client connected');
        serviceClient.getFeedbackReceiver(receiveFeedback);
        var message = new Message(JSON.stringify(data));
        message.ack = 'full';
        message.messageId = "My Message ID";
        console.log('Sending message: ' + message.getData());
        serviceClient.send(targetDevice, message, printResultFor('send'));
      }
    });
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
