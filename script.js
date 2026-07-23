// Загрузка новостей из JSON файла
async function loadNews() {
    try {
        const response = await fetch('news.json');
        const data = await response.json();
        const newsContainer = document.getElementById('news-container');
        
        if (data.news && data.news.length > 0) {
            newsContainer.innerHTML = '';
            data.news.forEach(item => {
                const newsItem = document.createElement('div');
                newsItem.className = 'news-item';
                newsItem.innerHTML = `
                    <div class="news-date">${formatDate(item.date)}</div>
                    <div class="news-title">${item.title}</div>
                    <div class="news-content">${item.content}</div>
                `;
                newsContainer.appendChild(newsItem);
            });
        } else {
            newsContainer.innerHTML = '<p>Новостей нет</p>';
        }
    } catch (error) {
        console.error('Ошибка при загрузке новостей:', error);
        document.getElementById('news-container').innerHTML = '<p>Ошибка при загрузке новостей</p>';
    }
}

// Загрузка информации о сервере из JSON файла
async function loadServerContent() {
    try {
        const response = await fetch('server-content.json');
        const data = await response.json();
        const contentContainer = document.getElementById('server-content-placeholder');
        
        if (data.buildings || data.clans) {
            let html = '';
            
            if (data.buildings && data.buildings.length > 0) {
                html += '<h3>🏗️ Постройки на сервере:</h3><ul>';
                data.buildings.forEach(building => {
                    html += `<li><strong>${building.name}</strong> - ${building.description}</li>`;
                });
                html += '</ul>';
            }
            
            if (data.clans && data.clans.length > 0) {
                html += '<h3>👥 Кланы:</h3><ul>';
                data.clans.forEach(clan => {
                    html += `<li><strong>${clan.name}</strong> (Лидер: ${clan.leader}) - ${clan.description}</li>`;
                });
                html += '</ul>';
            }
            
            contentContainer.innerHTML = html;
        } else {
            contentContainer.innerHTML = '<p>Информация о сервере еще не добавлена</p>';
        }
    } catch (error) {
        console.error('Ошибка при загрузке информации о сервере:', error);
        document.getElementById('server-content-placeholder').innerHTML = '<p>Информация о сервере еще не добавлена</p>';
    }
}

// Форматирование даты
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('ru-RU', options);
}

// Плавная прокрутка по якорям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Загрузка данных при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    loadNews();
    loadServerContent();
});