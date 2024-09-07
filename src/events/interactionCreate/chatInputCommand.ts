import { ChatInputCommandInteraction } from "discord.js"
import { commands, handleError } from "../../commands"

export async function handleChatInputCommand(
  interaction: ChatInputCommandInteraction
) {
  console.log(
    `ChatInputChatInputCommandInteraction | User[${interaction.user.username}] Command[${interaction.commandName}]`
  )

  try {
    const command = commands.find(
      (item) => item.command.name == interaction.commandName
    )

    if (!command) {
      throw new Error("Command not found")
    }

    command.handler(interaction)
  } catch (error) {
    console.error(error)
    handleError(interaction)
  }
}
