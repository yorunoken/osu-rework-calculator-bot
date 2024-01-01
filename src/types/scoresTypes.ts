interface Scores {
    BeatmapId: number;
    BeatmapName: string;
    Combo: number;
    Accuracy: number;
    MissCount: number;
    Mods: Array<string>;
    LivePp: number;
    LocalPp: number;
    PositionChange: number;
}

export interface Details {
    Username: string;
    LivePp: number;
    LocalPp: number;
    PlaycountPp: number;
    Scores: Array<Scores>;
}
