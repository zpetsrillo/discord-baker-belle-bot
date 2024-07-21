import { EmbedBuilder } from "discord.js"
import { Volume } from "../../services/books"

const COLOR_BLUE = 0x0099ff
const MAX_DESCRIPTION_LENGTH = 200

export function getBookEmbed(volume: Volume) {
  return new EmbedBuilder()
    .setColor(COLOR_BLUE)
    .setTitle(volume.title)
    .setDescription(
      volume.description.length > MAX_DESCRIPTION_LENGTH
        ? volume.description.substring(0, MAX_DESCRIPTION_LENGTH) + "..."
        : volume.description
    )
    .setThumbnail(volume.imageLinks.thumbnail!)
    .addFields({
      name: "Author",
      value: volume.authors.join(", "),
    })
    .addFields(
      {
        name: "Categories",
        value: volume.categories.join(", "),
        inline: true,
      },
      {
        name: "Page Count",
        value: volume.pageCount.toString(),
        inline: true,
      },
      {
        name: "Published Date",
        value: volume.publishedDate,
        inline: true,
      }
    )
}
