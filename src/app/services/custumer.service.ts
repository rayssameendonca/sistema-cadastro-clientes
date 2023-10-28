import { Injectable } from '@angular/core';
import { Customer } from '../model/customer';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CustumerService {
  customers: Customer[] = [];

  constructor(private http: HttpClient) {
    const localStorageData = localStorage.getItem('customers');
    if (localStorageData) {
      this.customers = JSON.parse(localStorageData);
    } else {
      const customer: Customer = {
        id: self.crypto.randomUUID(),
        name: 'Exemplo',
        email: 'exemplo@ada.com',
        dateOfBirth: new Date('2003-02-01'),
      };
      this.customers.push(customer);
    }
  }

  private updateLocalStorage(): void {
    localStorage.setItem('customers', JSON.stringify(this.customers));
  }

  getList(): Customer[] {
    return this.customers;
  }

  getById(id: string) {
    return this.customers.find((customer) => customer.id === id);
  }

  update(customer: Customer): Promise<void> {
    return new Promise((resolve, reject) => {
      let searchCustomer = this.getById(customer.id);

      if (searchCustomer) {
        searchCustomer.name = customer.name;
        searchCustomer.email = customer.email;
        searchCustomer.dateOfBirth = customer.dateOfBirth;

        this.updateLocalStorage();
      }
      resolve();
    });
  }

  delete(id: string) {
    this.customers = this.customers.filter((customer) => customer.id !== id);

    this.updateLocalStorage();
  }

  create(customer: Customer) {
    let uuid = self.crypto.randomUUID();

    customer.id = uuid;

    this.customers.push(customer);

    this.updateLocalStorage();
  }

  getCatFacts() {
    return this.http.get('https://cat-fact.herokuapp.com/facts');
  }
}
