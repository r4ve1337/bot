const { SlashCommandBuilder, Colors, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Help command for bot.")
    .setDescriptionLocalizations({
      "en-US": "Help command for bot.",
      "fi": "Ohje-komento bottia varten",
      "fr": "Commande d'aide pour le bot",
      "de": "Hilfsbefehl für den Bot",
      "it": "Comando di aiuto per il bot",
      "nl": "Helpcommando voor bot",
      "ru": "Команда справки для бота",
      "pl": "Polecenie pomocy dla bota",
      "tr": "Bot için yardım komutu",
      "cs": "Příkaz nápovědy pro bota",
      "ja": "ボットのヘルプコマンド",
      "ko": "봇의 도움말 명령",
    }),
  async execute(interaction) {
    let idfrom = interaction.guild ? interaction.guild.id : interaction.user.id;
    let ephemeral = !interaction.guild ? false : true;

    const embed = new EmbedBuilder()
      .setTitle(`Memz.Solutions`)
      .addFields([
        { name: 'Usage', value: '- All commands can be found here: <#1241846738659311636>' },
        { name: 'Errors?', value: '- Send a private message to: <@1143506079846776916>' },
      ])
      .setColor(Colors.LuminousVividPink)
      .setTimestamp();


    // you can use any event, but I am using setTimeout
    setTimeout(() => {
      interaction.deleteReply()
      interaction.followUp({
        embeds: [embed],
        ephemeral: false
      })
    }, 5000)
  },
};