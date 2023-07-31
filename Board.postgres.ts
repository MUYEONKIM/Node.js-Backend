import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'

@Entity()  // 테이블이라고 선언해주는 것
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn("increment") // 기본키 선언 (속성중 increment는 자동으로 1씩 증가하는것, uuid는 각각 unique한 고유값)
  id!: number
  
  @Column({ type: "text"}) // column이라고 선언해주는 것
  writer!: string

  @Column({ type: "text"})
  title!: string

  @Column({ type: "text"})
  contents!: string
}