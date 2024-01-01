/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { cacheMap } from "../cache.ts";
import { prepareDiscordMessage } from "../message-commands/calculate.ts";
import type { Event } from "@lilybird/handlers";

export default {
    event: "interactionCreate",
    run: async (interaction: any) => {
        const { message } = interaction;
        if (!message) return;

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        const data = cacheMap.get(message.id);
        if (!data) return;

        if (data.authorId !== interaction.member.user.id) return;

        if (interaction.data?.id === "next")
            data.page++;
        else data.page--;

        const embed = prepareDiscordMessage(data);
        if (embed === false) return;

        await interaction.updateComponents(embed);
    }
} satisfies Event<"interactionCreate">;
