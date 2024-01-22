const {Schema, model, default: mongoose} = require("mongoose")

const blogSchema = new Schema({
    title:{
        type:String,
        required: true,
    },
    content:{
        type:String,
        required: true,
    },
    coverImage: {
        type: String,
        required: false,
        default: 'https://www.tots100.co.uk/wp-content/uploads/2018/02/Is-Your-Blog-Due-for-an-Update-1.jpg'
    },
    category: {
        type:String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref : 'auth',
        required: true,
    }
}, {timestamps:true})

const Blog = model("blog", blogSchema)

module.exports = Blog



// const createBlogCollection = async () => {
//     try {
//         // Import the "Blog" model
//         const Blog = require('./models/blog'); // Update the path accordingly

//         // Create a new document and save it to the "auth" collection
//         const newBlog = new Blog({
//             title: 'How to Revamp Blog Posts and Create Evergreen Content',
//             content: 'Have you ever written content that did really well for a burst of time? Maybe it was a tutorial, a how to post, a craft, a recipe or something that provokes a strong emotion. What has happened to that piece of content since it had its first outing? Evergreen content is content that is always relevant, it is interesting and will continue to entertain, educate and inspire others. Evergreen content often solves a problem. Not all bloggers content is evergreen but those posts that are evergreen should be carefully looked after.Importantly there are things that we can do to these blog posts to ensure that they keep giving.An easy and quick way of giving the evergreen content a boost is to republish it.This is super easy to do especially if you have your URL set up that it doesn’t include the date.Then all you need to do is change the date to today and republish.Doing it this way means that the post once again is on your home page and will be seen by fresh eyes.You also don’t lose any of the previous comments and engagement.',
//         category: "marketing"
//         });

//         await newBlog.save();

//         console.log('Blog document saved successfully.');
//     } catch (error) {
//         console.error('Error creating "blog" collection:', error);
//     } finally {
//         // Close the connection when done (optional)
//         mongoose.connection.close();
//     }
// };