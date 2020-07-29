const { App } = require('@slack/bolt');
const models = require('./models/models');
let User = models.User;
let Pet = models.Pet;

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN
});


app.event('app_home_opened', ({ event, say }) => {
  // Look up the user from DB
  let result;
  User.find({slack_id: event.user}, function(err, user){
    if (err) console.log("Err", err);
    if(user.length > 0){
      say('you are already in database!');
    }else{
      new User({
        slack_id: event.user,
        money: 100,
        // slack_dmid: //here
      }).save(function(err, user){
        if(err) console.log("Err", err);
        console.log("save success");
        say(`Hello world, and welcome <@${event.user}>!`);
      });
    }
  });
});

app.message('hello', async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  await say(`Hey there <@${message.user}>!`);
});


// Start your app
(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
})();
