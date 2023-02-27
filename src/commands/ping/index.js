import { SlashCommandBuilder } from "discord.js";

export const command = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("測試指令");

export const action = async (interaction) => {
    interaction.reply("pong!");
}