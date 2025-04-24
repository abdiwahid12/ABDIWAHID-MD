module.exports = async (sock, msg) => {
    const from = msg.key.remoteJid
    const isGroup = from.endsWith('@g.us')
    const sender = msg.key.participant || msg.key.remoteJid

    if (!isGroup) return

    const message = msg.message?.conversation || ''
    if (message.startsWith('!add')) {
        const number = message.split(' ')[1]
        await sock.groupParticipantsUpdate(from, [`${number}@s.whatsapp.net`], 'add')
    }

    if (message.startsWith('!remove')) {
        const number = message.split(' ')[1]
        await sock.groupParticipantsUpdate(from, [`${number}@s.whatsapp.net`], 'remove')
    }

    if (message === '!promote') {
        await sock.groupParticipantsUpdate(from, [sender], 'promote')
    }

    if (message === '!demote') {
        await sock.groupParticipantsUpdate(from, [sender], 'demote')
    }

    if (message === '!kickall') {
        const metadata = await sock.groupMetadata(from)
        const members = metadata.participants.map(p => p.id).filter(id => id !== sock.user.id)
        await sock.groupParticipantsUpdate(from, members, 'remove')
    }
}