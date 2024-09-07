import { Client } from "discord.js"

export async function clientReady(readyClient: Client) {
  console.log(`Ready! Logged in as ${readyClient.user?.tag}`)
}
