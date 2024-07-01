// Specify the broker's hostname and port directly
const hostname = "broker.hivemq.com"; // Example broker hostname
const port = 8884; // Example WebSocket port

// Create a client instance with a unique clientId
const clientId = "clientId_" + Math.random().toString(36).substring(2, 15);
const client = new Paho.MQTT.Client(hostname, port, clientId);

// Set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

window.mqttClient = client

function onConnect() {
  console.log("onConnect");
  window.wasmModule.connectComplete();
}

function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost: " + responseObject.errorMessage);
    window.wasmModule.connectionLost(responseObject.errorMessage)
  }
}

function onMessageArrived(message) {
  console.log("onMessageArrived: " + message.payloadString);
  window.wasmModule.messageArrived(message.destinationName, message.payloadString)
}