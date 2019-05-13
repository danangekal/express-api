import database from '../../database/models';

class BookService {
  static async getAllBooks() {
    try {
      return await database.Books.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async addBook(newBook) {
    try {
      return await database.Books.create(newBook);
    } catch (error) {
      throw error;
    }
  }

  static async updateBook(id, updateBook) {
    try {
      const bookToUpdate = await database.Books.findOne({
        where: { id: Number(id) }
      });

      if (bookToUpdate) {
        await database.Books.update(updateBook, { where: { id: Number(id) } });

        return updateBook;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getABook(id) {
    try {
      const theBook = await database.Books.findOne({
        where: { id: Number(id) }
      });

      return theBook;
    } catch (error) {
      throw error;
    }
  }

  static async deleteBook(id) {
    try {
      const bookToDelete = await database.Books.findOne({ where: { id: Number(id) } });

      if (bookToDelete) {
        const deletedBook = await database.Books.destroy({
          where: { id: Number(id) }
        });
        return deletedBook;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default BookService;
