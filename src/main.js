import {Client, Events, GatewayIntentBits} from 'discord.js';
import vueInit from '@/core/vue';
import dotenv from 'dotenv';

import { loadCommands, loadEvents } from '@/core/loader';

vueInit();
dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });


loadCommands();
loadEvents();

client.login(process.env.TOKEN);