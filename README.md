# Task Monster

A fun side project combining the functionality of a productivity app, with the fun of a virtual pet. An improvement of an old side-project using newer technologies like React/Redux/Solidity. Make an account, and keep track of important tasks, their deadlines, and check them off when complete. For each task, a monster is cryptographically created and kept on the Ethereum blockchain under your wallet address. Complete the task to level the monsters up, miss a deadline and the monster will be KO'd. Keep productive and finish all of your tasks to raise your monsters happy and healthy. As this is an Ethereum DAPP, it uses the Chrome Metamask extension, along with the EthJS library, for Blockchain functionality. Locally, it's built using React/Redux on the client-side, and a Rails API on the back-end. Additionally, users need to have Metamask installed and initialized in order to use this DAPP.

# Installation & Usage:

To play around and help develop this app, clone or download this repo. There are client-side (package.json) and server-side (Gemfile) dependencies. Install dependencies via ```bundle install``` & ```npm install```. Afterwards, run ```rake db:create``` to create the database, and start the local server using the ```rake start``` command (which, under the hood is a rake task using the Foreman gem to start both the React front-end and Rails back-end). Initiate a console via ```rails c``` in order to play around with the models, and open a browser window to localhost:3000 to preview and navigate the app. The client-side will be hosted on localhost:3000, while the server will be hosted on localhost:3001. In order to try out the Ethereum smart contract functionality, install [Metamask](https://metamask.io), the Chrome extension that allows your browser to interface with the Ethereum blockchain. After installing, create an account, switch to the Kovan test network and procure test Ether [here](https://faucet.kovan.network/).

# Contributing

This project is still under development, and bug and pull requests are welcome on Github at https://github.com/jelocodes/task-monster-react. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org/) code of conduct.

# License

This codebase is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

