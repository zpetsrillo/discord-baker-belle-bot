import { REST, Routes } from "discord.js"
import { TOKEN, CLIENT, GUILD } from "./util/processEnv"
import { commands } from "./commands"

const rest = new REST().setToken(TOKEN)

const commandJSONs = commands.map((item) => item.command.toJSON())

;(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    )

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = await rest.put(
      Routes.applicationGuildCommands(CLIENT, GUILD),
      { body: commandJSONs }
    )

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    )
  } catch (error) {
    console.error(error)
  }
})()
