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
yarn add ipfs
yarn add ipfs-http-client
npx ipfs init
npx ipfs daemon
npx ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin  '["http://localhost:3000"]'