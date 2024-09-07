import { Events } from "discord.js"
import { interactionCreate } from "./interactionCreate"
import { clientReady } from "./clientReady"

export default {
  [Events.InteractionCreate]: interactionCreate,
  [Events.ClientReady]: clientReady,
}
