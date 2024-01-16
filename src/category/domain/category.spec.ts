import { Category, CategoryCreateCommand } from './category.entity';

let validatorSpy: any

describe('Category', () => {
  beforeEach(() => {
    validatorSpy = jest.spyOn(Category, 'validate')
  })


  describe('Create', () => {
    it('should create a category with default values', () => {
      const props: CategoryCreateCommand = {
        name: 'Test Category',
      };

      const category = Category.create(props);

      expect(category.name).toBe('Test Category');
      expect(category.description).toBe('');
      expect(category.isActive).toBe(true);
      expect(category.createdAt).toBeInstanceOf(Date);
    });

    it('should create a category with specified values', () => {
      const props: CategoryCreateCommand = {
        name: 'Test Category',
        description: 'Test Description',
        isActive: false,
      };

      const category = Category.create(props);

      expect(category.name).toBe('Test Category');
      expect(category.description).toBe('Test Description');
      expect(category.isActive).toBe(false);
      expect(category.createdAt).toBeInstanceOf(Date);
    });
  });

  describe('ChangeName', () => {
    it('should change category name', () => {
      const category = Category.create({
        name: 'Initial Name',
      });

      category.changeName('New Name');

      expect(category.name).toBe('New Name');
    });
  });

  describe('ChangeDescription', () => {
    it('should change category description', () => {
      const category = Category.create({
        name: 'Test Category',
      });

      category.changeDescription('New Description');

      expect(category.description).toBe('New Description');
    });
  });

  describe('Activate', () => {
    it('should activate an inactive category', () => {
      const category = Category.create({
        name: 'Test Category',
        isActive: false,
      });

      category.activate();

      expect(category.isActive).toBe(true);
    });

    it('should not change the state if already active', () => {
      const category = Category.create({
        name: 'Test Category',
        isActive: true,
      });

      category.activate();

      expect(category.isActive).toBe(true);
    });
  });

  describe('Deactivate', () => {
    it('should deactivate an active category', () => {
      const category = Category.create({
        name: 'Test Category',
        isActive: true,
      });

      category.deactivate();

      expect(category.isActive).toBe(false);
    });

    it('should not change the state if already inactive', () => {
      const category = Category.create({
        name: 'Test Category',
        isActive: false,
      });

      category.deactivate();

      expect(category.isActive).toBe(false);
    });
  });

  describe('ToString', () => {
    it('should return string representation of category', () => {
      const category = Category.create({
        name: 'Test Category',
        description: 'Test Description',
        isActive: true,
      });
  
      const toStringResult = category.toString();
  
      expect(toStringResult).toEqual({
        categoryId: category.categoryId.value,
        name: 'Test Category',
        description: 'Test Description',
        isActive: true,
        createdAt: category.createdAt,
      });
    });
  });

  describe('Validate', () => {
    it('should call validate on create method', () => {
      const props: CategoryCreateCommand = {
        name: 'Test Category',
      };

      Category.create(props)

      expect(validatorSpy).toHaveBeenCalledTimes(1)
    })

    it('should call validate on create method', () => {
      const props: CategoryCreateCommand = {
        name: 'Test Category',
      };

      Category.create(props)

      expect(validatorSpy).toHaveBeenCalledTimes(1)
    })

    it('should call validate on update methods', () => {
      const props: CategoryCreateCommand = {
        name: 'Test Category',
      };

      const category = Category.create(props)
      category.changeName('New Name')
      category.changeDescription('New Description')


      expect(validatorSpy).toHaveBeenCalledTimes(3)
    })

    it('should throw when fields are incorrects', () => {
      const props: CategoryCreateCommand = {
        name: null as any,
      };

      expect(() => Category.create(props)).toThrow()
    })
  })
});