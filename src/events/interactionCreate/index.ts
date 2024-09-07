import { Interaction } from "discord.js"
import { handleChatInputCommand } from "./chatInputCommand"

export async function interactionCreate(interaction: Interaction) {
  if (interaction.isChatInputCommand()) {
    handleChatInputCommand(interaction)
  }
}
