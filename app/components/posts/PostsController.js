import PostService from './PostsService';
import Util from '../../utils';
import redis from '../../utils/redis';

const util = new Util();

class PostsController {
  static async getAllPosts(req, res) {
    try {
      const cacheResult = await redis.get('getAllPosts');
      if (cacheResult) {
        console.log('getAllPosts dari cache');
        console.table(JSON.parse(cacheResult));
        console.log('=================================================================');
        util.setSuccess(200, 'Posts retrieved', JSON.parse(cacheResult));
      } else {
        const allPosts = await PostService.getAllPosts();
        if (allPosts.length > 0) {
          await redis.setEx('getAllPosts', 500, JSON.stringify(allPosts));
          util.setSuccess(200, 'Posts retrieved', allPosts);
        } else {
          util.setSuccess(200, 'No Post found');
        }
      }
      return util.send(res);
    } catch (error) {
      console.log('erro nih');
      console.log(error);
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async addPost(req, res) {
    if (!req.body.title || !req.body.content) {
      util.setError(400, 'Please provide complete details');
      return util.send(res);
    }
    const newPost = req.body;
    try {
      const createdPost = await PostService.addPost(newPost);
      util.setSuccess(201, 'Post Added!', createdPost);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async updatedPost(req, res) {
    const alteredPost = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }
    try {
      const updatePost = await PostService.updatePost(id, alteredPost);
      if (!updatePost) {
        util.setError(404, `Cannot find Post with the id: ${id}`);
      } else {
        util.setSuccess(200, 'Post updated', updatePost);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getAPost(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }

    try {
      const thePost = await PostService.getAPost(id);

      if (!thePost) {
        util.setError(404, `Cannot find Post with the id ${id}`);
      } else {
        util.setSuccess(200, 'Found Post', thePost);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deletePost(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value');
      return util.send(res);
    }

    try {
      const PostToDelete = await PostService.deletePost(id);

      if (PostToDelete) {
        util.setSuccess(200, 'Post deleted');
      } else {
        util.setError(404, `Post with the id ${id} cannot be found`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

export default PostsController;
