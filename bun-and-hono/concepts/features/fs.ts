import { file, type BunFile } from 'bun'


async function fileSystemOperations() {
    const file : BunFile = Bun.file('read.txt')
    console.log(file.name) // read.txt
    console.log(file.size) // 0
    console.log("type", file.type) // text/plain
    

    const extracted = await file.text()
    console.log(extracted)

    const arrayBuffer = await file.arrayBuffer()
    const unit8Array = new Uint8Array(arrayBuffer)
    console.log(unit8Array)


    // Writing
    const content = "Hello, Bun!"
    await Bun.write('write.txt', content)
    console.log("File written successfully!")

    const inputFile = Bun.file('read.txt')
    await Bun.write('read_copy.txt', inputFile)
    console.log("File copied successfully!")

    const isFileExists = await Bun.file('read_copy.txt').exists()
    console.log("File exists:", isFileExists) // true

    await Bun.file('read_copy.txt').delete()
    console.log("File deleted successfully!")
}

fileSystemOperations();