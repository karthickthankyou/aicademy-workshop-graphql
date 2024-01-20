import { StudentEntity } from '../entity/student.entity'
import { PickType } from '@nestjs/swagger'

export class CreateStudent extends PickType(StudentEntity, ['uid']) {}
