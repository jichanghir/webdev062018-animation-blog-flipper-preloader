document.addEventListener('DOMContentLoaded', () => {
    const WIN = window;
    const DOC = document;
    const articles = DOC.getElementsByClassName('blog__article'); // статьи справа
    const $articlesList = DOC.querySelector('#blog__article-list'); // ul со списком статей слева
    const $articleTitles = DOC.querySelector('#blog__article-titles'); // aside
    const articleTitleList = DOC.getElementsByClassName('blog__article-title');
    let activeArticleId = null;

    function getCoords(elem) {
        const box = elem.getBoundingClientRect(); // {top: 123, left: 123}

        return {
            top: box.top + WIN.pageYOffset,
            left: box.left + WIN.pageXOffset
        };
    }

    function setArticleActive() {
        function setActive(artcl) {
            if (artcl.dataset.idtitle !== activeArticleId) {
                [...articleTitleList].forEach((el) => el.classList.remove('active'));

                DOC.getElementById(artcl.dataset.idtitle).classList.add('active');
                activeArticleId = artcl.dataset.idtitle;
            }
        }

        if (WIN.pageYOffset < getCoords(articles[0]).top) {
            setActive(articles[0]);
        }
        else if (WIN.pageYOffset + WIN.innerHeight === DOC.body.offsetHeight) {
            setActive(articles[articles.length - 1]);
        }
        else {
            [...articles].forEach((article) => {
                const elemTop = getCoords(article).top;
                if (WIN.pageYOffset > elemTop - 150) {
                    setActive(article);
                }
            });
        }
    }

    function setArticleChords() {
        // в elemChords получаем объект с координатами aside
        const elemChords = getCoords($articleTitles);

        if (WIN.pageYOffset >= elemChords.top - 30) {
            $articlesList.style.position = 'fixed';
            $articlesList.style.top = '30px';
        }
        else {
            $articlesList.style.position = 'static';
        }
    }

    if ($articlesList && articles.length) {

        // выполниться только тогда когда будет действия скроллинг
        WIN.onscroll = () => {
            setArticleChords();
            setArticleActive();
        };

        // выполниться при загрузке кода
        setArticleChords();
        setArticleActive();

        WIN.onresize = () => {
            $articlesList.style.width = $articlesList.offsetWidth;
        }

    }
});
