import { SlashCommandInteraction } from "./baseCommand"

export async function handleError(
  interaction: SlashCommandInteraction
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
