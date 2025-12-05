
function getHeroes() {
  const data = localStorage.getItem('heroes');
  if (!data) {
    return { heroes: [] };
  }
  return JSON.parse(data);
}


function saveHeroes(heroesData) {
  localStorage.setItem('heroes', JSON.stringify(heroesData));
}

function populateSelects() {
  const heroesData = getHeroes();
  const updateSelect = document.getElementById('update-select');
  const deleteSelect = document.getElementById('delete-select');
  
  updateSelect.innerHTML = '<option value="">-- Select a hero --</option>';
  deleteSelect.innerHTML = '<option value="">-- Select a hero --</option>';
  
  heroesData.heroes.forEach((hero, index) => {
    const updateOption = document.createElement('option');
    updateOption.value = index;
    updateOption.textContent = hero.name;
    updateSelect.appendChild(updateOption);
    
    const deleteOption = document.createElement('option');
    deleteOption.value = index;
    deleteOption.textContent = hero.name;
    deleteSelect.appendChild(deleteOption);
  });
}

function displayHeroes() {
  const heroesData = getHeroes();
  const container = document.getElementById('heroes-display');
  
  container.innerHTML = '';
  
  if (heroesData.heroes.length === 0) {
    container.innerHTML = '<p class="loading-message">No heroes found in localStorage.</p>';
    return;
  }
  
  heroesData.heroes.forEach(hero => {
    const heroCard = document.createElement('simple-hero-card');
    
    heroCard.setAttribute('name', hero.name);
    heroCard.setAttribute('skill1', hero.skill1);
    heroCard.setAttribute('skill2', hero.skill2);
    heroCard.setAttribute('skill3', hero.skill3);
    
    if (hero.comments) {
      heroCard.setAttribute('comments', JSON.stringify(hero.comments));
    }
    
    container.appendChild(heroCard);
  });
}


function createHero(event) {
  event.preventDefault();
  
  const newHero = {
    name: document.getElementById('create-name').value,
    skill1: document.getElementById('create-skill1').value,
    skill2: document.getElementById('create-skill2').value,
    skill3: document.getElementById('create-skill3').value,
    comments: [
      document.getElementById('create-comment1').value,
      document.getElementById('create-comment2').value
    ].filter(c => c.trim() !== '')
  };
  
  const heroesData = getHeroes();
  heroesData.heroes.push(newHero);
  saveHeroes(heroesData);
  
  alert(`Hero "${newHero.name}" created successfully!`);
  
  document.getElementById('create-form').reset();
  
  populateSelects();
  displayHeroes();
}

function loadHeroForUpdate() {
  const selectIndex = document.getElementById('update-select').value;
  
  if (selectIndex === '') {
    alert('Please select a hero to update.');
    return;
  }
  
  const heroesData = getHeroes();
  const hero = heroesData.heroes[selectIndex];
  
  document.getElementById('update-index').value = selectIndex;
  document.getElementById('update-name').value = hero.name;
  document.getElementById('update-skill1').value = hero.skill1;
  document.getElementById('update-skill2').value = hero.skill2;
  document.getElementById('update-skill3').value = hero.skill3;
  document.getElementById('update-comment1').value = hero.comments[0] || '';
  document.getElementById('update-comment2').value = hero.comments[1] || '';
  
  document.getElementById('update-form').style.display = 'block';
}

function updateHero(event) {
  event.preventDefault();
  
  const index = parseInt(document.getElementById('update-index').value);
  
  const updatedHero = {
    name: document.getElementById('update-name').value,
    skill1: document.getElementById('update-skill1').value,
    skill2: document.getElementById('update-skill2').value,
    skill3: document.getElementById('update-skill3').value,
    comments: [
      document.getElementById('update-comment1').value,
      document.getElementById('update-comment2').value
    ].filter(c => c.trim() !== '')
  };
  
  const heroesData = getHeroes();
  heroesData.heroes[index] = updatedHero;
  saveHeroes(heroesData);
  
  alert(`Hero "${updatedHero.name}" updated successfully!`);
  
  document.getElementById('update-form').style.display = 'none';
  document.getElementById('update-form').reset();
  
  populateSelects();
  displayHeroes();
}

function cancelUpdate() {
  document.getElementById('update-form').style.display = 'none';
  document.getElementById('update-form').reset();
}


function deleteHero() {
  const selectIndex = document.getElementById('delete-select').value;
  
  if (selectIndex === '') {
    alert('Please select a hero to delete.');
    return;
  }
  
  const heroesData = getHeroes();
  const heroName = heroesData.heroes[selectIndex].name;
  
  const confirmed = confirm(`Are you sure you want to delete "${heroName}"?`);
  
  if (confirmed) {
    heroesData.heroes.splice(selectIndex, 1);
    saveHeroes(heroesData);
    
    alert(`Hero "${heroName}" deleted successfully!`);
    
    document.getElementById('delete-select').value = '';
    
    populateSelects();
    displayHeroes();
  }
}


document.addEventListener('DOMContentLoaded', () => {
  const heroesData = getHeroes();
  if (heroesData.heroes.length === 0) {
    const defaultHeroes = {
      heroes: [
        {
          name: "Navy Captain Landy",
          skill1: "Precision Targeting: Attacks with gunfire, increases CR by 20%, 40% chance to use Salvo Fire.",
          skill2: "Ruler of the Sea: Immune to stun/sleep, +50% Crit Resist, ATK stacks up to 50%.",
          skill3: "Mobilize the Warship: Attacks all enemies, stuns for 1 turn, 60% DEF penetration.",
          comments: [
            "She was an extremely annoying hero when she first came out with high stats and strong skills.",
            "But now, she is not that powerful anymore. Many heroes can counter her."
          ]
        },
        {
          name: "Remnant Violent",
          skill1: "Sword Flash: Cuts the enemy, 60% chance to decrease Hit Chance for 1 turn.",
          skill2: "Concentration: Increases Evasion by 50%, gains Focus on dodge, uses Massacre at 5 Focus.",
          skill3: "Massacre: Increases Attack for 3 turns, attacks enemy with sword, 50% DEF penetration.",
          comments: [
            "A truly fantastic hero if you are lucky, he can constantly dodge enemy attacks!",
            "However, some heroes have accuracy boosts, so not ideal to pick early in PvP."
          ]
        }
      ]
    };
    saveHeroes(defaultHeroes);
  }
  
  document.getElementById('create-form').addEventListener('submit', createHero);
  
  document.getElementById('load-hero-btn').addEventListener('click', loadHeroForUpdate);
  document.getElementById('update-form').addEventListener('submit', updateHero);
  document.getElementById('cancel-update-btn').addEventListener('click', cancelUpdate);
  
  document.getElementById('delete-btn').addEventListener('click', deleteHero);
  
  document.getElementById('refresh-display-btn').addEventListener('click', () => {
    displayHeroes();
    populateSelects();
  });
  
  populateSelects();
  displayHeroes();
  
  console.log('CRUD operations initialized');
});