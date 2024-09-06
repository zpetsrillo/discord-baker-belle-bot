import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"
import { SlashCommand } from "./baseCommand"

export class EchoCommand implements SlashCommand {
  command = new SlashCommandBuilder()
    .setName("echo")
    .setDescription("Replies with your input!")
    .addStringOption((option) =>
      option
        .setName("input")
        .setDescription("The input to echo back")
        .setRequired(true)
    )

  async handler(interaction: ChatInputCommandInteraction): Promise<void> {
    const input = interaction.options.getString("input")

    if (typeof input != "string") {
      throw new Error("Expected required option was missing")
    }

    await interaction.reply(input)
  }
}
