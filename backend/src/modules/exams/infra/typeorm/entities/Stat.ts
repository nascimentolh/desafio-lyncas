import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Test from './Test';

@Entity('stats')
class Stat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  doer: string;

  @Column()
  total: number;

  @Column()
  hits: number;

  @Column()
  test_id: string;

  @OneToOne(() => Test)
  @JoinColumn({ name: 'test_id' })
  test: Test;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Stat;
