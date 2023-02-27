import { REST, Routes } from "discord.js";
import fg from 'fast-glob';

const updateSlashCommands = async (commands) => {
    const rest = new REST({version: 10}).setToken(process.env.TOKEN);

    await rest.put(
        Routes.applicationGuildCommands(
            process.env.APPLICATION_ID,
            process.env.GUILD_ID
        ),
        {
            body: commands,
        }
    );
};

export const loadCommands = async () => {
    const commands = [];
    const files = await fg('./src/commands/**/index.js');

    for (const file of files) {
        const cmd = await import(file);
        commands.push(cmd.command);
    }

    await updateSlashCommands(commands);
};