import type { Details } from "./scoresTypes.ts";
import type { Channel } from "lilybird";

export interface ScoreCache {
    page: number;
    data: Details;
    channel: Channel;
    authorId: string;
}
