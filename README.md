### Simple Blogging and selling NFT

- NEXTjs
- React
- Sanity
- Thirdweb
- sass

```
npm install
```
#### thirdweb

create .env.local file, put PRIVATE_KEY=c32d7**********PRIVATE_KEY. change contract address at const/address, change all "activeChainId = ChainId.___"


#### Sanity

To get our Sanity Studio up and running, we need to have a projectId in `src/client.js`. If you already have a `projectId` then be sure to add that value there. Otherwise you will need to `sanity init`. All instructions are below.

If you already have a `projectId`:
- Run the command `cd BlogStudio`
- Run `sanity install` to install Sanity dependencies
- Add `projectId` to `src/client.js`
- Run `sanity start`
- Navigate to `localhost:3333` to view Sanity Studio

If you _do not_ have a `projectId`:
- Run the command `cd BlogStudio`
- Run `sanity init`
- Answer the following questions:
    * Create new project — Hit Enter. 
    * Your project name: — We can name it whatever we would like. Let’s use My Sanity Blog for this project. 
    * Use the default dataset configuration? — The default dataset configuration has a public dataset named "production", let's stick with that. So type in "Y" and hit Enter. 
    * Project output path: — This will show us the path where our sanity project will live. The path should show the path that leads to this: /sanity-react/mysanityblog. Hit Enter. 
    * Select project template: — Here we are going to choose Blog (schema). Using the arrow keys, navigate to that so it’s showing blue. Hit Enter once there. Success!
- Add new `projectId` to `src/client.js` (detailed instructions, googling...)
- Run `sanity start`
- Navigate to `localhost:3333` to view Sanity Studio

```
npm run dev
```

![](/Nest-Hub-Max.png)


