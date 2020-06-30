let input = document.querySelectorAll('.input');
let icon = document.querySelectorAll('.icon-path');

for (let i = 0; i < input.length; i++) {

    input[i].addEventListener('click', function (e) {

        if (i === 1) {
            icon[1].classList.replace('icon-path', 'icon-path-active');
            icon[0].classList.replace('icon-path-active', 'icon-path');
            icon[2].classList.replace('icon-path-active', 'icon-path');
        } else if (i === 2) {
            icon[2].classList.replace('icon-path', 'icon-path-active');
            icon[1].classList.replace('icon-path-active', 'icon-path');
            icon[0].classList.replace('icon-path-active', 'icon-path');
        } else {
            icon[0].classList.replace('icon-path', 'icon-path-active');
            icon[1].classList.replace('icon-path-active', 'icon-path');
            icon[2].classList.replace('icon-path-active', 'icon-path');
        }

    });
}

document.getElementById("form").onclick = function() {
    document.getElementById("submit").submit();
};
