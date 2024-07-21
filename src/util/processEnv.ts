import assert from "assert"
import "dotenv/config"

const TOKEN = process.env.TOKEN as string
const CLIENT = process.env.CLIENT as string
const GUILD = process.env.GUILD as string

assert(
  typeof TOKEN == "string",
  "Process ENV not properly configured: Missing TOKEN"
)
assert(
  typeof CLIENT == "string",
  "Process ENV not properly configured: Missing CLIENT"
)
assert(
  typeof GUILD == "string",
  "Process ENV not properly configured: Missing GUILD"
)

export { TOKEN, CLIENT, GUILD }
