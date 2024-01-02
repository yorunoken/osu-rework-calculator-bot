/* eslint-disable @typescript-eslint/consistent-type-imports */
import { sleep } from "bun";
import { exists } from "fs/promises";

// Deletes specified folders
async function checkDir(name: string): Promise<void> {
    if (await exists(`./performanceCalculator/${name}`)) {
        console.log(`Removing old ${name} directory...\n`);
        await exec(`rm -rf ${name}`, "./performanceCalculator", false);
    }
}

// This is the main asynchronous function responsible for setting up the environment for the osu! bot.
async function main(): Promise<void> {
    // Destructuring command line arguments to specify the owner and branch for cloning the repositories.
    const [owner = "Xexxar", branch = "aimRewriteTap"] = process.argv.slice(2);

    // Deleting osu-related folders. Caution: This operation could be dangerous..
    await Promise.all(["osu", "osu-tools"].map(async (dir) => checkDir(dir)));

    await exec("git clone https://github.com/ppy/osu-tools", "./performanceCalculator", true);
    await exec(`git clone https://github.com/${owner}/osu`, "./performanceCalculator", true);

    console.log("\nSetting branch...");
    await exec(`git checkout ${branch}`, "./performanceCalculator/osu", true);

    console.log("Initializing osu-tools...");
    await exec("bash UseLocalOsu.sh", "./performanceCalculator/osu-tools", false);

    console.log("\nSetup complete! You can now run the bot using `bun start`.");

    await sleep(1000);
}

// This function executes a command in a specified directory and logs the output.
async function exec(option: string, targetDir: string, log: boolean): Promise<void> {
    // Spawning a child process to execute the specified command.
    const cloneProcess = Bun.spawn(option.split(" "), {
        cwd: targetDir,
        stdout: "pipe"
    });

    // Reading the stdout stream of the child process.
    const reader = cloneProcess.stdout.getReader();

    // Handling and logging the data from the stdout stream.
    await onData({ reader, log });
}

// This function recursively reads and logs the data from a stream.
async function onData({ reader, log }: { reader: import("stream/web").ReadableStreamDefaultReader<Uint8Array>, log: boolean }): Promise<void> {
    // Reading data from the stream.
    const { done, value } = await reader.read();

    if (!done) {
        // Logging the data if required.
        if (log)
            console.log(new TextDecoder().decode(value));

        // Recursively calling the function to read the next chunk of data.
        await onData({ reader, log });
    }
}

main().then().catch((err) => { console.error(err); });
