const { default: makeWASocket, DisconnectReason, useSingleFileAuthState } = require('@whiskeysockets/baileys')
const P = require('pino')
const { Boom } = require('@hapi/boom')
const fs = require('fs')
const { join } = require('path')

const { state, saveState } = useSingleFileAuthState('./session.json')

async function startBot() {
    const sock = makeWASocket({
        logger: P({ level: 'silent' }),
        printQRInTerminal: true,
        auth: state
    })

    sock.ev.on('creds.update', saveState)

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut
            if (shouldReconnect) {
                startBot()
            }
        }
    })

    sock.ev.on('messages.upsert', async ({ messages, type }) => {
        if (type === 'notify') {
            const msg = messages[0]
            if (!msg.key.fromMe && msg.message) {
                const messageType = Object.keys(msg.message)[0]
                if (messageType === 'conversation' && msg.message.conversation.toLowerCase() === 'ping') {
                    await sock.sendMessage(msg.key.remoteJid, { text: 'pong' })
                }
            }
        }
    })
}

startBot()