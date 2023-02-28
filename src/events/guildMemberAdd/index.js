import { Events, AttachmentBuilder } from "discord.js";
import { createCanvas, loadImage } from "canvas";

export const event = {
    name: Events.GuildMemberAdd,
    once: false,
};

export const action = async (member) => {
    const channel = member.guild.channels.cache.get(process.env.WELCOME_ID);
    // if (!channel) {
    //     member.guild.channels.cache.get(process.env.LOG_ID).send(`找不到頻道ID: ${process.env.WELCOME_ID}`);
    //     return;
    // }

    //背景
    const background = await loadImage('./src/events/guildMemberAdd/pic/first.png');
    const canvas = createCanvas(background.width, background.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    //文字轉圖片
    ctx.font = '28px sans-serif';
    ctx.fillStyle = "#e4dd89";
    ctx.textAlign = 'center';
    ctx.fillText(member.user.tag, canvas.width / 2, 280);

    //頭像網址修改
    let avatarURL = member.user.displayAvatarURL({format: 'png'});
    avatarURL = avatarURL.substring(0, avatarURL.lastIndexOf(".")+1);
    avatarURL += "png";

    //載入頭像
    const avatar = await loadImage(avatarURL);
    const avatarSize = 140;
    const avatarX = (canvas.width - avatarSize) / 2;
    const avatarY = 90;

    //頭像裁剪合併背景
    const borderRadius = avatarSize / 2;
    ctx.beginPath();
    ctx.arc(avatarX + borderRadius, avatarY + borderRadius, borderRadius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatar, avatarX, avatarY, avatarSize, avatarSize);
    
    //頭像框線
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#e4dd89";
    ctx.stroke();

    const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: `welcome-${member.user.id}.png` });
    channel.send({ files: [attachment] });
};