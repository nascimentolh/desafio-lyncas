import User from '@modules/users/infra/typeorm/entities/User';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Question from './Question';
import Stat from "./Stat";

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

  @ManyToOne(() => Stat, stat => stat.test)
  stats: Stat[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Test;
