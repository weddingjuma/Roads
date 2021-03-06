# Roads
Real-time road events monitoring

## Requirements
- NodeJS
- MySQL
- MongoDB

## Installation
1. Install dependencies `npm install`
2. Start MongoDB `./mongod`
3. Change MySQL configuration in `app/config.js` for your instance
4. Load `dump.sql` in MySQL
5. Start node server `node server.js`

## Usage
- `GET /api/roads` Returns all road events information
- `GET /api/closed-roads` Returns all closed roads
- `GET /api/closed-roads/{name}` Returns closed roads that begin or end in {name} locality
- `GET /api/slow-roads` Returns all slow roads
- `GET /api/slow-roads/{name}` Returns slow roads that begin or end in {name} locality 
- `GET /api/working-roads` Returns all roads in work
- `GET /api/working/roads/{name}` Returns roads in work that begin or end in {name} locality

## Contributing
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D
## History
TODO: Write history
## Credits
TODO: Write credits
## License
TODO: Write license
