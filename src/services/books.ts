import { books_v1, google } from "googleapis"

export type Volume = {
  volumeId: string
  selfLink: string
  title: string
  authors: Array<string>
  publisher: string
  publishedDate: string
  description: string
  industryIdentifiers: Array<{ type?: string; identifier?: string }>
  pageCount: number
  categories: Array<string>
  imageLinks: {
    [k in
      | "smallThumbnail"
      | "thumbnail"
      | "small"
      | "medium"
      | "large"
      | "extraLarge"]?: string
  }
}

export class Books {
  private static instance: Books
  private api: books_v1.Books

  private constructor() {
    this.api = google.books({
      version: "v1",
    })
  }

  static getInstance() {
    if (!Books.instance) {
      Books.instance = new Books()
    }
    return this.instance
  }

  async search(
    title?: string,
    author?: string,
    isbn?: string
  ): Promise<Volume> {
    const searchTerms = []

    if (title) {
      searchTerms.push("intitle:" + title)
    }

    if (author) {
      searchTerms.push("inauthor:" + author)
    }

    if (isbn) {
      searchTerms.push("isbn:" + isbn)
    }

    const q = searchTerms.join("+")

    const response = await this.api.volumes.list({
      q,
      maxResults: 5,
    })
    const volumes = response.data.items

    if (volumes == undefined) {
      throw new Error("Failed to get results")
    }

    return volumes.map(this.transformToVolume).filter((item) => item != null)[0]
  }

  async get(volumeId: string) {
    const response = await this.api.volumes.get({
      volumeId,
    })

    const volume = response.data

    if (volume == undefined) {
      throw new Error("Volume not found")
    }

    return this.transformToVolume(volume)
  }

  private transformToVolume(item: books_v1.Schema$Volume): Volume | null {
    const { id, selfLink, volumeInfo } = item

    if (!id || !selfLink || !volumeInfo) {
      return null
    }

    const {
      title,
      authors,
      publisher,
      publishedDate,
      description,
      industryIdentifiers,
      pageCount,
      categories,
      imageLinks,
    } = volumeInfo

    if (
      title == undefined ||
      authors == undefined ||
      publisher == undefined ||
      publishedDate == undefined ||
      description == undefined ||
      industryIdentifiers == undefined ||
      pageCount == undefined ||
      categories == undefined ||
      imageLinks == undefined
    ) {
      return null
    }

    return {
      volumeId: id,
      selfLink,
      title,
      authors,
      publisher,
      publishedDate,
      description,
      industryIdentifiers,
      pageCount,
      categories,
      imageLinks,
    }
  }
}
