import {Client, GatewayIntentBits} from 'discord.js';
import vueInit from '@/core/vue';
import dotenv from 'dotenv';

import { loadCommands, loadEvents } from '@/core/loader';
import { useAppStore } from '@/store/app';

vueInit();
dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
    ]
});
const appStore = useAppStore()
appStore.client = client;

loadCommands();
loadEvents();

client.login(process.env.TOKEN);