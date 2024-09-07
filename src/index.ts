import { Client, Events, GatewayIntentBits } from "discord.js"
import { TOKEN } from "./util/processEnv"
import handler from "./events"

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
  ],
})

client.on(Events.InteractionCreate, handler[Events.InteractionCreate])
client.once(Events.ClientReady, handler[Events.ClientReady])

client.login(TOKEN)
