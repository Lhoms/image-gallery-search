## Image gallery Search

### Express.js api  

#### How to run?  
`npm install`   

`npm run start`

#### Endpoints

`GET localhost:3000/search/${searchTerm}` search route


#### Important points

- For now is using in memory database, redis or elastic search would be good in this case.
- ImageRepository loads cache at the start. If the user does a request he will receive an error until is finished.
- endpoint /search/:word available. Filter criteria is an include of the word in all the metadata fields.
