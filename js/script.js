"use strict";
console.log("hello world!");

let tokensDictionary = {};

tokensDictionary["{relation}"] =
{
  texts: ["moku", "poka", "pona", "ike", "nasa", "ilo", "mama"],
  weights: [1, 1, 1, 1, 1, 1, 1],
  randomChance: true,
};
tokensDictionary["{adj}"] =
{
  texts: ["pona", "ike", "wawa", "kasi", "nasa", "waso", "tawa", "kama", "kalama", "lukin", "namako", "moku", "olin", "monsuta", "kule", "suli", "lili", "musi", "sitelen", "lape", "telo", "seli", "lete", "suno", "kiwen", "toki", "mute", "lon", "pilin", "kulupu"],
  weights: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  randomChance: true,
};
tokensDictionary["{feature}"] =
{
  texts: ["lupa", "sike", "leko", "kasi", "ilo", "nena", "soweli", "ijo", "waso", "akesi", "pipi", "jan", "kala", "nasin", "soko", "len", "linja", "palisa", "kalama", "kiwen", "kulupu"],
  weights: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  randomChance: true,
};
tokensDictionary["{object-structure}"] =
{
  texts: ["{feature}", "{feature} {adj}", "{feature} {adj} {adj}", "{feature} pi {feature} {adj}", "{feature} pi {adj} {adj}"],
  weights: [4, 6, 3, 3, 2],
  randomChance: false,
};

let sitelenPona = true;
let english = false;

const fullContentDictionary = ["akesi", "ala", "ala", "alasa", "ale", "anpa", "ante", "anu", "awen", "esun", "ijo", "ike", "ilo", "insa", "jaki", "jan", "jasima", "jelo", "jo", "kala", "kalama", "kama", "kasi", "ken", "kepeken", "kijetesantakalu", "kili", "kin", "kipisi", "kiwen", "ko", "kon", "kule", "kulupu", "kute", "lanpan", "lape", "laso", "lawa", "leko", "len", "lete", "lili", "linja", "lipu", "loje", "lon", "luka", "lukin", "lupa", "ma", "mama", "mani", "meso", "misikeke", "moku", "monsi", "monsuta", "mu", "mun", "musi", "mute", "namako", "nanpa", "nasa", "nasin", "nena", "nimi", "noka", "oko", "olin", "open", "pakala", "pali", "palisa", "pan", "pana", "pilin", "pimeja", "pini", "pipi", "poka", "poki", "pona", "sama", "seli", "selo", "seme", "sewi", "sijelo", "sike", "sin", "sinpin", "sitelen", "soko", "sona", "soweli", "suli", "suno", "supa", "suwi", "tan", "taso", "tawa", "telo", "tenpo", "toki", "tomo", "tonsi", "tu", "unpa", "uta", "utala", "walo", "wan", "waso", "wawa", "weka", "wile"];

let fullContentWeights = [];

for (let i = 0; i < fullContentDictionary.length; i++)
{
    fullContentWeights.push(1);
}

tokensDictionary["{randomWord}"] = {
  texts: fullContentDictionary,
  weights: fullContentWeights,
  randomChance: false,
}

let fullWordListChance = 0.05; //many things have a random chance of choosing *any*
                               //toki pona word. this chance can be adjusted 0-1.
                               //var and not a const because i want a usable slider for this
