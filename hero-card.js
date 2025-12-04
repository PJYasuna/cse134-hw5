class HeroCard extends HTMLElement {
  constructor() {
    super();
  }
  
  connectedCallback() {
    // 检查是否已经处理过（避免重复执行）
    if (this.querySelector('.hero-card-content')) {
      return;
    }
    
    // 获取基本属性
    const imageSrc = this.getAttribute('image') || '';
    const imageAlt = this.getAttribute('alt') || 'Hero image';
    const heroName = this.getAttribute('name') || 'Hero Name';
    const readMoreLink = this.getAttribute('link') || '#';
    
    // 尝试从 data 属性读取（JSON 格式）
    let heroData = null;
    const dataAttr = this.getAttribute('data');
    if (dataAttr) {
      try {
        heroData = JSON.parse(dataAttr);
      } catch (e) {
        console.error('Failed to parse hero data:', e);
      }
    }
    
    // 获取技能（优先使用 heroData，否则使用单独的属性）
    const skill1 = heroData?.skills?.[0] || this.getAttribute('skill1') || '';
    const skill2 = heroData?.skills?.[1] || this.getAttribute('skill2') || '';
    const skill3 = heroData?.skills?.[2] || this.getAttribute('skill3') || '';
    
    // 获取评论
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
    
    // 清空
    this.innerHTML = '';
    
    // 创建容器
    const container = document.createElement('div');
    container.className = 'hero-card-content';
    
    // 创建 picture 元素
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
    
    // 创建标题
    const title = document.createElement('h2');
    title.textContent = heroName;
    container.appendChild(title);
    
    // 创建技能部分
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
    
    // 创建评论部分
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
    
    // 创建链接
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
    
    // 添加到元素中
    this.appendChild(container);
    
    console.log('HeroCard created:', heroName, 'Image:', imageSrc);
  }
}

// 注册自定义元素
customElements.define('hero-card', HeroCard);

console.log('HeroCard custom element registered successfully!');