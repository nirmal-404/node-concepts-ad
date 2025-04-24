function importMetaAndEnv(){
    console.log("import.meta.url:", import.meta.url);
    console.log("import.meta.main:", import.meta.main);
    console.log("import.meta.resolve:", import.meta.resolve('./meta-env.ts'));

    console.log(process.env.NODE_ENV);
    console.log(Bun.env.NODE_ENV);
}

importMetaAndEnv();