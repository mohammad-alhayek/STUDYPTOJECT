import sql from 'mssql/msnodesqlv8.js'; // تأكد من الاستيراد من هذا المسار لتفعيل الويندوز
import dotenv from 'dotenv';

dotenv.config();
console.log("Loading db.js...");
const config = {
    server: process.env.DB_SERVER,     
    database: process.env.DB_NAME,     
    driver: 'msnodesqlv8',             
    options: {
        trustedConnection: true,       
        trustServerCertificate: true
    },
    // إجبار المكتبة على استخدام تعريف ODBC المتوفر في ويندوز
connectionString: `Driver={SQL Server};Server=${process.env.DB_SERVER};Database=${process.env.DB_NAME};Trusted_Connection=yes;`};

// إنشاء الـ Connection Pool وتصديره كـ Promise مسمى
export const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to SQL Server via Windows Authentication successfully!');
        return pool;
    })
    .catch(err => {
        console.error('Database connection failed: ', err);
        throw err;
    });

// تصدير كائن sql كـ default
export default sql;