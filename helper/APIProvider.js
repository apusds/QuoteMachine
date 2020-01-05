const axios = require('axios')

class APIProvider {

    async getQuote() {
        return await axios.get(`https://api.apiit.edu.my/apspacequote`);
    }

}

module.exports = APIProvider