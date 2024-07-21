import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  SlashCommandBuilder,
  SlashCommandStringOption,
  SlashCommandUserOption,
} from "discord.js"
import { SlashCommand, SlashCommandInteraction } from "./baseCommand"

const userOption = new SlashCommandUserOption()
  .setName("user")
  .setDescription("The member to ban")
  .setRequired(true)
const reasonOption = new SlashCommandStringOption()
  .setName("reason")
  .setDescription("The reason for banning")

export class FunBanCommand implements SlashCommand {
  command = new SlashCommandBuilder()
    .setName("funban")
    .setDescription("Pretend to ban someone!")
    .addUserOption(userOption)
    .addStringOption(reasonOption)

  async handler(interaction: SlashCommandInteraction): Promise<void> {
    const user = interaction.options.getUser(userOption.name)
    const reason =
      interaction.options.getString(reasonOption.name) ?? "No reason provided"

    if (!user) {
      throw new Error("Required option [user] is invalid")
    }

    const confirm = new ButtonBuilder()
      .setCustomId("confirm")
      .setLabel("Confirm Ban")
      .setStyle(ButtonStyle.Danger)

    const cancel = new ButtonBuilder()
      .setCustomId("cancel")
      .setLabel("Cancel")
      .setStyle(ButtonStyle.Secondary)

    const buttons = new ActionRowBuilder<ButtonBuilder>().addComponents(
      confirm,
      cancel
    )

    const response = await interaction.reply({
      content: `Are you sure you want to ban ${user.displayName} for reason: ${reason}?`,
      components: [buttons],
    })

    try {
      const confirmation = await response.awaitMessageComponent({
        filter: (i) => i.user.id == interaction.user.id,
        time: 15_000,
      })

      switch (confirmation.customId) {
        case "confirm": {
          await confirmation.update({
            content: `${user.displayName} has been banned for reason: ${reason}`,
            components: [],
          })
          break
        }
        case "cancel":
        default: {
          await confirmation.update({
            content: `Phew, ${user.displayName} hasn't been banned!`,
            components: [],
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
