const fs = require('fs')
const gradients = JSON.parse(
	fs.readFileSync('src/assets/gradients.json', {
		encoding: 'utf8',
		flag: 'r'
	})
)

const game = 'zzz'
const elements = ['physical', 'fire', 'ice', 'electric', 'ether', 'default']
let newGame = {}

elements.forEach((e) => {
	newGame[e] = `bg-gradient-to-r from-${game}-${e}-gradient-from to-${game}-${e}-gradient-to`
})

gradients[game] = newGame

fs.writeFile('src/assets/gradients.json', JSON.stringify(gradients, null, 4), (err) => {
	if (err) {
		console.error(err)
	}
})
