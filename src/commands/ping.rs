use serenity::{
    all::{CommandInteraction, EditInteractionResponse, Error},
    async_trait,
    builder::{CreateCommand, CreateInteractionResponse, CreateInteractionResponseMessage},
    prelude::*,
};
use std::fmt::Write;

use crate::command_trait::Command;

pub struct Ping;

#[async_trait]
impl Command for Ping {
    fn name(&self) -> &'static str {
        "ping"
    }

    async fn run(&self, ctx: &Context, command: &CommandInteraction) -> Result<(), Error> {
        let time_start = std::time::Instant::now();

        let mut content = String::from("Pong!");

        let builder = CreateInteractionResponse::Message(
            CreateInteractionResponseMessage::new().content(&content),
        );
        command.create_response(&ctx.http, builder).await?;

        let _ = write!(content, " ({}ms)", time_start.elapsed().as_millis());

        let builder = EditInteractionResponse::new().content(content);
        command.edit_response(&ctx.http, builder).await?;
        Ok(())
    }

    fn register(&self) -> CreateCommand {
        CreateCommand::new(self.name()).description("A ping command")
    }
}
