import jwt from 'jsonwebtoken';
export const createToken = (id, email, expiresIn) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables.");
    }
    const payload = { id, email };
    try {
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn,
        });
        return token;
    }
    catch (error) {
        console.error("Error signing token:", error);
        throw new Error("Could not create token.");
    }
};
export default createToken;
//# sourceMappingURL=token-manager.js.map