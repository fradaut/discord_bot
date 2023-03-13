import { Events, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";

import { useAppStore } from "@/store/app";
import { ticketPermissionCreator } from "@/events/interactionCreate/permission";

export const event = {
    name: Events.InteractionCreate,
    once: false,
};

export const action = async (interaction) => {
    if (interaction.isChatInputCommand()) {
        const appStore = useAppStore();
        const action = appStore.commandsActionMap.get(interaction.commandName);

        await action(interaction);
    }else if (interaction.isButton()) {
        if (interaction.customId === "ticketCreate") {
            const ticketPermission = ticketPermissionCreator(interaction);
            const ticketChannel = await interaction.guild.channels.create({
                name: interaction.member.displayName,
                type: ChannelType.GuildText,
                topic: "管理員聯繫區",
                parent: interaction.channel.parent,
                permissionOverwrites: ticketPermission,
                nsfw: false
            });

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('ticketDelete')
                        .setLabel("點我")
                        .setStyle(ButtonStyle.Success),
                );
            const embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle("結束對話")
                .setDescription("關閉該頻道.")
            ticketChannel.send({embeds: [embed], components: [row]});
        }
        
    }
};