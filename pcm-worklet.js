class PcmCapture extends AudioWorkletProcessor {
  constructor(){super();this.buffer=new Float32Array(2048);this.offset=0}
  process(inputs, outputs) {
    const input=inputs[0]&&inputs[0][0]; const output=outputs[0]&&outputs[0][0];
    if(input){
      if(output) output.set(input);
      for(let i=0;i<input.length;i++){
        this.buffer[this.offset++]=input[i];
        if(this.offset===this.buffer.length){this.port.postMessage(this.buffer);this.buffer=new Float32Array(2048);this.offset=0}
      }
    }
    return true;
  }
}
registerProcessor('pcm-capture',PcmCapture);
