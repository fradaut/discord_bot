import { Events, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";

export const event = {
    name: Events.MessageCreate,
    once: false,
};

export const action = async (message) => {
    if (message.author.bot) return;

    if (!message.member.roles.cache.has(process.env.ROLE_ADMIN_ID)) return;
    const msg = message.content.split(' ');
    
    if (msg.length === 2 && msg[0] === "!button"){
        message.delete();
        switch (msg[1]) {
            case "ticket":
                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('ticketCreate')
                            .setLabel("點我")
                            .setStyle(ButtonStyle.Success),
                    );

                const embed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle("聯繫管理員")
                    .setDescription("建立一個和管理員聯繫的頻道.")
                message.channel.send({embeds: [embed], components: [row]});
                break;
            default:
                message.channel.send(`找不到 ${msg[1]} 按鈕.`);
        }
    }
};