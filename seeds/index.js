const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected!");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.ceil(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            author: "62d43bbfc2bc06fed00fa47a",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/kirirom-institute-of-technology/image/upload/v1658217471/YelpCamp/x6tkazistjoozunkg5zs.jpg',
                    filename: 'YelpCamp/x6tkazistjoozunkg5zs',
                },
                {
                    url: 'https://res.cloudinary.com/kirirom-institute-of-technology/image/upload/v1658217471/YelpCamp/umjzzbpqdrwpyhp6j3c8.png',
                    filename: 'YelpCamp/umjzzbpqdrwpyhp6j3c8',
                }
            ],
            geometry: {
                "type": "Point",
                "coordinates": [cities[random1000].longitude,
                cities[random1000].latitude]
            },
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam ipsum dolorem, nisi esse quae voluptatum vero impedit dolor suscipit ducimus. Enim reiciendis obcaecati eaque doloribus nulla suscipit quas inventore voluptate!',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});