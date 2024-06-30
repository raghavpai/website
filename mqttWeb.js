import * as wasmModule from './composeApp.mjs';

// Specify the broker's hostname and port directly
const hostname = "broker.hivemq.com"; // Example broker hostname
const port = 8884; // Example WebSocket port

// Create a client instance with a unique clientId
const clientId = "clientId_" + Math.random().toString(36).substring(2, 15);
const client = new Paho.MQTT.Client(hostname, port, clientId);

// Set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

function connectMQTT() {
    client.connect({ onSuccess: onConnect });
}

function disconnectMQTT() {
    client.disconnect()
}

function publishMQTT(topic, message) {
    const payload = new Paho.MQTT.Message(topic);
    message.destinationName = message;
    client.send(payload);
}

function subscribeMQTT(topic) {
    client.subscribe(topic);
}

function unsubscribeMQTT(topic) {
    client.unsubscribe(topic);
}

function onConnect() {
  console.log("onConnect");
  wasmModule.connectComplete();
}

function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost: " + responseObject.errorMessage);
    wasmModule.connectionLost(responseObject.errorMessage)
  }
}

function onMessageArrived(message) {
  console.log("onMessageArrived: " + message.payloadString);
  wasmModule.messageArrived(message.destinationName, message.payloadString)
}