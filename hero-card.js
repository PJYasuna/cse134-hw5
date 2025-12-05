class HeroCard extends HTMLElement {
  constructor() {
    super();
  }
  
  connectedCallback() {
    if (this.querySelector('.hero-card-content')) {
      return;
    }
    
    const imageSrc = this.getAttribute('image') || '';
    const imageAlt = this.getAttribute('alt') || 'Hero image';
    const heroName = this.getAttribute('name') || 'Hero Name';
    const readMoreLink = this.getAttribute('link') || '#';
    
    let heroData = null;
    const dataAttr = this.getAttribute('data');
    if (dataAttr) {
      try {
        heroData = JSON.parse(dataAttr);
      } catch (e) {
        console.error('Failed to parse hero data:', e);
      }
    }
    
    const skill1 = heroData?.skills?.[0] || this.getAttribute('skill1') || '';
    const skill2 = heroData?.skills?.[1] || this.getAttribute('skill2') || '';
    const skill3 = heroData?.skills?.[2] || this.getAttribute('skill3') || '';

    let commentsList = [];
    if (heroData?.comments) {
      commentsList = heroData.comments;
    } else {
      const commentsAttr = this.getAttribute('comments');
      if (commentsAttr) {
        try {
          commentsList = JSON.parse(commentsAttr);
        } catch (e) {
          commentsList = [commentsAttr];
        }
      }
    }
    

    this.innerHTML = '';
    
    const container = document.createElement('div');
    container.className = 'hero-card-content';
    

    const picture = document.createElement('picture');
    const source = document.createElement('source');
    source.srcset = imageSrc;
    source.type = 'image/png';
    
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = imageAlt;
    img.onerror = function() {
      console.error('Image failed to load:', imageSrc);
    };
    
    picture.appendChild(source);
    picture.appendChild(img);
    container.appendChild(picture);
    

    const title = document.createElement('h2');
    title.textContent = heroName;
    container.appendChild(title);
    

    if (skill1 || skill2 || skill3) {
      const skillsDiv = document.createElement('div');
      skillsDiv.className = 'hero-skills';
      
      const skillsList = document.createElement('ul');
      
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
      
      skillsDiv.appendChild(skillsList);
      container.appendChild(skillsDiv);
    }
    
 
    if (commentsList && commentsList.length > 0) {
      const commentsDiv = document.createElement('div');
      commentsDiv.className = 'hero-comments';
      
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
    

    const linksDiv = document.createElement('div');
    linksDiv.className = 'hero-links';
    const link = document.createElement('a');
    link.href = readMoreLink;
    link.className = 'read-more-btn';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = `Learn More About ${heroName}`;
    linksDiv.appendChild(link);
    container.appendChild(linksDiv);
 
    this.appendChild(container);
    
    console.log('HeroCard created:', heroName, 'Image:', imageSrc);
  }
}


customElements.define('hero-card', HeroCard);

console.log('HeroCard custom element registered successfully!');