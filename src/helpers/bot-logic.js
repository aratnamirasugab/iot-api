const Telegraf = require('telegraf');
const Stage = require("telegraf/stage");
const WizardScene = require("telegraf/scenes/wizard");
const envs = require('../../config');
const botEndpoint = require("./bot");
const bot = new Telegraf(envs.BOT_TOKEN);
const RedisSession = require('telegraf-session-redis');
const redis = require('../config/redis');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const got = require('got');
const crypto = require('crypto');

const session = new RedisSession({
    store : {
        host: process.env.TELEGRAM_SESSION_HOST || '127.0.0.1',
        port: process.env.TELEGRAM_SESSION_PORT || 6379
    }
})

const redisSession = new RedisSession();

bot.use(session);
bot.launch();

bot.start(ctx => {
  ctx.reply(
    `Hello ${ctx.from.first_name}, Selamat datang di OASYS, platform penyiraman otomatis berbasis cloud karya anak bangsa, Apakah ingin kamu lakukan?

    /register -> buat akun baru dan nikmati fitur OASYS
    /login      -> masuk ke akun kamu di OASYS
    
    `
  );
});

const mainMenuSection = new WizardScene("main-menu",
    ctx => {
        ctx.reply(
        `Hello ${ctx.from.first_name}, Selamat datang di OASYS, platform penyiraman otomatis berbasis cloud karya anak bangsa, Apakah yang ingin kamu lakukan?
    
        /register -> buat akun baru dan nikmati fitur OASYS
        /login      -> masuk ke akun kamu di OASYS
        `
      );

    //   ctx.reply(ctx.from)
    }
)

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
                ctx.reply(res.data.data.message);
                setTimeout((ctx) => {
                    ctx.replyWithAnimation("https://media.giphy.com/media/YnBntKOgnUSBkV7bQH/giphy.gif")
                }, 2000, ctx);
                return ctx.scene.enter("main-menu");
            })
            .catch(err => {
                ctx.reply(err);
                return ctx.scene.leave();
            })
    }
)

const loginSection = new WizardScene("login-wizard",
    ctx => {
        ctx.reply("Enter your email : ");
        ctx.scene.session.user = {};
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
            .postLogin(ctx.scene.session.user)
            .then(res => {
                ctx.scene.session.user.token = res.data.data.token;
                let data = {
                    "email": ctx.scene.session.user.email,
                    "token" : res.data.data.token 
                }
                ctx.reply("Successfully login!");
                setTimeout((ctx) => {
                    ctx.replyWithAnimation("https://media.giphy.com/media/XreQmk7ETCak0/giphy.gif")
                }, 500, ctx);
                let key = ctx.from.first_name;
                redisSession.saveSession(key, data);
                return ctx.scene.enter("meat-menu", ctx.scene.session);
            })
            .catch(err => { 
                ctx.reply("User not found or wrong credential");
                setTimeout((ctx) => {
                    ctx.replyWithAnimation("https://tenor.com/view/no-nope-smh-kanye-west-gif-4246025")
                }, 500, ctx);
                return ctx.scene.enter("main-menu");
            })
    }
)

const changePasswordSection = new WizardScene("change-password",
    ctx => {
        ctx.reply("Enter your password : ");
        ctx.scene.session.user = {};
        return ctx.wizard.next();
    },
    ctx => {
        ctx.scene.session.user.old_password = ctx.message.text;
        ctx.reply("Enter your new password : ");
        return ctx.wizard.next();
    },
    async ctx => {
        ctx.scene.session.user.new_password = ctx.message.text;
        let userDTO = await redis.getAsync(ctx.from.first_name); // maybe we can think about how the key is structured next time to avoid collision
        userDTO = JSON.parse(userDTO);                          // probably add also tele username after first name to make each redis data tobe unique as possible

        let DTO = {
            "old_password" : ctx.scene.session.user.old_password,
            "new_password" : ctx.scene.session.user.new_password
        }

        botEndpoint
            .putChangePassword(userDTO, DTO)
            .then(res => {
                ctx.reply(res.data.data.message);
                setTimeout((ctx) => {
                    ctx.replyWithAnimation("https://tenor.com/view/smells-like-success-success-andrew-mcfarlane-gif-18049300")
                }, 500, ctx);
                return ctx.scene.enter("meat-menu");
            })
            .catch(err => {
                ctx.reply("Password didn't match");
                setTimeout((ctx) => {
                    ctx.replyWithAnimation("https://tenor.com/view/busu8s-at-least-you-tried-gif-7859548")
                }, 500, ctx);
                return ctx.scene.enter("meat-menu");
            })
    }
)

