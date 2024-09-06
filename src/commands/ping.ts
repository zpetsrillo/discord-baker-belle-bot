import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"
import { SlashCommand } from "./baseCommand"

export class PingCommand implements SlashCommand {
  command = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!")

  async handler(interaction: ChatInputCommandInteraction): Promise<void> {
    await interaction.reply("Pong!")
  }
}
