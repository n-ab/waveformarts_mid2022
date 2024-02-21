class VolumeMeterProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        this.volume = 0;
    }
    process(inputs, outputs, parameters) {
        const input = inputs[0];
        let totalVolume = 0;
        let channelCount = input.length;
        for (let channel = 0; channel < channelCount; channel++) {
            const samples = input[channel];
            let sum = 0;
            for (let i = 0; i < samples.length; i++) {
                sum += Math.abs(samples[i]);
            }
            let averageVolume = sum / samples.length;
            totalVolume += averageVolume;
        }
        this.volume = totalVolume / channelCount;

        this.port.postMessage(this.volume);
        return true;
    }
}

registerProcessor('audio-processor', VolumeMeterProcessor);