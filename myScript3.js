document.addEventListener('DOMContentLoaded', () => {

    const eyeWhite = document.getElementById('eye-white');
    const pupil = document.getElementById('pupil');
    const bodyGreen = document.getElementById('body-green');

    // Глаз щурится (но зрачок не меняется)
    document.getElementById('nn').addEventListener('mouseenter', () => {
        eyeWhite.setAttribute('ry', 50);   // Щурится
    });

    document.getElementById('nn').addEventListener('mouseleave', () => {
        eyeWhite.setAttribute('ry', 104);  // Открывает глаз
    });

    // Зрачок следит за курсором
    document.addEventListener('mousemove', (e) => {
        const svgRect = document.querySelector('svg').getBoundingClientRect();
        const cx = 484;
        const cy = 210.323;

        const eyeX = cx * (svgRect.width / 1000) + svgRect.left;
        const eyeY = cy * (svgRect.height / 400) + svgRect.top;

        const dx = e.clientX - eyeX;
        const dy = e.clientY - eyeY;
        const angle = Math.atan2(dy, dx);

        const maxOffset = 20;
        const offsetX = Math.cos(angle) * maxOffset;
        const offsetY = Math.sin(angle) * maxOffset;

        pupil.setAttribute('cx', cx + offsetX);
        pupil.setAttribute('cy', cy + offsetY);
    });

    let stats = {
        hunger: 100,
        boredom: 100,
        cleanliness: 100
    };

    // Функция обновления шкал
    function updateBars() {
        for (let key in stats) {
            const value = Math.max(0, stats[key]);
            document.getElementById(key).style.width = value + '%';
        }
    }

	function updateEyeColorByHunger() {
		const hunger = Math.max(0, Math.min(100, stats.hunger));
		const t = 1 - (hunger / 100); // t = 0 при 100 голода (белый), t = 1 при 0 (макс. красный)

		const r = Math.round(255 + (166 - 255) * t); // от 255 к 166
		const g = Math.round(255 + (4 - 255) * t);   // от 255 к 4
		const b = Math.round(255 + (12 - 255) * t);  // от 255 к 12

		const color = `rgb(${r}, ${g}, ${b})`;
		eyeWhite.setAttribute('fill', color);
	}

	function updateBodyColorByBoredom() {
		const boredom = Math.max(0, Math.min(100, stats.boredom));
		const t = 1 - (boredom / 100); // t = 1 при скуке 0 (макс. зелёный), t = 0 при 100 (чёрный)

		const r = Math.round(0 + (93 * t));   // от 0 к 93
		const g = Math.round(0 + (139 * t));  // от 0 к 139
		const b = Math.round(0 + (46 * t));   // от 0 к 46

		const color = `rgb(${r}, ${g}, ${b})`;
		bodyGreen.setAttribute('fill', color);
	}

    function updatePupil(purityScale) {
        const pupil = document.querySelector('#pupil');
        const scale = Math.max(3, 32.5 * purityScale); // чем ниже purityScale, тем меньше зрачок
        pupil.setAttribute('rx', scale);
        pupil.setAttribute('ry', scale);
    }

    // Уменьшаем параметры со временем
    setInterval(() => {
        stats.hunger -= 1.2;      // Голод убывает быстрее
        stats.boredom -= 0.9;     // Скука — средне
        stats.cleanliness -= 0.6; // Чистота медленно

        updateBars();
        updateEyeColorByHunger(); // вот оно!
        updateBodyColorByBoredom(); // вот оно!

        // Используем шкалу чистоты для изменения зрачка
        const purityScale = Math.max(0, Math.min(1, stats.cleanliness / 100)); // чистота от 0 до 1
        updatePupil(purityScale); // передаём шкалу чистоты как параметр
    }, 1000);

    // Функции для увеличения значений шкал
    function increaseHunger() {
        stats.hunger = Math.min(100, stats.hunger + 5);  // Увеличиваем голод, не выше 100
        updateBars();
    }

    function increaseBoredom() {
        stats.boredom = Math.min(100, stats.boredom + 5);  // Увеличиваем скуку, не выше 100
        updateBars();
    }

    function increaseCleanliness() {
        stats.cleanliness = Math.min(100, stats.cleanliness + 5);  // Увеличиваем чистоту, не выше 100
        updateBars();
    }

    // Назначаем обработчики событий для кнопок
    document.querySelector('#increaseHunger').addEventListener('click', increaseHunger);
    document.querySelector('#increaseBoredom').addEventListener('click', increaseBoredom);
    document.querySelector('#increaseCleanliness').addEventListener('click', increaseCleanliness);

createPlusButton("plus-hunger", 0, 0, () => {
  stats.hunger = Math.min(100, stats.hunger + 10);
});
createPlusButton("plus-boredom", 60, 0, () => {
  stats.boredom = Math.min(100, stats.boredom + 10);
});
createPlusButton("plus-cleanliness", 120, 0, () => {
  stats.cleanliness = Math.min(100, stats.cleanliness + 10);
});
});
