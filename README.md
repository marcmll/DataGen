Random Data Gen API
===================

Small API (+ GUI) project, that could potentially grow, built with Node JS and Redis. It is also the first API I have ever made, and so serves the purpose of being one that I can practice on.

Usage:
-
The usage of this project requires you to have [npm](https://www.npmjs.com/get-npm) and [Redis](https://redis.io/download) installed.
When having installed both, the first step is installing all the necessary node modules, required to run this project properly. To do so, navigate to the project folder using your command line and type:

```
npm install
```

Now that we have all the modules installed we can go ahead and start the Redis server in another command line tab, navigating to the Redis folder, typing in the following:

```
src/redis-server
```

Finally, to get the project going, in the first tab you used, type:

```
nodemon .
```

You can now view the project by opening your browser and typing in ```localhost:8080```

The API:
-
When viewing the project in the browser with ```localhost:8080```, you will see a simple GUI. This enables you to select the data you want to have generated and given out, and how many objects you want to generate. After selecting all your preferred settings, press the 'Generate' button. You will be presented with the API link that you can use to retrieve the generated data. Using tools such as [Postman](https://www.getpostman.com/), you can send a GET request to the generated link, giving you the generated data.

#### An Example:

GET request sent to ```localhost:8080/api/CkSkoV```, result:

```json
{
  "0": {
    "fullName": "Hulda Roberts",
    "gender": "Female",
    "age": 48,
    "username": "hRoberts",
    "email": "hRoberts@example.com",
    "phoneNumber": "(741) 709-5931"
  },
  "1": {
    "fullName": "Clifford Burns",
    "gender": "Male",
    "age": 35,
    "username": "cBurns",
    "email": "cBurns@example.com",
    "phoneNumber": "(474) 207-4705"
  },
  "2": {
    "fullName": "Hunter Harmon",
    "gender": "Male",
    "age": 23,
    "username": "hHarmon",
    "email": "hHarmon@example.com",
    "phoneNumber": "(826) 723-8598"
  }
}
```

#### API Plans

I am planning on adding more to the API, though I am not 100% sure on what exactly that will be. One thing I will make sure to add asap is the ability to generate data without the use of the GUI.

Overall this may turn out to be a full service one day. It can be very useful for developers and designers in need of fake/generated data to test their prototypes/mockups. The API especially makes this process easier, as tools such as [Sketch](https://sketchapp.com/) allow for API integration.

If you are interested in contributing to this project, please let me know... my contacts are listed down below.

---

This project is licensed under the terms of the MIT license.

Contact:
-
- momueller@me.com
- [Twitter](http://www.twitter.com/seven11nash)
- [Web](http://momueller.com)
