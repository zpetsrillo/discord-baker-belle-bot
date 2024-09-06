import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
  GuildMember,
  SlashCommandBuilder,
} from "discord.js"
import { SlashCommand } from "./baseCommand"
import { GuildUtil } from "../util/guild"
import assert from "assert"

type Game = {
  id: string
  name: string
  emoji: string
  role: string
}

const GAME_ROLES: Array<Game> = [
  {
    id: "league_of_legends",
    name: "League of Legends",
    emoji: "leagueoflegends",
    role: "Cafe Cutie",
  },
  {
    id: "hearthstone_battlegrounds",
    name: "Hearthstone",
    emoji: "hs_bg",
    role: "Battle Bao",
  },
  {
    id: "other",
    name: "Steam/other games",
    emoji: "amongus",
    role: "Indie Gamer",
  },
]

assert(GAME_ROLES.length <= 5, "More than 5 not supported")

export class GameRolesCommand implements SlashCommand {
  command = new SlashCommandBuilder()
    .setName("game-roles")
    .setDescription("Grant server roles for different games")

  async handler(interaction: ChatInputCommandInteraction): Promise<void> {
    if (!interaction.guild) {
      throw new Error("Command only meant for use within Guilds")
    }

    const guild = GuildUtil.getInstance(interaction.guild)

    let content = `React to gain a role\n\n`
    content += GAME_ROLES.map(
      ({ name, emoji, role }) =>
        `${guild.getEmoji(emoji)} - ${guild.getRole(role)} (${name})`
    ).join("\n")

    const buttons = GAME_ROLES.map((game) =>
      new ButtonBuilder()
        .setCustomId(game.id)
        .setStyle(ButtonStyle.Secondary)
        .setEmoji(guild.getEmoji(game.emoji).id)
    )

    const buttonRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
      ...buttons
    )

    const message = await interaction.reply({
      content,
      fetchReply: true,
      components: [buttonRow],
      ephemeral: true,
    })

    try {
      const buttonInteraction = await message.awaitMessageComponent({
        filter: (i) => i.user.id == interaction.user.id,
        time: 15_000,
      })
      buttonInteraction.deferUpdate()

      const member = buttonInteraction.member
      const gameRole = GAME_ROLES.find(
        (game) => game.id == buttonInteraction.customId
      )

      if (!gameRole) {
        throw new Error("Interaction ID doesn't exist in GAME_ROLES")
      }

      if (member instanceof GuildMember) {
        const selectedRole = guild.getRole(gameRole.role)
        if (!selectedRole) return

        if (!member.roles.cache.has(selectedRole.id)) {
          member.roles.add(selectedRole)
          interaction.followUp({
            content: `Role ${selectedRole} has been added!`,
            ephemeral: true,
          })
        } else {
          interaction.followUp({
            content: `You already have the role ${selectedRole}`,
            ephemeral: true,
          })
        }
      }
    } catch (e) {
      interaction.followUp({
        content: "Interaction timed out",
        ephemeral: true,
      })
    }
  }
}
