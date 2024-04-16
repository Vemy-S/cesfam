import path from 'path'

export const staticLogin = (req, res) =>{
    res.sendFile(path.join(__dirname, '..views/auth', 'login2.html'));
}