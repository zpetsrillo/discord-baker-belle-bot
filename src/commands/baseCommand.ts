import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  CacheType,
  SlashCommandOptionsOnlyBuilder,
} from "discord.js"

export type SlashCommandInteraction = ChatInputCommandInteraction<CacheType>

export interface SlashCommand {
  command: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder
  handler: (interaction: SlashCommandInteraction) => Promise<void>
}
