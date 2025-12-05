
// Simple Hero Card - Only for CRUD page
// Only displays: name, skill1, skill2, skill3, comments

class SimpleHeroCard extends HTMLElement {
  constructor() {
    super();
  }
  
  connectedCallback() {

    if (this.querySelector('.simple-hero-content')) {
      return;
    }
    

    const heroName = this.getAttribute('name') || 'Hero Name';
    const skill1 = this.getAttribute('skill1') || '';
    const skill2 = this.getAttribute('skill2') || '';
    const skill3 = this.getAttribute('skill3') || '';
    

    let commentsList = [];
    const commentsAttr = this.getAttribute('comments');
    if (commentsAttr) {
      try {
        commentsList = JSON.parse(commentsAttr);
      } catch (e) {
        commentsList = [commentsAttr];
      }
    }
    
  
    this.innerHTML = '';
    

    const container = document.createElement('div');
    container.className = 'simple-hero-content';
    

    const title = document.createElement('h2');
    title.textContent = heroName;
    container.appendChild(title);
    
  
    if (skill1 || skill2 || skill3) {
      const skillsList = document.createElement('ul');
      skillsList.className = 'skills-list';
      
      if (skill1) {
        const li1 = document.createElement('li');
        li1.innerHTML = `<strong>Skill 1:</strong> ${skill1}`;
        skillsList.appendChild(li1);
      }
      
      if (skill2) {
        const li2 = document.createElement('li');
        li2.innerHTML = `<strong>Skill 2:</strong> ${skill2}`;
        skillsList.appendChild(li2);
      }
      
      if (skill3) {
        const li3 = document.createElement('li');
        li3.innerHTML = `<strong>Skill 3:</strong> ${skill3}`;
        skillsList.appendChild(li3);
      }
      
      container.appendChild(skillsList);
    }
    

    if (commentsList && commentsList.length > 0) {
      const commentsDiv = document.createElement('div');
      commentsDiv.className = 'comments-section';
      
      const commentTitle = document.createElement('strong');
      commentTitle.textContent = 'My Comment:';
      commentsDiv.appendChild(commentTitle);
      
      const ol = document.createElement('ol');
      
      commentsList.forEach(comment => {
        const li = document.createElement('li');
        li.textContent = comment;
        ol.appendChild(li);
      });
      
      commentsDiv.appendChild(ol);
      container.appendChild(commentsDiv);
    }
    

    this.appendChild(container);
  }
}


customElements.define('simple-hero-card', SimpleHeroCard);

console.log('SimpleHeroCard registered successfully!');