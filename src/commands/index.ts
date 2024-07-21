import { SlashCommand } from "./baseCommand"
import { BookCommand } from "./book"
import { EchoCommand } from "./echo"
import { FunBanCommand } from "./funBan"
import { GameRolesCommand } from "./gameRoles"
import { PingCommand } from "./ping"

export const commands: Array<SlashCommand> = [
  new PingCommand(),
  new EchoCommand(),
  new BookCommand(),
  new GameRolesCommand(),
  new FunBanCommand(),
]
export * from "./error"
