import { PermissionsBitField } from "discord.js";

export const ticketPermissionCreator = (interaction) => {
    const permission = [{
        id: interaction.member.id,
        allow: [
            PermissionsBitField.Flags.ViewChannel,
            PermissionsBitField.Flags.SendMessages,
            PermissionsBitField.Flags.AttachFiles,
            PermissionsBitField.Flags.AddReactions,
            PermissionsBitField.Flags.EmbedLinks,
            PermissionsBitField.Flags.ReadMessageHistory
        ],
        deny: [PermissionsBitField.Flags.CreateInstantInvite]
    },
    {
        id: interaction.guild.id,
        deny: [PermissionsBitField.Flags.ViewChannel]
    },
    {
        id: process.env.ROLE_MOD_ID,
        allow: [
            PermissionsBitField.Flags.ViewChannel,
            PermissionsBitField.Flags.SendMessages,
            PermissionsBitField.Flags.AttachFiles,
            PermissionsBitField.Flags.AddReactions,
            PermissionsBitField.Flags.EmbedLinks,
            PermissionsBitField.Flags.ReadMessageHistory,
            PermissionsBitField.Flags.ManageMessages
        ],
        deny: [PermissionsBitField.Flags.CreateInstantInvite]
    },
    {
        id: process.env.ROLE_CORE_ID,
        allow: [
            PermissionsBitField.Flags.ViewChannel,
            PermissionsBitField.Flags.SendMessages,
            PermissionsBitField.Flags.AttachFiles,
            PermissionsBitField.Flags.AddReactions,
            PermissionsBitField.Flags.EmbedLinks,
            PermissionsBitField.Flags.ReadMessageHistory,
            PermissionsBitField.Flags.ManageMessages
        ],
        deny: [PermissionsBitField.Flags.CreateInstantInvite]
    }];

    return permission;
};