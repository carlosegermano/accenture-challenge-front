import { Company } from '../company/company.model';

export interface Supplier {
  id: number;
  nationalDocument: string;
  personalType: Person;
  name: string;
  email: string;
  zipCode: string;
  nationalId?: string;
  birthday?: Date;
  companies?: Company[];
}

export enum Person {
  NATURAL_PERSON,
  LEGAL_PERSON,
}
