const JSONBIN_BIN_ID = '693100ba43b1c97be9d698c6';  
const JSONBIN_API_KEY = '$2a$10$rBYfSzm9VwzN4sErYkobZOO09f5DujfX4qHUkRBPPbEuixATQRB0i';  

function initializeLocalStorage() {
  if (!localStorage.getItem('heroes')) {
        const localHeroes = {
        "heroes": [
        {
        "name": "Navy Captain Landy",
        "image": "images/landi.png",
        "alt": "Navy Captain Landy",
        "link": "https://epic7x.com/character/navy-captain-landy/",
        "skill1": "Precision Targeting: Attacks with gunfire, increases CR by 20%, 40% chance to use Salvo Fire.",
        "skill2": "Ruler of the Sea: Immune to stun/sleep, +50% Crit Resist, ATK stacks up to 50%.",
        "skill3": "Mobilize the Warship: Attacks all enemies, stuns for 1 turn, 60% DEF penetration.",
        "comments": [
            "She was an extremely annoying hero when she first came out with high stats and strong skills.",
            "But now, she is not that powerful anymore. Many heroes can counter her."
        ]
        },
        {
        "name": "Remnant Violent",
        "image": "images/violent.png",
        "alt": "Remnant Violent",
        "link": "https://epic7x.com/character/remnant-violet/",
        "skill1": "Sword Flash: Cuts the enemy, 60% chance to decrease Hit Chance for 1 turn.",
        "skill2": "Concentration: Increases Evasion by 50%, gains Focus on dodge, uses Massacre at 5 Focus.",
        "skill3": "Massacre: Increases Attack for 3 turns, attacks enemy with sword, 50% DEF penetration.",
        "comments": [
            "A truly fantastic hero if you are lucky, he can constantly dodge enemy attacks!",
            "However, some heroes have accuracy boosts, so not ideal to pick early in PvP."
        ]
        }
    ]
    };
    
    localStorage.setItem('heroes', JSON.stringify(localHeroes));
    console.log('Local storage initialized with sample data');
  }
}


function loadLocalHeroes() {
  try {
    const data = localStorage.getItem('heroes');
    
    if (!data) {
      alert('No local data found! Initializing with sample data...');
      initializeLocalStorage();
      return loadLocalHeroes();
    }
    
    const heroesData = JSON.parse(data);
    displayHeroes(heroesData.heroes, 'local');
    console.log('Loaded from localStorage:', heroesData);
    
  } catch (error) {
    console.error('Error loading local heroes:', error);
    alert('Error loading local data: ' + error.message);
  }
}


async function loadRemoteHeroes() {
  try {
    const container = document.getElementById('hero-container');
    container.innerHTML = '<p class="loading-message">Loading heroes from server...</p>';
    
    const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest`, {
      method: 'GET',
      headers: {
        'X-Master-Key': JSONBIN_API_KEY
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    const heroesData = data.record || data;
    
    displayHeroes(heroesData.heroes, 'remote');
    console.log('Loaded from JSONBin:', heroesData);
    
  } catch (error) {
    console.error('Error loading remote heroes:', error);
    alert('Error loading remote data: ' + error.message + '\n\nMake sure you have set your JSONBIN_BIN_ID and JSONBIN_API_KEY in load-heroes.js!');
    const container = document.getElementById('hero-container');
    container.innerHTML = '<p class="error-message">Failed to load remote data. Check console for details.</p>';
  }
}


function displayHeroes(heroes, source) {
  const container = document.getElementById('hero-container');
  container.innerHTML = '';
  
  if (!heroes || heroes.length === 0) {
    container.innerHTML = '<p class="loading-message">No heroes found!</p>';
    return;
  }
  heroes.forEach(hero => {
    const heroCard = document.createElement('hero-card');
    
    heroCard.setAttribute('image', hero.image);
    heroCard.setAttribute('alt', hero.alt);
    heroCard.setAttribute('name', hero.name);
    heroCard.setAttribute('link', hero.link);
    heroCard.setAttribute('skill1', hero.skill1);
    heroCard.setAttribute('skill2', hero.skill2);
    heroCard.setAttribute('skill3', hero.skill3);

    if (hero.comments) {
      heroCard.setAttribute('comments', JSON.stringify(hero.comments));
    }
    
    heroCard.setAttribute('data-source', source);
    
    container.appendChild(heroCard);
  });
  
  console.log(`Displayed ${heroes.length} heroes from ${source}`);
}


document.addEventListener('DOMContentLoaded', () => {
  initializeLocalStorage();
  
  const loadLocalBtn = document.getElementById('load-local');
  if (loadLocalBtn) {
    loadLocalBtn.addEventListener('click', () => {
      console.log('Load Local button clicked');
      loadLocalHeroes();
    });
  }
  
  const loadRemoteBtn = document.getElementById('load-remote');
  if (loadRemoteBtn) {
    loadRemoteBtn.addEventListener('click', () => {
      console.log('Load Remote button clicked');
      loadRemoteHeroes();
    });
  }

  if (document.getElementById('hero-container')) {
    // delay run to wait for View Transition DOM replace
    setTimeout(() => {
        loadLocalHeroes();  // or loadRemoteHeroes()
    }, 50);
  }
  
  console.log('Data loading buttons initialized');
});