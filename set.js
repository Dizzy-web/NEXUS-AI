




const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0gxa2tjR2w0K2UwN21DMlFScWUyTkFFYmc3a1NXUjBBRk1kMTEwUFpYWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTEhOOUcveWhKckJzKzRLNkZkbXNuSTJjNjRjMDRxWjc0eGVvNHFaeWJ4MD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFTHV3dVQ5cytxaEJRaXkvT0NBYmF5RGhrakx3NjZ1V1dzcjN1S1BBSlZnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLMVNJVTJrdUgzWkNTdUxXcE5TV0JsZy9MTm9DdHZJM0YzRFUrTk5mNGpNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklDazEyNktyWHdOajJORkVaQVU0eUN0b1FkMEFGNitqVVlKa0VnZXN6bm89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlhhdmJtTURzV1ZWMFFjQm8vOUJSbTJ6Wjl1VjU1cTlsN2JUYnRqV2xrM0k9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0J6Wm42QmtnR3NJUFU4NWtHcG1oVUNOaU9LYmJnUUpzUVl6b3ZtYTYyZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib21aZkRpL1dHTlFTRlVYdkEyQ1A3T1YxSS9YNHVuSXEzdGFwNzRwL054Yz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InZwdlVyb0p2c1kveGNJckxZcmhDV1c5V29yMHNDSXJ4MDF5YnRIZHYvamlBYkFPRXU2Y1Q0RW5MOW9KVVVKY1JuZktCZURQWWtrd2RrSXNMVHpzdENBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTMsImFkdlNlY3JldEtleSI6InRHL0VRVDNBc0VZSFB0ZE8rRmlQNnBLR0xobWtHNVZrTmV3M2tjZ1RkSFk9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjU1NjExNDI1NDY4QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjdEQ0FCRkMwMTAyNzFERjNFQTQ5NzREQzkwRDE1MDg0In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDgzODk3NTJ9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI1NTYxMTQyNTQ2OEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI0RjJGRDM0MkFENjIyMjkxRDJGNkMxRjBBOTI2NDM4MCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ4Mzg5NzUzfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJGM0tCQzMzVyIsIm1lIjp7ImlkIjoiMjU1NjExNDI1NDY4OjI3QHMud2hhdHNhcHAubmV0IiwibmFtZSI6ImFsaXNvbiIsImxpZCI6Ijg1MTc1NTc2OTA1NDM6MjdAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNOSHkyUFVGRU5lZTJjRUdHQWNnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJ5Y05uYnhPRWloMXJuUWU5UW04aUJZbk9nVmNRRkVVS0lraC9uZUdiTm5zPSIsImFjY291bnRTaWduYXR1cmUiOiJ1Qk1MdUpVY2draTEyN2hKZk9QUTluV2NiMTllMnZiVHdkV3ZROC9KYmdpVUNNQTVpZEpxdWMyK1dpY1NOWW05cWRmSW1wVWxjcjRId3BNdUI3WitEdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoibDFyZ0FEWHlTZGw1cUtqRXN0Nm94UnBHVWw0bW8xdHFzUFQraEFKU1FWdEZWMU1OakpkaXRic0JOaTZsRzU0RVJVYmVNblMwZi9xazRaQ1ZRQkZyQnc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTU2MTE0MjU0Njg6MjdAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCY25EWjI4VGhJb2RhNTBIdlVKdklnV0p6b0ZYRUJSRkNpSklmNTNobXpaNyJ9fV0sInBsYXRmb3JtIjoic21iYSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FnSUFnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ4Mzg5NzMzLCJsYXN0UHJvcEhhc2giOiIyUDFZaGYiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUVhKyJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "255611425468",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL : process.env.ANTICALL || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  CHATBOT : process.env.CHATBOT || "yes",
                  AUTO_BIO : process.env.AUTO_BIO || "yes",
                  AUTO_REACT : process.env.AUTO_REACT || "yes",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