//mun: the world:
function createWorld()
{
  let world = {};

  world.temperature = weightedChoice(["lete a!", "lete", "insa", "seli", "seli a!"], [1, 3, 5, 3, 1]);

  world.size = weightedChoice(["lili a!", "lili", "insa", "suli", "suli a!"], [1, 3, 5, 3, 1]);

  world.type = weightedChoice(["asteroid", "gas", "terrestrial"], [1, 3, 10]);

  //todo: ring generation

  //todo: moon generation

  //todo: life generation
  let atmogen = Math.random();
  let generateAtmosphere = false;

  //asteroids have a 10% chance of generating with an atmosphere.
  //terrestrial planets have 90%.
  //gas giants will always generate an atmosphere.
  if (world.type === "asteroid" || world.type === "terrestrial")
  {
    if(world.type === "asteroid")
    {
      if (atmogen < 0.1)
      {
        generateAtmosphere = true;
      }
    }
    else if (world.type === "terrestrial")
    {
      if (atmogen < 0.9)
      {
        generateAtmosphere = true;
      }
    }
  }
  else if (world.type === "gas")
  {
    generateAtmosphere = true;
  }

  if (generateAtmosphere)
  {
    let atmosphere = {};

    if (world.type === "asteroid")
    {
      atmosphere.thickness = weightedChoice(["lili a!", "lili", "insa", "suli"], [2, 8, 2, 1]);
    }
    else if (world.type == "terrestrial")
    {
      atmosphere.thickness = weightedChoice(["lili a!", "lili", "insa", "suli", "suli a!"], [1, 2.5, 5, 2.5, 1]);
    }
    else if (world.type == "gas")
    {
      atmosphere.thickness = "suli a!";
    }
    atmosphere.colour = null;
    let colourgen = Math.random();
    if (atmosphere.thickness === "lili" || atmosphere.thickness === "lili a!")
    {
      if (Math.random() < 0.5)
      {
        atmosphere.colour = "ken ala lukin"
      }
    }
    if (atmosphere.colour !== "ken ala lukin")
    {

      atmosphere.colour = weightedChoiceOrRandom(["kule mute!", "pimeja", "walo", "jelo", "loje", "laso"], [1, 2, 2, 5, 5, 5]);

      if (Math.random() < 0.2)
      {
        let modifierWord = null;

        modifierWord = weightedChoiceOrRandom(["nasa", "mute", "ante"], [1, 1, 1]);

        atmosphere.colour = atmosphere.colour + " ";
        atmosphere.colour = atmosphere.colour + modifierWord;
      }
    }

    world.atmosphere = atmosphere;
  }
  else
  {
    world.atmosphere = null;
  }

  //generate ocean, or if one is even present at all. only terrestrials
  //have oceans
  if (world.type === "terrestrial")
  {
    world.ocean = weightedChoice(["telo li lon ala", "telo lili", "telo", "telo suli", "ma li lon ala"], [1, 2, 3, 3, 2]);
  }
  else
  {
    world.ocean = "telo li lon ala";
  }

  //name generation block
  if (world.type === "asteroid")
  {
    world.headnoun = weightedChoiceOrRandom(["kiwen", "mun", "ma", "sike", "tomo", "sewi", "nasin", "mama"], [3, 3, 2, 1, 1, 1, 1, 1]);
  }
  else if (world.type === "terrestrial")
  {
    world.headnoun = weightedChoiceOrRandom(["kiwen", "mun", "ma", "sike", "tomo", "sewi", "nasin", "mama", "waso", "kulupu"], [1, 6, 6, 1, 2, 1, 1, 2, 1, 1]);
  }
  else if (world.type === "gas")
  {
    world.headnoun = weightedChoiceOrRandom(["mun", "sike", "tomo", "sewi", "nasin", "mama", "kon"], [6, 2, 2, 1, 2, 1, 1]);
  }
  //potentially generate modifier as well
  if (Math.random() < 0.2)
  {
    let modifier = null;
    if (Math.random() < fullWordListChance)
    {
      modifier = getRandomWord();
    }
    else
    {
      let validGenerated = false;
      while (!validGenerated)
      {
        modifier = weightedChoice(["sewi", "mama", "kulupu", "pona", "wan", "tonsi"], [2, 2, 1, 1, 1, 1]);
        //avoid duplicate words like "mama mama" in the case of normal generation.
        //it's fine in the "wacky" gen though hence why the check is only in the
        //normal list
        if (modifier !== world.headnoun)
        {
          validGenerated = true;
        }
      }
    }
    world.headnoun = world.headnoun + " ";
    world.headnoun = world.headnoun + modifier;
  }

  world.characteristics = [];
  let characteristicsCount = Math.floor((Math.random() * 8)+3);
  for (let i = 0; i < characteristicsCount; i++)
  {
    world.characteristics.push(generatePlanetCharacteristic(world));
  }

  return world;
}

