import { Supplier } from '../supplier/supplier.model';

export interface Company {
  id: number;
  cnpj: string;
  tradeName: string;
  zipCode: string;
  address: Address;
  suppliers: Supplier[];
}

export interface Address {
  cep: string;
  uf?: string;
  cidade?: string;
  bairro?: string;
  logradouro?: string;
  aux?: string;
}
