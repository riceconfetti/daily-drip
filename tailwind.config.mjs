import { fontFamily } from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
const config = {
	darkMode: ['class'],
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue,json}'],
	safelist: ['dark'],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontSize: {
				xs: '.75rem',
				'2xs': '.6rem',
				'3xs': '.35rem'
			},
			colors: {
				border: 'hsl(var(--border) / <alpha-value>)',
				input: 'hsl(var(--input) / <alpha-value>)',
				ring: 'hsl(var(--ring) / <alpha-value>)',
				background: 'hsl(var(--background) / <alpha-value>)',
				foreground: 'hsl(var(--foreground) / <alpha-value>)',
				primary: {
					DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
					foreground: 'hsl(var(--primary-foreground) / <alpha-value>)'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
					foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
					foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
					foreground: 'hsl(var(--muted-foreground) / <alpha-value>)'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
					foreground: 'hsl(var(--accent-foreground) / <alpha-value>)'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
					foreground: 'hsl(var(--popover-foreground) / <alpha-value>)'
				},
				card: {
					DEFAULT: 'hsl(var(--card) / <alpha-value>)',
					foreground: 'hsl(var(--card-foreground) / <alpha-value>)'
				},
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
				},
				zzz: {
					event: '#FF6801',
					physical: {
						gradient: { from: '#FF6100', to: '#F5E800' }
					},
					fire: {
						gradient: { from: '#E50500', to: '#FFB04E' }
					},
					ice: { gradient: { from: '#00A8B6', to: '#B1F8F9' } },
					electric: { gradient: { from: '#0035FF', to: '#5DEDFC' } },
					ether: { gradient: { from: '#F70307', to: '#8BC6FC' } },
					default: { gradient: { from: '#212322', to: '#FF6801' } }
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: [...fontFamily.sans],
				genshin: ['Behind the Nineties', 'serif'],
				genshinSmall: ['"Yeseva One"', 'serif'],
				starrail: ['"Bai Jamjuree"', 'sans-serif'],
				reverse: ['"Playfair Display SC"', 'serif'],
				wuwa: ['"Philosopher"', 'serif'],
				zzz: ['Akira Expanded', 'san-serif']
			}
		}
	},
	plugins: [require('tailwind-gradient-mask-image')]
}

export default config