const deactiveAccountSection = new WizardScene("deactive-account",
    ctx => {
        ctx.reply(
            "Are you sure ? type (yes or no)",
        );
        ctx.scene.session.user = {};
        return ctx.wizard.next();
    },
    async ctx => {
        ctx.scene.session.user.agree = ctx.message.text.toLowerCase();
        
        if (ctx.scene.session.user.agree !== "yes") {
            setTimeout((ctx) => {
                ctx.replyWithAnimation("https://tenor.com/view/despicable-me-agnes-please-dont-go-beg-the-look-gif-7543421")
            }, 0, ctx);
            return ctx.scene.enter("meat-menu");
        }

        let userDTO = await redis.getAsync(ctx.from.first_name);
        userDTO = JSON.parse(userDTO);

        botEndpoint
            .deleteDeactiveAccount(userDTO, ctx.scene.session.user)
            .then(res => {
                ctx.reply(res.data.data.message);
                setTimeout((ctx) => {
                    ctx.replyWithAnimation("https://tenor.com/view/despicable-me-agnes-please-dont-go-beg-the-look-gif-7543421")
                }, 0, ctx);
                return ctx.scene.leave();
            })
            .catch(err => { 
                setTimeout((ctx) => {
                    ctx.replyWithAnimation("https://tenor.com/view/seriously-sideeye-confused-gif-8776030")
                }, 0, ctx);
                ctx.reply("Failed when deactived account");
                return ctx.scene.enter("meat-menu");
            })
    }
)

const addPhoneNumberSection = new WizardScene("phone-number",
    ctx => {
        ctx.reply(
            "Please enter your phone number : ",
        );
        ctx.scene.session.user = {};
        return ctx.wizard.next();
    },
    async ctx => {
        ctx.scene.session.user.phone_number = ctx.message.text.toLowerCase();

        let isnum = /^\d+$/.test(ctx.scene.session.user.phone_number);

        if (!isnum) {
            setTimeout((ctx) => {
                ctx.replyWithAnimation("https://tenor.com/view/angryface-gif-4425198")
            }, 0, ctx);
            ctx.reply("Please enter a correct phone number!");
            return ctx.scene.enter("meat-menu")
        }

        let userDTO = await redis.getAsync(ctx.from.first_name);
        userDTO = JSON.parse(userDTO);

        botEndpoint
            .postAddPhoneNumber(userDTO, ctx.scene.session.user)
            .then(res => {
                ctx.reply(res.data.data.message)
                return ctx.scene.enter("meat-menu");
            })
            .catch(err => {
                ctx.reply("Failed to change phone number");
                return ctx.scene.enter("meat-menu");
            })
    }
)

const waterThePlantSection = new WizardScene("water-plant",
    async ctx => {
        let userDTO = await redis.getAsync(ctx.from.first_name);
        userDTO = JSON.parse(userDTO);

        botEndpoint
            .postWaterPlant(userDTO)
            .then(res => {
                ctx.reply(res.data.data.message)
                return ctx.scene.enter("meat-menu");
            })
            .catch(err => {
                ctx.reply("Failed to water the plant");
                return ctx.scene.enter("meat-menu");
            })
    }
)

const addAddressSection = new WizardScene("add-address",
    ctx => {
        ctx.reply(
            "Please enter your address : ",
        );
        ctx.scene.session.user = {};
        return ctx.wizard.next();
    },
    async ctx => {
        ctx.scene.session.user.address = ctx.message.text.toLowerCase();

        if (ctx.scene.session.user.address.length < 5) {
            ctx.reply("Please enter correct address!");
            setTimeout((ctx) => {
                ctx.replyWithAnimation("https://tenor.com/view/angryface-gif-4425198")
            }, 0, ctx);
            return ctx.scene.enter("meat-menu")
        }

        let userDTO = await redis.getAsync(ctx.from.first_name);
        userDTO = JSON.parse(userDTO);

        botEndpoint
            .postAddAddress(userDTO, ctx.scene.session.user)
            .then(res => {
                ctx.reply(res.data.data.message)
                return ctx.scene.enter("meat-menu");
            })
            .catch(err => {
                ctx.reply("Failed to enter address");
                return ctx.scene.enter("meat-menu");
            })
    }
)

const getProfileInfoSection = new WizardScene("profile-info",
    async ctx => {
        let userDTO = await redis.getAsync(ctx.from.first_name);
        userDTO = JSON.parse(userDTO);

        botEndpoint
            .getProfileInfo(userDTO)
            .then(res => {
                ctx.reply("Your name is " + res.data.data.user_info.name)
                ctx.reply("Your email is " + res.data.data.user_info.email)
                ctx.reply("Your address is " + res.data.data.user_info.address)
                ctx.reply("Your phone number is " + res.data.data.user_info.phone_number)
                ctx.replyWithPhoto({url: `${res.data.data.user_info.avatar}`})
                return ctx.scene.enter("meat-menu");
            })
            .catch(err => {
                ctx.reply("User not found");
                return ctx.scene.enter("main-menu");
            })
    }
)

