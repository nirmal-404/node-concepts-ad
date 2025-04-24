

function BinaryDataOperations() {
    const buf = new ArrayBuffer(8);
    console.log("Array buffer size: ", buf.byteLength); // 8

    const dv = new DataView(buf);
    dv.setUint8(0, 3);
    dv.setUint16(1, 513);

    console.log("dv.getUint8(0): ", dv.getUint8(0)); // 3
    console.log("dv.getUint16(1): ", dv.getUint16(1)); // 513

    const uint8Array = new Uint8Array([0, 1, 2, 3, 4]);
    console.log("uint8Array: ", uint8Array); // Uint8Array(5) [0, 1, 2, 3, 4]

    const nodeBuffer = Buffer.from("Hello bun!");
    console.log("nodeBuffer: ", nodeBuffer); // <Buffer 48 65 6c 6c 6f 20 62 75 6e 21>
    console.log("nodeBuffer.toString(): ", nodeBuffer.toString()); // Hello bun!

    const blob = new Blob(["<html>Hello bun!</html>"], { type: "text/html" });
    console.log("blob.size, blob.type: ", blob.size, blob.type); // 22 text/html

    const encoder = new TextEncoder();
    const encodedValue = encoder.encode("Hello bun!"); 
    console.log("encodedValue: ", encodedValue); // Uint8Array(10) [ 72, 101, 108, 108, 111, 32, 98, 117, 110, 33 ]

    const decoder = new TextDecoder("utf-8");
    const decodedValue = decoder.decode(encodedValue);
    console.log("decodedValue: ", decodedValue); // Hello bun!


}

BinaryDataOperations();