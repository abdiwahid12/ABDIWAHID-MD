module.exports = async (sock, jid) => {
  const text = `*ABDIWAHID-MD Bot Commands:*
!help - Soo bandhig caawinaad
!status - Xaaladda botka
!ban <number> - Ban user
!unban <number> - Unban user
!joke - Sheeg qosal
!weather <magaalo> - Cimilada
!news - Warar cusub
!close - Xir group
!open - Fur group`;
  await sock.sendMessage(jid, { text });
};