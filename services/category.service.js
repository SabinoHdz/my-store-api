const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
class CategoriesService {
  constructor() {
    this.categories = [];
    this.generate();
  }
  generate() {
    const limit = 10;
    for (let i = 0; i < limit; i++) {
      this.categories.push({
        id: faker.datatype.uuid(),
        title:faker.commerce.department(),
        description:faker.lorem.sentence()
      });
    }
  }
  async find() {
    return this.categories;
  }
  async findOne(id) {
    const category = this.categories.find((item) => item.id === id);
    if (!category) {
      throw boom.notFound('category not found');
    }
    return category;
  }
  async create(data) {
    const newCategory = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.categories.push(newCategory);
    return newCategory;
  }
  async update(id, changes) {
    const index = this.categories.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('category not found');
    }
    const category = this.categories[index];
    this.categories[index] = {
      ...category,
      ...changes,
    };
    return this.categories[index];
  }
  async delete(id) {
    const index = this.categories.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('category not found');
    }
    this.categories.splice(index, 1);
    return { id };
  }
}

module.exports = CategoriesService;