function getRandomWord()
{
  //no weighting, just chaos.
  let words = ["akesi", "ala", "ala", "alasa", "ale", "anpa", "ante", "anu", "awen", "esun", "ijo", "ike", "ilo", "insa", "jaki", "jan", "jasima", "jelo", "jo", "kala", "kalama", "kama", "kasi", "ken", "kepeken", "kijetesantakalu", "kili", "kin", "kipisi", "kiwen", "ko", "kon", "kule", "kulupu", "kute", "lanpan", "lape", "laso", "lawa", "leko", "len", "lete", "lili", "linja", "lipu", "loje", "lon", "luka", "lukin", "lupa", "ma", "mama", "mani", "meso", "misikeke", "moku", "monsi", "monsuta", "mu", "mun", "musi", "mute", "namako", "nanpa", "nasa", "nasin", "nena", "nimi", "noka", "oko", "olin", "open", "pakala", "pali", "palisa", "pan", "pana", "pilin", "pimeja", "pini", "pipi", "poka", "poki", "pona", "sama", "seli", "selo", "seme", "sewi", "sijelo", "sike", "sin", "sinpin", "sitelen", "soko", "sona", "soweli", "suli", "suno", "supa", "suwi", "tan", "taso", "tawa", "telo", "tenpo", "toki", "tomo", "tonsi", "tu", "unpa", "uta", "utala", "walo", "wan", "waso", "wawa", "weka", "wile"];
  let index = Math.floor(Math.random()*words.length);
  return words[index];
}
function weightedChoice(items, initialWeights)
{
  //https://stackoverflow.com/questions/43566019/how-to-choose-a-weighted-random-array-element-in-javascript
  let weights = initialWeights.slice(); //copy
  var i;

    for (i = 1; i < weights.length; i++)
        weights[i] += weights[i - 1];

    var random = Math.random() * weights[weights.length - 1];

    for (i = 0; i < weights.length; i++)
        if (weights[i] > random)
            break;

    return items[i];
}

function createRing(world)
{
  let ring = {};
  return ring;
}
//jan: species
function createSpecies(world, suli)
{
  let species = {};
  let habitability = calculateWorldHabitability(world);
  //don't generate jan as soweli pi suli ala

  //establish the typing of the species. while this can become part of the species
  //name, it's entirely possible that it won't due to the chance of random name
  //chances. it largely exists to help curate the characteristics of species
  //into general groups
  if (suli)
  {
    species.mainType = weightedChoice(["jan", "soweli", "kasi", "ilo", "kiwen", "wawa"], [5+(habitability*2), 2+(habitability), 2, 1, 1]);
  }
  else
  {
    species.mainType = weightedChoice(["soweli", "kasi", "ilo", "kiwen", "wawa"], [2+(habitability), 5+(habitability*2), 2, 1, 1]);
  }

  if (species.mainType === "soweli")
  {
    if (suli)
    {
      species.subType = weightedChoice(["jan", "soweli", "waso", "pipi", "kala", "akesi"], [4, 2, 2, 1, 1, 1]);
    }
    else
    {
      species.subType = weightedChoice(["soweli", "waso", "pipi", "kala", "akesi"], [2, 2, 1, 1, 1]);
    }
  }
  else if (species.mainType === "kasi")
  {
    species.subType = weightedChoice(["suli", "lili", "moli"], [3, 3, 1]);
  }
  else if (species.mainType === "ilo")
  {
    species.subType = weightedChoice(["jan", "soweli", "pali", "pipi"], [3, 3, 3, 3]);
  }
  else if (species.mainType === "kiwen")
  {
    species.subType = weightedChoice(["nena", "ko", "ma"], [3, 3, 1]);
  }
  else if (species.mainType === "wawa")
  {
    species.subType = weightedChoice(["kon", "sona", "pakala"], [3, 2, 1]);
  }

  let characteristics = [];

  //a short name is a single word used to describe the species once context
  //is established, and will be part of the long name.
  let shortName = "";
  let longName = "";

  //generate short name
  if (Math.random() < fullWordListChance)
  {
    shortName = getRandomWord();
  }
  else
  {
    if (species.mainType === "soweli")
    {
      shortName = species.subType;
    }
    else
    {
      shortName = species.mainType;
    }
  }

  //using short name, begin to generate long name. generate long name by making
  //a pool of words that can be used, partially scraped from its characteristics,
  //and with the total word list in it as well at a low weight.
  return species;
}

