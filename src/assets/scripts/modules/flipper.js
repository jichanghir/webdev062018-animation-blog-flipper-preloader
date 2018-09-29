{
    const DOC = document;
    const WIN = window;

    const flipper = DOC.getElementById('flipper');

    flipper && DOC.addEventListener('DOMContentLoaded', () => {
        DOC.getElementById('flipper-rotate')
            .addEventListener('click', () => {
                flipper.classList.toggle('rotate');
            });

        DOC.getElementsByTagName('body')[0]
            .addEventListener('click', (e) => {
                if (!e.target.closest('#flipper') && !e.target.closest('#flipper-rotate')) {
                    if (flipper.classList.contains('rotate')) {
                        flipper.classList.remove('rotate');
                    }
                }
            });
    });
};
