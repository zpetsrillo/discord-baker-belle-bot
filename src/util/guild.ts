import { Guild, GuildEmoji, GuildMember, Role } from "discord.js"

export class GuildUtil {
  private static instances = new Map<string, GuildUtil>()
  private guild: Guild

  private constructor(guild: Guild) {
    this.guild = guild
  }

  static getInstance(guild: Guild) {
    if (!GuildUtil.instances.get(guild.id)) {
      GuildUtil.instances.set(guild.id, new GuildUtil(guild))
    }
    return GuildUtil.instances.get(guild.id)!
  }

  getEmoji(name: string): GuildEmoji {
    const emoji = this.guild.emojis.cache.find((emoji) => emoji.name == name)

    if (!emoji) {
      throw new Error(`Emoji [${name}] not found in guild [${this.guild.id}]`)
    }

    return emoji
  }

  getRole(name: string): Role {
    const role = this.guild.roles.cache.find((role) => role.name == name)

    if (!role) {
      throw new Error(`Role [${name}] not found in guild [${this.guild.id}]`)
    }

    return role
  }

  getMemberById(id: string): GuildMember {
    const member = this.guild.members.cache.find((member) => member.id == id)

    if (!member) {
      throw new Error(`Member [${id}] not found in guild [${this.guild.id}]`)
    }

    return member
  }
}
