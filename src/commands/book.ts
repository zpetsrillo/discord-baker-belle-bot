import {
  ActionRowBuilder,
  ModalActionRowComponentBuilder,
  ModalBuilder,
  SlashCommandBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js"
import { SlashCommand, SlashCommandInteraction } from "./baseCommand"
import { Books } from "../services/books"
import { getBookEmbed } from "../components/embeds/book"

export class BookCommand implements SlashCommand {
  command = new SlashCommandBuilder()
    .setName("book")
    .setDescription("Search for a Book")

  async handler(interaction: SlashCommandInteraction): Promise<void> {
    const modal = new ModalBuilder()
      .setCustomId("searchModal")
      .setTitle("Search for a book")

    const searchTitleInput = new TextInputBuilder()
      .setCustomId("searchInputTitle")
      .setLabel("Title")
      .setStyle(TextInputStyle.Short)
      .setRequired(false)
    const searchAuthorInput = new TextInputBuilder()
      .setCustomId("searchInputAuthor")
      .setLabel("Author")
      .setStyle(TextInputStyle.Short)
      .setRequired(false)
    const searchISBNInput = new TextInputBuilder()
      .setCustomId("searchInputISBN")
      .setLabel("ISBN")
      .setStyle(TextInputStyle.Short)
      .setRequired(false)

    modal.addComponents(
      new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
        searchTitleInput
      ),
      new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
        searchAuthorInput
      ),
      new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
        searchISBNInput
      )
    )

    await interaction.showModal(modal)
    const responseModal = await interaction.awaitModalSubmit({
      filter: (interaction) => interaction.customId == modal.data.custom_id,
      time: 60_000,
    })

    const userInputTitle = responseModal.fields.getTextInputValue(
      searchTitleInput.data.custom_id!
    )
    const userInputAuthor = responseModal.fields.getTextInputValue(
      searchAuthorInput.data.custom_id!
    )
    const userInputISBN = responseModal.fields.getTextInputValue(
      searchISBNInput.data.custom_id!
    )

    const volume = await Books.getInstance().search(
      userInputTitle,
      userInputAuthor,
      userInputISBN
    )

    const bookEmbed = getBookEmbed(volume)

    await responseModal.reply({
      embeds: [bookEmbed],
    })
  }
}
