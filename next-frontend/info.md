# initialize tailwindcss
yarn add --dev tailwindcss postcss autoprefixer
npx tailwindcss init -p  

# apply redux
yarn add redux react-redux
yarn add --dev @types/react-redux
yarn add redux-thunk
yarn add --dev @types/redux-thunk
yarn add redux-devtools-extension

yarn add @reduxjs/toolkit
yarn add react-router-dom

yarn add react-dropzone

#https://github.com/ipfs-inactive/js-ipfs-http-client#running-the-daemon-with-the-right-port

#http://docs.ipfs.tech.ipns.localhost:8080/install/command-line/#official-distributions
yarn add ipfs
ipfs config Addresses.API
yarn add ipfs-http-client
ipfs init
ipfs daemon
ipfs config Addresses.API
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin  '["http://localhost:3000"]'