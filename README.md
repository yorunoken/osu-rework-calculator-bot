## How to build the bot

To start building, you either need to be on a UNIX operating system (Linux, MacOS, etc.) or you need to use [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) (Windows Subsystem for Linux) to instal [Bun](https://bun.sh/)

1. Install Bun using curl
   - `curl -fsSL https://bun.sh/install | bash`

2. Install npm.

3. Clone the repository.
   - `git clone https://github.com/yorunoken/rework-calculator-bot`

4. Navigate inside the directory and install the dev, and normal dependencies.
   - `cd rework-calculator-bot && npm install -D`

5. Follow [this tutorial](#downloading-and-installing-the-calculator) to install the calculator

6. Fill out `.env.example` with your API keys [(see below to see how)](#getting-api-keys) and delete the `.example` off of it.

7. You can use `bun start` to start the bot and test your code.

## Getting the API keys

You need to fill `.env` with the approriate API keys to make the bot work. Here's how:

1. DISCORD_BOT_TOKEN (your bot's token):

   - Go to [Discord's developer portal](https://discord.com/developers/applications) and create a new application.

   - Navigate to the `Bot` tab, seen on the left.

   - Reset its token and get the new one.

   - You should also enable all 3 of the privilaged intents for the bot to function.

3. OSU_CLIENT_SECRET and OSU_CLIENT_ID (osu! Auth):

   - Go to [osu! account settings](https://osu.ppy.sh/home/account/edit) and scroll until you see `OAuth` section.

   - Create a new OAuth application, give it a name (you can leave Callback URL part blank) and register it.

   - Edit your newly made application.

   - Copy its Client ID and Client secret and you're good to go.

## Downloading and installing the calculator

First of all, you must have dotnet SDK version 6.0. you can download it [here](https://dotnet.microsoft.com/download/dotnet/6.0).

Run `bun setup`. It needs two arguments: `owner`, `branch`. Here's an example for `Xexxar`'s `aimRewriteTap` branch:
    
```bun run setup Xexxar aimRewriteTap```

if no arguments are provided, it defaults to Xexxar/aimRewriteTap.

If anything goes wrong, you can do it manually by following [this tutorial](https://cdn.discordapp.com/attachments/1116047971583262850/1191379178147295292/How_to_set_up_rework_calculator_and_also_simulate_scores2.txt) or simply giving me a shout at @yorunoken on Discord.