function worldHeatToNumber(world)
{
  let heatFactor = null;
  switch (world.temperature)
  {
    case "lete a!":
      heatFactor = 1;
      break;
    case "lete":
      heatFactor = 2;
      break;
    case "insa":
      heatFactor = 3;
      break;
    case "seli":
      heatFactor = 4;
      break;
    case "seli a!":
      heatFactor = 5;
      break;
    default:
      console.log("invalid heat case in worldHeatToNumber: " + world.temperature);
  }
  return heatFactor;
}

function worldAtmosphereToNumber(world)
{
  let atmoFactor = null;
  switch (world.atmosphere)
  {
    case "lili a!":
      atmoFactor = 1;
      break;
    case "lili":
      atmoFactor = 2;
      break;
    case "insa":
      atmoFactor = 3;
      break;
    case "suli":
      atmoFactor = 4;
      break;
    case "suli a!":
      atmoFactor = 5;
      break;
    default:
      console.log("invalid heat case in worldAtmosphereToNumber: " + world.atmosphere);
  }
  return heatFactor;
}
function calculateWorldHabitability(world)
{
  let habitability = 0;
  if (world.temperature !== "lete a!" && world.temperature !== "seli a!")
  {
    habitability += 1;
    if (world.temperature === "insa")
    {
      habitability += 1;
    }
  }
  if (planet.type === "terrestrial")
  {
    habitability += 3;
  }
  return habitability;
}

function generatePlanetCharacteristic(world)
{
  let characteristic = {};
  let type = null;
  type = weightedChoice(["modPlanet", "modFeature", "newFeature"], [1, 1, 1]);

  let locationList = ["kon", "telo", "ma", "sewi", "ma anpa", "wawa awen"];

  let atmosphereWeight = 0;

  if (world.atmosphere !== null)
  {
    atmosphereWeight = 4;
  }

  let oceansWeight = 0;

  if (world.ocean !== null && world.ocean !== "telo li lon ala")
  {
    oceansWeight = 4;
  }

  let landWeight = 6;

  if (world.ocean === "ma li lon ala")
  {
    landWeight = 0;
  }

  let locationWeightList = [atmosphereWeight, oceansWeight, landWeight, 2, 2, 1];
  characteristic.locationType = weightedChoice(locationList, locationWeightList);

  //now we know *where* it is. let's create a feature for that place.

  //let's generate a base "thing"

  let fullBaseName = makeObjectBaseName();
  let shortBaseName = fullBaseName.split(" ")[0];

  let detailSentenceCount = Math.floor(Math.random()*3);
  let details = [];
  let detailSentences = [];

  for (let i = 0; i < detailSentenceCount; i++)
  {
    let newDetailSentence = "";
    let detailSentenceFormat = weightedChoice(["li-word", "relation", "possession", "context"], [10, 2, 2, 2]);
    let detailSentenceWords = [];

    if (detailSentenceFormat === "li-word")
    {
      detailSentenceWords.push(replaceSentenceTokens("ona li {randomWord}", {}));
    }
    else if (detailSentenceFormat === "relation")
    {
      let newObject = makeObjectBaseName();
      detailSentenceWords.push(newObject);
      detailSentenceWords.push(replaceSentenceTokens("li {relation} tawa ona", {}));
    }
    else if (detailSentenceFormat === "possession")
    {
      detailSentenceWords.push(replaceSentenceTokens("{randomWord} ona li {randomWord}", {}));
    }
    else if (detailSentenceFormat === "context")
    {
      detailSentenceWords.push(replaceSentenceTokens("{randomWord} la, ona li {randomWord}", {}));
    }

    if (Math.random() < 0.1)
    {
      //add e
      detailSentenceWords.push(replaceSentenceTokens("e {feature}"));
    }

    if (Math.random() < 0.1)
    {
      //add cause
      detailSentenceWords.push(replaceSentenceTokens("tan {randomWord}"));
    }

    newDetailSentence = detailSentenceWords.join(" ") + ".";
    detailSentences.push(newDetailSentence);
  }

  let contextDictionary = {};
  contextDictionary["{fullName}"] = singleWordToken(fullBaseName);
  contextDictionary["{shortName}"] = singleWordToken(shortBaseName);
  contextDictionary["{location}"] = singleWordToken(characteristic.locationType);

  let baseSentence = "{location} la, {fullName} li lon."
  baseSentence = replaceSentenceTokens(baseSentence, contextDictionary);

  let sentencesList = [];
  sentencesList.push(baseSentence);

  for (let i = 0; i < detailSentences.length; i++)
  {
    sentencesList.push(detailSentences[i]);
  }

  characteristic.fullDescription = sentencesList.join(" ");

  return characteristic;
}

