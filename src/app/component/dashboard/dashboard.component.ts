import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms'
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/service/employee.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
empDetail !: FormGroup;
empObj : Employee = new Employee ();
emplist : Employee[] = [];
constructor (private formBuilder : FormBuilder, private empService : EmployeeService) { }

ngOnInit() : void {
this.getAllEmployee();
this.empDetail = this.formBuilder.group({
  employeeid : [''],
  name : [''],
  postn : ['']
});

}

addEmployee() {
  console.log(this.empDetail);
  this.empObj.employeeid = this.empDetail.value.employeeid;
  this.empObj.name = this.empDetail.value.name;
  this.empObj.postn = this.empDetail.value.postn;

  this.empService.addEmployee(this.empObj).subscribe(res=>{
    console.log(res);
    this.getAllEmployee();
  },err=>{
    console.log(err);
  });
}
getAllEmployee() {
this.empService.getAllEmployee().subscribe(res=>{
  this.emplist = res;
},Err=>{
    console.log("error while fetching data");
  });
}
editEmployee(emp : Employee){
  this.empDetail.controls['employeeid'].setValue(emp.employeeid);
  this.empDetail.controls['name'].setValue(emp.name);
  this.empDetail.controls['postn'].setValue(emp.postn);
}

updateEmployee(){
  this.empObj.employeeid = this.empDetail.value.employeeid;
  this.empObj.name = this.empDetail.value.name;
  this.empObj.postn = this.empDetail.value.postn;

  this.empService.updateEmployee(this.empObj).subscribe(res=>{
    console.log(res);
    this.getAllEmployee();
  },err=>{
    console.log(err);
  })
}

deleteEmployee(emp : Employee) {
  this.empService.deleteEmployee(emp).subscribe(res=>{
    console.log(res);
    alert('Employee Deleted Sussessfully');
    this.getAllEmployee();
  },err =>{
    console.log(err);
  })
  }
}
