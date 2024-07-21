import { SlashCommandBuilder } from "discord.js"
import { SlashCommand, SlashCommandInteraction } from "./baseCommand"

export class PingCommand implements SlashCommand {
  command = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!")

  async handler(interaction: SlashCommandInteraction): Promise<void> {
    await interaction.reply("Pong!")
  }
}
