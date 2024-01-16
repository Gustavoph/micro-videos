import { Entity } from "../../shared/domain/entity"
import { EntityValidationError } from "../../shared/domain/validators/validation.error"
import { ValueObject } from "../../shared/domain/value-object"
import { Uuid } from "../../shared/domain/value-objects/uuid.vo"
import { CategoryValidatorFactory } from "./category.validator"

export type CategoryConstructorProps= {
  categoryId?: Uuid
  name: string
  description?: string
  isActive?: boolean
  createdAt?: Date
}

export type CategoryCreateCommand = {
  name: string
  description?: string
  isActive?: boolean
}

export class Category extends Entity {
  categoryId: Uuid
  name: string
  description: string
  isActive: boolean
  createdAt: Date

  constructor(props: CategoryConstructorProps) {
    super()
    this.categoryId = props.categoryId ?? new Uuid()
    this.name = props.name
    this.description = props.description ?? ''
    this.isActive = props.isActive ?? true
    this.createdAt = props.createdAt ?? new Date()
  }

  static create (props: CategoryCreateCommand): Category {
    const category = new Category(props)
    Category.validate(category)
    return category
  }

  static validate (entity: Category) {
    const validator = CategoryValidatorFactory.create()
    const isValid = validator.validate(entity)
    if (!isValid) throw new EntityValidationError(validator.errors!)
  }

  get entity_id(): ValueObject {
    return this.categoryId
  }

  changeName (name: string): void {
    this.name = name
    Category.validate(this)
  }

  changeDescription (description: string): void {
    this.description = description
    Category.validate(this)
  }

  activate() {
    if (!this.isActive) {
      this.isActive = true
    }
  }

  deactivate() {
    if (this.isActive) {
      this.isActive = false
    }
  }

  toString() {
    return {
      categoryId: this.categoryId.value,
      name: this.name,
      description: this.description,
      isActive: this.isActive,
      createdAt: this.createdAt,
    }
  }
}