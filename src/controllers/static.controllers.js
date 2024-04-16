import path from 'path'

export default staticLogin = (req, res) =>{
    res.sendFile(path.join(__dirname, '..views/auth', 'login2.html'));
}