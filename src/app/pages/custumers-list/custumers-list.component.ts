import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/model/customer';
import { CustumerService } from 'src/app/services/custumer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './custumers-list.component.html',
  styleUrls: ['./custumers-list.component.css'],
})
export class CustumersListComponent implements OnInit {
  customers: Customer[] = [];
  customerIdSelectedToDelete: string = '-1';

  constructor(
    private customerService: CustumerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customers = this.customerService.getList();
  }

  goToCustomerEdit(id: string) {
    this.router.navigate(['customer-edit', id]);
  }

  deleteCustomer() {
    this.customerService.delete(this.customerIdSelectedToDelete);
    this.ngOnInit();
  }

  openModalConfirmDelete(id: string) {
    this.customerIdSelectedToDelete = id;
  }
}
