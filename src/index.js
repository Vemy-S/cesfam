import app from './app.js'
import {port, host} from './config.js'


app.listen(port, host, ()=>{
    console.log(`Server on http://${host}:${port}`)
})


process.on('SIGTERM', () => {
    server.close(() => {
      console.log('Process terminated');
    });
  });
  
  process.on('SIGINT', () => {
    server.close(() => {
      console.log('Process interrupted');
    });
  })