
const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
  host: 'GMast.aternos.me',
  port: 48568,
  username: 'CHATTU',
  auth: 'offline',
  version: '26.1.2'
})

let movementTimer = null
let movingForward = true

bot.on('spawn', () => {
  console.log('CHATTU is online!')
  bot.chat('GMast! CHATTU aa gaya. Bolo kya kaam hai!')

  movementTimer = setInterval(() => {
    movingForward = !movingForward

    bot.setControlState('forward', movingForward)
    bot.setControlState('back', !movingForward)
  }, 3000)

  bot.setControlState('forward', true)
})

bot.on('chat', (username, message) => {
  if (username === bot.username) return

  console.log(`${username}: ${message}`)

  const msg = message.toLowerCase().trim()
  let reply = null

  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
    reply = `Oye ${username}! Kya haal hai?`
  }
  else if (msg.includes('kaise ho')) {
    reply = 'Mast hoon! Tum apna batao.'
  }
  else if (msg.includes('kya kar rahe')) {
    reply = 'Filhaal tumhari bakwaas sun raha hoon.'
  }
  else if (msg.includes('help')) {
    reply = 'Abhi mera brain basic hai. Commands ka upgrade baaki hai!'
  }
  else if (msg.includes('chattu')) {
    reply = 'Haan GMast, hukum karo!'
  }
  else if (msg.includes('bye')) {
    reply = 'Chal milte hain GMast!'
  }

  if (reply) {
    setTimeout(() => {
      if (bot.entity) bot.chat(reply)
    }, 800)
  }
})

bot.on('kicked', reason => {
  console.log('Kicked:', reason)
})

bot.on('error', err => {
  console.log('Error:', err.message)
})

bot.on('end', () => {
  if (movementTimer) clearInterval(movementTimer)
  console.log('CHATTU disconnected!')
})
