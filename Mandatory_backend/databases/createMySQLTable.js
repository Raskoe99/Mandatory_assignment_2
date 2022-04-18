import db from "./createMySQLConnection.js"

const inDeleteMode = false

function createTable() {
    db.query(`CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT UNIQUE, 
        username VARCHAR(70) UNIQUE, 
        hashedPassword VARCHAR(70), 
        email VARCHAR(70)
        );
    `)
    
    if (inDeleteMode) {
        db.query(`INSERT INTO users (username, hashedpassword, email) VALUES 
        ("ladybug", "$2b$12$VtICNSxyaOHnEB6V71FrrOAIkQhboWqXy.pE3qwMCqOkWTVEo4e/u", "furnitureAndYou@outlook.com"),
        ("c00ldud3", "$2b$12$zoDvoa1YkMWKs0u405z5IOetcqMmUlW0qXduCjpADyc3VHFSnEWe6", "furnitureAndYou@outlook.com"),
        ("test", "$2b$12$nLQ8WAENNNpfj5LNJV86I.pP56qp16hMsr966vvK1PX99/xJFzgeG", "furnitureAndYou@outlook.com");
        `)
    }
    
    db.end
}

createTable()

export default db