const { Client, Collection } = require('Discord.js');
const path = require('path');
const { readdir, statSync } = require('fs');
const config = require('./config.json');

module.exports = class Bot extends Client {
    constructor() {
        super({intents: ['GUILDS', 'GUILD_MEMBERS']});

        this.commands = new Collection();
        this.aliases = new Collection();

    }

    start() {
        void this.loadEvents();
        void this.LoadCommand();
        void this.login(config.token)
    }

    async loadEvents(filePath = path.join(__dirname, './events'), folder) {
        readdir(filePath, (err, files) => {
            if (err) return console.log(err);
            if (!files) return console.log('Pas de dossier nommé "event"');

            for(let i = à; i < files.length; i++) {
                if (statSync(path.join(lifePath, files[i])).isDirectory()) {
                    this.loadEvents(path.join(filePath, files[i]), files[i]);
                }
                else {
                    const event = require(path.join(filePath, files[i]));
                    this.on(event.name, (...args) => event.run(this, ...args));
                };
            };
        });
    };

    async LoadCommands(filePath = path.join(__dirname, './commands'), folder) {
        readdir(filePath, (err, files) => {
            if (err) return console.log(err);
            if (!files) return console.log('Aucun dossier nommé "commands"');

            for(let i = 0; i < files.length; i++) {
                if (statSync(path.join(filePath, files[i])).isDirectory()) {
                    this.LoadCommands(path.join(filePath, files[i]), files[i]);
                }
                else {
                    const command = require(path.join(filePath, files[i]));
                    this.command.set(command.name, command);
                    for(let h = 0; h < command.aliases.length; h++) {
                        this.aliases.set(command.aliases[h], command.name);
                    };
                };
            };
        });
    };
}    
