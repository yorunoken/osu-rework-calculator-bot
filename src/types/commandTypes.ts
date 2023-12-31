import type { SlashCommand } from "@lilybird/handlers";

export interface InteractionCommands {
    run: (options: Record<string, any>) => Promise<void>;
    data: SlashCommand;
}
