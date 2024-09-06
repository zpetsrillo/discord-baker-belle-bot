import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
} from "discord.js"

export interface SlashCommand {
  command: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder
  handler: (interaction: ChatInputCommandInteraction) => Promise<void>
}