const getPlantStatusSection = new WizardScene("plant-status",
    async ctx => {
        let userDTO = await redis.getAsync(ctx.from.first_name);
        userDTO = JSON.parse(userDTO);

        botEndpoint
            .getPlantStatus(userDTO)
            .then(res => {
                ctx.reply(`The Temperature is : ${res.data.data.message.Items[0].temperature}`)
                ctx.reply(`Soil Humidity is : ${res.data.data.message.Items[0].soilHumidity}`)
                ctx.reply(`Last time you watering the plant is : ${res.data.data.last_water.Items[0].created_at}`)
                if (res.data.data.message.Items[0].soilHumidity >= 800) {
                    ctx.reply(`The humidity level is low`)
                } else {
                    ctx.reply(`The humidity level is enough for the plant`)
                }
            })
            .then(res => {
                return ctx.scene.enter("meat-menu");
            })
            .catch(err => {
                ctx.reply("Failed when getting plant status");
                return ctx.scene.enter("main-menu");
            })
    }
)

const postNewProfilePictureSection = new WizardScene("post-profile-pic",
    ctx => {
        ctx.reply("Please attach the image..");
        ctx.scene.session.user = {}
        return ctx.wizard.next();
    },
    async ctx => {
        const fileLink = await bot.telegram.getFileLink(ctx.message.photo[0].file_id)
            .then((link) => {
                return link
            })
            .catch((err) => {
                ctx.reply("error occured when uploading image");
                return ctx.scene.leave();
            })

        let file = await axios.get(fileLink);
        let fileName = crypto.randomBytes(20).toString('hex') + ".jpg"

        let userDTO = await redis.getAsync(ctx.from.first_name)
        userDTO = JSON.parse(userDTO);

        const downloadStream = got.stream(file.config.url);
        const fileWriterStream = fs.createWriteStream(fileName);

        downloadStream
          .on("downloadProgress", ({ transferred, total, percent }) => {
            const percentage = Math.round(percent * 100);
            ctx.reply(`progress: ${transferred}/${total} (${percentage}%)`);
          })
          .on("error", (error) => {
            console.error(`Download failed: ${error.message}`);
          });
      
        fileWriterStream
          .on("error", (error) => {
            console.error(`Could not write file to system: ${error.message}`);
          })
          .on("finish", () => {
            console.log(`File downloaded to ${fileName}`);
          });
        downloadStream.pipe(fileWriterStream);

        fs.readFile(process.cwd() + `/${fileName}`, (err, fileToUpload) => {
            
            if (err) {
                console.log(err)
                return ctx.scene.leave();
            }

            let form = new FormData();
            form.append('profile_avatar', fileToUpload);
    
            botEndpoint
                .postProfilePicture(userDTO, form)
                .then((res) => {
                    ctx.reply(res.data.data.message);
                    return ctx.scene.enter("meat-menu");
                })
                .catch((err) => {
                    ctx.reply("there was a problem when processing the image that you sent");
                    console.error(err);
                    return ctx.scene.leave();
                })
        })

    }
)

const meatMenuSection = new WizardScene("meat-menu",
    ctx => {
        ctx.reply(
        `Hello ${ctx.from.first_name}, Selamat datang kembali di OASYS, Apakah yang ingin kamu lakukan?

        /chngpswd -> ganti password akun saya.
        /offaccount      -> hapus akun OASYS saya.

        /profile -> lihat biodata dan foto saya.
        /poto -> upload foto profile baru.
        /hp -> input nomor hp baru.
        /alamat -> input alamat rumah saya.

        /tanaman -> lihat status tanaman saya.
        /siram -> siram tanaman saya.
        `
      );
    }
)

// stage section
const stage = new Stage([registerSection, mainMenuSection,  waterThePlantSection, getPlantStatusSection, loginSection, meatMenuSection, changePasswordSection, deactiveAccountSection, addPhoneNumberSection, addAddressSection, getProfileInfoSection, postNewProfilePictureSection]);
stage.command('cancel', (ctx) => {
    ctx.reply("Operation canceled");
    return ctx.scene.enter("main-menu")
});

stage.command('register', (ctx) => {
    ctx.scene.enter("register-wizard");
});

stage.command('login', (ctx) => {
    ctx.scene.enter("login-wizard");
});

stage.command('chngpswd', (ctx) => {
    ctx.scene.enter("change-password");
});

stage.command('offaccount', (ctx) => {
    ctx.scene.enter("deactive-account");
});

stage.command('profile', (ctx) => {
    ctx.scene.enter("profile-info");
});

stage.command('siram', (ctx) => {
    ctx.scene.enter("water-plant");
});

stage.command('tanaman', (ctx) => {
    ctx.scene.enter("plant-status");
});

stage.command('poto', (ctx) => {
    ctx.scene.enter("post-profile-pic");
});

stage.command('hp', (ctx) => {
    ctx.scene.enter("phone-number");
});

stage.command('alamat', (ctx) => {
    ctx.scene.enter("add-address");
});


bot.use(stage.middleware());

exports.bot = bot;