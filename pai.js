import * as wasmModule from './composeApp.mjs';

const sum = wasmModule.addNumbers(10, 20);
console.log(`Sum: ${sum}`); // Should log: Sum: 30

// Example of using the greet function
const greeting = wasmModule.greet("World");
console.log(greeting); // Should log: Hello, World!

// Specify the broker's hostname and port directly
const hostname = "broker.hivemq.com"; // Example broker hostname
const port = 8884; // Example WebSocket port

// Create a client instance with a unique clientId
const clientId = "clientId_" + Math.random().toString(36).substring(2, 15);
const client = new Paho.MQTT.Client(hostname, port, clientId);

// Set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// Connect the client
client.connect({ onSuccess: onConnect });

// Called when the client connects
function onConnect() {
  console.log("onConnect");
  client.subscribe("World");
  const message = new Paho.MQTT.Message("Hello");
  message.destinationName = "World";
  client.send(message);
}

// Called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost: " + responseObject.errorMessage);
  }
}

// Called when a message arrives
function onMessageArrived(message) {
  console.log("onMessageArrived: " + message.payloadString);
}