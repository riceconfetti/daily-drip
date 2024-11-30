import dotenv from 'dotenv'
dotenv.config()

import { createHmac } from 'node:crypto';

const hexDecode = (hex) => Buffer.from(hex, 'hex')
export default function sign(target) {
    const hmac = createHmac('sha256', hexDecode(process.env.IMGPROXY_KEY))
    hmac.update(hexDecode(process.env.IMGPROXY_SALT))
    hmac.update(target)
  
    const signature = hmac.digest('base64url')

    return `/${signature}${target}`
}