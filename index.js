const { App } = require('@slack/bolt');
const models = require('./models/models');
let Pet = models.Pet;

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN
});


app.event('app_home_opened', ({ event, say }) => {
  // Look up the user from DB
  let result;
  Pet.find({slack_id: event.user}, function(err, user){
    if (err) console.log("Err", err);
    if(user.length > 0){
      say('Hey you have a pet!nice~~');
    }else{
      say(`Hello <@${event.user}>! You dont seem to own a pet, do you want a new pet? type newpet a adopt a new pet!`);
    }
  });
});

app.message('hello', async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  await say(`Hey there <@${message.user}>!`);
});

app.message('info', async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  Pet.find({slack_id: event.user}, function(err, pet){
    if (err) console.log("Err", err);
    if(user.length > 0){
      say(`your pet info is here: \n name: ${pet.pet_name} \n health:${pet.health}
        \n happiness: ${pet.happiness} \n level: ${pet.level} \n money: ${pet.money}`);
    }else{
      say(`oops <@${message.user}>, you don't own a pet yet! Type newpet to adopt a new pet!`);
    }
  })
});

app.message('newpet', async ({ message, say }) => {
  new Pet({
    pet_name: "jack",
    pet_number: 01,
    create_date: new Date(),
    health: 100,
    happiness: 80,
    level: 1,
    money: 100,
    // slack_dmid: //here
  }).save(function(err, user){
    if(err) console.log("Err", err);
    console.log("save success");
    say(`Hello <@${event.user}>! We made a new pet for you!`);
  });
});


// Start your app
(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
})();
