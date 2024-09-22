/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue,json}'],
	theme: {
		extend: {
			fontSize: {
				xs: '.75rem',
				'2xs': '.6rem',
				'3xs': '.35rem'
			},
			fontFamily: {
				genshin: ['Behind the Nineties', 'serif'],
				genshinSmall: ['"Yeseva One"', 'serif'],
				starrail: ['"Bai Jamjuree"', 'sans-serif'],
				reverse: ['"Playfair Display SC"', 'serif'],
				wuwa: ['"Philosopher"', 'serif']
			},
			colors: {
				dark: '#232323',
				light: '#D1D1D1',
				text: {
					dark: '#D1D1D1',
					light: '#232323'
				},
				accent: {
					dark: '#C19C64',
					light: '#8A6329'
				},
				genshin: {
					event: '#223267',
					default: {
						gradient: {
							from: '#464646',
							to: '#A1A1A1'
						}
					},
					anemo: {
						bg: '#5EBEA1',
						text: '#000000B3',
						gradient: {
							from: '#24785B',
							to: '#44CAAA'
						}
					},
					electro: {
						bg: '#8350A1',
						text: '#000000B3',
						gradient: {
							from: '#2A1B3E',
							to: '#6A31C6'
						}
					},
					geo: {
						bg: '#C8A839',
						text: '#000000B3',
						gradient: {
							from: '#6C4700',
							to: '#DAB24B'
						}
					},
					dendro: {
						bg: '#7DB26A',
						text: '#000000B3',
						gradient: {
							from: '#0D3B10',
							to: '#6EB96D'
						}
					},
					cryo: {
						bg: '#B8E3F1',
						text: '#000000B3',
						gradient: {
							from: '#24587D',
							to: '#A0BAD1'
						}
					},
					hydro: {
						bg: '#5F91DD',
						text: '#000000B3',
						gradient: {
							from: '#001B58',
							to: '#4472CA'
						}
					},
					pyro: {
						bg: '#F25252',
						text: '#000000B3',
						gradient: {
							from: '#581402',
							to: '#A6280F'
						}
					}
				},
				starrail: {
					event: '#6D2628',
					wind: {
						gradient: {
							from: '#32693E',
							to: '#BAE9C0'
						}
					},
					lightning: {
						gradient: {
							from: '#49104B',
							to: '#E687FE'
						}
					},
					physical: {
						gradient: {
							from: '#413D3D',
							to: '#B8B8B8'
						}
					},
					fire: {
						gradient: {
							from: '#4F2B1E',
							to: '#FA8562'
						}
					},
					ice: {
						gradient: {
							from: '#218BCD',
							to: '#BDF3FF'
						}
					},
					quantum: {
						gradient: {
							from: '#32267E',
							to: '#9E9BE5'
						}
					},
					imaginary: {
						gradient: {
							from: '#C2AC16',
							to: '#FFF398'
						}
					}
				},
				reverse: {
					event: '#D48917'
				},
				wuwa: {
					event: '#464953',
					spectro: {
						gradient: {
							from: '#322F24',
							to: '#AE9A4E'
						}
					},
					aero: {
						gradient: {
							from: '#252724',
							to: '#779573'
						}
					},
					glacio: {
						gradient: {
							from: '#232A2B',
							to: '#54A4B1'
						}
					},
					electro: {
						gradient: {
							from: '#29242A',
							to: '#945AA1'
						}
					},
					fusion: {
						gradient: {
							from: '#2B2124',
							to: '#C23D5E'
						}
					},
					havoc: {
						gradient: {
							from: '#2B1F25',
							to: '#91285B'
						}
					}
				}
			}
		}
	},
	plugins: [require('tailwind-gradient-mask-image')]
}
