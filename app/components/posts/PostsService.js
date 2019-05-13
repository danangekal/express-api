import database from '../../database/models';

class PostService {
  static async getAllPosts() {
    try {
      return await database.Posts.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async addPost(newPost) {
    try {
      return await database.Posts.create(newPost);
    } catch (error) {
      throw error;
    }
  }

  static async updatePost(id, updatePost) {
    try {
      const PostToUpdate = await database.Posts.findOne({
        where: { id: Number(id) }
      });

      if (PostToUpdate) {
        await database.Posts.update(updatePost, { where: { id: Number(id) } });

        return updatePost;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getAPost(id) {
    try {
      const thePost = await database.Posts.findOne({
        where: { id: Number(id) }
      });

      return thePost;
    } catch (error) {
      throw error;
    }
  }

  static async deletePost(id) {
    try {
      const PostToDelete = await database.Posts.findOne({ where: { id: Number(id) } });

      if (PostToDelete) {
        const deletedPost = await database.Posts.destroy({
          where: { id: Number(id) }
        });
        return deletedPost;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default PostService;
