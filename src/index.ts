import { Client, Events, GatewayIntentBits } from "discord.js"
import { TOKEN } from "./util/processEnv"
import { commands, handleError } from "./commands"

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
  ],
})

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return

  console.log(
    `ChatInputCommandInteraction | User[${interaction.user.username}] Command[${interaction.commandName}]`
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
})

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`)
})

client.login(TOKEN)
