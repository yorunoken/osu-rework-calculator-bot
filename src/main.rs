mod command_trait;
mod commands;
mod handler;
mod options;

use dotenvy::dotenv;
use serenity::prelude::*;
use std::env;

#[tokio::main]
async fn main() {
    // Load the .env file
    dotenv().ok();

    let discord_token = env::var("DISCORD_TOKEN").expect("`DISCORD_TOKEN` not defined in .env");
    let intents = GatewayIntents::GUILD_MESSAGES | GatewayIntents::MESSAGE_CONTENT;

    let commands = options::get_commands();

    let mut client = Client::builder(&discord_token, intents)
        .event_handler(handler::Handler { commands })
        .await
        .expect("Error creating client.");

    if let Err(why) = client.start().await {
        eprintln!("Client error: {:#?}", why);
    }
}
