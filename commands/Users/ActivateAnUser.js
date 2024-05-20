const { SlashCommandBuilder, Colors, EmbedBuilder } = require("discord.js");
const db = require('../../utils/database')
const fetch = require('node-fetch')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("activate")
        .setDescription("Activate License Key")
        .setDescriptionLocalizations({
            "en-US": "Activate License Key",
            "fi": "Aktivoi lisenssikoodi",
            "fr": "Activer la clé de licence",
            "de": "Aktivieren Sie den Lizenzschlüssel",
            "it": "Attiva la chiave di licenza",
            "nl": "Activeer licentiesleutel",
            "ru": "Активировать лицензионный ключ",
            "pl": "Aktywuj klucz licencyjny",
            "tr": "Lisans anahtarını etkinleştir",
            "cs": "Aktivovat licenční klíč",
            "ja": "ライセンスキーを有効にする",
            "ko": "라이센스 키 활성화",
        })
        .addStringOption((option) =>
            option
                .setName("license")
                .setDescription("Enter Valid License")
                .setDescriptionLocalizations({
                    "en-US": "Enter Valid License",
                    "fi": "Syötä kelvollinen lisenssi",
                    "fr": "Entrez une licence valide",
                    "de": "Geben Sie eine gültige Lizenz ein",
                    "it": "Inserisci una licenza valida",
                    "nl": "Voer een geldige licentie in",
                    "ru": "Введите действительную лицензию",
                    "pl": "Wprowadź ważną licencję",
                    "tr": "Geçerli bir lisans girin",
                    "cs": "Zadejte platnou licenci",
                    "ja": "有効なライセンスを入力してください",
                    "ko": "유효한 라이센스를 입력하십시오",
                })
                .setRequired(true),
        ),
    async execute(interaction) {
        let idfrom = interaction.guild ? interaction.guild.id : interaction.user.id;
        let ephemeral = !interaction.guild ? false : true;

        let sellerkey = await db.get(`token_${idfrom}`)
        if (sellerkey === null) return interaction.editReply({ embeds: [new EmbedBuilder().setDescription(`Your \`SellerKey\` **has not been set!**\n In order to use this bot, you must run the \`/add-application\` Command First.`).setColor(Colors.Red).setTimestamp()], ephemeral: ephemeral })

        let un = interaction.options.getString("username")
        let pw = interaction.options.getString("password")
        let key = interaction.options.getString("License")

        fetch(`https://keyauth.win/api/seller/?sellerkey=${sellerkey}&type=activate&key=${key}&format=text`)
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    interaction.editReply({ embeds: [new EmbedBuilder().setTitle('License Successfully Activated!').addFields([{ name: 'License Activated:', value: `${key}` }]).setColor(Colors.Green).setTimestamp()], ephemeral: ephemeral })
                }
                else {
                    interaction.editReply({ embeds: [new EmbedBuilder().setTitle(json.message)
                        .addFields([{ name: 'Note:', value: `Your seller key is most likely invalid. Change your seller key with \`/add-application\` command.` }]).setColor(Colors.Red).setTimestamp()], ephemeral: ephemeral })
                }
            })
    },
};