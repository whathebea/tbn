import { auth } from "@firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { NextApiRequest, NextApiResponse } from "next";

async function signup(email: string, password: string) {
    return await createUserWithEmailAndPassword(auth, email, password)
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { email, password } = req.body;
    
            if (!email || !password) {
                return res.status(400).json({ error: 'Email and password are required' });
            }
            
            await signup(email, password);
            return res.status(200).json({ message: 'Signup successful' });
        } catch (error) {
            return res.status(500).json({ error: 'Signup failed' });
        }
    } else {
        return res.status(405).json({ error: 'Method not allowed' });
    }
}
