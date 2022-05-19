# Prerequisites and Information

    # Express Js installtion command (for creating server)

    Install express js using command to use the server: "npm i express --save"

    # Nodemon install (For automatic restart of the server when some there is change in the code)

    1.  Install nodemon using the following command for restarting the server whenever we are making any change in our js file:
        "npm i nodemon --save"

    2.  Then configure the package.json like below to use nodemon under script section of package.json.
        "start": "nodemon --watch dev -e js dev/app.js"

    3.  Now starting the server we will the following command:
        "npm run start"

    4.  Explannation for the command "nodemon --watch dev -e js dev/app.js":

        1. The above command means when we run the npm start command then watch for all files with the extension js under dev folder and restart the dev/app.js file.
        2. watch means look up for any change, dev stands dev folder
        3. -e js stands for extension js, dev/app.js is the particular file to be restarted
        4. Then install body parser to parse the request send from client like postman or browsers
        5. For installing body parser use the command:npm i body-parse --save
        6. To install request-promise use the command: npm i request-promise --save

    5.  If you want to have multiple nodes, we configure the script like below

        "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "node_1": "nodemon --watch dev -e js dev/networkNode.js",
        "node_2": "nodemon --watch dev -e js dev/networkNode.js",
        "node_3": "nodemon --watch dev -e js dev/networkNode.js",
        "node_4": "nodemon --watch dev -e js dev/networkNode.js",
        "node_5": "nodemon --watch dev -e js dev/networkNode.js"
        }

        We can use multiple nodes test, node_1, node_2, node_3 etc.

        For running the different nodes parallely or seperately we can use the command in different console window (for running different instance configured in package.json):
        "npm run <node_name>" e.g npm run node_1

    # To check what argv[2], arg[3] and argv[4] contains:

        Write the port no, url and node name in scripts section of package.json and we can use the same in code dynamically :

        "node_1": "nodemon --trace-warnings --watch dev -e js dev/networkNode.js 3001 http://localhost:3001 NODE1"

        Use the following to retrieve the port no, url and the node names like following:
        console.log(process.argv[2]); // 3001
        console.log(process.argv[3]); // http://localhost:3001
        console.log(process.argv[4]); // NODE1

    # How to retrieve query string values in node js

        // Write the code
        app.get("/block", function (req, res) {
        let hash = req.query;
        console.log(hash);
        res.send(hash);
        });

        Request: http://localhost:3001/block?blockhash=99

        Response:
        {
        "blockhash": "99"
        }

        // hardbinding the value (get value only for the specific key)
        app.get("/block", function (req, res) {
        let hash = req.query.blockhash;
        console.log(hash);
        res.send(hash);
        });

    # Few commmon errors

        we should add extension such as .js while importing any js file like below otherwise it will give error:

        Correct-Way : import Blockchain from "../../blockchain.js";
        Wrong-Way : import Blockchain from "../../blockchain";

    # How to use **dirname and **filename when working with ES6 modules in Node.js.

        import { fileURLToPath } from 'url'
        import { dirname } from 'path'
        const __filename = fileURLToPath(import.meta.url)
        const __dirname = dirname(__filename)

        console.log(__filename);
        console.log(__dirname);
