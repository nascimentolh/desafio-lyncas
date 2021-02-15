import User from '@modules/users/infra/typeorm/entities/User';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Question from './Question';

@Entity('tests')
class Test {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('uuid')
  user_id: string;

  @OneToOne(() => User, (user) => user.tests)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToMany(() => Question)
  @JoinTable({
    name: 'tests_questions_question',
    joinColumn: { name: 'testId' },
    inverseJoinColumn: { name: 'questionId' },
  })
  questions: Question[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Test;
