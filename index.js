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
let global_J1_Count = 0;
let globat_J2_Count = 0;

let global_J1_Call = 0;
let global_J2_Call = 0;

let global_Total_fold = 0;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 1. Définir les variables au lancement du calcul :

//      - Notre main
//      - La range de vilain 1
//      - La range de vilain 2
//      - La range de vilain 3
//      - La range de vilain 4
//      - Le nombres de joueur à table
//      - La taille de l'ante

let myHand = ['T8o'];
let player1Range = ['AA','KK','QQ','JJ','TT','99','88','77','AKo','AKs','AQo','AQs','AJs'];
let player2Range = ['AA','KK','QQ','JJ','TT','99','88','77','66','55','AKo','AKs','AQo','AQs','AJs','AJo','ATo','ATs','A9s','A8s'];
let player3range = [];
let player4range = [];
let playerAtTable = 4;
let ante = 0.2;

// 2. Définir le nombre de combo pour chaque range

//       - Paire => 6 Combo
//       - Dépareillées => 12 Combo
//       - Assorties => 4 Combo

async function calculateCombo(player) {
  let currentCount = 0;
  await player.forEach((element, index, array) => {
    console.log('INFO - Calcul des combinaisons en cours pour ' + element);
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
  });
  console.log('INFO - Fin du calcul => ' + currentCount + ' combinaisons');
  if (player == player1Range) {
    console.log('INFO - Joueur 1')
    global_J1_Count = currentCount;
  }
  else if (player == player2Range) {
    console.log('INFO - Joueur 2')
    global_J2_Count = currentCount;
  }
  await calculateCallProbability(currentCount)
}

// 3. Calculer la probabilité de chaque range d'obtenir un call

async function calculateCallProbability(Count) {
  call_probability = Count / trueAllHandsCombo;
  call_percent = call_probability * 100;
  global_percent += call_percent
  if (Count == global_J1_Count) {
    global_J1_Call = call_percent;
  }
  else if (Count == global_J2_Count) {
    global_J2_Call = call_percent;
  }
  console.log('INFO - ' + call_percent + ' % de call');
}

// 4. A partir de la probabilité pour chaque range d'obtenir un call, déduire la probabilité d'obtenir un fold

async function calculateFoldProbability() {

  global_Total_fold = 100 - (global_J1_Call + global_J2_Call);
  console.log('INFO - Probabilité de fold : ' + global_Total_fold + ' %')
}
// 5. Obtenir la probabilité de gagner de notre main VS chaque mains contenu dans chaques ranges des vilains

// 6. Déduire à partir du résultat précedent le nombre de victoire

// 7. Obtenir notre pourcentage de victoire

//         - Somme des nombres de victoire divisé par le nombre total de combo contenu dans une range

// 8. Calculer la probabilité d'obtenir un call et de gagner

// 9. En déduire la probabilité d'obtenir un call et de perdre

// 10. Réaliser un calcul d'esperance de gain à l'aide de toute les probabilités des différents evenemment possible obtenu

async function asyncCall() {
  await calculateCombo(player1Range);
  await calculateCombo(player2Range);
  console.log('INFO - Probabilité total de call : ' + global_percent + ' %')
  await calculateFoldProbability();
}

asyncCall();
