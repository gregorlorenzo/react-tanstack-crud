# KPOP Idol Table using TanStack, React, Express, and MongoDB

This project serves as a practice in creating CRUD operations using TanStack's table and query libraries. The backend is built with Express.js and MongoDB, providing a foundation for managing KPOP idols' information.

## Installation

1. Ensure you have Node.js and MongoDB installed on your system.
2. Clone this repository:
```
git clone [repository_url]
```
3. Navigate to the project directory:
```
cd kpop-idol-table
```
4. Install the dependencies:
```
npm install
```

## Usage

### Backend Routes and Controllers:
Routes:

    GET /api/v1/idols - Fetch all idols.
    GET /api/v1/idols/:id - Fetch a specific idol by ID.
    POST /api/v1/idols - Create a new idol.
    PUT /api/v1/idols/:id - Update an existing idol by ID.
    DELETE /api/v1/idols/:id - Delete an idol by ID.

Controllers:

    findAll: Retrieve all idols from the database.
    findOne: Find a specific idol by its ID.
    create: Create a new idol entry in the database.
    update: Update an existing idol's information.
    delete: Delete an idol from the database.

### Example Controller:
```
// Sample controller for fetching all idols
const db = require("../model");
const Idol = db.idols;

exports.findAll = async (req, res) => {
    // ... (implementation details)
}

// ... (other controller functions)

```

### Model
```
// Idol Model
const mongoose = require("mongoose");

const Idol = mongoose.model("Idol", new mongoose.Schema({
    // ... (fields definition)
}));

module.exports = Idol;

```
## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## License

This project is licensed under the MIT License. See the [LICENSE](https://choosealicense.com/licenses/mit/) file for details.
