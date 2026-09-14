// Загружаем статьи из JSON и рендерим плитки
async function loadArticles() {
    const container = document.getElementById('tiles-container');

    try {
        const response = await fetch('../json/articles.json');
        if (!response.ok) throw new Error('Не удалось загрузить articles.json');

        const articles = await response.json();

        // Если статей нет — покажем заглушку
        if (!articles.length) {
            container.innerHTML = '<p style="color:#a3b899;">Пока нет статей.</p>';
            return;
        }

        // Собираем HTML для всех плиток
        container.innerHTML = articles.map(item => `
            <a href="${item.link}" class="tile" target="_blank" rel="noopener">
                <img class="tile-image" src="${item.image}" alt="${item.title}">
                <div class="tile-content">
                    <div>
                        <div class="tile-title">${item.title}</div>
                        <div class="tile-desc">${item.desc}</div>
                    </div>
                    <div class="tile-meta">${item.meta}</div>
                </div>
            </a>
        `).join('');

    } catch (error) {
        console.error(error);
        container.innerHTML = '<p style="color:#ff6b6b;">Ошибка загрузки статей. Проверь articles.json.</p>';
    }
}

loadArticles();