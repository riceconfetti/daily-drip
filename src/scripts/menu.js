document.querySelector('.hamburger').addEventListener('click', () => {
	document.querySelector('.nav-links').classList.toggle('translate-x-full')
})

document.querySelector('.settings').addEventListener('click', () => {
	document.querySelector('#settings').classList.toggle('hidden');
	document.querySelector('#settings').classList.toggle('flex');
})
