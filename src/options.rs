use crate::command_trait::Command;
use crate::commands::Ping;

pub fn get_commands() -> Vec<Box<dyn Command + Send + Sync>> {
    vec![Box::new(Ping)]
}
