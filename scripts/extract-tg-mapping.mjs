import fs from 'fs'

const lines = fs
  .readFileSync(
    `${process.env.USERPROFILE}/.cursor/projects/c-Users-user-Desktop/agent-transcripts/433b7f08-e4a8-4984-9413-c6e37002e98d/433b7f08-e4a8-4984-9413-c6e37002e98d.jsonl`,
    'utf8',
  )
  .split('\n')

const line = lines.find(
  (l) => l.includes('images\\\\interior\\\\hero.jpg') && l.includes('L27koqg_EtruSblj'),
)
const j = JSON.parse(line)
const cmd = j.message.content.find((c) => c.input?.command)?.input.command

const mapping = {}
for (const m of cmd.matchAll(/"([^"]+)"\s*=\s*"(https:\/\/cdn4[^"]+)"/g)) {
  mapping[m[1]] = m[2]
}

console.log(JSON.stringify(mapping, null, 2))
