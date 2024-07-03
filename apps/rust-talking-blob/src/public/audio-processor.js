class MyAudioProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        this.port.onmessage = (event) => {
            // Handle messages from the main thread here if necessary
            // For example, you can control the audio processor based on messages.
            // const data = event.data;
            // if (data.command === 'start') {
            //     // Start processing audio
            // } else if (data.command === 'stop') {
            //     // Stop processing audio
            // }
        };
    }

    process(inputs, outputs) {
        const input = inputs[0];
        const output = outputs[0];

        //console.log("process")
        // Assuming mono audio
        if (input.length > 0) {
            const inputData = input[0];
            const outputData = output[0];
            let index = 0;

            while (index < inputData.length) {
                outputData[index] = inputData[index];
                index++;
            }
            // Post the processed audio data back to the main thread
            // You can use the 'postMessage' method to send data to the main thread.
            // Send the processed audio data back to the main thread
            //this.port.postMessage(outputData.buffer, [outputData.buffer]);

        }
        return true; // Keep the processor alive
    }
}


registerProcessor('audio-processor', MyAudioProcessor);
// export default class MyAudioProcessor extends AudioWorkletProcessor {
//     process(inputs: Float32Array[][], outputs: Float32Array[][], _: Record<string, Float32Array>): boolean {
//         const input = inputs[0];
//         const output = outputs[0];

//         console.log("process")
//         // Assuming mono audio
//         if (input.length > 0) {
//             const inputData = input[0];
//             const outputData = output[0];
//             let index = 0;

//             while (index < inputData.length) {
//                 outputData[index] = inputData[index];
//                 index++;
//             }
//         }

//         return true; // Keep the processor alive
//     }
// }

// registerProcessor('audio-processor', MyAudioProcessor);
