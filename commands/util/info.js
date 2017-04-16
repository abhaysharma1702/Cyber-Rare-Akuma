const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const { version } = require('../../package.json');
const moment = require('moment');
require('moment-duration-format');

module.exports = class InfoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'info',
            aliases: [
                'data',
                'information'
            ],
            group: 'util',
            memberName: 'info',
            description: 'Gives some bot info for your shard. (;info)',
            examples: [';info']
        });
    }

    async run(message, args) {
        if (message.channel.type !== 'dm') {
            if (!message.channel.permissionsFor(this.client.user).hasPermission(['SEND_MESSAGES', 'READ_MESSAGES'])) return;
            if (!message.channel.permissionsFor(this.client.user).hasPermission('EMBED_LINKS')) return message.say(':x: Error! I don\'t have the Embed Links Permission!');
        }
        const guilds = await this.client.shard.fetchClientValues('guilds.size');
        const embed = new RichEmbed()
            .setColor(0x00AE86)
            .setFooter(`©2017 dragonfire535 | Version ${version} | Created ${moment.duration(Date.now() - this.client.user.createdTimestamp).format('y[ years], M[ months], w[ weeks, and ]d[ days]')} ago!`)
            .addField('Servers',
                `${this.client.guilds.size} / ${guilds.reduce((prev, val) => prev + val, 0)}`, true)
            .addField('Shards',
                `${this.client.options.shardCount} (${this.client.shard.id})`, true)
            .addField('Commands',
                '110', true)
            .addField('Owner',
                'dragonfire535#8081', true)
            .addField('Source Code',
                '[View Here](https://github.com/dragonfire535/xiaobot)', true)
            .addField('Memory Usage',
                `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`, true)
            .addField('Uptime',
                moment.duration(this.client.uptime).format('d[d]h[h]m[m]s[s]'), true)
            .addField('Node Version',
                process.version, true)
            .addField('Library',
                '[discord.js](https://discord.js.org/#/)', true)
            .addField('Modules',
                '[commando](https://github.com/Gawdl3y/discord.js-commando), [zalgoize](https://github.com/clux/zalgolize), [snekfetch](https://github.com/GusCaplan/snekfetch), [mathjs](http://mathjs.org/), [moment](http://momentjs.com), [moment-duration-format](https://github.com/jsmreese/moment-duration-format), [jimp](https://github.com/oliver-moran/jimp), [cheerio](https://cheerio.js.org/)')
            .addField('APIs',
                '[Wattpad](https://developer.wattpad.com/docs/api), [Wordnik](http://developer.wordnik.com/docs.html), [osu!](https://osu.ppy.sh/p/api), [memegen.link](https://memegen.link/), [Yugioh Prices](http://docs.yugiohprices.apiary.io/#), [YouTube Data](https://developers.google.com/youtube/v3/), [Yoda Speak](https://market.mashape.com/ismaelc/yoda-speak), [Discord Bots](https://bots.discord.pw/api), [Today in History](http://history.muffinlabs.com/#api), [jService](http://jservice.io/), [Strawpoll](https://github.com/strawpoll/strawpoll/wiki/API), [Urban Dictionary](https://github.com/zdict/zdict/wiki/Urban-dictionary-API-documentation), [OMDB](http://www.omdbapi.com/), [Yahoo Weather](https://developer.yahoo.com/weather/), [Wikipedia](https://en.wikipedia.org/w/api.php), [Google Static Maps](https://developers.google.com/maps/documentation/static-maps/)');
        return message.embed(embed);
    }
};