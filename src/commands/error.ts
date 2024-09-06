import { ChatInputCommandInteraction } from "discord.js"

export async function handleError(
  interaction: ChatInputCommandInteraction
): Promise<void> {
  if (interaction.replied || interaction.deferred) {
    await interaction.followUp({
      content: "There was an error while executing this command!",
      ephemeral: true,
    })
  } else {
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    })
  }
}
