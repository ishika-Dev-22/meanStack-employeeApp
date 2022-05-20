import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../appModels/employee.model';
import { EmployeeService } from '../appServices/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee1.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  closeResult = '';
  empForm!: FormGroup;
  showModal: boolean=false;
  editModal: boolean=false;
  employees: Employee[]=
    [

  ];

  constructor(private fb: FormBuilder,
    private empService: EmployeeService ) { }

  ngOnInit(): void {
    this.getEmployees();
    this.empForm = this.fb.group({
      _id:[],
      name:['', Validators.required] ,
      designation:['', Validators.required],
      department:['', Validators.required]
    })
  }
  openModal(){
    this.showModal = true;
  }

  //Update empoyee details
  onEditEmployee(emp: Employee): void{
    this.showModal = true;
    this.editModal = true;
    this.empForm.patchValue(emp);
  }

  //Delete employee
  deleteEmployee(id: any): void {
    this.empService.deleteEmployees(id).subscribe(
      (res)=>{
        console.log(res);
        this.getEmployees();
      },
      (err)=>{
        console.log(err);
      })
  }

//Form submit
  onEmpSubmit(): void {
    if(this.empForm.valid){

      if(this.editModal){
        this.empService.updateEmployee(this.empForm.value).subscribe(
          (res) =>{
            console.log(res);
            this.getEmployees();
            this.empForm.reset();
          },
          (err) =>{
            console.log(err);
          })
      } else{
        console.log(this.empForm.value);
        this.empService.addEmployee(this.empForm.value).subscribe(
          (res) =>{
            console.log(res);
            this.getEmployees();
          },
          (err) =>{
            console.log(err);
          })
        
      }

    }
  }
  getEmployees(): void {
    this.empService.getEmployeeList().subscribe(
      (res: any) =>{
        console.log(res);
        this.employees = res;
      },
      (err) =>{
        console.log(err);
      }
      )
  }

  onCloseModal(){
    this.showModal = false;
    this.editModal =false;
    this.empForm.reset();
  }
}
