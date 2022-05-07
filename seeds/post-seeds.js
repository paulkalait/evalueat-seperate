const { Post } = require('../models');

const postdata = [
  {
    title: 'look at this burger!',
   post_text: 'This burger is so juicy!',
   image_name:'burger.png',
    user_id: 9
  },
  {
    title: 'Burrito night!',
   post_text: 'My homemade burritos!',
   image_name:'Burrito.jpeg',
   user_id: 8
  },
  {
    title: 'Delicious homemade chilli',
   post_text: 'My grandmothers chili reciepe. Very tasty and spicey',
   image_name:'chilli.jpeg',
   user_id: 1
  },
  {
    title: 'Taco Tuuuuuuuesday',
   post_text: 'its taco tuesdayyyyyy',
   image_name:'taco.jpeg',
   user_id: 4
  },
  {
    title: 'Pizza Today',
   post_text: 'Bought this pizza from NY. Tasted very fresh and 100 percent worth it',
   image_name:'pizza.jpeg',
   user_id: 7
  },
  {
    title: 'Inspired by Gordan Ramsey',
   post_text: 'Tender, juicy, and fresh beef wellington I created last night.',
   image_name:'beefw.jpeg',
   user_id: 4
  },
  {
    title: 'Smoores night!',
   post_text: 'We had a cozy campfire last night and decided to cook some smores!',
   image_name:'smoore.png',
   user_id: 1
  },
  {
    title: 'This club sandwhich is TOO DIE FOR',
    post_text: 'Fresh sandwhich I packed for my kids lunch today... he LOVED IT!',
    image_name:'club.jpeg',
    user_id: 1
  },
  {
    title: 'cozy hot cocoa season!',
    post_text: 'Who doesnt like hot chocolate? Its cozy, tasty, and is perfect for movie nights!',
    image_name:'coco.jpeg',
    user_id: 9
  }
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;
