import { Length } from 'class-validator'

import { BaseEntity } from './BaseEntity'

export class Post extends BaseEntity {
  @Length(5, 30, {
    message: 'Post title must have between 5 and 30 characters',
  })
  title: string

  @Length(5, 144, {
    message: 'Post content must have between 5 and 144 characters',
  })
  content: string

  constructor(title: string, content: string) {
    super()
    this.title = title
    this.content = content
  }
}
