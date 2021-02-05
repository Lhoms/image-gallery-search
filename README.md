## Image gallery Search

### Express.js api  

#### How to run?  
`npm install`   

`npm run start`

#### Endpoints

`GET localhost:3000/search/${searchTerm}` search route


#### Important points

- First call is done alone to know how many pages has the api. The left calls and the metadata calls are done using event loop advantage to parallelize IO calls. In other languages can be done in other threads.    
- For now is using in memory database, redis or elastic search would be good in this case.
- ImageRepository loads cache at the start. If the user does a request he will receive an error until is finished.
- Endpoint /search/:word available. Filter criteria is an include of the word in all the metadata fields. In other language would be good to parallelize the filter, but node being single thread to cpu bound ops it has no sense, also filter performs good.
- Cache refresh configurable from file using dotenv dependency.
- Token expiration/error strategy added.
