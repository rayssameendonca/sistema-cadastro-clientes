import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/model/customer';
import { CustumerService } from 'src/app/services/custumer.service';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/internal/operators/take';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './custumers-edit.component.html',
  styleUrls: ['./custumers-edit.component.css'],
})
export class CustumersEditComponent implements OnInit {
  id: string = 'newCustomer';
  customerForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustumerService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.customerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(6)]),
      dateOfBirth: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        this.emailValidator(),
      ]),
    });
  }
  ngOnInit() {
    const getId = this.route.snapshot.paramMap.get('id');
    if (getId) {
      this.id = getId;
      const currentCustomer = this.customerService.getById(this.id);

      this.customerForm = new FormGroup({
        name: new FormControl(currentCustomer?.name, [
          Validators.required,
          Validators.minLength(3),
        ]),
        dateOfBirth: new FormControl(currentCustomer?.dateOfBirth, [
          Validators.required,
        ]),
        email: new FormControl(currentCustomer?.email, [
          Validators.required,
          Validators.email,
          this.emailValidator(),
        ]),
      });
    }
  }

  async onSubmit(customer: Customer) {
    try {
      if (this.id === 'newCustomer') this.customerService.create(customer);
      else {
        customer.id = this.id;
        await this.customerService.update(customer);
      }

      this.customerService
        .getCatFacts()
        .pipe(take(1))
        .subscribe((result) => {
          console.log(result);
        });

      this.router.navigate(['customer-list']);
      this.toastr.success('Cliente Salvo com sucesso', 'Sucesso!');
    } catch (error) {
      this.toastr.error('Erro ao Salvar o cliente', 'Ops... Deu erro!');
      console.log(error);
    }
  }

  emailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const email: string = control.value;
      if (email && email.indexOf('@ada.com') === -1) {
        return { invalidEmailAda: true };
      }
      return null;
    };
  }
}
