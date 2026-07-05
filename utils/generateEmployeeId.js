export const generateEmployeeId = () => {
    const prefix = "EMP";
    const year = new Date().getFullYear();

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomPart = "";

    for (let i = 0; i < 5; i++) {
        randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return `${prefix}-${year}-${randomPart}`;
};
export const generateUserId = () => {
    const prefix = "EMP";
    const year = new Date().getFullYear();

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomPart = "";

    for (let i = 0; i < 5; i++) {
        randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return `${prefix}-${year}-${randomPart}`;
};