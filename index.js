const { App } = require('@slack/bolt');
const models = require('./models/models');
const getPets = require('./newpet.js');
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
    if(user.length == 0){
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
  Pet.findOne({slack_id: message.user}, function(err, pet){
    if (err) console.log("Err", err);
    if(pet){
      say(`your pet info is here:
         name: ${pet.pet_name}
         health:${pet.health}
         happiness: ${pet.happiness}
         level: ${pet.level}
         money: ${pet.money}`);

    }else{
      say(`oops <@${message.user}>, you don't own a pet yet! Type newpet to adopt a new pet!`);
    }
  })
});

app.message('newpet', async ({ message, say }) => {

  Pet.find({slack_id: message.user}, function(err, pet){
    if (err) console.log("Err", err);
    if(pet.length > 0){
      say(`sorry, you already have a pet. If you want a new pet, you have to spend $100 to purchase an adoption ticket.`);
    }else{
      const [pet_id, pet_name] = getPets();
      new Pet({
        slack_id: message.user,
        pet_name: pet_name,
        create_date: new Date(),
        health: 80,
        happiness: 80,
        level: 1,
        money: 100,
        pet_id: pet_id
        // slack_dmid: //here
      }).save(function(err, pet){
        if(err) console.log("Err", err);
        console.log("save success");
        say(`Hello <@${message.user}>! We found a new pet for you:
          {{this is a fake picture}}
          name: ${pet.pet_name}`);
      });
    }
  })
});

//==============================pet functions=====================================
app.message('feed', async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  Pet.findOne({slack_id: message.user}, function(err, pet){
    if (err) console.log("Err", err);
    if(pet){
      pet.health += 5;
      pet.save((err, updatedPet) => {
          if (err) return handleError(err);
          console.log("updated success!");
          say("feed the food the pet");
      });
    }else{
      say(`oops <@${message.user}>, you don't own a pet yet! Type newpet to adopt a new pet!`);
    }
  })
});

app.message('play', async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  Pet.findOne({slack_id: message.user}, function(err, pet){
    if (err) console.log("Err", err);
    if(pet){
      pet.happiness += 10;
      pet.save((err, updatedPet) => {
          if (err) return handleError(err);
          console.log("updated success!");
          say("you played with the pet, its happiness increased");
      });
    }else{
      say(`oops <@${message.user}>, you don't own a pet yet! Type newpet to adopt a new pet!`);
    }
  })
});


// Start your app
(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
})();
