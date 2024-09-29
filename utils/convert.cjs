const fs = require('fs')
const child_process = require('child_process')
const cwebp = 'C:/Users/mifan/Documents/GitHub/daily-drip/utils/libwebp/bin/cwebp.exe'

let placeholders = fs.readdirSync('./src/assets/placeholders/wuwa')

for (let img of placeholders) {
	if (img.endsWith('png')) {
		child_process.execSync(
			`${cwebp} src/assets/placeholders/wuwa/${img} -o src/assets/placeholders/wuwa/${img.slice(0, -4)}.webp`
		)
	}
}
