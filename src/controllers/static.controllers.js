import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createReadStream } from 'fs';

export const staticLogin = (req, res) => {
    const __filename = fileURLToPath(import.meta.url);
    
    // Obtiene la ruta del directorio del proyecto
    const projectDir = process.cwd();

    // Mapea las URL solicitadas a los archivos correspondientes
    const fileMappings = {
        '/loginuser': 'views/auth/login2.html',
        '/css/style.css': 'views/static/css/style.css',
        '/js/loginRequest.js': 'views/static/js/loginRequest.js'
    };

    // Verifica si la URL solicitada está mapeada a un archivo
    const filePath = fileMappings[req.url];

    if (filePath) {
        // Si la URL coincide con un archivo mapeado, se sirve ese archivo
        const fullPath = join(projectDir, filePath);
        const readStream = createReadStream(fullPath);
        readStream.pipe(res);
    } else {
        // Si la URL no coincide con ningún archivo mapeado, se devuelve un error 404
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
};

