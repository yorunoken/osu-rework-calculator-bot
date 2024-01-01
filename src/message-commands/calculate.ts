/* eslint-disable no-constant-condition */
/* eslint-disable no-await-in-loop */
import { Embed } from "@lilybird/jsx";
import type { Details } from "../types/scoresTypes.ts";
import type { MessageCommand } from "@lilybird/handlers";
import type { Channel, Message } from "lilybird";

// Represents the queue of user IDs waiting for processing.
const queue: Array<string> = [];

async function processScores(userId: string, channel: Channel): Promise<void> {
    // Reads the beatmap file
    const scores = JSON.parse(await Bun.file(`./performanceCalculator/osu-tools/PerformanceCalculator/${userId}.txt`).text()) as Details;

    const difference = (scores.LocalPp - scores.LivePp).toFixed(2);
    const embed = Embed({
        title: `${scores.Username}'s Scores`,
        description: `**Live pp:** \`${scores.LivePp.toFixed(2)}\`
        **Live Local pp:** ${scores.LocalPp.toFixed(2)} (${+difference > 0 ? `+${difference}` : difference})
        **Playcount pp:** ${scores.PlaycountPp.toFixed(2)}`
    });

    await channel.send({ embeds: [embed] });
}

// Processes the user queue and initiates the processing of each user.
async function processQueue(channel: Channel, message: Message): Promise<void> {
    const [userId] = queue;

    // Notifies that the user with ID is being processed.
    await channel.send(`<@${message.author.id}> proccessing user with ID: ${userId}`);

    // Uses Bun's Spawn API to initiate score calculation
    const clientId = process.env.OSU_CLIENT_ID;
    const clientSecret = process.env.OSU_CLIENT_SECRET;
    const subprocess = Bun.spawn(["dotnet", "run", "--", "profile", userId, clientId, clientSecret, "-o", `${userId}.txt`, "-j"], {
        cwd: "./performanceCalculator/osu-tools/PerformanceCalculator", // Set the working directory
        stdout: "pipe" // Pipes the stdout so it can be read from
    });

    const reader = subprocess.stdout.getReader();
    while (true) {
        const { done } = await reader.read();
        if (done) {
            console.log("DONE!");
            await processScores(userId, channel);
            break;
        }
    }

    // Shift the processed user from the queue.
    queue.shift();

    // If there are more users in the queue, continue processing.
    if (queue.length > 0)
        await processQueue(channel, message);
}

// Runs the command, adding a user to the queue and initiating the processing if necessary.
async function run(message: Message): Promise<void> {
    if (!message.content) return;
    const channel = await message.fetchChannel();
    const [, userId] = message.content.split(" ");

    // Checks if the user is already in the queue.
    if (queue.includes(userId)) {
        await channel.send(`The player with ID ${userId} is already in line. (#${queue.findIndex((x) => x === userId)})`);
        return;
    }

    // Add the user to the queue.
    queue.push(userId);

    // If it's the first user in the queue, start processing.
    if (queue.length === 1)
        await processQueue(channel, message);
    else
        await channel.send(`The player with ID ${userId} is already in line. (#${queue.findIndex((x) => x === userId)})`);
}

export default {
    name: "calculate",
    run
} satisfies MessageCommand;
