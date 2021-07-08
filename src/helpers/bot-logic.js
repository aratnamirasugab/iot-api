const Telegraf = require('telegraf');
const Markup = require("telegraf/markup");
const Stage = require("telegraf/stage");
const session = require("telegraf/session");
const WizardScene = require("telegraf/scenes/wizard");
const envs = require('../../config');
const botEndpoint = require("./bot");
const bot = new Telegraf(envs.BOT_TOKEN);

bot.start(ctx => {
  ctx.reply(
    `Hello ${ctx.from.first_name}, Selamat datang di OASYS, platform penyiraman otomatis berbasis cloud karya anak bangsa, Apakah ingin kamu lakukan?

    /register -> buat akun baru dan nikmati fitur OASYS
    /login      -> masuk ke akun kamu di OASYS
    
    `
  );
});

const registerSection = new WizardScene("register-wizard",
    ctx => {
        ctx.reply("Enter your name : ");
        ctx.scene.session.user = {};
        return ctx.wizard.next();
    },
    ctx => {
        ctx.scene.session.user.name = ctx.message.text;
        ctx.reply("Enter your email : ");
        return ctx.wizard.next();
    },
    ctx => {
        ctx.scene.session.user.email = ctx.message.text;
        ctx.reply("Enter your password : ");
        return ctx.wizard.next();
    },
    ctx => {
        ctx.scene.session.user.password = ctx.message.text;
        botEndpoint
            .postRegister(ctx.scene.session.user)
            .then(res => {
                ctx.reply("Successfully registered!");
            })
            .catch(err => {
                ctx.reply(err);
            })
        
        return ctx.scene.leave();
    }
)

const stage = new Stage([registerSection]);
stage.command('cancel', (ctx) => {
    ctx.reply("Operation canceled");
    return ctx.scene.leave();
});

stage.command('register', (ctx) => {
    ctx.scene.enter("register-wizard");
});
bot.use(session());
bot.use(stage.middleware());
bot.launch();

exports.bot = bot;