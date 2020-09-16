// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

const Protocol = require('azure-iot-device-mqtt').Mqtt;
// Uncomment one of these transports and then change it in fromConnectionString to test other transports
// const Protocol = require('azure-iot-device-amqp').AmqpWs;
// const Protocol = require('azure-iot-device-http').Http;
// const Protocol = require('azure-iot-device-amqp').Amqp;
// const Protocol = require('azure-iot-device-mqtt').MqttWs;
const Client = require('azure-iot-device').Client;
const Message = require('azure-iot-device').Message;

// String containing Hostname, Device Id & Device Key in the following formats:
//  "HostName=<iothub_host_name>;DeviceId=<device_id>;SharedAccessKey=<device_key>"
const deviceConnectionString = "HostName=Z7010.azure-devices.net;DeviceId=Z7010-board1;SharedAccessKey=tSZ5eYqdBjSGMnhcPQsJqJaPxyuQ1TCJYvAPveN3iVg=";//process.env.DEVICE_CONNECTION_STRING;
let sendInterval;

function disconnectHandler () {
  clearInterval(sendInterval);
  client.removeAllListeners();
  client.open().catch((err) => {
    console.error(err.message);
  });
}

// The AMQP and HTTP transports have the notion of completing, rejecting or abandoning the message.
// For example, this is only functional in AMQP and HTTP:
// client.complete(msg, printResultFor('completed'));
// If using MQTT calls to complete, reject, or abandon are no-ops.
// When completing a message, the service that sent the C2D message is notified that the message has been processed.
// When rejecting a message, the service that sent the C2D message is notified that the message won't be processed by the device. the method to use is client.reject(msg, callback).
// When abandoning the message, IoT Hub will immediately try to resend it. The method to use is client.abandon(msg, callback).
// MQTT is simpler: it accepts the message by default, and doesn't support rejecting or abandoning a message.
function messageHandler (msg) {
  console.log('Id: ' + msg.messageId + ' Body: ' + msg.data);
  client.complete(msg, printResultFor('completed'));
}

function generateMessage () {
  // const windSpeed = 10 + (Math.random() * 4); // range: [10, 14]
  const temperature = 30 + (Math.random()); // range: [20, 100]
  const temperature2 = 30 + (Math.random()); // range: [20, 100]
  const humidity = 40 + (Math.random()); // range: [0, 100]
  const pressure = 1 + (Math.random() * 0.2); // range: [0, 100]
  const acceleration = 0 + (Math.random() * 5); // range: [0, 5]
  const acceleration2 = 0 + (Math.random() * 8); // range: [0, 8]
  const Gaxis = 0 + (Math.random() * 13); // range: [0, 13]
  const magnetometer = 0 + (Math.random() * 55); // range: [0, 55]

  const data = JSON.stringify({ 
    deviceId: 'Z7010-board1',
    hum: humidity,
    temp1: temperature,
    pressure: pressure,
    temp2: temperature2,
    accel1: acceleration,
    Gaxis: Gaxis,
    accel2: acceleration2,
    magneto: magnetometer
  });
  const message = new Message(data);
  // message.properties.add('temperatureAlert', (temperature > 28) ? 'true' : 'false');
  return message;
}

function errorCallback (err) {
  console.error(err.message);
}

function connectCallback () {
  console.log('Client connected');
  // Create a message and send it to the IoT Hub every two seconds
  sendInterval = setInterval(() => {
    const message = generateMessage();
    console.log('Sending message: ' + message.getData());
    client.sendEvent(message, printResultFor('send'));
  }, 8000);

}

// fromConnectionString must specify a transport constructor, coming from any transport package.
let client = Client.fromConnectionString(deviceConnectionString, Protocol);

client.on('connect', connectCallback);
client.on('error', errorCallback);
client.on('disconnect', disconnectHandler);
client.on('message', messageHandler);

client.open()
.catch(err => {
  console.error('Could not connect: ' + err.message);
});

// Helper function to print results in the console
function printResultFor(op) {
  return function printResult(err, res) {
    if (err) console.log(op + ' error: ' + err.toString());
    if (res) console.log(op + ' status: ' + res.constructor.name);
  };
}
