import { Company } from '../company/company.model';

export interface Supplier {
  id: number;
  nationalDocument: string;
  personType: string;
  name: string;
  email: string;
  zipCode: string;
  nationalId?: string;
  birthday: string;
  companies: Company[];
}
