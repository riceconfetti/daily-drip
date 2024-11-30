import SignImage from './signature'

export default class ProxyService {
    static  baseUrl = 's3://s3-daily-drip-015812eb-e529-49ee-b23a-d95053fe9ef9';
    static  proxyUrl = 'http://images.dailydrip.news'

    static getImage(path, transforms) {
        return proxyImage(this.baseUrl + path, transforms)
    }
}

function proxyImage(path, transforms ) {
    let processParams = ''
    if (transforms){
        transforms.forEach((tf)=>{
            processParams +=`/${tf.key}`
            tf.params.forEach((opt)=>{
                processParams+= `:${opt}`
                //
            })
        })
    }

    let target = processParams +'/' + btoa(path)

    return `${ProxyService.proxyUrl}${SignImage(target)}`
} 


const character = 'xiangliyao';
const game = 'wuwa';
const fp= [.5, 0.35]

const bannerCard = [
    {key: 'gravity', params: ['fp', 0, fp[1]]},
    // {key: 'crop', params: [.65, .5]},
    {key: 'crop', params: [.85, .35]},
    {key: 'resize', params: ['fit', 1150, 300]},
    {key: 'extend', params:['1', 'ea']}
]

const gachaCard = [
    {key: 'gravity', params: ['fp', fp[0], fp[1]+.133]},
    {key: 'crop', params: [.4, 0]},
    {key: 'resize', params: ['fill', 600, 1050]},
]

console.log("Gacha Splash: \n", proxyImage(ProxyService.baseUrl+ '/characters/'+game+'/'+ character +'/gachaSplash.webp'), '\n')
console.log("Gacha Card: \n", proxyImage(ProxyService.baseUrl+ '/characters/'+game+'/'+ character +'/gachaSplash.webp', gachaCard), '\n')
console.log("Banner Card: \n", proxyImage(ProxyService.baseUrl+ '/characters/'+game+'/'+ character +'/gachaSplash.webp', bannerCard))