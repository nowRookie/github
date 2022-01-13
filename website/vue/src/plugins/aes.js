import CryptoJS from "crypto-js";
let secretKey = "cqysxx@123456789";
/**
 * AES加密方法
 * @param content 要加密的字符串
 * @returns {string} 加密结果
 */
export const aesEncrypt = (content) => {
  let key = CryptoJS.enc.Utf8.parse(secretKey);
  let srcs = CryptoJS.enc.Utf8.parse(content);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
};

/**
 * 解密方法
 * @param encryptStr 密文
 * @returns {string} 明文
 */
export const aesDecrypt = (encryptStr) => {
  let key = CryptoJS.enc.Utf8.parse(secretKey);
  let decrypt = CryptoJS.AES.decrypt(encryptStr, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return CryptoJS.enc.Utf8.stringify(decrypt).toString();
};
