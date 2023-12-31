import { ApplicationCommand } from "@lilybird/jsx";
import type { SlashCommand } from "@lilybird/handlers";

export default {
    post: "GLOBAL",
    data: ApplicationCommand({ name: "ping", description: "Pong!" }),
    run: async (interaction) => {
        await interaction.deferReply();

        const { ws, rest } = await interaction.client.ping();

        await interaction.editReply({
            content: `🏓 WebSocket: \`${ws}ms\` | Rest: \`${rest}ms\``
        });
    }
} satisfies SlashCommand;
