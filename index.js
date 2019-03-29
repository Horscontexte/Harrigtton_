let paire = ['AA','KK','QQ','JJ','TT','99','88','77','66','55','44','33','22'];
let suited = ['AKs','AQs','AJs','ATs','A9s','A8s','A7s','A6s','A5s','A4s','A3s','A2s','KQs','KJs','KTs','K9s','K8s','K7s','K6s','K5s','K4s','K3s','K2s','QJs',
'QTs','Q9s','Q8s','Q7s','Q6s','Q5s','Q4s','Q3s','Q2s','JTs','J9s','J8s','J7s','J6s','J5s','J4s','J3s','J2s','T9s','T8s','T7s','T6s','T5s','T4s','T3s',
'T2s','98s','97s','96s','95s','94s','93s','92s','87s','86s','85s','84s','83s','82s','76s','75s','74s','73s','72s','65s','64s','63s','62s','54s','53s',
'52s','43s','42s','32s'];
let offSuited = ['AKo','AQo','AJo','ATo','A9o','A8o','A7o','A6o','A5o','A4o','A3o','A2o','KQo','KJo','KTo','K9o','K8o','K7o','K6o','K5o','K4o','K3o','K2o','QJo',
'QTo','Q9o','Q8o','Q7o','Q6o','Q5o','Q4o','Q3o','Q2o','JTo','J9o','J8o','J7o','J6o','J5o','J4o','J3o','J2o','T9o','T8o','T7o','T6o','T5o','T4o','T3o',
'T2o','98o','97o','96o','95o','94o','93o','92o','87o','86o','85o','84o','83o','82o','76o','75o','74o','73o','72o','65o','64o','63o','62o','54o','53o',
'52o','43o','42o','32o'];
let allHandsCombo = 1326;
let trueAllHandsCombo = 1225;

let global_percent = 0;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// User Variable
let myRange = [];
let player1Range = ['AA','KK','QQ','JJ','TT','99','88','77','AKo','AKs','AQo','AQs','AJs'];
let player2Range = ['AA','KK','QQ','JJ','TT','99','88','77','66','55','AKo','AKs','AQo','AQs','AJs','AJo','ATo','ATs','A9s','A8s'];


// Paire => 6 Combo
// Dépareillées => 12 Combo
// Assorties => 6 Combo

function calculateCallProbability(Count) {
  var pStart = new Promise((resolve, reject) => {
    call_probability = Count / trueAllHandsCombo;
    call_percent = call_probability * 100;
    global_percent += call_percent
    resolve();
  });
  pStart.then(() => {
      console.log(call_percent + ' % de call');
  });
}

function calculateCombo(player) {
  let currentCount = 0;
  var start = new Promise((resolve, reject) => {
    player.forEach((element, index, array) => {
      if(paire.includes(element)) {
        currentCount += 6;
      //  console.log(element + " est une paire!");
      }
      if(suited.includes(element)) {
        currentCount += 6;
      //  console.log(element + " est un suited!");
      }
      if(offSuited.includes(element)) {
        currentCount += 12;
      //  console.log(element + " est un offSuited!");
      }
      if (index === array.length -1) resolve();
    });
  });

  start.then(() => {
      console.log(currentCount + ' Combo pour la range :');
      console.log(player);
      calculateCallProbability(currentCount)
  });
}

function calculatePlayer() {
  var start = new Promise((resolve, reject) => {
    calculateCombo(player1Range);
    resolve();
  });
  start.then(() => {
    calculateCombo(player2Range)
  });
};

function launch() {
  var start = new Promise((resolve, reject) => {
    calculatePlayer();
    resolve();
  });
  start.then(() => {


  });
};

launch();
