import { createClient } from "redis";
import type { RedisClientType } from "redis";
import { createHash } from 'node:crypto'
import * as crypto from "crypto";
const ALGORITHM = "aes-256-cbc";
const ENCODING = "hex";
export class Services {
  public cache: RedisClientType;
  private ENCRYPTION_KEY: string =
    "enjoys_encrption_key!@#%^&*()_NJ" || process.env.ENCRYPTION_KEY;
  private IV_LENGTH = 16;
  constructor() {
    this.cache = createClient({
      password: 'l9GNnvy8Yo0tJFuoJcW2LZHb6itLqcZl',
      socket: {
        host: 'redis-19063.c212.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 19063
      }
    });
    this.ConnectRedisClient()
  }

  private async ConnectRedisClient() {
    this.cache.on("error", (error: any) => console.error(`Error : ${error}`));
    await this.cache.connect().then(() => console.log(`Redis Connected Successfully`)).catch((error: any) => console.error(`Error : ${error}`));
  }
  Md5Checksum(content: string): string {
    return createHash('md5').update(content).digest("hex")
  }
   
  SimpleHash(): string {
    return crypto.randomBytes(16).toString('hex')
  }
  encrypt(data: any): string {
    if (typeof data === "object") {
      data = JSON.stringify(data);
    }
    const iv = crypto.randomBytes(this.IV_LENGTH);
    const cipher = crypto.createCipheriv(
      ALGORITHM,
      Buffer.from(this.ENCRYPTION_KEY),
      iv
    );
    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return `${iv.toString(ENCODING)}:${encrypted.toString(ENCODING)}`;
  }
  decrypt(text: any): any {
    const textParts = text.split(":");
    const iv = Buffer.from(textParts.shift(), ENCODING);
    const encryptedText = Buffer.from(textParts.join(":"), ENCODING);
    const decipher = crypto.createDecipheriv(
      ALGORITHM,
      Buffer.from(this.ENCRYPTION_KEY),
      iv
    );
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
  }

}