function singleWordToken(word, randomChance)
{
  if (randomChance === undefined)
  {
    randomChance = false;
  }
  return {
    texts: [word],
    weights: [1],
    randomChance: randomChance,
  };
}

function textFromToken(dict, token)
{
  let tokenWord = null;
  if (dict[token].randomChance)
  {
    tokenWord = weightedChoiceOrRandom(dict[token]["texts"], dict[token]["weights"]);
  }
  else
  {
    tokenWord = weightedChoice(dict[token]["texts"], dict[token]["weights"]);
  }
  return tokenWord;
}

function replaceSentenceTokens(sentence, context)
{
  let fullDictionary = {};

  for (let token in tokensDictionary)
  {
    fullDictionary[token] = tokensDictionary[token];
  }
  for (let token in context)
  {
    fullDictionary[token] = context[token];
  }

  let parsing = true;

  while (parsing)
  {
    let replacedInCycle = false;
    for (let token in fullDictionary)
    {

      if (sentence.includes(token))
      {
        let tokenWord = null;
        tokenWord = textFromToken(fullDictionary, token);
        sentence = sentence.replace(token, tokenWord);
        replacedInCycle = true;
      }
    }
    if (!replacedInCycle)
    {
      parsing = false;
    }
  }
  return sentence;
}

function makeObjectBaseName()
{
  let nameStructure = weightedChoice(["{feature}", "{feature} {adj}", "{feature} {adj} {adj}", "{feature} pi {feature} {adj}", "{feature} pi {adj} {adj}"], [4, 6, 3, 3, 2]);

  let baseFeature = replaceSentenceTokens(nameStructure, {});

  return baseFeature;
}

function weightedChoiceOrRandom(items, weights)
{
  let word = null;
  if (Math.random() < fullWordListChance)
  {
    word = getRandomWord();
  }
  else
  {
    word = weightedChoice(items, weights);
  }
  return word;
}

function fetchContentWords(strings)
{
  //function that takes a list of strings of toki pona text, then yoinks content
  //words out. used for dynamic description generation. for example, the species
  //generator should be able to recognize that in one of the characteristics the
  //creature whos base type is "soweli" has a "palisa suli"- and potentially figure
  //out that one way to describe this creature would be a "soweli palisa".
  //this system is prone to weirdness- as is intentional!
  contentWords = [];
  for (let i = 0; i < strings.length; i++)
  {
    let splitArray = strings[i].split(" ");
    for (let word = 0; word < splitArray.length; word++)
    {
      if (fullContentDictionary.includes(splitArray[word]))
      {
        contentWords.push(splitArray[word]);
      }
    }
  }
  return contentWords;
}

function toggleSitelenMode()
{
  if (sitelenPona)
  {
    document.body.style.fontFamily = "Arial";
    document.getElementById("pageBody").style.fontSize = "100%";
    sitelenPona = false;
    let janSame = document.getElementsByClassName("janSame")
    for (let i = 0; i < janSame.length; i++)
    {
      janSame[i].textContent = "Same";
    }
    document.getElementById("title").textContent = "ilo pi mun nasa";
    let latinOnly = document.getElementsByClassName("latinOnly");
    for (let i = 0; i < latinOnly.length; i++)
    {
      latinOnly[i].style.fontSize = "100%";
    }
  }
  else
  {
    document.body.style.fontFamily = "LinjaPona";
    document.getElementById("pageBody").style.fontSize = "150%";
    sitelenPona = true;
    let janSame = document.getElementsByClassName("janSame")
    for (let i = 0; i < janSame.length; i++)
    {
      janSame[i].textContent = "[SAME]";
    }
    document.getElementById("title").textContent = "ilo pi++ mun nasa";
    let latinOnly = document.getElementsByClassName("latinOnly");
    for (let i = 0; i < latinOnly.length; i++)
    {
      latinOnly[i].style.fontSize = "75%";
    }
  }
}

function toggleLanguage()
{
  //for use in the info page
  if (english)
  {
    english = false;
    document.getElementById("tokiPonaInfo").style.display = "block";
    document.getElementById("englishInfo").style.display = "none";
    document.getElementById("sitelenButton").style.display = "inline";
    if (!sitelenPona)
    {
      toggleSitelenMode();
    }
    document.getElementById("languageButton").textContent = "ENGLISH";
  }
  else
  {
    english = true;
    if (sitelenPona)
    {
      toggleSitelenMode();
    }
    document.getElementById("tokiPonaInfo").style.display = "none";
    document.getElementById("englishInfo").style.display = "block";
    document.getElementById("sitelenButton").style.display = "none";

    document.getElementById("languageButton").textContent = "toki-pona";
  }
}

let currentWorld = createWorld();

function updateDisplay()
{
  let planetDiv = document.getElementById("planetBox");
  planetDiv.innerHTML = ""; //erase all

  let createRow = function (id, content, nameAttr)
  {
    if (nameAttr === undefined)
    {
      nameAttr = "id";
    }
    let newRow = document.createElement("div");
    newRow.setAttribute(nameAttr, id);
    newRow.setAttribute("class", "attributeRow");
    newRow.textContent = content;
    return newRow;
  };

  let planetNameDiv = createRow("planetName", "nimi: " + currentWorld.headnoun);
  let planetTempDiv = createRow("planetTemperature", "mute seli: " + currentWorld.temperature);
  let planetSizeDiv = createRow("planetSize", "mute suli: " + currentWorld.size);
  let atmoText = "error";

  if (currentWorld.atmosphere !== null && currentWorld.atmosphere !== undefined)
  {
    atmoText = currentWorld.atmosphere.thickness;
  }
  else
  {
    atmoText = "kon ala";
  }

  let planetAtmosphereDiv = createRow("planetAtmosphere", "mute kon: " + atmoText);
  let planetWaterDiv = createRow("planetWater", "mute telo: " + currentWorld.ocean);

  let planetCharacteristicsDiv = document.createElement("div");
  planetCharacteristicsDiv.setAttribute("id", "planetCharacteristics");

  let planetCharHeader = document.createElement("div");
  planetCharHeader.setAttribute("id", "planetCharacteristicsHeader");
  planetCharHeader.textContent = currentWorld.headnoun + " la";

  planetCharacteristicsDiv.appendChild(planetCharHeader);
  console.log(currentWorld.characteristics);
  for (let characteristic in currentWorld.characteristics)
  {
    let charDiv = createRow("planetCharacteristicLine", currentWorld.characteristics[characteristic].fullDescription, "class");
    planetCharacteristicsDiv.appendChild(charDiv);
  }

  planetDiv.appendChild(planetNameDiv);
  planetDiv.appendChild(planetTempDiv);
  planetDiv.appendChild(planetSizeDiv);
  planetDiv.appendChild(planetAtmosphereDiv);
  planetDiv.appendChild(planetWaterDiv);
  planetDiv.appendChild(planetCharacteristicsDiv);
}

function newGeneration()
{
  currentWorld = createWorld();
  updateDisplay();
}

function init(e)
{
  document.getElementById("sitelenButton").addEventListener("click", toggleSitelenMode);
  let generateButton = document.getElementById("generate");
  let languageButton = document.getElementById("languageButton");
  if (generateButton !== null)
  {
  generateButton.addEventListener("click", newGeneration);
  }
  if (languageButton !== null)
  {
    document.getElementById("languageButton").addEventListener("click", toggleLanguage);
  }
}

window.onload = function(e) { init(); }
